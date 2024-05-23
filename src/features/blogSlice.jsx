import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  categories: [],
  comments: [],
  users: [],
  loading: false,
  error: false,
};

const getBlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false; //* skeleton için
    },
    getBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state[payload.path] = payload.data;
    },
    promiseAllBlogsSuccess: (
      state,
      { payload: { blogs, categories, comments, users } }
    ) => {
      // console.log(payload.blogs);
      // console.log(payload.categories);
      // console.log(payload.comments);
      // console.log(payload.users);
      state.loading = false;
      state.blogs = blogs;
      state.categories = categories;
      state.comments = comments;
      state.users = users;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getBlogSuccess, promiseAllBlogsSuccess, fetchFail } =
  getBlogSlice.actions;
export default getBlogSlice.reducer;
