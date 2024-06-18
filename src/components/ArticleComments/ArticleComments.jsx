import React, { useState, useEffect } from "react";
import { fetchCommentsOnArticle, fetchUsers } from "../../api";
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

export default function ArticleComments({ articleId }) {
  const [isCommentShowing, setIsCommentShowing] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [commentsShowing, setCommentsShowing] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((users) => {
      setAllUsers(users);
    });

    if (isCommentShowing && allComments.length <= 0) {
      setIsCommentLoading(true);
      fetchCommentsOnArticle(Number(articleId)).then((comments) => {
        setAllComments(comments);
        setCommentsShowing(comments);
        setIsCommentLoading(false);
      });
    }
  }, [articleId, isCommentShowing]);

  function onClickHandle_commentSection() {
    if (!isCommentShowing) {
      setIsCommentShowing(true);
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
        <Grid container>
          <Grid xs={12}>
            <TextField id="filled-multiline-static" fullWidth label="Comment" multiline rows={2} defaultValue="" />
          </Grid>
          <Grid xs={12} container sx={{ marginTop: "10px" }} justifyContent="flex-end">
            <Button variant="contained" color="success">
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
