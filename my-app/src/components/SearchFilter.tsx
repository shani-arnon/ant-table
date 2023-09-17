import { SButton, SInput, SearchBox } from "../utils/styles"
import { useDispatch, useSelector } from "react-redux"
import { setFilteredData, setQuery } from '../state/tableSlice'
import { SliceState } from "../utils/types"
import { useEffect, useRef } from "react"

const SearchFilter = (): JSX.Element => {
    const data = useSelector((state: { table: SliceState }) => state.table.data)
    const query = useSelector((state: { table: SliceState }) => state.table.query)
    const searchRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus()
        }
    }, [])

    useEffect(() => {
        if (!query) {
            dispatch(setFilteredData(data))
        }
    }, [query])

    const handleClear = () => {
        dispatch(setQuery(''))
        dispatch(setFilteredData(data))
        if (searchRef.current) searchRef.current.value = ''
    }

    const handleSearch = (e: { target: { value: string } }) => {
        const searchText = e.target.value.toLowerCase()
        dispatch(setQuery(searchText))

        const getFilteredData = data.filter((item) => Object.values(item).some((value) =>
            String(value).toLowerCase().startsWith(searchText) 
            || String(value).toLowerCase().includes(searchText)
        ))
        dispatch(setFilteredData(getFilteredData))
    }

    return (
        <SearchBox>
            <SInput
                ref={searchRef}
                placeholder="Search table data..."
                onChange={handleSearch}
            />
            <SButton
                type="primary"
                onClick={handleClear}
                disabled={!query}
            >
                Clear
            </SButton>
        </SearchBox>
    )
}
export default SearchFilter