import { ITodoList } from "../interfaces/todoList";
import http from "./http";


export const getAllTodos = () => {
    return http.get<ITodoList[]>(`/todos`)
}

export const getOneTodo = (id: number) => {
    return http.get<ITodoList>(`/todos/${id}`)
}

export const addTodo = (body: ITodoList) => {
    return http.post<ITodoList>(`/todos`, body)
}

export const removeTodo = (id: number) => {
    return http.delete<ITodoList>(`/todos/${id}`,)
}

export const editTodo = (todo: ITodoList) => {
    return http.put<ITodoList>(`/todos/${todo.id}`, todo)
}