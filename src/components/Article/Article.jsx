import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../api";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(Number(article_id)).then((article) => {
      setArticle(article);
    });
  }, [article_id]);

  if (!article) {
    return <p>Loading Content...</p>;
  }

  // console.log(article);
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
      <IconButton aria-label="delete">
        <ThumbUpIcon />
        {article.votes}
      </IconButton>
    </>
  );
}
