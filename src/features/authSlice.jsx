import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  username: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
  image: "",
  city: "",
  bio: "",
  _id: "",
  singleUser:[],
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.username = payload.user.username;
      state.email = payload.user.email;
      state.firstName = payload.user.firstName;
      state.lastName = payload.user.lastName;
      state.password = payload.user.password;
      state.image = payload.user.image;
      state.city = payload.user.city;
      state.bio = payload.user.bio;
      state._id = payload.user._id;
      state.token = payload.token;
      state.error = false;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.username = payload.username;
      state.password = payload.password;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.image = payload.image;
      state.city = payload.city;
      state.bio = payload.bio;
      state._id = payload._id;
      state.token = payload.token;
      state.error = false;
    },
    getUserSuccess: (state, { payload }) => {
      // console.log(payload);
      state.loading = false;
      state.username = payload.username;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.password = payload.password;
      state._id = payload._id;
      state.error = false;
    },

    getSingleUserSuccess: (state, { payload }) => {
      console.log(payload.data);
      state.loading = false;
      state.singleUser = payload.data;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.token = "";
      state.username = "";
      state.password = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.image = "";
      state.city = "";
      state.bio = "";
      state._id = "";
    },

    getDeleteSuccess: (state) => {
      state.loading = false;
      state.token = "";
      state.username = "";
      state.password = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.image = "";
      state.city = "";
      state.bio = "";
      state._id = "";
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  registerSuccess,
  getUserSuccess,
  getSingleUserSuccess,
  logoutSuccess,
  getDeleteSuccess,
  fetchFail,
} = authSlice.actions;

export default authSlice.reducer;
