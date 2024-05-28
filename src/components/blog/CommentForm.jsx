import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
import CommentEditor from "./CommentEditor";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";

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

const CommentForm = ({ id }) => {
  //* id ilgili blog id'sini prop olarak aldım
  const blogID = id; //! karışıklık olmaması için id'yi yeni ve daha anlamlı değişkene aktardım
  const { singleBlog, comments } = useSelector((state) => state.blog);
  const { _id } = useSelector((state) => state.auth); //? currentUser için
  const currentUserId = _id;
  const { getComments, updateComment, deleteComment } = useBlogCalls();
  const [editComment, setEditComment] = useState({
    blogId: blogID,
    comment: "",
  });
  const [editCommentId, setEditCommentId] = useState(null);

  useEffect(() => {
    getComments();
  }, [])
  
  const filteredComments = comments.filter(
    (comment) => comment.blogId === blogID
  );
  // console.log(filteredComments);

  const handleCommentEdit = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditComment((prev) => ({ ...prev, comment: commentText }));
  };

  const handleEditChange = (e) => {
    setEditComment((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleCommentSubmit = async () => {
    if (editCommentId && editComment.comment) {
      try {
        await updateComment(editCommentId, editComment);
        setEditCommentId(null);
        setEditComment({
          blogId: blogID,
          comment: "",
        });
      } catch (error) {
        console.error("Error updating comment: ", error);
        // Handle error
      }
    }
  };

  const handleCommentDelete = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Comment will be deleted and cannot be restored!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(commentId, blogID);
      } else {
        Swal.fire("Canceled", "Comment deletion has been cancelled!");
      }
    });
  };

  return (
    <Box>
      <Box>
        <CommentEditor id={blogID} />
      </Box>
      <Box sx={{ textAlign: "justify", maxWidth: "600px" }}>
        {filteredComments?.map((item) => (
          <Box key={item?._id} sx={{ mt: 1, mb: 1 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar>
                {item?.userId?.username?.slice(0, 1).toUpperCase()}
              </Avatar>
              <Box sx={{ display: "flex", flex: 1 }}>
                {/* //*flex: 1 ile öğelerin tüm genişliği kaplamasını sağladım. */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography>{item?.userId?.username}</Typography>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>
                    {formatDate(item?.createdAt)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {item?.userId?._id === currentUserId && (
                    <Box>
                      <IconButton
                        sx={{ color: "teal", cursor: "pointer", mx: 1 }}
                        onClick={() =>
                          handleCommentEdit(item?._id, item?.comment)
                        }
                      >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleCommentDelete(item?._id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            {editCommentId === item?._id ? (
              <Box>
                <TextField
                  label="Edit Comment"
                  name="comment"
                  id="comment"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={editComment.comment}
                  onChange={handleEditChange}
                  required
                />
                <Box mt={1}>
                  <Button variant="contained" onClick={handleCommentSubmit}>
                    Submit
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography>{item?.comment}</Typography>
            )}

            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CommentForm;
