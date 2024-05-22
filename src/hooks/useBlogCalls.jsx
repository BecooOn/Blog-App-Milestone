//! custom hook alanı

import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchStart,
  getBlogSuccess,
  promiseAllDatasSuccess,
  fetchFail,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  //!------------Verilerin API den alınması işlemi----------
  const getBlogs = async (endpoint) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data },
      } = await axiosToken(`/${endpoint}/`);
      dispatch(getBlogSuccess({ data, path: endpoint }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //!-----------------Create(oluşturma) işlemi-----------
  const createBlog = async (endpoint, blogs) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${endpoint}/`, blogs);
      toastSuccessNotify(`${endpoint} was added successfully!`);
      getBlogs(endpoint);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        `Oops! there is something wrong while adding for ${endpoint}`
      );
    }
  };

  //!-------------Veri silme işlemi---------------------
  const deleteBlog = async (endpoint, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${endpoint}/${id}`);
      toastSuccessNotify(`${endpoint} was deleted successfully!`);
      getBlogs(endpoint);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        `Oops! there is something wrong while deleting for ${endpoint}`
      );
    }
  };

  //!-----------Verilerin güncellenmesi işlemi-----
  const updateBlog = async (endpoint, blogs) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`/${endpoint}/${blogs._id}`, blogs);
      toastSuccessNotify(`${endpoint} was updated successfully!`);
      getBlogs(endpoint);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        `Oops! there is something wrong while updating for ${endpoint}`
      );
    }
  };

  //!-------------Promise.all ile verileri senkronize olarak çağırmak için------------
  const promiseAllDatas = async () => {
    dispatch(fetchStart());
    try {
      const [blog, category, comment] = await Promise.all([
        axiosToken("/blogs"),
        axiosToken("/categories"),
        axiosToken("/comments"),
      ]);
      const blogs = blog?.data?.data;
      const categories = category?.data?.data;
      const comments = comment?.data?.data;
      dispatch(
        promiseAllDatasSuccess({
          blogs,
          categories,
          comments,
        })
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return { getBlogs, deleteBlog, createBlog, updateBlog, promiseAllDatas };
};

export default useBlogCalls;
