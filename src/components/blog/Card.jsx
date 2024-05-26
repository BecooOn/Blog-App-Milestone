import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import useAuthCalls from "../../hooks/useAuthCalls";
import { btnStyle } from "../../styles/globalStyles";
import { useNavigate } from "react-router-dom";

export default function Card({ setToggle, page, setPage }) {
  const { username, email, firstName, lastName, image, city, bio, _id } =
    useSelector((state) => state.auth);
  const { getPaginatedBlogs, postLike, getSingleBlogs, promiseAllBlogs } =
    useBlogCalls();
  const { paginatedBlogs } = useSelector(
    (state) => state.blog
  );
  const navigate = useNavigate();

  useEffect(() => {
    promiseAllBlogs();
    getPaginatedBlogs(page);
  }, [page]);

  const handleReadMore = (_id) => {
    if (username) {
      navigate(`detail/${_id}`);
    } else {
      sessionStorage.setItem("lastClickedBlogId", _id);
      setToggle(false);
      navigate("/auth");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLikes = async (itemId) => {
    if (username) {
      await postLike(itemId);
      await getSingleBlogs(itemId);
    } else {
      navigate("/auth");
    }
  };

  const handleComments = async (itemId) => {
    if (username) {
      navigate(`detail/${itemId}`);
    } else {
      navigate("/auth");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: "24px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <Grid
          item
          xs={12}
          sm={9}
          order={{ xs: 2, sm: 1 }}
          sx={{
            borderTop: "1px solid gray",
            borderRight: "1px solid gray",
            borderLeft: "1px solid gray",
            borderBottom: "none",
            p: 3,
            height: "800px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": { width: "0px" },
            textAlign: { xs: "center", sm: "left" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 700,
              bgcolor: "background.paper",
            }}
          >
            {paginatedBlogs?.data?.map((item) => (
              <React.Fragment key={item._id}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xs: "center",
                      sm: "flex-start",
                    },
                    alignItems: "center",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    textAlign: { xs: "center", sm: "left" },
                    position: "relative",
                  }}
                >
                  <Box sx={{ m: 2 }}>
                    <img src={item.image} alt="" style={{ width: "200px" }} />
                  </Box>

                  <Box sx={{ flex: 1, ml: { sm: 2 } }}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          sx={{ textAlign: { xs: "center", sm: "left" } }}
                        >
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography component="span">
                            {item.content.slice(0, 80)}...
                          </Typography>
                          <Box
                            my={2}
                            sx={{ textAlign: { xs: "center", sm: "left" } }}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleReadMore(item._id)}
                            >
                              Read More
                            </Button>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: {
                                xs: "center",
                                sm: "flex-start",
                              },
                              gap: 3,
                              my: 2,
                              position: { sm: "absolute" },
                              bottom: { sm: 0 },
                              right: { sm: 0 },
                              textAlign: { xs: "center", sm: "left" },
                            }}
                          >
                            <Box>
                              <VisibilityIcon />
                              {item.countOfVisitors}
                            </Box>
                            <Box>
                              <CommentIcon
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleComments(item._id)}
                              />
                              {item.comments.length}
                            </Box>
                            <IconButton
                              aria-label="add to favorites"
                              onClick={() => handleLikes(item._id)}
                            >
                              <FavoriteIcon
                                sx={{
                                  cursor: "pointer",
                                  color:
                                    username && item?.likes?.includes(_id)
                                      ? "red"
                                      : "gray",
                                }}
                              />
                              {item.likes.length}
                            </IconButton>
                          </Box>
                        </Box>
                      }
                    />
                  </Box>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                m: 4,
              }}
            >
              <Pagination
                count={paginatedBlogs?.details?.pages?.total || 0}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
              />
            </Box>
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          order={{ xs: 1, sm: 2 }}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          {username ? (
            <ListItem sx={{ display: "block" }}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={image}
                  alt={username}
                  style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                />
              </Box>
              <ListItemText
                primary={`Welcome ${username}`}
                secondary={
                  <Box>
                    <Typography>{`${firstName} ${lastName}`}</Typography>
                    <Typography>{`${email}`}</Typography>
                    <Typography>
                      <strong>City:</strong> {city}
                    </Typography>
                    <Typography>
                      <strong>Bio:</strong> {bio}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ) : (
            <>
              <Button sx={btnStyle} onClick={() => navigate("/auth")}>
                Login
              </Button>
              <Button
                sx={btnStyle}
                onClick={() => {
                  navigate("/auth");
                  setToggle(true);
                }}
              >
                Register
              </Button>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
