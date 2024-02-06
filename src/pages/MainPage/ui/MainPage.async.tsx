import {FC, lazy, Suspense} from "react";
import {Loader} from "../../../shared/ui/Loader/Loader";
export const MainPageAsync = lazy<FC>(()=> import("./MainPage"))

export const DetailsMainComponent = () =>(
    <Suspense fallback={<Loader/>}>
        <MainPageAsync/>
    </Suspense>
)