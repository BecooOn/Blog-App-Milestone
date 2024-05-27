import React, { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Typography, IconButton, Button, Avatar } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentForm from "../components/blog/CommentForm";

const CommentCard = () => {
  const { getMyBlogs, postLike, getLike } = useBlogCalls();
  const { id } = useParams(); //? ilgili id ye sahip blog için
  const { myBlogs, comments} = useSelector((state) => state.blog);

  const navigate = useNavigate();

  useEffect(() => {
    getMyBlogs(id);
  }, [id]);

  const handleLikes = async (itemId) => {
    await postLike(itemId);
    await getLike(itemId);
    // await getmyBlogs(id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <Box
          component="img"
          src={`${myBlogs?.image}`}
          alt="img"
          sx={{
            width: "75%",
            borderRadius: "10px",
          }}
        />
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3, p: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="span" sx={{ fontSize: "14px" }}>
                {myBlogs?.userId?.username}
              </Typography>
              <Typography component="span" sx={{ fontSize: "14px" }}>
                {new Date(myBlogs?.createdAt).toLocaleString("tr-TR")}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h5" sx={{ textAlign: "center", my: 2 }}>
            {myBlogs?.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 3,
              my: 2,
            }}
          >
            <Box>
              <VisibilityIcon />
              {myBlogs.countOfVisitors}
            </Box>
            <Box>
              <CommentIcon
                sx={{ cursor: "pointer" }}
                onClick={handleComments}
              />
              {myBlogs?.comments?.length}
            </Box>
            <IconButton
              aria-label="add to favorites"
              onClick={() => handleLikes(myBlogs?._id)}
            >
              <ThumbUpAltIcon
                sx={{
                  cursor: "pointer",
                  color: myBlogs?.likes?.includes(_id) ? "red" : "gray",
                }}
              />
              {myBlogs?.likes?.length}
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box sx={{ textAlign: "justify", maxWidth: "600px" }}>
        {myBlogs?.comments?.map((item) => (
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

export default CommentCard;
