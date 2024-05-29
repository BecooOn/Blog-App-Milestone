import React, { useState, useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "../components/blog/Card";
import Box from "@mui/material/Box";
import { Helmet } from 'react-helmet-async';

export default function Dashboard() {
  const { getBlogs, getPaginatedBlogs } = useBlogCalls();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBlogs("blogs");
    getBlogs("users");
    getPaginatedBlogs(page);
  }, [page]);

  return (
    <>
    <Helmet>
        <title>Blogla-Bakalim-Home-Page</title>
        <meta
          name="description"
          content="Blogla-Bakalim anasayfasinda tum bloglari bulabilirsin."
        />
      </Helmet>
    <Box>
      <Card page={page} setPage={setPage} />
    </Box></>
  );
}
