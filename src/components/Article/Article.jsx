import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle, patchArticle } from "../../api";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import Comments from "../ArticleComments/ArticleComments";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgress from "@mui/material/CircularProgress";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isArticleLoading, setIsArticleLoading] = useState(true);
  const [currentVote, setCurrentVote] = useState(0);
  const [voteSuccessAlertVisible, setVoteSuccessAlertVisible] = useState(false);
  const [voteErrorAlertVisible, setVoteErrorAlertVisible] = useState(false);
  const [voteErrorMessage, setVoteErrorMessage] = useState("");

  useEffect(() => {
    if (!article) {
      setIsArticleLoading(true);
      fetchArticle(Number(article_id))
        .then((article) => {
          setArticle(article);
          setIsArticleLoading(false);
          setCurrentVote(article.votes);
        })
        .catch((error) => {
          if (error.request.status === 404) {
            setIsArticleLoading(false);
          }
        });
    }
  }, [article_id, article, currentVote]);

  if (!article && !isArticleLoading) {
    return <h2>Article Does Not Exist</h2>;
  }

  if (!article) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "83vh",
          backgroundColor: "#1A2027",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  let articleDate = new Date(article.created_at).toUTCString();

  function onClickHandle_vote(value) {
    //Fake it
    const originalVote = currentVote;
    const fakeVote = currentVote + value;
    setCurrentVote(fakeVote);

    //Make it
    patchArticle(article_id, value)
      .then((updatedArticle) => {
        setCurrentVote(updatedArticle.votes);
        setVoteSuccessAlertVisible(true);
        setTimeout(() => setVoteSuccessAlertVisible(false), 2500);
      })
      .catch((error) => {
        setCurrentVote(originalVote);
        setVoteErrorMessage(error.message || "An error occurred");
        setVoteErrorAlertVisible(true);
        setTimeout(() => setVoteErrorAlertVisible(false), 2500);
      });
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "83vh",
          backgroundColor: "#1A2027",
        }}
      >
        <Box sx={{ maxWidth: "1500px", margin: "0 auto" }}>
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            {article.title}
          </Typography>
          <img
            src={article.article_img_url}
            alt={article.title}
            style={{ maxWidth: "1000px", width: "100%", objectFit: "cover" }}
            loading="lazy"
          />

          <Grid container sx={{ justifyContent: "center", alignItems: "center", marginBottom: "10px" }} wrap="nowrap">
            <PersonIcon />
            <Typography variant="h5">{article.author}</Typography>
          </Grid>
          <Typography variant="body2">{articleDate}</Typography>
          <Box sx={{ padding: "25px" }}>
            <Typography variant="body1">{article.body}</Typography>
          </Box>

          {voteSuccessAlertVisible && (
            <Alert severity="success" variant="outlined">
              Vote went through successfully
            </Alert>
          )}
          {voteErrorAlertVisible && (
            <Alert severity="error" variant="outlined">
              {voteErrorMessage}
            </Alert>
          )}
          <IconButton
            aria-label="article upvotes"
            onClick={() => {
              onClickHandle_vote(1);
            }}
          >
            <ThumbUpIcon />
          </IconButton>
          {currentVote}
          <IconButton
            aria-label="article upvotes"
            onClick={() => {
              onClickHandle_vote(-1);
            }}
          >
            <ThumbDownIcon />
          </IconButton>

          <Box sx={{ marginTop: "25px" }} />

          <Comments articleId={article_id} />
        </Box>
      </Box>
    </>
  );
}
