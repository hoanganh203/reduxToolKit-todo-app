import { Row, Tag, Checkbox, Button, DatePicker, Col } from 'antd';
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

const Completed = ({ item, handleRemove, handleEdit, handleEditDate }: todoProps) => {
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

    return <>
        {item.completed && <>
            <Row
                justify='space-between'
                style={{
                    marginBottom: 3,
                    ...(item.completed ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
                }}
            >
                <Col span={5} className='w-full flex justify-items-end items-center '>
                    <Checkbox checked={item.completed} onClick={() => handleEdit(item.id!)} >
                        {item.name}
                    </Checkbox>
                </Col>
                <Col span={6} className='w-full flex justify-items-end items-center'>
                    {item.completed && (
                        <>
                            {!item.statusDate &&
                                <>
                                    <DatePicker onChange={handleStartDateChange} style={{ marginLeft: 10, marginRight: -100 }} placeholder='Start Date' onClick={() => handleEditDate(item.id!)} />
                                </>
                            }

                            {item.statusDate &&
                                <>
                                    <p>{moment(item.startDate).format('DD/MM/YYYY')}</p>
                                </>
                            }

                            {item.statusDate &&
                                <>
                                    <p style={{ marginLeft: 10, marginRight: 10 }}><AiOutlineArrowRight /></p>
                                </>
                            }

                            {!item.statusDate || !item.dueDate &&
                                <>
                                    <DatePicker onChange={handleDueDateChange} placeholder='Due Date' style={{ marginLeft: 10, marginRight: -100 }} onClick={() => handleEditDate(item.id!)} />
                                </>
                            }

                            {!item.statusDate || item.dueDate &&
                                <>
                                    <p>{moment(item.dueDate).format('DD/MM/YYYY')}</p>
                                </>
                            }
                        </>
                    )
                    }
                </Col>
                <Col span={5} className='flex justify-end mr-10'>
                    <Tag color={priorityColorMapping[item.prioriry]} style={{ width: 80, textAlign: 'center' }}>
                        {item.prioriry}
                    </Tag>
                    <span> <AiOutlineCheck /></span>
                </Col>
            </Row >
        </>}

    </>

}
export default Completed
