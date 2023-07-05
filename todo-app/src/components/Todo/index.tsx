import { Row, Tag, Checkbox, Button, DatePicker, Modal, Input, Select, Col } from 'antd';
import { ITodoList } from '../../interfaces/todoList';
import { AiOutlineDelete, AiOutlineHourglass, AiOutlineArrowRight } from 'react-icons/ai'
import { useState } from 'react';
import moment, { Moment } from 'moment';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { editTodoDateList, updateTodoDateList } from '../redux/todo.slice';
import { FcCancel } from 'react-icons/fc'
import { BiMessageSquareAdd } from 'react-icons/bi';

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
  handleUpdate: (id: number) => void,
}

const Todo = ({ item, handleRemove, handleEdit, handleEditDate, handleUpdate }: todoProps) => {

  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()

  const editTodo = useSelector((state: RootState) => state.todo.dataOneDate)
  const update = useSelector((state: RootState) => state.todo.dataUpdate)



  const handleStartDateChange = (date: Moment | any) => {
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

  const [dataIpnut, setDataInput] = useState<string>()
  const [startDataDate, setstartDataDate] = useState<string>()
  const [dueDataDate, setdueDataDate] = useState<string>()
  const [selectValue, setselectValue] = useState<string>()


  const onHandleInput = (event: any) => {
    if (event.target.value == "") {
      setDataInput(update?.name);
    } else {
      setDataInput(event.target.value);
    }
  }


  const handleStartUpdate = (date: Moment | any) => {
    setstartDataDate(date?.toDate())
  };

  const handleDueUpdate = (date: Moment | any) => {
    setdueDataDate(date?.toDate())
  };

  const onHandlselectUpdate = (value: string) => {
    setselectValue(value)
  }

  const onhandleSubmitUpdate = () => {
    if (update) {
      const newData = {
        id: update?.id,
        name: dataIpnut ? dataIpnut : update?.name,
        prioriry: selectValue ? selectValue : update?.prioriry,
        startDate: startDataDate ? startDataDate : update?.startDate,
        dueDate: dueDataDate ? dueDataDate : update?.dueDate,
        statusDate: update?.statusDate
      }
      dispatch(updateTodoDateList(newData))
    }
    setOpen(false)
  }


  return <>

    {!item.completed && <>
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
          {!item.completed && (
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
        <Col span={6} >
          <Tag color={priorityColorMapping[item.prioriry]} style={{ width: 80, textAlign: 'center' }}>
            {item.prioriry}
          </Tag>
          <Button onClick={() => { setOpen(true), handleUpdate(item.id!) }} className='mr-2'>
            Update
          </Button>
          <Modal
            title="Update"
            centered
            open={open}
            onOk={() => onhandleSubmitUpdate()}
            onCancel={() => setOpen(false)}
            width={1000}
          >
            {update && <>
              <Input.Group style={{ display: 'flex', justifyContent: 'space-evenly', textAlign: "start" }} compact>
                <Input style={{ width: 200, borderRadius: 20, marginRight: - 100 }} value={dataIpnut || update.name} onChange={onHandleInput} />
                <p className='ml-[70px] mt-[-30px]'>{moment(update.startDate).format('DD/MM/YYYY')}</p>
                <DatePicker className='ml-[-150px]' onChange={handleStartUpdate} style={{ marginLeft: 10, marginRight: -100 }} placeholder='Start Date' onClick={() => handleEditDate(item.id!)} />
                <p className='ml-[70px] mt-[-30px]'>{moment(update.dueDate).format('DD/MM/YYYY')}</p>
                <DatePicker onChange={handleDueUpdate} placeholder='Due Date' style={{ marginLeft: 10, marginRight: -100 }} onClick={() => handleEditDate(item.id!)} />
                <Select defaultValue="Medium" value={selectValue || update.prioriry} className='ml-130px' onChange={onHandlselectUpdate}>
                  <Select.Option value='High' label='High'>
                    <Tag color='red'>High</Tag>
                  </Select.Option>
                  <Select.Option value='Medium' label='Medium'>
                    <Tag color='blue'>Medium</Tag>
                  </Select.Option>
                  <Select.Option value='Low' label='Low'>
                    <Tag color='gray'>Low</Tag>
                  </Select.Option>
                </Select>
              </Input.Group>
            </>}
          </Modal>
          <Button type='dashed' icon={<AiOutlineDelete className="text-xl" />} onClick={() => handleRemove(item.id!)} />
        </Col>
      </Row >
    </>
    }
  </>

}
export default Todo
