import Item from "antd/es/list/Item"
import { ColumnsType } from "antd/es/table"

export interface DataType {
    key: string
    name: string
    age: number
    date: string
    address: string
    tags: string[]
}

export type SliceState = {
    data: DataType[]
    filteredData: DataType[]
    columns: ColumnsType[]
    query: string
    loading: boolean
    editingKey: string
    fields: {
        name: string
    };
    cellData?: DataType
}

export type TTableColumn = {
    title?: string
    dataIndex?: string
    key?: string
    filterMode?: 'tree'
    width?: number,
    ellipsis?: boolean
    editable?: boolean
    filters?: Record<string, string>[]
    render?: (e: Event, record: any) => JSX.Element | JSX.Element[] | Element[] | string
    onFilter?: (value: string, record: any) => boolean
    sorter?: (a: any, b: any) => number
}
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean
    dataIndex: string
    title: string
    inputType: 'number' | 'text'
    record: typeof Item
    index: number
    children: React.ReactNode
}