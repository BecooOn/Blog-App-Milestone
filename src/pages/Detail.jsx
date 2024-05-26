import React, { useEffect, useState } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Avatar, Typography, IconButton, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { btnStyle, expandIcons } from "../styles/globalStyles";
import CommentForm from "../components/blog/CommentForm";
import Swal from "sweetalert2";
import UpdateModal from "../components/blog/UpdateModal";

const Detail = () => {
  const [expanded, setExpanded] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [open, setOpen] = useState(false); //? updateModal için
  const { promiseAllBlogs, getSingleBlogs, deleteBlog, postLike } =
    useBlogCalls();
  const { id } = useParams(); //? ilgili id ye sahip blog için

  const { _id } = useSelector((state) => state.auth); //? singleBlog içerisndeki userId ile login olan userId aynı  olup olmadığı kontrol ve buna göre update delete işlemleri yapıp yapamayacağını kontrol ediyoruz
  const { blogs, comments, singleBlog } = useSelector((state) => state.blog);
  // console.log(singleBlog);

  const authorizedAuthor = singleBlog?.userId?._id === _id;
  // console.log(authorizedAuthor);

  const navigate = useNavigate();

  useEffect(() => {
    getSingleBlogs(id);
    promiseAllBlogs();
  }, [setOpen, setOpenComments]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //!--------yorumları aç/kapa------
  const handleComments = () => {
    setOpenComments(!openComments);
  };

  //!--------blog güncelleme modal'ı için--------------
  const handleUpdateBlogOpen = () => {
    setOpen(true);
  };

  const handleUpdateBlogClose = () => {
    setOpen(false);
  };

  //!--------blog'u silmek için---------------
  const handleDeleteBlog = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be deleted and cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog("blogs", id);
        navigate("/");
      } else {
        Swal.fire("Canceled", "Blog deletion has been cancelled!");
      }
    });
  };

  const handleLikes = async (itemId) => {
    await postLike(itemId);
    await getSingleBlogs(id);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // border: "2px solid red",
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
          src={`${singleBlog?.image}`}
          alt="img"
          sx={{
            width: "75%",
            borderRadius: "10px",
          }}
        />
        <Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3, p: 1 }}>
            <Avatar>
              {singleBlog?.userId?.username.slice(0, 1).toUpperCase()}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="span" sx={{ fontSize: "14px" }}>
                {singleBlog?.userId?.username}
              </Typography>
              <Typography component="span" sx={{ fontSize: "14px" }}>
                {new Date(singleBlog?.createdAt).toLocaleString("tr-TR")}
              </Typography>
            </Box>
          </Box>
          <Typography variant="h5" sx={{ textAlign: "center", my: 2 }}>
            {singleBlog?.title}
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              my: 2,
              position: "relative",
              // cursor: "pointer",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: expanded ? "none" : 3,
              maxHeight: expanded ? "none" : "8rem",
            }}
          >
            <Typography
              component="div"
              sx={{ display: "block", textAlign: "justify", my: 1 }}
            >
              {singleBlog?.content}
            </Typography>
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              {expanded ? (
                <ExpandLessIcon sx={expandIcons} onClick={handleExpandClick} />
              ) : (
                <ExpandMoreIcon sx={expandIcons} onClick={handleExpandClick} />
              )}
            </IconButton>
          </Box>
          <Box
            sx={{
              // border: "4px solid red",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 3,
              my: 2,
            }}
          >
            <Box>
              <VisibilityIcon />
              {singleBlog.countOfVisitors}
            </Box>
            <Box>
              <CommentIcon
                sx={{ cursor: "pointer" }}
                onClick={handleComments}
              />
              {singleBlog?.comments?.length}
            </Box>
            <IconButton
              aria-label="add to favorites"
              onClick={() => handleLikes(singleBlog?._id)}
            >
              <FavoriteIcon
                sx={{
                  cursor: "pointer",
                  color: singleBlog?.likes?.includes(_id) ? "red" : "gray",
                }}
              />
              {singleBlog?.likes?.length}
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box>
        {authorizedAuthor ? (
          <>
            <Button sx={btnStyle} onClick={handleUpdateBlogOpen}>
              Update Blog
            </Button>
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": { backgroundColor: "orange" },
              }}
              onClick={handleDeleteBlog}
            >
              Delete Blog
            </Button>
          </>
        ) : null}
      </Box>
      {openComments ? <CommentForm id={id} /> : null}
      <UpdateModal
        handleUpdateBlogClose={handleUpdateBlogClose}
        open={open}
        singleBlog={singleBlog}
      />
    </Box>
  );
};

export default Detail;
