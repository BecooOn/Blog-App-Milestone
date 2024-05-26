import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";
import useAuthCalls from "../hooks/useAuthCalls";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UpdateProfile from "../components/UpdateProfile";
import { btnStyle } from "../styles/globalStyles";
import Swal from "sweetalert2";

export default function Profile() {
  const { username, email, firstName, lastName, image, _id } = useSelector(
    (state) => state.auth
  );
  const { getBlogs } = useBlogCalls();
  const { deleteUser } = useAuthCalls();

  useEffect(() => {
    getBlogs("users");
  }, []);
  const handleDeleteUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your profile will be deleted and cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(_id);
      } else {
        Swal.fire("Canceled", "User deletion has been cancelled!");
      }
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        p: 2,
        height: "500px",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          textAlign: "center",
          p: 2,
          boxShadow: "0 0 20px black",
        }}
      >
        <Box
          component="div"
          sx={{
            // border: "1px solid black",
            display: "inline-block",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            // border:"2px solid red"
          }}
        >
          <img src={image} alt={username} style={{ width: "180px", height: "180px", borderRadius: "50%" }} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </CardContent>
        <CardActions>
          <UpdateProfile />
          <Button sx={btnStyle} size="small" onClick={handleDeleteUser}>
            Delete your account
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
