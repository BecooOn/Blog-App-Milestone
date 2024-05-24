import * as React from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import Card from "../components/blog/Card";

export default function Dashboard({ setToggle }) {
  const { getBlogs } = useBlogCalls();
  React.useEffect(() => {
    getBlogs("blogs");
    getBlogs("users");
  }, []);

  return (
    <>
      <Card setToggle={setToggle} />
    </>
  );
}
