import {
  Avatar,
  Box,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const formatDate = (isoString) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", options);
};

const CommentForm = ({ comments, blogs }) => {
  const [comment, setComment] = useState("");

  const filteredComment = blogs.filter((blog) => blog?.comments);
  const handleTextAreaChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = () => {
    //!------> yorum istek atılacak, post
    setComment("");
  };
  return (
    <Box>
      <Box>
        <TextareaAutosize
          value={comment}
          onChange={handleTextAreaChange}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            outline: "none",
            resize: "none",
            textAlign: "justify",
            lineHeight: "1.5",
            height: "5rem",
            padding: "10px",
          }}
        />
        <Button onClick={handleSubmit} sx={{ mt: 1 }}>
          Add Comment
        </Button>
      </Box>
      <Box>
        {comments.map((item) => (
          <Box key={item.id} sx={{ mt: 1, mb: 1 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar>
                {item?.userId?.username.slice(0, 1).toUpperCase()}
              </Avatar>
              <Box>
                <Typography>{item?.userId?.username}</Typography>
                <Typography sx={{ fontSize: "12px", color: "gray" }}>
                  {formatDate(item?.createdAt)}
                </Typography>
              </Box>
            </Box>

            {/* <Typography>item</Typography> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CommentForm;
