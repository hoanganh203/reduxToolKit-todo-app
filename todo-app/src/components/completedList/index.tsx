import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../completed/index';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { Fragment, useEffect, useState } from 'react';
import { addTodoList, editTodoList, getTodoList, removeTodoList, startEdit, startEditDate } from '../redux/todo.slice';
import Loading from '../../loading/loading';


const CompletedList = () => {
    // lấy dữ liệu ra dữ liệu trùng với search
    const todoList = useSelector((state: RootState) => {
        const todoRemaining = state.todo.todoList.filter((todo) => {
            if (state.todo.status === "All") {
                return state.todo.priority.length ? todo.name.includes(state.todo.search) && todo.prioriry.includes(state.todo.priority) : todo.name.includes(state.todo.search);
            } return (todo.name.includes(state.todo.search) && (state.todo.status === "Completed" ? todo.completed : !todo.completed) && (state.todo.priority.length ? todo.prioriry.includes(state.todo.priority) : true))
        })
        return todoRemaining
    })
    // useState lưu dữ liệu dể lưu vào Formdata
    const [todoName, setTodoName] = useState<string>('')
    const [todoPrioriry, setTodorioriry] = useState<string>('Medium')

    // khai báo dispatch để truyền lên redux
    const dispatch = useAppDispatch()

    // bắt dự kiện submit
    // Xóa item
    const handleRemove = (id: number) => {
        dispatch(removeTodoList(id))
    }

    // lấy trạng thái loading
    const loading = useSelector((state: RootState) => state.todo.loading)

    // Lấy data đưa vào DATAONE
    const handleEdit = (id: number) => {
        dispatch(startEdit(id))
    }
    // lấy dữ liệu DataOne
    const editTodo = useSelector((state: RootState) => state.todo.dataOne)

    // Khi dữ liệu DataOne !== null thì useEffect sẽ chạy
    useEffect(() => {
        if (editTodo) {  //Điều kiện editTodo phải có dữ liệu mới chạy dispatch
            const newData = {
                id: editTodo.id,
                name: editTodo.name,
                prioriry: editTodo.prioriry,
                completed: !editTodo.completed,
                startDate: editTodo.startDate,
                dueDate: editTodo.dueDate,
                statusDate: true
            }
            dispatch(editTodoList(newData)) // dispatch sẽ gửi đến slice để xử lý API
        }
    }, [editTodo])

    const handleEditDate = (id: number) => {
        dispatch(startEditDate(id))
    }

    // Lấy danh dữ liệu
    useEffect(() => {
        dispatch(getTodoList())
    }, [dispatch])



    return (
        <Row style={{ height: 'calc(100% - 40px)' }}>
            <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
                {loading && (
                    <Fragment>
                        <Loading />
                    </Fragment>
                )}
                {!loading && todoList?.map((item) => (
                    <Todo item={item} key={item.id} handleRemove={handleRemove} handleEdit={handleEdit} handleEditDate={handleEditDate} />
                ))}
            </Col>
        </Row >
    );
}

export default CompletedList