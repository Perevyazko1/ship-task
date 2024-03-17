import {memo, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import {useQuery} from "@apollo/client";
import {GET_VEHICLES} from "shared/api/GET_VEHICLES";
import {useDataContext} from "features/DataContext";
import cls from "./CardShip.module.scss"
import {Vehicle} from "entity/Vehicle";

interface CardShipProps {
    className?: string
    children?: ReactNode
}


export const CardShip = memo((props: CardShipProps) => {
    const rowShips = 330
    const margin = 30
    const widthCard = 440

    const {loading, error, data} = useQuery(GET_VEHICLES);
    const {dataSort, setDataSort} = useDataContext()
    const [startSlice, setStartSlice] = useState(0)
    const [heightTransparentDiv, setHeightTransparentDiv] = useState(0)
    const rootRef = useRef() as MutableRefObject<HTMLDivElement>
    const [capacityWindow, setCapacityWindow] = useState(Math.floor(window.innerWidth / (widthCard + (margin * 2))))
    const [visibleShips, setVisibleShips] = useState(Math.floor(window.innerHeight / rowShips) + 7)


    useEffect(() => {
        setCapacityWindow(Math.floor(window.innerWidth / (widthCard + (margin * 2))))
        setVisibleShips(Math.floor(window.innerHeight / rowShips) + 7)
    }, [window.innerWidth,window.innerHeight]);



    const getBottomHeight = () => {
        return (rowShips + margin) * (dataSort && dataSort.length - (startSlice + visibleShips))
    }
    const getTopHeight = () => {
        return (rowShips + margin) * startSlice
    }

    function splitArrayIntoRows(ids: any[], rowWidth: number): { [key: string]: any[] } {
        const result: { [key: string]: any[] } = {};
        let currentRow = 1;
        if (ids) {
            for (let i = 0; i < ids.length; i += rowWidth) {
                const rowKey = currentRow;
                result[rowKey] = ids.slice(i, i + rowWidth);
                currentRow++;
            }

        }

        return result;
    }





    useEffect(() => {
        function onScroll(e: any) {

            setStartSlice(
                Math.floor(e.target.scrollTop / (rowShips + margin))
            )
            if (Math.floor(e.target.scrollTop / (rowShips + margin)) % 2)
                setHeightTransparentDiv(
                    Math.floor(e.target.scrollTop / (rowShips + margin))
                )


        }

        rootRef.current && rootRef.current.addEventListener('scroll', onScroll);

        return () => {
            rootRef.current && rootRef.current.removeEventListener('scroll', onScroll);
        }
    }, [visibleShips, rowShips]);


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
            className={classNames("", {}, [className])}
            style={{height: (rowShips + margin) * visibleShips, overflow: 'auto', justifyContent: "center",
    display: "flex"}}
            ref={rootRef}
            {...otherProps}
        >
            <div className={cls.CardShip}>
                <div
                    style={{height: getTopHeight(), marginTop: margin}}/>
                {Object.entries(splitArrayIntoRows(dataSort, capacityWindow)).slice(startSlice, startSlice + visibleShips).map((row: any, index: number) => (
                        <div key={startSlice + index}
                             style={{display: "flex",height: rowShips, marginTop: margin}}
                        >
                            {row[1].map((vehicle: Vehicle, index:number) => (
                                <div className={cls.cardWrapper}
                                     key={index+""}
                                     style={{width: widthCard, marginRight: margin, marginLeft: margin}}
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
                <div style={{height: getBottomHeight()}}/>

            </div>
        </div>
    );
});