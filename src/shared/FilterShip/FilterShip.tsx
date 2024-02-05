import {ChangeEvent, memo, ReactNode, SelectHTMLAttributes} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";

interface FilterShipProps extends SelectHTMLAttributes<HTMLSelectElement>{
    className?: string
    children?: ReactNode
    dataSelect: string[]
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}


export const FilterShip = memo((props: FilterShipProps) => {
    const {
        className,
        children,
        dataSelect,
        onChange,
        ...otherProps
    } = props

    const mods: Mods = {};

    return (
            <select
                value={dataSelect}
                onChange={onChange}
                className="form-select form-select-sm" aria-label=".form-select-sm example">
                <option>Select</option>
                {dataSelect && dataSelect.map((item: string, index: number) => (
                    <option key={index}>{item}</option>
                ))}
            </select>
    );
});