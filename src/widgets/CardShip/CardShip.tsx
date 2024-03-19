import {memo, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import {useQuery} from "@apollo/client";
import {GET_VEHICLES} from "shared/api/GET_VEHICLES";
import {useDataContext} from "App/providers/ContextProvider/DataContext";
import cls from "./CardShip.module.scss"
import {Vehicle} from "entity/Vehicle";
import {useInfiniteScroll} from "shared/hooks/useInfinityScroll/useInfinityScroll";

interface CardShipProps {
    className?: string
    children?: ReactNode
}


export const CardShip = memo((props: CardShipProps) => {
    const {loading, error, data} = useQuery(GET_VEHICLES);
    const {dataSort, setDataSort} = useDataContext()
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        if (data?.vehicles) {
            setDataSort(data.vehicles)
        }
    }, [data]);

    const {
        rowTopHeight,
        rowBottomHeight,
        wrapperHeight,
        startSlice,
        marginRow,
        visibleRow,
        rowHeight,
        widthElement,
        dataScroll
    } = useInfiniteScroll(
        {
            triggerRef,
            rowHeight: 330,
            marginRow: 30,
            widthElement: 440,
            data: dataSort
        }
        )


    const {
        className,
        children,
        ...otherProps
    } = props



    return (
        <div
            className={classNames("", {}, [className])}
            style={{
                height: wrapperHeight() , overflow: 'auto', justifyContent: "center",
                display: "flex"
            }}
            ref={triggerRef}
            {...otherProps}
        >
            <div className={cls.CardShip}>
                <div
                    style={{height: rowTopHeight(), marginTop: marginRow}}/>
                {dataScroll && dataScroll.slice(startSlice, startSlice + visibleRow).map((row: any, index: number) => (
                        <div key={startSlice + index}
                             style={{display: "flex", height: rowHeight, marginTop: marginRow}}
                        >
                            {row[1].map((vehicle: Vehicle, index: number) => (
                                <div className={cls.cardWrapper}
                                     key={index + ""}
                                     style={{width: widthElement, marginRight: marginRow, marginLeft: marginRow}}
                                >
                                    <div className={cls.title}>{vehicle.title}</div>
                                    <img className={cls.flag} src={`https:${vehicle.nation.icons.large}`}/>
                                    <img className={cls.ship} src={`https:${vehicle.icons.medium}`}/>
                                    <div className={cls.type}>{vehicle.type.name}</div>
                                    <div className={cls.nation}>{vehicle.nation.name}</div>
                                    <div className={cls.level}>{vehicle.level}</div>
                                    <div className={cls.description}>{vehicle.description}</div>
                                </div>

                            ))}
                        </div>
                    )
                )}
                <div style={{height: rowBottomHeight()}}/>

            </div>
        </div>
    );
});