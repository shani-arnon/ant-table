import { createSlice } from "@reduxjs/toolkit";
import { SliceState } from "../utils/types";


const initialState: SliceState = { 
  data: [],
  filteredData: [],
  columns: [],
  query: '', 
  loading: false,
  editingKey: '', 
  fields: {
    name: '',
  }, 
};

export const slice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },
    setFilteredData: (state, { payload }) => {
      state.filteredData = payload;
    },
    setColumns: (state, { payload }) => {
      state.columns = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    deleteRow: (state, { payload }) => {
      state.data = state.data.filter(row => row.key !== payload.key);
    },
    setQuery: (state, { payload }) => {
      state.query = payload;
    },
    setEditingKey: (state, { payload }) => {
      state.editingKey = payload;
    },
    setFieldsValue: (state, { payload }) => {
      state.fields = payload;
    },
  },
});

export const { 
  setQuery, 
  setColumns, 
  setLoading,
  setEditingKey, 
  setData,
  setFilteredData,
  deleteRow, 
  setFieldsValue 
} = slice.actions;

export default slice.reducer;