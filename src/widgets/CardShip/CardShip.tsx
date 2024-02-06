import {memo, ReactNode, useEffect, useState} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import {gql, useQuery} from "@apollo/client";
import {GET_VEHICLES} from "../../shared/api/GET_VEHICLES";
import {useDataContext} from "../../features/DataContext";
import cls from "./CardShip.module.scss"
import {Vehicle} from "../../entity/Vehicle";

interface CardShipProps {
    className?: string
    children?: ReactNode
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
        }

    }, [data]);


    return (
        <div
            className={classNames(cls.CardShip, {}, [className])}
            {...otherProps}
        >
            {dataSort && dataSort.slice(0,20).map((vehicle: Vehicle, index:number) => (
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