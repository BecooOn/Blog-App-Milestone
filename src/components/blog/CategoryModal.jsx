import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import useBlogCalls from "../../hooks/useBlogCalls";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CategoryModal({ open, handleClose }) {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const { createCategory } = useBlogCalls();

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };
  // console.log(open);
  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(newCategory);
    setNewCategory({
      name: "",
    });
    handleClose();
  };

  return (
    <div>
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
              top: 0,
              right: 0,
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
            <TextField
              label="New Category"
              name="name" //! backend isteğinde name olarak tanımlandığı için
              id="name"
              type="text"
              variant="outlined"
              value={newCategory.name}
              onChange={handleChange}
              sx={{ width: "100%", my: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ width: "100%", my: 2 }}
            >
              ADD
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
