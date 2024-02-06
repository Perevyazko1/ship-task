import {memo, ReactNode} from 'react';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./Loader.module.scss"

interface LoaderProps {
    className?: string
    children?: ReactNode
}


export const Loader = memo((props: LoaderProps) => {
    const {
        className,
        children,
        ...otherProps
    } = props

    const mods: Mods = {

    };

    return (
        <div className={cls.loaderWrapper}>
            <div
                className={classNames(cls.Loader, mods, [className])}
                {...otherProps}
            >
                <div className={cls.Wrapper}>
                    <div className={cls.circle}></div>
                    <div className={cls.circle}></div>
                    <div className={cls.circle}></div>
                    <div className={cls.shadow}></div>
                    <div className={cls.shadow}></div>
                    <div className={cls.shadow}></div>
                </div>
            </div>

        </div>
    );
});