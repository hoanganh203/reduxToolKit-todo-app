import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todo.slice'
import { useDispatch } from 'react-redux'


export const store = configureStore({
    reducer: { todo: todoReducer }
})

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()  