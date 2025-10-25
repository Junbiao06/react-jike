import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import "react-quill-new/dist/quill.snow.css"
import './index.scss'
import { useEffect, useState } from 'react'
import { fetchCreateArticle } from '@/store/modules/article'
import { useDispatch, } from 'react-redux'
import { useChannels } from '@/hooks/useChannels'
import { getAllByTestId } from '@testing-library/dom'
import { getArticleById } from '@/apis/article'
import { type } from '@testing-library/user-event/dist/type'


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
  // useEffect(() => {
  //   dispatch(fetchChannelsList())
  // }, [])

  // const channelsList = useSelector(state => state.article.channelsList)

  const { channelsList } = useChannels()

  const onFinish = (formValue) => {
    // console.log(formValue);
    // 校验封面类型是否与实际相等
    if (imageList.length !== imageType) return message.warning('封面数量和图片数量不匹配！')
    // 1. 按照文档格式，处理表单数据
    const { title, content, channel_id } = formValue
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => item.response.data.url)
      },
      channel_id
    }
    // 2. 调用接口提交
    dispatch(fetchCreateArticle(reqData))
    message.success('发布文章成功')
  }

  const [imageList, setImageList] = useState([])
  const onUploadChange = (value) => {
    // console.log(value);
    setImageList(value.fileList)
  }

  // 切换图片封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    // console.log(value);
    setImageType(e.target.value)

  }

  // 回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // 获取实例 回显数据
  const [form] = Form.useForm()
  useEffect(() => {
    if (!articleId) return
    async function getArticleDetail() {
      const res = await getArticleById(articleId)
      const data = res.data
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type: cover.type
      })
      setImageType(cover.type)
      setImageList(cover.images.map(url => ({ url })))
    }
    getArticleDetail()
  }, [articleId, form])

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
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
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
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* listType 决定选择文件框的外观样式 */}
            {/* showUploadList 控制显示上传列表 */}
            {imageType > 0 &&
              <Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                name="image"
                onChange={onUploadChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>}
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
    </div >
  )
}

export default Publish