import Grid from "@mui/material/Grid";
// import { Outlet } from "react-router-dom";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import Login from "./Login";
import { btnStyle } from "../styles/globalStyles";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ setToggle }) {
  const { username, email, firstName, lastName, image, city, bio } =
    useSelector((state) => state.auth);
  const { getBlogs } = useBlogCalls();
  // console.log(getBlogs);
  const { blogs } = useSelector((state) => state.blog);
  // console.log("blogs:", blogs);
  const navigate = useNavigate();

  React.useEffect(() => {
    getBlogs("blogs");
  }, []);

  return (
    <Grid
      container
      spacing={60}
      sx={{
        // height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12} sm={10} md={8} lg={6} container spacing={2}>
        <Grid
          item
          xs={12}
          sm={8}
          order={{ xs: 2, sm: 1 }}
          sx={{
            border: "2px solid gray",
            p: 3,
            height: "800px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": { width: "0px" },
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 600,
              bgcolor: "background.paper",
            }}
          >
            {blogs.map((item) => (
              <>
                <ListItem
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ m: 2 }}>
                    <img src={item.image} alt="" width="250px" />
                  </Box>

                  <ListItemText
                    primary={item.title}
                    sx={{ textAlign: "center" }}
                    secondary={
                      <Box>
                        <Box sx={{ display: "flex" }}>
                          <Typography>
                            {item.content.slice(0, 80)}...
                          </Typography>
                        </Box>
                        <Button>Read More</Button>
                        <Box>
                          <>
                            "id ye göre ternary ile" (<FavoriteBorderIcon />
                            <FavoriteIcon sx={{ color: "red" }} />)
                          </>
                          <CommentIcon />
                          {item.comments.length}
                          <VisibilityIcon />
                          {item.countOfVisitors.length}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={4} order={{ xs: 1, sm: 2 }}>
          {username ? (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar" src={image} />
              </ListItemAvatar>
              <ListItemText
                primary={`Welcome ${firstName} ${lastName}`}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`${email}`}
                    </Typography>
                    <Box>
                      <p>City:{city}</p>
                      <p>email:{email}</p>
                      <p>Bio:{bio}</p>
                    </Box>
                  </>
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
      </Grid>
    </Grid>
  );
}
