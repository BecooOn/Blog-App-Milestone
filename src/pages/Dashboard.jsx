import React, { useState, useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "../components/blog/Card";
import Box from "@mui/material/Box";

export default function Dashboard() {
  const { getBlogs, getPaginatedBlogs } = useBlogCalls();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBlogs("blogs");
    getBlogs("users");
    getPaginatedBlogs(page);
  }, [page]);

  return (
    <Box>
      <Card page={page} setPage={setPage} />
    </Box>
  );
}
