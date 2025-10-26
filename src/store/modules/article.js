import { getChannelsAPI, createArticleAPI, updateArticleAPI } from "@/apis/article";

const { createSlice } = require("@reduxjs/toolkit");



const articleStore = createSlice({
  name: 'article',
  initialState: {
    channelsList: [],
    article: {}
  },
  reducers: {
    setChannelsList(state, action) {
      state.channelsList = action.payload
    },
    setCreateArticle(state, action) {
      state.article = action.payload
    },
    setUpdateArticle(state, action) {
      state.article = action.payload
    }
  }
})

const { setChannelsList, setCreateArticle, setUpdateArticle } = articleStore.actions

const articleReducer = articleStore.reducer

const fetchChannelsList = () => {
  return async (dispatch) => {
    const res = await getChannelsAPI();
    dispatch(setChannelsList(res.data.channels))
    // console.log(res.data.channels);
  }
}
const fetchCreateArticle = (data) => {
  return async (dispatch) => {
    const res = await createArticleAPI(data);
    dispatch(setCreateArticle(res.data))
    // console.log(res);
  }
}
const fetchUpdateArticle = (data) => {
  return async (dispatch) => {
    const res = await updateArticleAPI(data);
    dispatch(setUpdateArticle(res.data))
  }
}


export { fetchChannelsList, fetchCreateArticle, fetchUpdateArticle }
export default articleReducer
