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
      state.token = payload.token;
      state.error = false;
    },
    registerSuccess: (state, { payload }) => {
      //! register fullfilled için
      state.loading = false;
      state.username = payload.data.username;
      state.token = payload.token;
      state.error = false;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.username = payload.data[0].username;
      state.firstName = payload.data[0].firstName;
      state.lastName = payload.data[0].lastName;
      state.email = payload.data[0].email;
      state.password = payload.data[0].password;
      state._id = payload.data[0]._id;
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
