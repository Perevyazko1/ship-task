import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {gql, useQuery} from "@apollo/client";
import {GET_VEHICLES} from "../../shared/api/GET_VEHICLES";
import {useDataContext} from "../../features/DataContext";
import cls from "./CardShip.module.scss"

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
        if (data?.vehicles) {
            setDataSort(data.vehicles)
            console.log(data.vehicles)
        }

    }, [data]);


    return (
        <div
            className={classNames(cls.CardShip, {}, [className])}
            {...otherProps}
        >
            {dataSort && dataSort.map((vehicle: Vehicle, index:number) => (
                    <div className={cls.cardWrapper} key={index}>
                        <div className={cls.title}>{vehicle.title}</div>
                        <img className={cls.flag} src={`https:${vehicle.nation.icons.large}`}/>
                        <img className={cls.ship} src={`https:${vehicle.icons.medium}`}/>
                        <div className={cls.type}>{vehicle.type.name}</div>
                        <div className={cls.nation}>{vehicle.nation.name}</div>
                        <div className={cls.level}>{vehicle.level}</div>
                        <div className={cls.description}>{vehicle.description}</div>

                    </div>
                )
            )}

        </div>
    );
});