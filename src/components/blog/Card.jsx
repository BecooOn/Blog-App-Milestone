import Grid from "@mui/material/Grid";
// import { Outlet } from "react-router-dom";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import { btnStyle } from "../../styles/globalStyles";
import { useNavigate } from "react-router-dom";

export default function Card({ setToggle }) {
  const { username, email, firstName, lastName, image, city, bio } =
    useSelector((state) => state.auth);
  const { getBlogs } = useBlogCalls();
  const { blogs } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  // console.log(blogs);
  console.log(image);

  React.useEffect(() => {
    getBlogs("blogs");
    getBlogs("users");
  }, []);

  const handleReadMore = (_id) => {
    if (username) {
      navigate(`detail/${_id}`);
    } else {
      sessionStorage.setItem("lastClickedBlogId", _id);
      setToggle(false);
      navigate("/auth");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <Grid
          item
          xs={12}
          sm={9}
          order={{ xs: 2, sm: 1 }}
          sx={{
            border: "1px solid gray",
            p: 3,
            height: "800px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 700,
              bgcolor: "background.paper",
            }}
          >
            {blogs.map((item) => (
              <React.Fragment key={item._id}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    // flexDirection:"column"
                  }}
                >
                  <Box sx={{ m: 2, display: "block", textAlign: "center" }}>
                    <img src={item.image} alt="" width="70%" />
                  </Box>

                  <ListItemText
                    primary={
                      <Typography variant="h6" align="center">
                        {item.title}
                      </Typography>
                    }
                    sx={{ textAlign: "center" }}
                    secondary={
                      <Box>
                        <Typography>{item.content.slice(0, 80)}...</Typography>
                        <Box textAlign="center" my={2}>
                          <Button
                            variant="outlined"
                            onClick={() => handleReadMore(item._id)}
                          >
                            Read More
                          </Button>
                        </Box>
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
                            {item.countOfVisitors}
                          </Box>
                          <Box>
                            <CommentIcon />
                            {item.comments.length}
                          </Box>
                          <Box>
                            <FavoriteBorderIcon />
                            {item.likes.length}
                            <FavoriteIcon sx={{ color: "red" }} />
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={3} order={{ xs: 1, sm: 2 }}>
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
                      <Typography component="span" sx={{ fontWeight: "bold" }}>
                        City:
                      </Typography>
                      {city}
                    </Typography>
                    <Typography>
                      <Typography component="span" sx={{ fontWeight: "bold" }}>
                        Bio:
                      </Typography>
                      {bio}
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
