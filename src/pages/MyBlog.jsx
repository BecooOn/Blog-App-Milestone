import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, IconButton, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import { Link, useNavigate } from "react-router-dom";
import SkeletonCard from "../components/skeleton/SkeletonCard";
import { NoDataMessage } from "../components/DataFetchMessages";

export default function MyBlog() {
  const { _id, loading, error } = useSelector((state) => state.auth || {});
  const { getBlogs, getMyBlogs, postLike, getLike } = useBlogCalls();
  const { myBlogs } = useSelector((state) => state.blog || {});
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const itemsPerPage = 5; //? sayfa başına blog sayısı

  useEffect(() => {
    getBlogs("blogs");
    getBlogs("users");
    getMyBlogs(_id); //? Kullanıcı _id'sine göre bloglar almak için
  }, []);

  //? pagination işlemi
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  //? Mevcut sayfadaki blogları göstermek için slice
  const startIndex = (page - 1) * itemsPerPage;
  const selectedBlogs = myBlogs.slice(startIndex, startIndex + itemsPerPage);

  const handleLikes = async (itemId) => {
    await postLike(itemId);
    await getLike(itemId);
    await getMyBlogs(_id);
    // console.log("worked");
  };

  return (
    <>
      {loading ? (
        <SkeletonCard />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
          >
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
                {selectedBlogs.map((item) => (
                  <React.Fragment key={item._id}>
                    <ListItem
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Box sx={{ m: 2, display: "flex", alignItems: "center" }}>
                        <img
                          src={item.image}
                          alt=""
                          style={{ width: "200px", marginRight: "20px" }}
                        />
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
                            <Typography component="span">
                              {item.content.slice(0, 80)}...
                            </Typography>
                            <Box textAlign="center" my={2}>
                              <Link
                                to={`/detail/${item._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Button variant="contained" color="secondary">
                                  READ MORE
                                </Button>
                              </Link>
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
                                <CommentIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() =>
                                    navigate(`/detail/${item?._id}`)
                                  }
                                />
                                {item.comments.length}
                              </Box>
                              <IconButton
                                aria-label="add to favorites"
                                onClick={() => handleLikes(item?._id)}
                              >
                                <ThumbUpAltIcon
                                  sx={{
                                    cursor: "pointer",
                                    color: item?.likes?.includes(_id)
                                      ? "red"
                                      : "gray",
                                  }}
                                />
                                {item?.likes?.length}
                              </IconButton>
                              <span
                                style={{ fontSize: "10px", fontWeight: 100 }}
                              >
                                <i>
                                  {item.isPublish ? "Published" : "Drafted"}
                                </i>
                              </span>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
                <Pagination
                  count={Math.ceil(myBlogs.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </Grid>
          </Box>
        </Box>
      )}
      {error && <NoDataMessage />}
    </>
  );
}
