import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SRadio } from '../utils/styles';;
import ResizableColumn from './ResizableColumn';
import Table, { TablePaginationConfig } from 'antd/es/table';
import { DataType, SliceState, TTableColumn } from '../utils/types';
import EditableCell from './EditableCell';
import { useLocalStorageSettings } from '../hooks/useLocalStorageSettings';
import { PAGINATION_SETTINGS } from '../utils/consts';


const AgoraDataTable = (): JSX.Element => {
    const data = useSelector((state: { table: SliceState }) => state.table.data)
    const filteredData = useSelector((state: { table: SliceState }) => state.table.filteredData)
    const columns = useSelector((state: { table: SliceState }) => state.table.columns)
    const loading = useSelector((state: { table: SliceState }) => state.table.loading)

    const [storedColumns, _, handleResize] = useLocalStorageSettings(columns as TTableColumn[])

    const [selectionType, setSelectionType] = useState<'checkbox'>('checkbox')
    const [selectedRows, setSelectedRows] = useState<React.Key[]>([])

    const renderColumns = (storedColumns as [])?.map((col: 
        { dataIndex: 
            string; 
            title: string 
        }, i: number) => {
        return {
            ...col,
            onHeaderCell: ({ width }: { width: number }) => ({
                width,
                // @ts-ignore
                onResize: handleResize(i),
            }),
            onCell: (record: DataType) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        }
    })
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log({ selectedRowKeys }, { selectedRows });
            setSelectedRows(selectedRowKeys as React.Key[]);
        }
    }
    const components = {
        header: { cell: ResizableColumn },
        body: { cell: EditableCell },
    }

    return (
        <>
            <SRadio.Group
                onChange={({ target: { value } }) => setSelectionType(value)}
                value={selectionType}
            >
            </SRadio.Group>
            <Table
                rowKey="key"
                dataSource={filteredData.length ? filteredData : data}
                columns={renderColumns as []}
                components={components}
                loading={loading}
                pagination={PAGINATION_SETTINGS as TablePaginationConfig}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
            />
        </>
    );
};

export default AgoraDataTable;
