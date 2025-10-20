// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils"
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken('token_key') || ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
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