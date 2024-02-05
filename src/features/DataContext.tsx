import { createContext, useContext } from "react"
export type DataContent = {
  dataSort: any
  setDataSort:(c: any) => void
}
export const DataContent = createContext<DataContent>({
dataSort: [], // set a default value
setDataSort: () => {},
})
export const useDataContext = () => useContext(DataContent)