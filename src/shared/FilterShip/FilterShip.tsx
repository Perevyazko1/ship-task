import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";

interface FilterShipProps {
    className?: string
    children?: ReactNode
}


export const FilterShip = memo((props: FilterShipProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames('', mods, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});