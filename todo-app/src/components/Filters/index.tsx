import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { checkPriorityTodo, checkTodo, searchTodo } from '../redux/todo.slice';

const { Search } = Input;


export default function Filters() {


  const dispatch = useDispatch()
  const onHandleSearch = (event: any) => {
    dispatch(searchTodo(event.target.value))
  }

  const onHandleCheck = (event: any) => {
    dispatch(checkTodo(event.target.value))
  }

  const onHandlePriority = (value: any) => {
    dispatch(checkPriorityTodo(value))
  }

  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search placeholder='input search text' onChange={onHandleSearch} />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group defaultValue={"All"} onChange={onHandleCheck}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Priority
        </Typography.Paragraph>
        <Select
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}

          onChange={onHandlePriority}
        >
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
      </Col>
    </Row>
  );
}
