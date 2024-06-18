import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from "react";
import { fetchArticles } from "./api";
import { UserLoginProvider } from "./components/UserLoginProvider/UserLoginProvider";

// routes
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Topic_Articles from "./components/Topic_Articles/Topic_Articles";
import Article from "./components/Article/Article";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserLoginProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/topic_articles" element={<Topic_Articles />} />
            <Route path="/article/:article_id" element={<Article />} />
          </Routes>
        </UserLoginProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
