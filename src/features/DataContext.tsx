import {createContext, useContext} from "react"

export type DataContent = {
    dataSort?: []
    setDataSort: (c: []) => void
}
export const DataContent = createContext<DataContent>({

    dataSort: [], // set a default value
    setDataSort: () => {
    },
})
export const useDataContext = () => useContext(DataContent)