import {MutableRefObject, useEffect, useRef, useState} from "react";
import {Vehicle} from "entity/Vehicle";
import {useWindowWidth} from "../useWindowWidth/useWindowWidth";

export interface UseInfiniteScrollProps {
    triggerRef: MutableRefObject<HTMLElement>;
    rowHeight: number
    marginRow: number
    widthElement: number
    data: Vehicle[]

}

export function useInfiniteScroll({triggerRef, rowHeight, marginRow, widthElement, data}: UseInfiniteScrollProps) {

    const widthWindow = useWindowWidth()
    const capacityWindow = Math.floor(widthWindow / (widthElement + (marginRow * 2)))
    const visibleRow = Math.floor(window.innerHeight / (rowHeight + marginRow) + 1)
    const [startSlice, setStartSlice] = useState(0)
    const [dataScroll, setDataScroll] = useState(Object.entries(splitArrayIntoRows(data, capacityWindow)))


    const rowBottomHeight = () => {
        if (dataScroll && dataScroll.length) {
            const row = (rowHeight + marginRow)
            let interval = dataScroll.length - (startSlice + visibleRow)
            let result = row * interval

            if (result < 0) {
                return 0
            } else {
                return result
            }
        }
    }
    const rowTopHeight = () => {
        return (rowHeight + marginRow) * startSlice
    }
    const wrapperHeight = () => {
        return rowHeight * visibleRow - 90
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
        const newCapacityWindow = Math.floor(widthWindow / (widthElement + (marginRow * 2)));
        setDataScroll(Object.entries(splitArrayIntoRows(data, newCapacityWindow)));
    }, [data, widthWindow, widthElement, marginRow]);


    useEffect(() => {
        function onScroll(e: any) {

            setStartSlice(
                Math.floor(e.target.scrollTop / (rowHeight + marginRow))
            )
        }

        triggerRef.current && triggerRef.current.addEventListener('scroll', onScroll);

        return () => {
            triggerRef.current && triggerRef.current.removeEventListener('scroll', onScroll);
        }
    }, [data, dataScroll && dataScroll.length, visibleRow, rowHeight]);


    return {
        rowTopHeight,
        rowBottomHeight,
        wrapperHeight,
        startSlice,
        marginRow,
        visibleRow,
        rowHeight,
        widthElement,
        dataScroll
    }
}

