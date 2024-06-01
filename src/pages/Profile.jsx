import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UpdateProfile from "../components/UpdateProfile";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { btnStyle } from "../styles/globalStyles";
import { toastErrorNotify } from "../helper/ToastNotify";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const { singleUser } = useSelector((state) => state.auth);
  const [checkPassW, setCheckPassW] = useState("");
  const [showCheckPassW, setShowCheckPassW] = useState(false);
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    city,
    bio,
    image,
    _id,
  } = singleUser;
  const { getSingleUser, updateUser, deleteUser } = useAuthCalls();
  // console.log(singleUser);
  const [info, setInfo] = useState({
    image: image || "",
    username: username || "",
    email: email || "",
    password: password || "",
    firstName: firstName || "",
    lastName: lastName || "",
    city: city || "",
    bio: bio || "",
  });
  // console.log(info);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getSingleUser(_id);
      if (userData) {
        setInfo({
          image: userData.image || "",
          username: userData.username || "",
          email: userData.email || "",
          password: userData.password || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          city: userData.city || "",
          bio: userData.bio || "",
        });
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setInfo({
      image: image || "",
      username: username || "",
      email: email || "",
      password: password || "",
      firstName: firstName || "",
      lastName: lastName || "",
      city: city || "",
      bio: bio || "",
    });
  }, [image, username, email, password, firstName, lastName, city, bio]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickShowCheckPassW = () => {
    setShowCheckPassW(!showCheckPassW);
  };

  const handleChangeCheckPassW = (value) => {
    setCheckPassW(value);
  };
  const handleSubmit = async (e) => {
    if (checkPassW === info.password) {
      e.preventDefault();
      await updateUser(_id, info);
      setOpen(false);
      setCheckPassW("");
    } else {
      toastErrorNotify("Passwords do not match");
    }
  };
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
        deleteUser(_id); //? _id silinecek kullanıcının idsi
      } else {
        Swal.fire("Canceled", "User deletion has been cancelled!");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Blogla-Bakalim-Profile</title>
        <meta
          name="description"
          content="Blogla-Bakalim senin en iyi profil sayfandir."
        />
      </Helmet>
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
              display: "inline-block",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
            }}
          >
            <img
              src={image}
              alt={username}
              style={{ width: "180px", height: "180px", borderRadius: "50%" }}
            />
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
            <Button sx={btnStyle} size="small" onClick={handleOpen}>
              Update your Profile
            </Button>
            {open && (
              <UpdateProfile
                info={info}
                setInfo={setInfo}
                handleSubmit={handleSubmit}
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                checkPassW={checkPassW}
                handleChangeCheckPassW={handleChangeCheckPassW}
                showCheckPassW={showCheckPassW}
                handleClickShowCheckPassW={handleClickShowCheckPassW}
              />
            )}
            <Button
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": { backgroundColor: "orange" },
              }}
              size="small"
              onClick={handleDeleteUser}
            >
              Delete your account
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
