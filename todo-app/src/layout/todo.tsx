import Filters from "../components/Filters"
import { Divider, Typography } from "antd"
import TodoList from "../components/TodoList"
import CompletedList from "../components/completedList";
const { Title } = Typography;


const Todolayout = () => {
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
            }}
        >
            <Title style={{ textAlign: 'center' }}>TODO APP with REDUX TOOLKIT</Title>
            <Filters />
            <Divider />
            <CompletedList />
            <TodoList />
        </div>
    )
}

export default Todolayout