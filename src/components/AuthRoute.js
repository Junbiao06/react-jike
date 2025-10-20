// 封装高阶组件
// 核心逻辑：token ? 正常跳转 : 去登陆

import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

export function AuthRoute({ children }) {
  return getToken() ? <>{children}</> : <Navigate to={'/login'} replace />
}