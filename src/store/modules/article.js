import { getChannelsAPI, createArticleAPI } from "@/apis/article";
import Article from "@/pages/Article";

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
    }
  }
})

const { setChannelsList, setCreateArticle } = articleStore.actions

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


export { fetchChannelsList, fetchCreateArticle }
export default articleReducer
