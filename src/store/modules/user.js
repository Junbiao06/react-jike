// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils"
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken('token_key') || '',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setuserInfo(state, action) {
      state.userInfo = action.payload
    }
  }
})

// 解构出actionCreator
const { setToken, setuserInfo } = userStore.actions

// 获取reduer函数
const userReducer = userStore.reducer

// 异步方法
// 1. 发送异步请求
// 2. 提交同步action
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.data.token))
  }
}

// 异步获取个人用户信息
const fetchuserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('user/profile')
    dispatch(setuserInfo(res.data))
  }
}

export { fetchLogin, fetchuserInfo, setToken }

export default userReducer