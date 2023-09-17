import { useDispatch } from "react-redux"
import AgoraDataTable from "./components/AgoraDataTable"
import { tableColumns } from "./utils/helper"
import { useEffect } from "react"
import { setColumns, setData, setLoading } from "./state/tableSlice"
import Page from "./components/Page"
import SearchFilter from "./components/SearchFilter"
import { getTableData } from "./services/tableService"

function App() {
  const dispatch = useDispatch()


  const getData = async () => {
    dispatch(setLoading(true))
    try {
      const data = await getTableData();
      if (data) {
        dispatch(setData(data));
        dispatch(setColumns(tableColumns(data)));
      }
    } catch (e) {
      console.error(e)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Page
      title="antd table"
      filterComponent={<SearchFilter />}
      component={<AgoraDataTable />}
    />
  )
}

export default App
