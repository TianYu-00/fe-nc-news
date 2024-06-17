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
