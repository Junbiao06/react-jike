// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { removeToken, request } from "@/utils"
import { setToken as _setToken, getToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

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
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

// 解构出actionCreator
const { setToken, setuserInfo, clearUserInfo } = userStore.actions

// 获取reduer函数
const userReducer = userStore.reducer

// 异步方法
// 1. 发送异步请求
// 2. 提交同步action
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setToken(res.data.token))
  }
}

// 异步获取个人用户信息
const fetchuserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI()
    dispatch(setuserInfo(res.data))
  }
}

export { fetchLogin, fetchuserInfo, clearUserInfo }

export default userReducer