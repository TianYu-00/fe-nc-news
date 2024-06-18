import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle, fetchCommentsOnArticle, fetchUsers } from "../../api";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [isCommentShowing, setIsCommentShowing] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [commentsShowing, setCommentsShowing] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [isArticleFound, setIsArticleFound] = useState(undefined);

  useEffect(() => {
    fetchUsers().then((users) => {
      setAllUsers(users);
    });

    if (!article) {
      setIsArticleLoading(true);
      fetchArticle(Number(article_id))
        .then((article) => {
          setIsArticleFound(true);
          setArticle(article);
          setIsArticleLoading(false);
        })
        .catch((error) => {
          if (error.request.status === 404) {
            setIsArticleFound(false);
            setIsArticleLoading(false);
          }
        });
    }

    if (isCommentShowing && allComments.length <= 0) {
      setIsCommentLoading(true);
      fetchCommentsOnArticle(Number(article_id)).then((comments) => {
        setAllComments(comments);
        setCommentsShowing(comments);
        setIsCommentLoading(false);
      });
    }
  }, [article_id, isCommentShowing]);

  if (isArticleLoading) {
    return <p>Loading Content...</p>;
  }

  if (!isArticleFound && !isArticleLoading) {
    return <h2>Article Does Not Exist</h2>;
  }

  let articleDate = new Date(article.created_at).toUTCString();

  function onClickHandle_commentSection() {
    if (!isCommentShowing) {
      setIsCommentShowing(true);
    }
  }

  return (
    <>
      <h2>{article.title}</h2>
      <img
        src={article.article_img_url}
        alt={article.title}
        style={{ width: "100%", objectFit: "cover" }}
        loading="lazy"
      />
      <p>Author: {article.author}</p>
      <p>{articleDate}</p>
      <p>{article.body}</p>
      <IconButton aria-label="article upvotes">
        <ThumbUpIcon />
        {article.votes}
      </IconButton>
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
                      {article.votes}
                    </IconButton>
                    <Grid sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>{commentDate}</Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
