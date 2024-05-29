import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button } from "@mui/material";
import { btnStyle } from "../../styles/globalStyles";
import useBlogCalls from "../../hooks/useBlogCalls";

const TextEditor = ({ id }) => {
  const [postComment, setPostComment] = useState({
    blogId: id,
    comment: "",
  });

  const { createComment } = useBlogCalls();

  const handleTextAreaChange = (value) => {
    //? ReactQuill onChange eventi yeni değeri doğrudan verir.
    setPostComment((prev) => ({ ...prev, comment: value }));
  };

  const handleSubmit = async () => {
    //* HTML etiketlerini regex ile temizleyebiliriz ya da tercih olarak dompurify eklenmeli
    const cleanComment = postComment.comment.replace(/<[^>]*>?/gm, "");
    await createComment({ ...postComment, comment: cleanComment });
    setPostComment({
      blogId: id,
      comment: "",
    });
  };

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
        <ReactQuill
          value={postComment?.comment}
          onChange={handleTextAreaChange}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              ["link", "image"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "link",
            "image",
            "color",
            "background",
            "align",
          ]}
          style={{ height: "200px" }}
        />
      </Box>
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button onClick={handleSubmit} sx={btnStyle}>
          Add Comment
        </Button>
      </Box>
    </>
  );
};

export default TextEditor;
