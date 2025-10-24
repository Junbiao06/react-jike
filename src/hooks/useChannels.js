// 封装获取频道列表逻辑

import { useEffect } from "react"
import { fetchChannelsList } from "@/store/modules/article"
import { useDispatch, useSelector } from "react-redux"

function useChannels() {
  // 1. 获取频道列表的逻辑
  // 2. 把组件中用到的数据return出去
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchChannelsList())
  }, [])

  const channelsList = useSelector(state => state.article.channelsList)
  return { channelsList }
}

export { useChannels }