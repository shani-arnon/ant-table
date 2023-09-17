import { useEffect, useRef } from 'react'
import { Input, InputRef } from 'antd'
import { EditableCellProps, SliceState } from '../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { setFieldsValue } from '../state/tableSlice'

const EditableCell = ({
  dataIndex,
  record,
  children,
  ...restProps
}: EditableCellProps): JSX.Element => {
  const dispatch = useDispatch()
  const inputRef = useRef<InputRef>(null)

  const editingKey = useSelector((state: { table: SliceState }) => state.table.editingKey)
  // @ts-ignore
  const isEditMode = (editingKey === record?.key) && dataIndex === 'name'
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current])
  const handleOnChange = (e: { target: { value: string; } }) => {
    const data = e.target.value.trim()
    dispatch(setFieldsValue({ name: data }))
  };

  return (
    <td {...restProps}>
      {isEditMode ? (
        <Input
          ref={inputRef}
          allowClear
          onChange={handleOnChange}
        />
      ) : (children)}
    </td>
  )
};
export default EditableCell


