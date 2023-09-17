import { Avatar, Badge } from "antd"
import { faker } from '@faker-js/faker'
import format from 'date-fns/format'
import { DataType, TTableColumn } from "./types"
import { STag } from "./styles";
import { DATE_FORMAT, STATUSES, TAGS } from "./consts"
import RowActions from "../components/RowActions"

export const TABLE_DATA = Array.from(Array(100).keys()).map((_, idx) => ({
    key: String(++idx),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    age: faker.number.int({ min: 18, max: 65 }),
    address: faker.location.streetAddress(false),
    tags: faker.helpers.arrayElements(TAGS, { min: 1, max: 4 }),
    date: faker.date.anytime(),
    state: faker.helpers.arrayElement(STATUSES),
}))

const renderTags = (tags: string[]) => {
    return tags.map((tag: string) => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') color = 'volcano';
        if (tag === 'artist') color = 'orange';
        return (
            <STag color={color} key={tag}>
                {tag.toUpperCase()}
            </STag>
        );
    })
}

const getNameFilterOptions = (data: { name: string }[]) => data.map((d: { name: string }) => ({ text: d.name, value: d.name, key: d.name }))
const handleNameFilter = (value: string, record: DataType) => record.name.startsWith(value)

const getAddressFilterOptions = (data: { address: string }[]) => data.map((d: { address: string }) => ({ text: d.address, value: d.address }))
const handleAddressFilter = (value: string, address: string) => address === value

const getStatusFilterOptions = () => STATUSES.map((d) => ({ text: d, value: d }))
const handleStatusFilter = (value: string, record: string) => record.includes(value)


export const tableColumns = (data: any[]): TTableColumn[] => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterMode: 'tree',
        width: 150,
        ellipsis: true,
        editable: true,
        filters: getNameFilterOptions(data),
        render: (_: Event, { name, avatar }: { name: string, avatar: string }) => <><Avatar src={avatar} gap={6} /> {name}</>,
        onFilter: (value: string, record: DataType): boolean => handleNameFilter(value, record),
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 100,
        ellipsis: true,
        sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filterMode: 'tree',
        width: 150,
        ellipsis: true,
        filters: getAddressFilterOptions(data),
        onFilter: (value: string, { address }) => handleAddressFilter(value, address),
        sorter: (a: { address: string }, b: { address: string }) => a.address.localeCompare(b.address),
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        width: 150,
        ellipsis: true,
        render: (_: any, { tags }: { tags: string[] }) => renderTags(tags),
    },
    {
        title: 'Status',
        key: 'state',
        dataIndex: 'state',
        width: 100,
        ellipsis: true,
        filters: getStatusFilterOptions(),
        onFilter: (value: string, { state }: { state: string }) => handleStatusFilter(value, state),
        render: (_: any, { state }: { state: string }) => <Badge status={state === 'Finished' ? 'success' : 'warning'} text={state} />,
    },
    {
        title: 'Date',
        key: 'date',
        dataIndex: 'date',
        width: 100,
        ellipsis: true,
        sorter: (a: { date: number; }, b: { date: number }) => a.date - b.date,
        render: (_: any, { date }: { date: Date }) => format(date, DATE_FORMAT),
    },
    {
        title: 'Actions',
        key: 'action',
        render: (_: any, record: any) => <RowActions record={record} />
    },
]

export const parseStoredColumns = (parsedStoredColumns: TTableColumn[], tableColumns: TTableColumn[]) => {
    return parsedStoredColumns?.map((column) => {
        const col = tableColumns.find((c: TTableColumn) => c.key === column.key)
        return {
            ...column,
            ...(col?.render && ({ render: col.render })),
            ...(col?.sorter && ({ sorter: col.sorter })),
            ...(col?.onFilter && ({ onFilter: col.onFilter })),
        }
    })
}
