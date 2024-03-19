import {memo, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import {useQuery} from "@apollo/client";
import {GET_VEHICLES} from "shared/api/GET_VEHICLES";
import {useDataContext} from "features/DataContext";
import cls from "./CardShip.module.scss"
import {Vehicle} from "entity/Vehicle";
import {useWindowWidth} from "shared/hooks/useWindowWidth/useWindowWidth";
import {useInfiniteScroll} from "../../shared/hooks/useInfinityScroll/useInfinityScroll";

interface CardShipProps {
    className?: string
    children?: ReactNode
}


export const CardShip = memo((props: CardShipProps) => {
    // const widthWindow = useWindowWidth()
    // const rowShips = 330
    // const margin = 30
    // const widthCard = 440
    // const capacityWindow = Math.floor(widthWindow / (widthCard + (margin * 2)))
    // const visibleRowShips = Math.floor(window.innerHeight / (rowShips + margin) +1 )


    const {loading, error, data} = useQuery(GET_VEHICLES);
    const {dataSort, setDataSort} = useDataContext()
    // const [startSlice, setStartSlice] = useState(0)
    // const [heightTransparentDiv, setHeightTransparentDiv] = useState(0)
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>


    // const getBottomHeight = () => {
    //     if (dataSort && dataSort.length) {
    //         let result = (rowShips + margin) * (Object.entries(splitArrayIntoRows(dataSort, capacityWindow)).length  - (startSlice + visibleRowShips))
    //         if(result < 0){
    //             return 0
    //         }else {
    //             return result
    //         }
    //
    //
    //     }
    // }
    // const getTopHeight = () => {
    //     return (rowShips + margin) * startSlice
    // }

    // function splitArrayIntoRows(ids: any[], rowWidth: number): { [key: string]: any[] } {
    //     const result: { [key: string]: any[] } = {};
    //     let currentRow = 1;
    //     if (ids) {
    //         for (let i = 0; i < ids.length; i += rowWidth) {
    //             const rowKey = currentRow;
    //             result[rowKey] = ids.slice(i, i + rowWidth);
    //             currentRow++;
    //         }
    //
    //     }
    //     return result;
    // }


    // useEffect(() => {
    //     function onScroll(e: any) {
    //
    //         setStartSlice(
    //             Math.floor(e.target.scrollTop / (rowShips + margin))
    //         )
    //         if (Math.floor(e.target.scrollTop / (rowShips + margin)) % 2)
    //             setHeightTransparentDiv(
    //                 Math.floor(e.target.scrollTop / (rowShips + margin))
    //             )
    //     }
    //     rootRef.current && rootRef.current.addEventListener('scroll', onScroll);
    //
    //     return () => {
    //         rootRef.current && rootRef.current.removeEventListener('scroll', onScroll);
    //     }
    // }, [dataSort && dataSort.length,visibleRowShips, rowShips]);


    const {
        className,
        children,
        ...otherProps
    } = props
    useEffect(() => {
        // console.log("data",data)
        if (data?.vehicles) {
            setDataSort(data.vehicles)
        }

    }, [data]);
    useEffect(() => {



    }, [dataSort]);

    const {
        rowTopHeight,
        rowBottomHeight,
        wrapperHeight,
        startSlice,
        marginRow,
        visibleRow,
        rowHeight,
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

    //     useEffect(() => {
    //     console.log("dataScroll",dataScroll)
    // }, [dataScroll]);

    // useEffect(() => {
    //     console.log(data,dataScroll, dataSort)
    // }, [data,dataScroll, dataSort]);

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
                                     style={{width: 440, marginRight: marginRow, marginLeft: marginRow}}
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