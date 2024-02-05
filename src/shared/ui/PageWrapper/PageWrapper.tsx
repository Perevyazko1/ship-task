import React, {memo, ReactNode} from 'react';
import cls from "./PageWrapper.module.scss"
import {classNames, Mods} from "../../lib/classNames/classNames";

interface PageWrapperProps {
    className?: string
    children?: ReactNode
}


export const PageWrapper = memo((props: PageWrapperProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div
            className={classNames(cls.PageWrapper, mods, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
});