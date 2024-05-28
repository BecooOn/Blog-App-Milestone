import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  getUserSuccess,
  getDeleteSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCalls = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosToken, axiosPublic } = useAxios();

  //!-----------LOGIN--------------
  const login = async (userData) => {
    dispatch(fetchStart());
    console.log(userData);
    try {
      const { data } = await axiosPublic.post("/auth/login", userData);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login is successful");

      //? sessionStorage de activePage varsa activePage e  eğer yoksa ana sayfaya (/) yönlendirmek için.
      let activePage = sessionStorage.getItem("activePage");
      if (!activePage || activePage === "null") {
        activePage = "/";
      }
      navigate(activePage);
      sessionStorage.removeItem("activePage");
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
      const { data } = await axiosToken.post("/users/", userData);
      dispatch(registerSuccess(data.data));
      toastSuccessNotify("New user successfully registered!");
      //? sessionStorage de activePage varsa activePage e  eğer yoksa ana sayfaya (/) yönlendirmek için.
      let activePage = sessionStorage.getItem("activePage");
      if (!activePage || activePage === "null") {
        activePage = "/";
      } else {
        navigate(activePage);
      }

      sessionStorage.removeItem("activePage");
      // login(data)
    } catch (error) {
      toastErrorNotify("Sign up failed!");
      dispatch(fetchFail());
    }
  };

  // const register = async (userData) => {
  //   dispatch(fetchStart());
  //   let registerUserData = { email: userData.email, password: userData.password }
  //   console.log(userData.email);
  //   console.log(userData.password);
  //   try {
  //     const { data } = await axiosToken.post("/users/", userData);
  //     dispatch(registerSuccess(data));
  //     toastSuccessNotify("New user successfully registered!");
  //     console.log(data);
  //     await login(registerUserData);
  //   } catch (error) {
  //     if (error.response) {
  //       // Sunucudan dönen bir yanıt varsa (HTTP durum kodu 4xx veya 5xx)
  //       console.error("Error Response:", error.response);
  //     } else if (error.request) {
  //       // Sunucudan hiçbir yanıt alınmadıysa
  //       console.error("No Response:", error.request);
  //     } else {
  //       // İstek ayarları sırasında bir hata meydana geldiyse
  //       console.error("Error Message:", error.message);
  //     }
  //     dispatch(fetchFail());
  //   }
  // };

  //!-----------LOGOUT--------------
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosToken.get("/auth/logout");
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout is successful");
      navigate("/");
      sessionStorage.removeItem("activePage");
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
      dispatch(getDeleteSuccess()); //? navigate kullanmadım: çünkü getDeleteSuccess ile  tüm kullanıcı verileri sıfırlandığı için dashboard'a gönderdim.
      toastSuccessNotify(`Account was deleted successfully!`);
    } catch (error) {
      // console.error("Delete user failed:", error);
      dispatch(fetchFail());
      toastErrorNotify(`Oops! there is something wrong while deleting`);
    }
  };

  return { login, register, logout, getUser, updateUser, deleteUser };
};

export default useAuthCalls;
