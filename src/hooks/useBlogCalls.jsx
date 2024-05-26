//! custom hook alanı

import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchStart,
  getBlogSuccess,
  promiseAllBlogsSuccess,
  getSingleBlogSuccess,
  likeSuccess,
  getCommentsSuccess,
  fetchFail,
  getPaginatedBlogsSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const { axiosToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();

  const getBlogs = async (endpoint) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data },
      } = await axiosToken(endpoint);
      dispatch(getBlogSuccess({ data, path: endpoint }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  //!-------Pagination-------------
  const getPaginatedBlogs = async (page) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`/blogs?limit=5&page=${page}`);
      // console.log(data?.data);
      // console.log(data?.details?.pages?.total);
      dispatch(getPaginatedBlogsSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //!---------Single Blog-----------------------
  const getSingleBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data },
      } = await axiosToken(`/blogs/${id}`);
      dispatch(getSingleBlogSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //!---------My Blogs-----------------------
  const getMyBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data },
      } = await axiosToken(`/blogs?author=${id}`);
      console.log(data);
      dispatch(getBlogSuccess({ data, path: "myBlogs" }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //!-------------Like unlike için-------------
  const postLike = async (id) => {
    try {
      const { data } = await axiosToken.post(`/blogs/${id}/postLike`, {});
      // console.log(data);
      dispatch(likeSuccess(data));
      // await getBlogs("blogs");
    } catch (error) {
      console.log(error);
    }
  };

  //!-----------------Create işlemi-----------
  const createBlog = async (endpoint, information) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post(`/${endpoint}/`, information);
      toastSuccessNotify(`${endpoint} was added successfully!`);
      getBlogs(endpoint);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        `Oops! there is something wrong while adding for ${endpoint}`
      );
    }
  };

  //!-----------------Get comments-----------
  const getComments = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken(`/comments/?limit=100`);
      dispatch(getCommentsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Oops! there is something wrong while getting comments`);
    }
  };

  //!-----------------Comment create-----------
  const createComment = async (information) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post("/comments/", information);
      toastSuccessNotify(`Comment was added successfully!`);
      await getComments();
      await getBlogs("comments");
    } catch (error) {
      // console.error("Error while adding comment:", error.response || error.message || error);
      dispatch(fetchFail());
      toastErrorNotify(
        `Oops! there is something wrong while adding the comment`
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
  const updateBlog = async (endpoint, _id, information) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/${endpoint}/${_id}`, information);
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
  const promiseAllBlogs = async () => {
    dispatch(fetchStart());
    try {
      const [blog, category, comment, user] = await Promise.all([
        axiosToken("/blogs"),
        axiosToken("/categories"),
        axiosToken("/comments"),
        axiosToken("/users"),
      ]);
      const blogs = blog?.data?.data;
      const categories = category?.data?.data;
      const comments = comment?.data?.data;
      const users = user?.data?.data;
      dispatch(
        promiseAllBlogsSuccess({
          blogs,
          categories,
          comments,
          users,
        })
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return {
    getBlogs,
    getPaginatedBlogs,
    getSingleBlogs,
    getMyBlogs,
    postLike,
    createBlog,
    updateBlog,
    getComments,
    createComment,
    promiseAllBlogs,
    deleteBlog,
  };
};

export default useBlogCalls;
