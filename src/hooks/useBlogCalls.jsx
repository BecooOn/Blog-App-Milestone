import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchStart,
  getBlogSuccess,
  promiseAllBlogsSuccess,
  getSingleBlogSuccess,
  likeSuccess,
  getCommentsSuccess,
  getCategoriesSuccess,
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
      // console.log(error);
    }
  };

  //!-------Pagination-------------
  const getPaginatedBlogs = async (page) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`/blogs?limit=5&page=${page}`);
      dispatch(getPaginatedBlogsSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
    }
  };

  //!---------Single Blog-----------------------
  const getSingleBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data },
      } = await axiosToken(`/blogs/${id}`);
      dispatch(getSingleBlogSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
    }
  };

  //!---------My Blogs-----------------------
  const getMyBlogs = async (id) => {
    dispatch(fetchStart());
    try {
      const {
        data: { data },
      } = await axiosToken(`/blogs?author=${id}`);
      dispatch(getBlogSuccess({ data, path: "myBlogs" }));
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
    }
  };

  //!-------------Like ve unlike işlemleri için-------------
  const postLike = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.post(`/blogs/${id}/postLike`, {});
      dispatch(likeSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
    }
  };

  const getLike = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/blogs/${id}/getLike`);
      dispatch(likeSuccess(data));
      // console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      // console.log(error);
    }
  };

  //!-----------------CreateBlog işlemi-----------
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
      const { data } = await axiosToken(`/comments/?limit=100000`);
      dispatch(getCommentsSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Oops! there is something wrong while getting comments`);
    }
  };

  //!-----------------Delete comments-----------
  const deleteComment = async (commentId, blogID) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/comments/${commentId}`);
      await getComments();
      toastSuccessNotify("Comment was deleted successfully!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Oops! there is something wrong while deleting comment`);
      console.error(error);
    }
  };

  //!-----------------Comment create-----------
  const createComment = async (information) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post("/comments/", information);
      toastSuccessNotify(`Comment was added successfully!`);
      await getComments();
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        `Oops! there is something wrong while adding the comment`
      );
    }
  };

  //!---------------Update comment---------------
  const updateComment = async (commentID, information) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/comments/${commentID}`, information);
      toastSuccessNotify("Comment was updated successfully!");
      await getComments();
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        "Oops! there is something wrong while updating for comment!"
      );
    }
  };

  //!---------------Get categories---------------
  const getCategories = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get("/categories/");
      // console.log(data);
      dispatch(getCategoriesSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Oops! there is something wrong for categories!");
    }
  };

  //!---------------Create categories---------------
  const createCategory = async (newCategory) => {
    dispatch(fetchStart());
    try {
      await axiosToken.post("/categories/", newCategory);
      toastSuccessNotify("Category was added successfully!");
      await getCategories();
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Oops! there is something wrong while adding category!");
    }
  };

  //!-------------Veri silme işlemi---------------------
  const deleteBlog = async (endpoint, id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${endpoint}/${id}`);
      toastSuccessNotify(`Blog was deleted successfully!`);
      getBlogs(endpoint);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Oops! there is something wrong while deleting!`);
    }
  };

  //!-----------Verilerin güncellenmesi işlemi-----
  const updateBlog = async (endpoint, _id, information) => {
    dispatch(fetchStart());
    try {
      await axiosToken.patch(`/${endpoint}/${_id}`, information);
      toastSuccessNotify(`${endpoint} was updated successfully!`);
      getSingleBlog(_id);
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
    getSingleBlog,
    getMyBlogs,
    postLike,
    getLike,
    createBlog,
    updateBlog,
    getComments,
    updateComment,
    deleteComment,
    createComment,
    getCategories,
    createCategory,
    promiseAllBlogs,
    deleteBlog,
  };
};

export default useBlogCalls;
