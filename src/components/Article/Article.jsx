import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../api";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import Comments from "../ArticleComments/ArticleComments";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isArticleLoading, setIsArticleLoading] = useState(true);

  useEffect(() => {
    if (!article) {
      setIsArticleLoading(true);
      fetchArticle(Number(article_id))
        .then((article) => {
          setArticle(article);
          setIsArticleLoading(false);
        })
        .catch((error) => {
          if (error.request.status === 404) {
            setIsArticleLoading(false);
          }
        });
    }
  }, [article_id, article]);

  if (!article && !isArticleLoading) {
    return <h2>Article Does Not Exist</h2>;
  }

  if (!article) {
    return <p>Loading Content...</p>;
  }

  let articleDate = new Date(article.created_at).toUTCString();

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
      <Comments articleId={article_id} />
    </>
  );
}
