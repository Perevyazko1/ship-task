import {memo, ReactNode, useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {PageWrapper} from "shared/ui/PageWrapper/PageWrapper";
import {useDataContext} from "features/DataContext";
import {GET_VEHICLES} from "shared/api/GET_VEHICLES";
import {CardShip} from "widgets/CardShip/CardShip";
import {FilterShip} from "shared/FilterShip/FilterShip";
import cls from "./MainPage.module.scss"
import {Vehicle} from "entity/Vehicle";
import {Loader} from "../../../shared/ui/Loader/Loader";

interface MainPageProps {
    className?: string
    children?: ReactNode
}


const MainPage = memo((props: MainPageProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props


    const [uniqLevel, setUniqLevel] = useState<any>()
    const [nation, setNation] = useState<any>()
    const [vehiclesClass, setVehiclesClass] = useState<any>()
    const [activeLevelFilter, setActiveLevelFilter] = useState("Выберите уровень")
    const [activeNationFilter, setActiveNationFilter] = useState("Выберите нацию")
    const [activeClassFilter, setActiveClassFilter] = useState("Выберите класс")
    const {loading, error, data} = useQuery(GET_VEHICLES);
    const {dataSort, setDataSort} = useDataContext()
    useEffect(() => {
        if (data?.vehicles) {
            setDataSort(data.vehicles)
        }
    }, [data]);


    useEffect(() => {
        const nations = data && data.vehicles.map((vehicle: Vehicle) => vehicle.nation.name)
        setNation([...new Set(nations)])

        const levels = data && data.vehicles.map((vehicle: Vehicle) => vehicle.level)
        const sortedLevels = levels && levels.sort((a: number, b: number) => a - b);
        setUniqLevel([...new Set(sortedLevels)])

        const vehiclesClasses = data && data.vehicles.map((vehicle: Vehicle) => vehicle.type.name)
        setVehiclesClass([...new Set(vehiclesClasses)])

    }, [data]);

    useEffect(() => {
        if(data?.vehicles) {


            let sortData = data.vehicles


            if (activeLevelFilter !== "Выберите уровень") {
                const sort = sortData && sortData.filter((item: Vehicle) => item.level === parseInt(activeLevelFilter))
                sortData = sort
            }
            if (activeClassFilter !== "Выберите класс") {
                const sort = sortData && sortData.filter((item: Vehicle) => item.type.name === activeClassFilter)
                sortData = sort
            }
            if (activeNationFilter !== "Выберите нацию") {
                const sort = sortData && sortData.filter((item: Vehicle) => item.nation.name === activeNationFilter)
                sortData = sort
            }
            setDataSort(sortData)
        }

    }, [activeLevelFilter, activeClassFilter, activeNationFilter]);



    return (
        <PageWrapper>


            {loading ? <Loader/> :
                <div className={cls.MainPage}>
                    <div className={cls.filterWrapper}>
                        <FilterShip defaultValue={"Выберите Нацию"} valueActive={activeNationFilter} dataSelect={nation}
                                    onChange={(event) => setActiveNationFilter(event.target.value)}/>
                        <FilterShip defaultValue={"Выберите уровень"} valueActive={activeLevelFilter}
                                    dataSelect={uniqLevel}
                                    onChange={(event) => setActiveLevelFilter(event.target.value)}/>
                        <FilterShip defaultValue={"Выберите класс"} valueActive={activeClassFilter}
                                    dataSelect={vehiclesClass}
                                    onChange={(event) => setActiveClassFilter(event.target.value)}/>

                    </div>
                    <CardShip/>
                </div>

            }
        </PageWrapper>
    );
});
export default MainPage