import {ChangeEvent, memo, ReactNode, SelectHTMLAttributes} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";

interface FilterShipProps extends SelectHTMLAttributes<HTMLSelectElement>{
    className?: string
    children?: ReactNode
    dataSelect: string[]
    valueActive?:string
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}


export const FilterShip = memo((props: FilterShipProps) => {
    const {
        className,
        children,
        dataSelect,
        onChange,
        valueActive,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
            <select
                defaultValue={valueActive}
                onChange={onChange}
                className="form-select form-select-sm mb-2 mx-auto w-25" aria-label="Default select example">
                <option>{valueActive}</option>
                {dataSelect && dataSelect.map((item: string, index: number) => (
                    <option key={index}>{item}</option>
                ))}
            </select>
    );
});