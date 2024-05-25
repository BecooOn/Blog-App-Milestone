//! Burada custom hook oluşturduk.
//* Eğer uygulamanın her yerinde kullanmak için bazı fonksiyonlara ihtyaç varsa  ve bu fonksiyonlar içerisinde custom hook'ların ( useSelector, useDispatch,useNavigate vb.) kullanılması gerekiyorsa o zaman çözüm bu dosyayı custom hook'a çevirmektir.
//? İstek atma işlemlerini burada oluşturduk. Tek alan içerisinde topladık

import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  getUserSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosToken, axiosPublic } = useAxios(); //* oluşturduğumuz axios örneklerini import ettik

  //!-----------LOGIN--------------
  const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/auth/login", userData);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login is successful");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login is not successful");
      // console.log(error)
    }
  };

  //!---------------REGISTER--------------
  const register = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/users/", userData);
      dispatch(registerSuccess(data));
      toastSuccessNotify("New user successfully registered!");
      navigate("/");
    } catch (error) {
      toastErrorNotify("Sign up failed!");
      dispatch(fetchFail());
    }
  };

  //!-----------LOGOUT--------------
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosToken.get("/auth/logout");
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout is successful");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout is not successful");
    }
  };

  //!--------Kullanıcı çağırmak için--------------
  const getUser = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get("/users/");
      // console.log(data);
      dispatch(getUserSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //!--------Kullanıcı güncellemek için--------------
  const updateUser = async (userData, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/users/${id}`, userData);
      toastSuccessNotify(`Update is successful!`);
      getUser();
      // dispatch(getUserSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Oops! there is something wrong while updating`);
    }
  };

  //!--------Kullanıcı silmek için--------------
  const deleteUser = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/users/${id}`);
      toastSuccessNotify(`Account was deleted successfully!`);
      getUser();
      navigate("/");
      // dispatch(getUserSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Oops! there is something wrong while deleting`);
    }
  };

  return { login, register, logout, getUser, updateUser, deleteUser };
};

export default useAuthCalls;
