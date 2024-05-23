import React, { useEffect } from "react";
import useAuthCalls from "../hooks/useAuthCalls";
import useBlogCalls from "../hooks/useBlogCalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Detail = () => {
  const { getUser } = useAuthCalls();
  const { promiseAllBlogs } = useBlogCalls();

  const { username, email, firstName, lastName, image, _id } = useSelector(
    (state) => state.auth
  );
  console.log(_id);
  const { blogs, categories, comments, users } = useSelector(
    (state) => state.blog
  );
  console.log(users);
  console.log(blogs);
  console.log(comments);
  console.log(categories);

  const navigate = useNavigate();

  useEffect(() => {
    // getUser();
    // promiseAllBlogs();
  }, []);

  return <div>Detail</div>;
};

export default Detail;
