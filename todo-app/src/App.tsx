import './App.css'
import Filters from './components/Filters'
import { Typography, Divider } from 'antd';
import TodoList from './components/TodoList'


const { Title } = Typography;

function App() {

  return (
    <div
      style={{
        width: 1000,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        boxShadow: '0 0 10px 4px #bfbfbf',
        borderRadius: 5,
        height: '90vh',
      }}
    >
      <Title style={{ textAlign: 'center' }}>TODO APP with REDUX TOOLKIT</Title>
      <Filters />
      <Divider />
      <TodoList />
    </div>
  )
}

export default App
