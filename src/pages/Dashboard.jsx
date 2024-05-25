import * as React from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "../components/blog/Card";
import { Box } from "@mui/material";
// import Profile from "./Profile"

export default function Dashboard({ setToggle }) {
  const { getBlogs } = useBlogCalls();
  React.useEffect(() => {
    getBlogs("blogs");
    getBlogs("users");
  }, []);

  return (
    <Box
    //  sx={{border:"1px solid gray"}}
    >
      <Card setToggle={setToggle} />
      {/* <Profile/> */}
    </Box>
  );
}
