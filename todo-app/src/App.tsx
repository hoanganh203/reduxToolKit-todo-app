import './App.css'
import { Route, Routes } from 'react-router-dom'
import Todolayout from './layout/todo';
function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Todolayout />}>
          {/* <Route index element={<Home />} /> */}
        </Route>
      </Routes>
    </div>


    // <div
    //   style={{
    //     width: 1000,
    //     margin: '0 auto',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     backgroundColor: 'white',
    //     padding: 20,
    //     boxShadow: '0 0 10px 4px #bfbfbf',
    //     borderRadius: 5,
    //     height: '90vh',
    //   }}
    // >
    //   <Title style={{ textAlign: 'center' }}>TODO APP with REDUX TOOLKIT</Title>
    //   <Filters />
    //   <Divider />
    //   <TodoList />
    // </div>
  )
}

export default App
