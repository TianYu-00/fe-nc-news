import React, { useState, useEffect, useContext, useRef } from "react";
import { fetchCommentsOnArticle, fetchUsers, postCommentOnArticle, deleteCommentById, patchComment } from "../../api";
import { LoginContext } from "../UserLoginProvider/UserLoginProvider";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function ArticleComments({ articleId }) {
  const [isCommentShowing, setIsCommentShowing] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [commentsShowing, setCommentsShowing] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { isLogin, user } = useContext(LoginContext);
  const [isNeedLoginVisible, setIsNeedLoginVisible] = useState(false);
  const [isEmptyCommentVisible, setIsEmptyCommentVisible] = useState(false);
  const [isSendCommentSuccessful, setIsSendCommentSuccessful] = useState(false);
  const [isSendUnsuccessful, setIsSendUnsuccessful] = useState(false);
  const textFieldRef = useRef(null);
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const maxCommentsPerPage = 7;
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(maxCommentsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers().then((users) => {
      setAllUsers(users);
    });
  }, []);

  useEffect(() => {
    if (isCommentShowing && (allComments.length <= 0 || !isSendCommentSuccessful)) {
      setIsCommentLoading(true);
      fetchCommentsOnArticle(Number(articleId)).then((comments) => {
        setAllComments(comments);
        setCommentsShowing(comments.slice(0, maxCommentsPerPage));
        setIsCommentLoading(false);
      });
    }
  }, [articleId, isCommentShowing, isSendCommentSuccessful]);

  function onClickHandle_commentSection() {
    if (!isCommentShowing) {
      setIsCommentShowing(true);
    }
  }

  function onClickHandle_sendNewComment() {
    if (isLogin) {
      if (newComment !== "") {
        setIsSendCommentSuccessful(true);
        const tempTime = new Date();
        const formattedDateTime = tempTime.toISOString();
        const tempComment = {
          votes: 0,
          created_at: formattedDateTime,
          author: user.username,
          body: newComment,
          isFake: true,
        };
        setIsSendingComment(true);

        setCommentsShowing((oldComments) => [tempComment, ...oldComments]);
        postCommentOnArticle(articleId, newComment, user.username)
          .then((response) => {
            setNewComment("");
            if (textFieldRef.current) {
              textFieldRef.current.value = "";
            }
            setIsSendingComment(false);
            setTimeout(() => setIsSendCommentSuccessful(false), 2500);
          })
          .catch((error) => {
            setIsSendUnsuccessful(true);
            setIsSendingComment(false);
            setCommentsShowing(allComments);
            setTimeout(() => setIsSendUnsuccessful(false), 2500);
          });
      } else {
        setIsEmptyCommentVisible(true);
        setTimeout(() => setIsEmptyCommentVisible(false), 2500);
      }
    } else {
      setIsNeedLoginVisible(true);
      setTimeout(() => setIsNeedLoginVisible(false), 2500);
    }
  }

  function onClickHandle_deleteComment(commentID) {
    setCommentsShowing((prevComments) => prevComments.filter((comment) => comment.comment_id !== commentID));
    deleteCommentById(commentID)
      .then(() => {
        setAlertMessage("Comment deleted successfully");
        setOpen(true);
        setAllComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== commentID));
      })
      .catch((error) => {
        setAlertMessage("Server failed to delete comment");
        setOpen(true);
        setCommentsShowing(allComments);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const onClickHandle_loadMore = () => {
    setVisibleCommentsCount((prevCount) => prevCount + maxCommentsPerPage);
    setCommentsShowing(allComments.slice(0, visibleCommentsCount + maxCommentsPerPage));
  };

  function onClickHandle_vote(comment, value) {
    // check login state
    if (!isLogin) {
      setAlertMessage("Please log in to vote.");
      setOpen(true);
      return;
    }

    if (comment.author === user.username) {
      setAlertMessage("You cannot vote for your own comment.");
      setOpen(true);
      return;
    }

    //Fake it
    const originalCommentsShowing = [...commentsShowing];
    setCommentsShowing((oldComments) => {
      const updatedComments = oldComments.map((currentComment) => {
        if (currentComment.comment_id === comment.comment_id) {
          return {
            ...currentComment,
            votes: currentComment.votes + value,
          };
        }
        return currentComment;
      });
      return updatedComments;
    });

    // Make it
    patchComment(comment.comment_id, value)
      .then((updatedComment) => {
        setAlertMessage("Comment vote has been processed");
        setOpen(true);
      })
      .catch((error) => {
        setAlertMessage("Server failed to process comment vote");
        setOpen(true);
        setCommentsShowing(originalCommentsShowing);
      });
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        onClick={() => {
          onClickHandle_commentSection();
        }}
      >
        <Typography>{isCommentLoading ? "Loading Comments..." : "Show/Hide Comment Section"} </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isNeedLoginVisible && (
          <Alert
            severity="error"
            action={
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                size="small"
              >
                Login
              </Button>
            }
          >
            Not Logged In.
          </Alert>
        )}
        {isEmptyCommentVisible && <Alert severity="warning">Comment can not be empty.</Alert>}
        {isSendCommentSuccessful && <Alert severity="success">Comment has been sent.</Alert>}
        {isSendUnsuccessful && <Alert severity="error">Server failed to process the comment.</Alert>}

        <Grid container>
          <Grid xs={12}>
            <TextField
              id="filled-multiline-static"
              fullWidth
              label="Comment"
              multiline
              rows={2}
              inputRef={textFieldRef}
              onBlur={(event) => {
                setNewComment(event.target.value);
              }}
            />
          </Grid>
          <Grid xs={12} container sx={{ marginTop: "10px" }} justifyContent="flex-end">
            {
              <Button
                variant="contained"
                color="success"
                onClick={onClickHandle_sendNewComment}
                disabled={isSendingComment}
              >
                Send
              </Button>
            }
          </Grid>
        </Grid>

        {isCommentLoading ? <p>Syncing Comments...</p> : <p />}

        {commentsShowing.map((comment, index) => {
          const commentDate = new Date(comment.created_at).toLocaleString("en-UK", {
            dateStyle: "short",
            timeStyle: "short",
          });
          const avatarImgURL = allUsers.reduce((tempURL, user) => {
            if (user.username === comment.author) {
              tempURL = user.avatar_url;
            }
            return tempURL;
          }, "");

          const isRealComment = !comment.isFake;

          return (
            <React.Fragment key={index}>
              <Grid container wrap="nowrap" sx={{ marginBottom: "20px", borderBottom: "1px solid grey" }}>
                <Grid
                  sx={{
                    width: 60,
                    flexShrink: 0,
                  }}
                >
                  <Avatar
                    alt={comment.author}
                    src={avatarImgURL}
                    sx={{ border: "1px solid black", width: 45, height: 45 }}
                  />
                </Grid>

                <Grid container sx={{ textAlign: "left" }} xs>
                  <Grid sx={{ fontWeight: "bold", margin: "0" }} xs={12}>
                    {comment.author}
                  </Grid>
                  <Grid xs={12} sx={{}}>
                    {comment.body}
                  </Grid>

                  {/* LIKE DISLIKE BUTTON */}
                  <IconButton
                    sx={{}}
                    aria-label="upvotes"
                    disabled={!isRealComment}
                    onClick={() => {
                      onClickHandle_vote(comment, 1);
                    }}
                  >
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                  <Grid sx={{ alignContent: "center" }}>{comment.votes}</Grid>
                  <IconButton
                    sx={{}}
                    aria-label="downvote"
                    disabled={!isRealComment}
                    onClick={() => {
                      onClickHandle_vote(comment, -1);
                    }}
                  >
                    <ThumbDownIcon fontSize="small" />
                  </IconButton>
                  {/* LIKE DISLIKE BUTTON END */}

                  <Grid sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>{commentDate}</Grid>
                  {comment.author === user.username ? (
                    <IconButton
                      aria-label="delete"
                      disabled={!isRealComment}
                      onClick={() => {
                        onClickHandle_deleteComment(comment.comment_id);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  ) : null}
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}

        {visibleCommentsCount < allComments.length && (
          <Button variant="outlined" onClick={onClickHandle_loadMore}>
            Load More Comments
          </Button>
        )}
      </AccordionDetails>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose} message={alertMessage} action={action} />
    </Accordion>
  );
}
