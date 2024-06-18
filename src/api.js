import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-portfolio-1.onrender.com/api",
});

export const fetchArticles = () => {
  return api.get("/articles").then((response) => {
    // console.log(response);
    return response.data;
  });
};

export const fetchArticle = (articleID) => {
  return api.get(`/articles/${articleID}`).then((response) => {
    return response.data;
  });
};
