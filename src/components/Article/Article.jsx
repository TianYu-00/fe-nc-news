import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle, patchArticle } from "../../api";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import Comments from "../ArticleComments/ArticleComments";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

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
    return <p>Loading Content...</p>;
  }

  let articleDate = new Date(article.created_at).toUTCString();

  function onClickHandle_vote(value) {
    patchArticle(article_id, value)
      .then((updatedArticle) => {
        setCurrentVote(updatedArticle.votes);
        setVoteSuccessAlertVisible(true);
        setTimeout(() => setVoteSuccessAlertVisible(false), 2500);
      })
      .catch((error) => {
        setVoteErrorMessage(error.message || "An error occurred");
        setVoteErrorAlertVisible(true);
        setTimeout(() => setVoteErrorAlertVisible(false), 2500);
      });
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

      <Comments articleId={article_id} />
    </>
  );
}
