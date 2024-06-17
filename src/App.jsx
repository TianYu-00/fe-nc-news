import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import { fetchArticles } from "./api";

// routes
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Topic_Articles from "./components/Topic_Articles/Topic_Articles";
import Article from "./components/Article/Article";

function App() {
  const [articles, setAllArticles] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/topic_articles"
            element={<Topic_Articles articles={articles} setAllArticles={setAllArticles} />}
          />
          <Route path="/article" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
