import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import { toastWarnNotify } from "../helper/ToastNotify";
import { Helmet } from 'react-helmet-async';

const NewBlog = () => {
  const [info, setInfo] = useState({
    title: "",
    image: "",
    category: "",
    isPublish: "",
    content: "",
  });
  const { categories } = useSelector((state) => state.blog);
  const { getBlogs, createBlog } = useBlogCalls();
  // console.log(categories);

  useEffect(() => {
    getBlogs("categories");
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, title, content, image, isPublish } = info;

    //? Alanlar boşsa hata mesajı
    if (!category || !title || !content || !image || isPublish === "") {
      toastWarnNotify("Please fill in all fields!");
      return;
    }
    let information = {
      title: title,
      image: image,
      categoryId: category,
      isPublish: isPublish,
      content: content,
    };
    createBlog("blogs", information);
    setInfo({
      title: "",
      image: "",
      category: "",
      isPublish: "",
      content: "",
    });
  };

  return (
    <>
     <Helmet>
        <title>Blogla-Bakalim-New-Blog</title>
        <meta
          name="description"
          content="Blogla-Bakalim'da blog oluştur."
        />
      </Helmet>
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: "600px",
            border: "2px solid white",
            p: 4,
            m: "10px auto",
            backgroundColor: "#e4cbcb",
            boxShadow: "0 0 10px black",
          }}
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
          <Button type="submit" variant="contained" size="large">
            {info?.isPublish ? "PUBLISH NEW BLOG" : "DRAFT NEW BLOG"}
          </Button>
        </Box>
      </form>
    </Box></>
  );
};

export default NewBlog;
