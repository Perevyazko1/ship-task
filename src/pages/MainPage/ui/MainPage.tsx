import {memo, ReactNode, useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {PageWrapper} from "shared/ui/PageWrapper/PageWrapper";
import {DataContent, useDataContext} from "../../../features/DataContext";
import {GET_VEHICLES} from "../../../shared/api/GET_VEHICLES";
import {CardShip} from "../../../widgets/CardShip/CardShip";
import {FilterShip} from "../../../shared/FilterShip/FilterShip";

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
    const {loading, error, data} = useQuery(GET_VEHICLES);
    const {dataSort, setDataSort} = useDataContext()
    useEffect(() => {
        if (data?.vehicles) {
            setDataSort(data.vehicles)
        }

    }, [data]);

    useEffect(() => {
        const nations = data && data.vehicles.map((vehicle: any) => vehicle.nation.name)
        setNation([...new Set(nations)])

        const levels = data && data.vehicles.map((vehicle: any) => vehicle.level)
        setUniqLevel([...new Set(levels)])

        const vehiclesClasses = data && data.vehicles.map((vehicle: any) => vehicle.type.title)
        setVehiclesClass([...new Set(vehiclesClasses)])

    }, [data]);
    const handleSortNation = (sortVal: string) => {
        if (sortVal !== "Select") {
            const sort = data && data.vehicles.filter((item: any) => item.nation.name === sortVal);
            setDataSort(sort)
        } else {
            setDataSort(data && data.vehicles)
        }
    };
    const handleSortLevels = (sortVal: string) => {
        if (sortVal !== "Select") {
            const sort = data && data.vehicles.filter((item: any) => item.level === sortVal);
            setDataSort(sort)
        } else {
            setDataSort(data && data.vehicles)
        }
    };
    const handleSortClasses = (sortVal: string) => {
        if (sortVal !== "Select") {
            const sort = data && data.vehicles.filter((item: any) => item.type.title === sortVal);
            setDataSort(sort)
        } else {
            setDataSort(data && data.vehicles)
        }
    };
    return (
        <PageWrapper>
            <FilterShip dataSelect={nation} onChange={(event)=>handleSortNation(event.target.value)}/>
            <FilterShip dataSelect={uniqLevel} onChange={(event)=>handleSortLevels(event.target.value)}/>
            <FilterShip dataSelect={vehiclesClass} onChange={(event)=>handleSortClasses(event.target.value)}/>
            <CardShip/>
        </PageWrapper>
    );
});
export default MainPage