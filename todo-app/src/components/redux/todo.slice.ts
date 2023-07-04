import { createReducer, createAction, createSlice, PayloadAction, current, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit'
import { ITodoList } from '../../interfaces/todoList'
import { addTodo, editTodo, getAllTodos, getOneTodo, removeTodo } from '../../api/todoApi'
import { notification, notificationError } from '../../notification'

// Khai báo các sự kiện chạy của Redux AsyncThunk

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

// Tạo 1 kiểu dữ liệu cho kho chung
interface TodoState {
    todoList: ITodoList[]
    search: string,
    status: string,
    priority: string,
    loading: boolean,
    dataOne: ITodoList | null
}

// Tạo ra 1 kho chung
const initialState: TodoState = {
    todoList: [],
    search: "",
    status: "All",
    priority: "",
    loading: false,
    dataOne: null
}

// Mình bắt đầu làm việc với API bằng createAsyncThunk

// Hàm lấy dữ liệu All
export const getTodoList = createAsyncThunk(
    'todo/getTodoList',
    async () => {
        const reponse = await getAllTodos()
        return reponse.data
    }
)
// Hàm để để add
export const addTodoList = createAsyncThunk(
    'todo/addTodoList',
    async (body: Omit<ITodoList, 'id'>) => {
        const reponse = await addTodo(body)
        return reponse.data
    }
)
// Hàm xóa
export const removeTodoList = createAsyncThunk(
    'todo/removeTodoList',
    async (id: number) => {
        const reponse = await removeTodo(id)
        return reponse.data
    }
)
// Hàm sửa
export const editTodoList = createAsyncThunk(
    'todo/editTodoList',
    async (todo: ITodoList) => {
        const reponse = await editTodo(todo)
        return reponse.data
    }
)

//  Ở đây mình bắt đầu làm việc với createSlice để để làm việc với các action ở trên

const todoSlice = createSlice({
    name: 'todo', // định danh tên action
    initialState, // Kho chung
    reducers: {  //reducers chứa những action không làm việc với API hoặc Bất đồng bộ
        // SeachTodo để lấy ra đoạn text của người dùng rồi set vào kho
        searchTodo: (state, action: PayloadAction<string>) => {
            const text = action.payload
            state.search = text
        },
        // checkTodo để lấy ra trạng thái set tiếp vào kho
        checkTodo: (state, action: PayloadAction<string>) => {
            const status = action.payload
            state.status = status
        },
        //checkPriorityTodo dể lấy ra dữ liệu set tiếp vào kho
        checkPriorityTodo: (state, action: PayloadAction<string>) => {
            const priorit = action.payload
            state.priority = priorit
        },
        // StartEdit Lấy ra data theo id mà UI gửi , và set và dataOne Để lấy ra 1 oject để cập nhật
        startEdit: (state, action) => {
            const postId = action.payload
            const foundTodo = state.todoList.find(todo => todo.id === postId) || null
            state.dataOne = foundTodo
        }
    },
    // extraReducers bắt đàu làm việc với API và xử lý bất đồng bộ
    extraReducers(builder) {
        builder.addCase(getTodoList.fulfilled, (state, action) => { // trong addCase minhg sẽ nhập vào 1 API , 
            state.todoList = action.payload
        }).addCase(addTodoList.fulfilled, (state, action) => {
            state.todoList.push(action.payload)//Ở đây sẽ lấy 1 oject được gửi từ UI lên thông qua dispatch đến action.payload sau đó dùng Push để kho TodoList
            notification() //Thông báo
        }).addCase(removeTodoList.fulfilled, (state, action) => {
            const todoId = action.meta.arg // ở đây sẽ trả về cho chúng ta 1 í từ UI
            state.todoList = state.todoList.filter(todo => todo.id !== todoId) //sau đó trả vể 1 mảng không bao gồm phaanf từ todoId
            notification()
        }).addCase(editTodoList.fulfilled, (state, action) => {
            const postId = action.payload.id //EDit ta sẽ nhận 1 id của mảng todoList
            state.todoList.some((todo, index) => { //sau đó dùng SOME || FIND để tìm phần từ trong mảng
                if (todo.id === postId) { //kiếm tra trùng nhau hay không
                    if (todo.completed === false) {
                        notification()
                    } else {
                        notificationError()
                    }
                    state.todoList[index] = action.payload //nếu trùng nhau thì sẽ update đúng phần tử index
                    return true // return true để thoát vòng lặp
                }
                return false // return false để tiếp tực vòng lặp nếu không tìm ra
            })
        }).addMatcher<PendingAction>( //lấy ra các trang thái bắt đầu hay kết thúc của action
            (action) => action.type.endsWith('/pending'),
            (state, action) => {
                state.loading = true
            }
        ).addMatcher<RejectedAction>(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                state.loading = false
            }
        ).addMatcher<FulfilledAction>(
            (action) => action.type.endsWith('/fulfilled'),
            (state, action) => {
                state.loading = false
            }
        )
    }

})
export const { checkPriorityTodo, checkTodo, searchTodo, startEdit } = todoSlice.actions
const todoReducer = todoSlice.reducer
export default todoReducer


//-------------Reducer---------------------

// export const addTodo = createAction<ITodoList>('todo/addTodo')
// export const removeTodo = createAction<number>('todo/removeTodo')
// export const searchTodo = createAction<string>('todo/sreach')
// export const checkTodo = createAction<string>('todo/checkTodo')
// export const checkPriorityTodo = createAction<string>('todo/checkPriorityTodo')
// const todoReducer = createReducer(initalState, (builder) => {
//     builder.addCase(addTodo, (state, action) => {
//         const todo = action.payload
//         state.todoList.push(todo)
//     }).addCase(removeTodo, (state, action) => {
//         const todoId = action.payload
//         const todoData = state.todoList.findIndex(todo => todo.id === todoId)
//         if (todoData !== -1) {
//             state.todoList.splice(todoData, 1)
//         }
//     }).addCase(searchTodo, (state, action) => {
//         const text = action.payload
//         state.search = text
//     }).addCase(checkTodo, (state, action) => {
//         const status = action.payload
//         state.status = status
//     }).addCase(checkPriorityTodo, (state, action) => {
//         const priorit = action.payload
//         state.priority = priorit
//         console.log(state.priority);

//     })

// })
// export default todoReducer

