// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils"

const userStore = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem('token-key') || ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token-key', action.payload)
    }
  }
})

// 解构出actionCreator
const { setToken } = userStore.actions

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



export { fetchLogin, setToken }

export default userReducer