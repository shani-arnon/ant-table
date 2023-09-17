import { useEffect, useState } from "react"
import { TTableColumn } from "../utils/types"
import { LOCAL_STORAGE_SETTINGS } from "../utils/consts"
import { parseStoredColumns } from "../utils/helper";

export const useLocalStorageSettings = (tableColumns: TTableColumn[]) => {
    const [storedColumns, setStoredColumns] = useState<TTableColumn[]>([])

    useEffect(() => {
        const parsedStoredColumns = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SETTINGS) as string)
        if (parsedStoredColumns?.length > 0) {
            const cols = parseStoredColumns(parsedStoredColumns, tableColumns)
           setStoredColumns(cols) 
           return
        } 
        setStoredColumns(tableColumns)
    }, [tableColumns])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(storedColumns))
    }, [storedColumns])

    const handleResize = (index: number) => (_: Event, { size }: 
        { size: 
            { width: number } 
        }) => {
        setStoredColumns((prevColumns) => {
            const newColumns = [...prevColumns]
            newColumns[index] = { ...newColumns[index], width: size.width }
            return newColumns;
        });
    };

    return [storedColumns, setStoredColumns, handleResize]
};