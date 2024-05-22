import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  categories: [],
  comments: [],
  loading: false,
  error: false,
};

const getBlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      //! pending için
      state.loading = true;
      state.error = false; //* skeleton için
    },
    getBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.path] = payload.data;
      // state.error = false; //* pending de false olduğu için burada gerekli değil; çünkü her seferinde bu case'leri çağırıyoruz
    },
    promiseAllDatasSuccess:(state,{payload})=>{
      state.loading = false;
      state.blogs = payload.blogs;
      state.categories = payload.categories;
      state.comments = payload.comments;
    },
    fetchFail: (state) => {
      //! rejected için
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getBlogSuccess,promiseAllDatasSuccess, fetchFail } = getBlogSlice.actions;
export default getBlogSlice.reducer;
