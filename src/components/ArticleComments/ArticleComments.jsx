import React, { useState, useEffect, useContext } from "react";
import { fetchCommentsOnArticle, fetchUsers, postCommentOnArticle } from "../../api";
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
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

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
        setCommentsShowing(comments);
        setIsCommentLoading(false);
      });
    }
  }, [articleId, isCommentShowing, isSendCommentSuccessful]);

  function onClickHandle_commentSection() {
    if (!isCommentShowing) {
      setIsCommentShowing(true);
    }
  }

  function onChange_newComment(event) {
    setNewComment(event.target.value);
  }

  function onClickHandle_sendNewComment() {
    if (isLogin) {
      if (newComment !== "") {
        // Fake it till you make it
        setIsSendCommentSuccessful(true);
        const tempTime = new Date();
        const formattedDateTime = tempTime.toISOString();
        const tempComment = {
          votes: 0,
          created_at: formattedDateTime,
          author: user.username,
          body: newComment,
        };

        // Make it
        setCommentsShowing((oldComments) => [tempComment, ...oldComments]);
        // Now post it to my db
        postCommentOnArticle(articleId, newComment, user.username)
          .then((response) => {
            setNewComment("");
            setTimeout(() => setIsSendCommentSuccessful(false), 2500);
          })
          .catch((error) => {
            setIsSendUnsuccessful(true);
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
          <Alert severity="error" action={<Link to="/login">Login</Link>}>
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
              value={newComment}
              onChange={onChange_newComment}
            />
          </Grid>
          <Grid xs={12} container sx={{ marginTop: "10px" }} justifyContent="flex-end">
            <Button variant="contained" color="success" onClick={onClickHandle_sendNewComment}>
              Send
            </Button>
          </Grid>
        </Grid>

        {isCommentLoading ? <Skeleton animation="wave" /> : <p />}

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
                  <IconButton sx={{}} aria-label="upvotes">
                    <ThumbUpIcon fontSize="small" />
                    {comment.votes}
                  </IconButton>
                  <Grid sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>{commentDate}</Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}
