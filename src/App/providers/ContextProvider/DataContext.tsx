import {createContext, useContext} from "react"
import {Vehicle} from "../../../entity/Vehicle";
interface Datasort {
    vehicles: Vehicle[]
}

export type DataContent = {
    dataSort: Vehicle[]
    setDataSort: (c: Vehicle[]) => void
}
export const DataContent = createContext<DataContent>({

    dataSort: [], // set a default value
    setDataSort: () => {
    },
})
export const useDataContext = () => useContext(DataContent)