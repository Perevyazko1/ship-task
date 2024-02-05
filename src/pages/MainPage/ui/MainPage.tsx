import {memo, ReactNode, useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {PageWrapper} from "shared/ui/PageWrapper/PageWrapper";
import {DataContent, useDataContext} from "../../../features/DataContext";
import {GET_VEHICLES} from "../../../shared/api/GET_VEHICLES";

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
        console.log(uniqLevel, nation, vehiclesClass)

    }, [data]);
    const handleSort = (sortVal: string) => {
        if (sortVal !== "Select country") {
            const sort = data && data.vehicles.filter((item: any) => item.nation.name === sortVal);
            setDataSort(sort)
        } else {
            setDataSort(data && data.vehicles)
        }
    };
    return (
        <PageWrapper>
            <select
                value={nation}
                onChange={(event) => handleSort(event.target.value)}
                className="form-select form-select-sm" aria-label=".form-select-sm example">
                <option>Select country</option>
                {nation && nation.map((item: string, index: number) => (
                    <option key={index}>{item}</option>
                ))}
            </select>
        </PageWrapper>
    );
});
export default MainPage