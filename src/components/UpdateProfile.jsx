import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { btnStyle } from "../styles/globalStyles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 28,
  p: 2,
  margin: "30px 0",
  maxHeight: "90vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
};

export default function UpdateProfile({
  info,
  setInfo,
  handleSubmit,
  open,
  setOpen,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Button sx={btnStyle} size="small" onClick={handleOpen}>
        Update your Profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ "&:hover": { color: "red" } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                border: "2px solid white",
                p: 4,
                backgroundColor: "#e4cbcb",
                boxShadow: "0 0 10px black",
              }}
            >
              <TextField
                label="Image"
                name="image"
                id="image"
                type="text"
                variant="outlined"
                value={info.image}
                onChange={handleChange}
              />
              <TextField
                label="User Name"
                name="username"
                id="username"
                type="text"
                variant="outlined"
                value={info.username}
                onChange={handleChange}
              />
              <TextField
                label="First Name"
                name="firstName"
                id="firstName"
                type="text"
                variant="outlined"
                value={info.firstName}
                onChange={handleChange}
              />
              <TextField
                label="Last Name"
                name="lastName"
                id="lastName"
                type="text"
                variant="outlined"
                value={info.lastName}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                id="email"
                type="email"
                variant="outlined"
                value={info.email}
                onChange={handleChange}
              />
              <TextField
                label="City"
                name="city"
                id="city"
                type="text"
                variant="outlined"
                value={info.city}
                onChange={handleChange}
              />
              <TextField
                label="Bio"
                name="bio"
                id="bio"
                type="text"
                variant="outlined"
                value={info.bio}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={info.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant="contained" size="large">
                UPDATE
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
