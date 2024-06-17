import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../api";

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
  return (
    <>
      <h1>{article.title}</h1>
      <img
        src={article.article_img_url}
        alt={article.title}
        style={{ width: "100%", objectFit: "cover" }}
        loading="lazy"
      />
      <p>Author: {article.author}</p>
      <p>Description: {article.body}</p>
    </>
  );
}
