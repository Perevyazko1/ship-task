import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {gql, useQuery} from "@apollo/client";
import {GET_VEHICLES} from "../../shared/api/GET_VEHICLES";
import {useDataContext} from "../../features/DataContext";

interface CardShipProps {
    className?: string
    children?: ReactNode
}

interface Vehicle {
    title: string[]
    level: string[]
    type: { name: string }
    nation: {
        name: string,
        icons: { large: string }
    }
    description: string[]
    icons: { medium: string }
}


export const CardShip = memo((props: CardShipProps) => {

    const {loading, error, data} = useQuery(GET_VEHICLES);

    const {dataSort, setDataSort} = useDataContext()

    const {
        className,
        children,
        ...otherProps
    } = props
    useEffect(() => {
        if (data.vehicles) {
            setDataSort(data.vehicles)
        }

    }, [data]);


    return (
        <div
            className={classNames('', {}, [className])}
            {...otherProps}
        >
            {dataSort && dataSort.map((vehicle: Vehicle) => (
                    <div>
                        <div>{vehicle.title}</div>
                        <div>{vehicle.type.name}</div>
                        <div>{`Нация ${vehicle.nation.name}`}</div>
                        <div>{vehicle.level}</div>
                        <div>{vehicle.description}</div>
                        <img src={`https:${vehicle.icons.medium}`}/>
                        <img src={`https:${vehicle.nation.icons.large}`}/>

                    </div>
                )
            )}

        </div>
    );
});