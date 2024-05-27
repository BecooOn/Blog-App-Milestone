import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyle } from "../../styles/globalStyles";
import { useNavigate } from "react-router-dom";

const UpdateBlogModal = ({ handleUpdateBlogClose, open, singleBlog }) => {
  const [info, setInfo] = useState({
    category: "",
    title: "",
    content: "",
    image: "",
    isPublish: "",
  });
  // console.log(singleBlog);
  const {getBlogs, updateBlog } = useBlogCalls();
  const { categories } = useSelector((state) => state.blog);

  useEffect(() => {
    // if (singleBlog) {
    setInfo({
      category: singleBlog.categoryId?._id || "",
      title: singleBlog.title || "",
      content: singleBlog.content || "",
      image: singleBlog.image || "",
      isPublish: singleBlog.isPublish,
    });
    // }
  }, [open]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, title, content, image, isPublish } = info;
    let information = {
      categoryId: category,
      title: title,
      content: content,
      image: image,
      isPublish: isPublish,
    };
    updateBlog("blogs", singleBlog._id, information);
    getBlogs("blogs")
    handleUpdateBlogClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleUpdateBlogClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleUpdateBlogClose}
              sx={{ "&:hover": { color: "red" } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <TextField
              label="Title"
              name="title"
              id="title"
              type="text"
              variant="outlined"
              value={info.title}
              onChange={handleChange}
              required
            />

            <TextField
              label="Image URL"
              name="image"
              id="image"
              type="text"
              variant="outlined"
              value={info.image}
              onChange={handleChange}
              required
            />

            <FormControl sx={{ my: 2, width: "100%" }}>
              <InputLabel id="isPublish">Status*</InputLabel>
              <Select
                labelId="isPublish"
                name="isPublish"
                id="isPublish"
                value={info.isPublish}
                label="Status"
                onChange={handleChange}
                required
              >
                <MenuItem value="">Please choose status...</MenuItem>
                <MenuItem value={true}>Published</MenuItem>
                <MenuItem value={false}>Drafted</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ my: 2, width: "100%" }}>
              <InputLabel id="category">Category*</InputLabel>
              <Select
                labelId="category"
                name="category"
                id="category"
                value={info.category}
                label="Category"
                onChange={handleChange}
                required
              >
                <MenuItem value="">Please choose category...</MenuItem>
                {categories?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Content"
              name="content"
              id="content"
              type="text"
              variant="outlined"
              value={info.content}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
            <Button variant="contained" type="submit">
              UPDATE BLOG
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateBlogModal;
