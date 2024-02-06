import {memo, ReactNode, useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {PageWrapper} from "shared/ui/PageWrapper/PageWrapper";
import {DataContent, useDataContext} from "../../../features/DataContext";
import {GET_VEHICLES} from "../../../shared/api/GET_VEHICLES";
import {CardShip} from "../../../widgets/CardShip/CardShip";
import {FilterShip} from "../../../shared/FilterShip/FilterShip";
import cls from "./MainPage.module.scss"
import {Vehicle} from "../../../entity/Vehicle";

interface MainPageProps {
    className?: string
    children?: ReactNode
}

interface DataSort {
    vehicles: string[]

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
        if (sortVal !== "Выберите Нацию") {
            const sort = data && data.vehicles.filter((item: Vehicle) => item.nation.name === sortVal);
            setDataSort(sort)
        } else {
            setDataSort(data && data.vehicles)
        }
    };
    const handleSortLevels = (sortVal: string) => {
        if (sortVal !== "Выберите уровень") {
            const sort = data && data.vehicles.filter((item: Vehicle) => item.level === sortVal);
            setDataSort(sort)
        } else {
            setDataSort(data && data.vehicles)
        }
    };
    const handleSortClasses = (sortVal: string) => {
        if (sortVal !== "Выберите Класс") {
            const sort = data && data.vehicles.filter((item: Vehicle) => item.type.title === sortVal);
            setDataSort(sort)
        } else {
            setDataSort(data && data.vehicles)
        }
    };
    return (
        <PageWrapper>
            <div className={cls.filterWrapper}>
                <FilterShip valueActive={activeNationFilter} dataSelect={nation}
                            onChange={(event) => handleSortNation(event.target.value)}/>
                <FilterShip valueActive={activeLevelFilter} dataSelect={uniqLevel}
                            onChange={(event) => handleSortLevels(event.target.value)}/>
                <FilterShip valueActive={activeClassFilter} dataSelect={vehiclesClass}
                            onChange={(event) => handleSortClasses(event.target.value)}/>

            </div>
            <CardShip/>
        </PageWrapper>
    );
});
export default MainPage