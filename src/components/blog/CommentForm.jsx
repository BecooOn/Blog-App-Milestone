import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import { btnStyle } from "../../styles/globalStyles";
import CommentEditor from "./CommentEditor";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Divider from "@mui/material/Divider";

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
  const { singleBlog } = useSelector((state) => state.blog);
  // console.log(singleBlog);

  const { getSingleBlog } = useBlogCalls();

  useEffect(() => {
    getSingleBlog(id);
  }, []);

  return (
    <Box>
      <Box>
        <CommentEditor id={id} />
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
                <Box>
                    <BorderColorIcon />
                    <DeleteForeverIcon />
                    "yapım aşamasında"
                </Box>
              </Box>
            </Box>
            <Typography>{item?.comment}</Typography>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CommentForm;
