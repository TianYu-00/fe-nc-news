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
import WildCardPath from "./components/WildCardPath/WildCardPath";
import Footer from "./components/Footer/Footer";

//
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "./theme.js";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <UserLoginProvider>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/topic_articles" element={<Topic_Articles />} />
              <Route path="/article/:article_id" element={<Article />} />
              <Route path="*" element={<WildCardPath />} />
            </Routes>
            <Footer />
          </UserLoginProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
