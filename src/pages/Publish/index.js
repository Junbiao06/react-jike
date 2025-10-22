import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import "react-quill-new/dist/quill.snow.css"
import './index.scss'
import { useEffect, useState } from 'react'
import { fetchChannelsList, fetchCreateArticle } from '@/store/modules/article'
import { useDispatch, useSelector } from 'react-redux'


const { Option } = Select

const Publish = () => {
  // 获取频道列表
  // const [channelsList, setChannelsList] = useState([])
  // useEffect(() => {
  //   // 1. 封装函数，调用接口
  //   const getChannelsList = async () => {
  //     const res = await getChannelsAPI()
  //     setChannelsList(res.data.channels)
  //   }
  //   // 2. 调用
  //   getChannelsList()
  // }, [])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchChannelsList())
  }, [])

  const channelsList = useSelector(state => state.article.channelsList)

  const onFinish = (formValue) => {
    // console.log(formValue);
    // 1. 按照文档格式，处理表单数据
    const { title, content, channel_id } = formValue
    const reqData = {
      title,
      content,
      cover: {
        type: 0,
        image: []
      },
      channel_id
    }
    // 2. 调用接口提交
    dispatch(fetchCreateArticle(reqData))
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelsList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}

            <ReactQuill theme="snow" placeholder='请输入文章内容' className='publish-quill' />

          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish