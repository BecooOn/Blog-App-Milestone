import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  paginatedBlogs: [],
  categories: [],
  comments: [],
  users: [],
  singleBlog: [],
  myBlogs: [],
  likes: [],
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
    getPaginatedBlogsSuccess: (state, { payload }) => {
      // console.log(payload);
      state.loading = false;
      state.paginatedBlogs = payload.data;
    },
    getSingleBlogSuccess: (state, { payload }) => {
      // console.log(payload);
      state.loading = false;
      state.singleBlog = payload.data;
    },

    likeSuccess: (state, { payload }) => {
      state.loading = false;
      state.likes = payload;
    },
    getCommentsSuccess: (state, { payload }) => {
      state.loading = false;
      state.comments = payload.data;
    },
    getCategoriesSuccess: (state, { payload }) => {
      // console.log(payload.data);
      state.loading = false;
      state.categories = payload.data;
    },
    promiseAllBlogsSuccess: (
      state,
      { payload: { blogs, categories, comments, users } }
    ) => {
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

export const {
  fetchStart,
  getBlogSuccess,
  getPaginatedBlogsSuccess,
  promiseAllBlogsSuccess,
  getSingleBlogSuccess,
  likeSuccess,
  getCommentsSuccess,
  getCategoriesSuccess,
  fetchFail,
} = getBlogSlice.actions;
export default getBlogSlice.reducer;
