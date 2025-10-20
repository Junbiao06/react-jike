import "./index.scss"
import { Card, Form, Input, Button, message } from "antd"
import logo from "@/assets/logo.png"
import { useDispatch } from "react-redux"
import { fetchLogin } from "@/store/modules/user"
import { useNavigate } from "react-router-dom"
import '@ant-design/v5-patch-for-react-19';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    // 触发异步action
    await dispatch(fetchLogin(values))
    // 跳转首页
    navigate('/')
    // 提示用户
    message.success('登录成功')

  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" width="50px" height="50px" />
        <Form
          validateTrigger="onBlur"
          onFinish={onFinish}>
          <Form.Item
            name="mobile"
            // 按顺序校验
            rules={[
              {
                required: true,
                message: '请输入手机号！'
              },
              {
                pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
                message: '请输入正确的手机号！'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！'
              },
            ]}>
            <Input size="large" placeholder="请输入验证码"></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login