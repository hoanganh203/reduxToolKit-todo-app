import { Row, Tag, Checkbox, Button } from 'antd';
import { ITodoList } from '../../interfaces/todoList';
import { AiOutlineDelete } from 'react-icons/ai'

const priorityColorMapping: any = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

type todoProps = {
  item: ITodoList,
  handleRemove: (id: number) => void,
  handleEdit: (id: number) => void,
}

const Todo = ({ item, handleRemove, handleEdit }: todoProps) => {

  return (
    <Row
      justify='space-between'
      style={{
        marginBottom: 3,
        ...(item.completed ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
      }}
    >
      <Checkbox checked={item.completed} onClick={() => handleEdit(item.id!)}>
        {item.name}
      </Checkbox>
      <Tag color={priorityColorMapping[item.prioriry]} style={{ margin: 0 }}>
        {item.prioriry}
      </Tag>
      <Button type='dashed' icon={<AiOutlineDelete className="text-xl" />} onClick={() => handleRemove(item.id!)} />
    </Row>

  );
}
export default Todo
