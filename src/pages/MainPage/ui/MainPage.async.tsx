import {FC, lazy, Suspense} from "react";
export const MainPageAsync = lazy<FC>(()=> import("./MainPage"))

export const DetailsMainComponent = () =>(
    <Suspense>
        <MainPageAsync/>
    </Suspense>
)