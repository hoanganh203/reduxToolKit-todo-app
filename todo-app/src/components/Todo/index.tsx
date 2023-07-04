import { Row, Tag, Checkbox, Button, DatePicker } from 'antd';
import { ITodoList } from '../../interfaces/todoList';
import { AiOutlineDelete, AiOutlineCheck, AiOutlineArrowRight } from 'react-icons/ai'
import { useState } from 'react';
import moment, { Moment } from 'moment';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { editTodoDateList } from '../redux/todo.slice';

const priorityColorMapping: any = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

type todoProps = {
  item: ITodoList,
  handleRemove: (id: number) => void,
  handleEdit: (id: number) => void,
  handleEditDate: (id: number) => void,
}

const Todo = ({ item, handleRemove, handleEdit, handleEditDate }: todoProps) => {
  const dispatch = useAppDispatch()

  const [StartDate, setStartDate] = useState<Date | null>(null);
  const [DueDate, setDueDate] = useState<Date | null>(null);

  const editTodo = useSelector((state: RootState) => state.todo.dataOneDate)
  const handleStartDateChange = (date: Moment | any) => {
    setStartDate(date?.toDate() || null);
    if (editTodo) {  //Điều kiện editTodo phải có dữ liệu mới chạy dispatch
      const newData = {
        id: editTodo.id,
        name: editTodo.name,
        prioriry: editTodo.prioriry,
        completed: editTodo.completed,
        startDate: date?.toDate(),
        statusDate: true
      }
      console.log(newData);
      dispatch(editTodoDateList(newData)) // dispatch sẽ gửi đến slice để xử lý API
    }

  };
  const handleDueDateChange = (date: Date | any) => {
    setDueDate(date?.toDate() || null);
    if (editTodo) {  //Điều kiện editTodo phải có dữ liệu mới chạy dispatch
      const newData = {
        id: editTodo.id,
        name: editTodo.name,
        prioriry: editTodo.prioriry,
        completed: editTodo.completed,
        startDate: editTodo.startDate,
        dueDate: date?.toDate(),
        statusDate: true
      }
      dispatch(editTodoDateList(newData)) // dispatch sẽ gửi đến slice để xử lý API
    }
  };
  return (
    <Row
      justify='space-between'
      style={{
        marginBottom: 3,
        ...(item.completed ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
      }}
    >
      <Checkbox checked={item.completed} onClick={() => handleEdit(item.id!)} style={{ width: 50 }}>
        {item.name}
      </Checkbox>

      {!item.completed && (
        <>
          {!item.statusDate &&
            <>
              <DatePicker onChange={handleStartDateChange} style={{ marginLeft: 10, marginRight: -100 }} placeholder='Start Date' onClick={() => handleEditDate(item.id!)} />
            </>
          }

          {item.statusDate &&
            <>
              <p>{item.startDate}</p>
            </>
          }

          {item.statusDate &&
            <>
              <p style={{ marginLeft: -70, marginRight: -70 }}><AiOutlineArrowRight /></p>
            </>
          }

          {!item.statusDate || !item.dueDate &&
            <>
              <DatePicker onChange={handleDueDateChange} placeholder='Due Date' style={{ marginLeft: 10, marginRight: -100 }} onClick={() => handleEditDate(item.id!)} />
            </>
          }

          {item.statusDate &&
            <>
              <p>{item.dueDate}</p>
            </>
          }


        </>
      )
      }
      {item.completed &&
        <>
          {item.statusDate &&
            <>
              <p>{item.startDate}</p>
            </>
          }
          {item.statusDate &&
            <>
              <p style={{ marginLeft: -70, marginRight: -70 }}><AiOutlineArrowRight /></p>
            </>
          }
          {item.statusDate &&
            <>
              <p>{item.dueDate}</p>
            </>
          }
        </>
      }
      <Tag color={priorityColorMapping[item.prioriry]} style={{ width: 80, textAlign: 'center' }}>
        {item.prioriry}
      </Tag>

      <Button type='dashed' icon={<AiOutlineDelete className="text-xl" />} onClick={() => handleRemove(item.id!)} />
    </Row >

  );
}
export default Todo
