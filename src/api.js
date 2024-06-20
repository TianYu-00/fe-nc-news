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
  return api
    .get(`/articles/${articleID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const patchArticle = (articleID, value) => {
  return api
    .patch(`/articles/${articleID}`, {
      inc_votes: value,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchCommentsOnArticle = (articleID) => {
  return api.get(`/articles/${articleID}/comments`).then((response) => {
    return response.data;
  });
};

export const postCommentOnArticle = (articleID, body, username) => {
  return api
    .post(`/articles/${articleID}/comments`, {
      body: body,
      username: username,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchUsers = () => {
  return api
    .get(`/users`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteCommentById = (commentID) => {
  return api
    .delete(`/comments/${commentID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchTopics = () => {
  return api.get("/topics").then((response) => {
    return response.data;
  });
};
