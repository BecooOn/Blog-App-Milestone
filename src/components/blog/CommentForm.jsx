import {
  Avatar,
  Box,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import { btnStyle } from "../../styles/globalStyles";

const formatDate = (isoString) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", options);
};

const CommentForm = ({ id }) => {
  //* id ilgili blog id'sini prop olarak aldım
  const [postComment, setPostComment] = useState({
    blogId: id,
    comment: "",
  });
  const { singleBlog } = useSelector((state) => state.blog);
  // console.log(singleBlog);

  const { getSingleBlogs, createComment } = useBlogCalls();

  useEffect(() => {
    getSingleBlogs(id);
  }, []);

  const handleTextAreaChange = (e) => {
    //? blogId yi korumak ve comment kısmını güncellemek için
    setPostComment((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmit = async () => {
    await createComment(postComment);
    await getSingleBlogs(id);
    setPostComment({
      blogId: id,
      comment: "",
    });
  };

  return (
    <Box>
      <Box>
        <TextareaAutosize
          value={postComment?.comment}
          onChange={handleTextAreaChange}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            outline: "none",
            resize: "none",
            textAlign: "justify",
            lineHeight: "1.5",
            height: "5rem",
            padding: "10px",
          }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Button onClick={handleSubmit} sx={btnStyle}>
            Add Comment
          </Button>
        </Box>
      </Box>
      <Box sx={{ textAlign: "justify", maxWidth: "600px" }}>
        {singleBlog?.comments?.map((item) => (
          <Box key={item?.id} sx={{ mt: 1, mb: 1 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar>
                {item?.userId?.username?.slice(0, 1).toUpperCase()}
              </Avatar>
              <Box>
                <Typography>{item?.userId?.username}</Typography>
                <Typography sx={{ fontSize: "12px", color: "gray" }}>
                  {formatDate(item?.createdAt)}
                </Typography>
              </Box>
            </Box>
            <Typography>{item?.comment}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CommentForm;
