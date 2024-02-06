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
    const [activeNationFilter, setActiveNationFilter] = useState("Выберите Нацию")
    const [activeClassFilter, setActiveClassFilter] = useState("Выберите Класс")
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
        setUniqLevel([...new Set(levels)])

        const vehiclesClasses = data && data.vehicles.map((vehicle: Vehicle) => vehicle.type.title)
        setVehiclesClass([...new Set(vehiclesClasses)])

    }, [data]);
    const handleSortNation = (sortVal: string) => {
        setActiveNationFilter(sortVal)
        const sort = dataSort && dataSort.filter((item: Vehicle) => item.nation.name === sortVal);

        if (sort.length === 0) {
            const sortDataNation = data && data.vehicles.filter((item: Vehicle) => item.nation.name === sortVal);
            const sortDataNationLevel = sortDataNation.filter((item: Vehicle) => item.level === parseInt(activeLevelFilter))
            const sortDataNationLevelClass = sortDataNationLevel.filter((item: Vehicle) => item.type.title === activeClassFilter);
            setDataSort(sortDataNationLevelClass)
        } else {
            setDataSort(sort)
        }
    };


    const handleSortLevels = (sortVal: string) => {
        setActiveLevelFilter(sortVal)
        const sort = dataSort && dataSort.filter((item: Vehicle) => item.level === parseInt(sortVal));
        if (sort.length === 0) {
            const sortDataLevels = data && data.vehicles.filter((item: Vehicle) => item.level === parseInt(sortVal));
            const sortDataLevelsNation = sortDataLevels.filter((item: Vehicle) => item.nation.name === activeNationFilter)
            const sortDataLevelsNationClass = sortDataLevelsNation.filter((item: Vehicle) => item.type.title === activeClassFilter);
            setDataSort(sortDataLevelsNationClass)
        } else {
            setDataSort(sort)
        }
    };


    const handleSortClasses = (sortVal: string) => {
        setActiveClassFilter(sortVal)
        const sort = dataSort && dataSort.filter((item: Vehicle) => item.type.title === sortVal);
        if (sort.length === 0) {
            const sortDataClass = data && data.vehicles.filter((item: Vehicle) => item.type.title === sortVal)
            const sortDataClassNation = sortDataClass.filter((item: Vehicle) => item.nation.name === activeNationFilter)
            const sortDataClassNationLevel = sortDataClassNation.filter((item: Vehicle) => item.level === parseInt(activeLevelFilter));
            setDataSort(sortDataClassNationLevel)
        } else {
            setDataSort(sort)
        }
    };
    return (
        <PageWrapper>


            {loading ? <Loader/> :
                <div className={cls.MainPage}>
                    <div className={cls.filterWrapper}>
                        <FilterShip defaultValue={"Выберите Нацию"} valueActive={activeNationFilter} dataSelect={nation}
                                    onChange={(event) => handleSortNation(event.target.value)}/>
                        <FilterShip defaultValue={"Выберите уровень"} valueActive={activeLevelFilter} dataSelect={uniqLevel}
                                    onChange={(event) => handleSortLevels(event.target.value)}/>
                        <FilterShip defaultValue={"Выберите класс"} valueActive={activeClassFilter} dataSelect={vehiclesClass}
                                    onChange={(event) => handleSortClasses(event.target.value)}/>

                    </div>
                    <CardShip/>
                </div>

            }
        </PageWrapper>
    );
});
export default MainPage