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
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      //! pending için
      state.loading = true;
    },
    loginSuccess: (state, { payload }) => {
      //! login fullfilled için
      state.loading = false;
      state.username = payload.user.username;
      state.email = payload.user.email;
      state.firstName = payload.user.firstName;
      state.lastName = payload.user.lastName;
      state.image = payload.user.image;
      state.city = payload.user.city;
      state.bio = payload.user.bio;
      state._id = payload.user._id;
      state.token = payload.token;
      state.error = false;
    },
    registerSuccess: (state, { payload }) => {
      //! register fullfilled için
      state.loading = false;
      state.username = payload.data.username;
      state.email = payload.data.email;
      state.firstName = payload.data.firstName;
      state.lastName = payload.data.lastName;
      state.image = payload.data.image;
      state.city = payload.data.city;
      state.bio = payload.data.bio;
      state._id = payload.data._id;
      state.token = payload.token;
      state.error = false;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.username = payload.data.username;
      state.firstName = payload.data.firstName;
      state.lastName = payload.data.lastName;
      state.email = payload.data.email;
      state.password = payload.data.password;
      state._id = payload.data._id;
      state.error = false;
    },

    logoutSuccess: (state) => {
      //! logout fullfilled için
      state.loading = false;
      state.username = "";
      state.token = "";
      // return initialState;
    },

    fetchFail: (state) => {
      //! rejected için
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
  logoutSuccess,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;
