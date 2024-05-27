import React, { useState, useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "../components/blog/Card";
import { Box, Pagination, Stack } from "@mui/material";
import { Translate } from "@mui/icons-material";

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
