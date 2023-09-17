import Button from 'antd/es/button';
import Item from 'antd/es/descriptions/Item';
import PopConfirm from 'antd/es/popconfirm';
import { Key } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRow, setData, setEditingKey, setFieldsValue } from '../state/tableSlice'
import { SliceState } from '../utils/types';


const RowActions = ({ record }: { record: Partial<typeof Item> & { key: Key } }) => {
  const editingKey = useSelector((state: { table: SliceState }) => state.table.editingKey);
  const data = useSelector((state: { table: SliceState }) => state.table.data);
  const nameField = useSelector((state: { table: SliceState }) => state.table.fields?.name);
  const dispatch = useDispatch();

  const isEditing = ({ key }: { key: Key }) => key === editingKey;

  const edit = (record: Partial<typeof Item> & { key: Key }) => {
    dispatch(setFieldsValue({ name: '' }));
    dispatch(setEditingKey(record.key as string));
  };

  const cancel = () => dispatch(setEditingKey(''));

  const remove = (key: Key) => dispatch(deleteRow(key));

  const save = async (key: Key) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index === -1) return;
        const item = newData[index];
        const newItem = {
          ...item,
          name: nameField,
        }
        newData.splice(index, 1, {
          ...item,
          ...newItem,
        });
        dispatch(setData(newData));
    } catch (err) {
      console.log('Validate Failed:', err);
    } finally {
      dispatch(setFieldsValue({ name: '' }));
      dispatch(setEditingKey(''));
    }
  };

  const editable = isEditing(record);

  return editable ? (
    <>
      <a onClick={() => save(record.key)} style={{ margin: 12 }}>
        Save
      </a>
      <PopConfirm title="Sure to cancel?" onConfirm={cancel}>
        <a>Cancel</a>
      </PopConfirm>
    </>
  ) : (
    <>
      <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>
        Edit
      </Button>
      <PopConfirm title="Sure to cancel?" onConfirm={() => remove(record as unknown as Key)}>
        <a>Delete</a>
      </PopConfirm>
    </>
  );
};
export default RowActions;