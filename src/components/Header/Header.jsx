import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../UserLoginProvider/UserLoginProvider";
import "./header.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import ArticleIcon from "@mui/icons-material/Article";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import Button from "@mui/material/Button";
import HeaderAvatarWithHoverBox from "../OnHoverAvatar/OnHoverAvatar";
import { useNavigate } from "react-router-dom";

export default function Header({ isDarkMode, toggleTheme }) {
  const { isLogin, setIsLogin, user, setUser } = useContext(LoginContext);
  const navigate = useNavigate();

  const onClickHandle_LogOut = () => {
    setIsLogin(false);
    setUser([]);
  };
  const onClickHandle_Login = () => {
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ backgroundColor: (theme) => theme.palette.background.paper, margin: "0px 0px 20px 0px" }}>
        <Typography variant="h1" gutterBottom>
          NC News
        </Typography>
        <Grid container sx={{ alignItems: "center", justifyContent: "center" }} xs>
          <Grid>
            <HomeIcon />
          </Grid>
          <Grid>
            <Typography variant="body1" gutterBottom>
              <Link to="/home" className="noDecoLink">
                Home
              </Link>
            </Typography>
          </Grid>

          <Grid>
            <LoginIcon />
          </Grid>
          <Grid>
            <Typography variant="body1" gutterBottom>
              <Link to="/login" className="noDecoLink">
                Login
              </Link>
            </Typography>
          </Grid>

          <Grid>
            <ArticleIcon />
          </Grid>
          <Grid>
            <Typography variant="body1" gutterBottom>
              <Link to="/topic_articles" className="noDecoLink">
                Articles
              </Link>
            </Typography>
          </Grid>

          {/* {console.log(user)} */}
          <HeaderAvatarWithHoverBox
            avatarURL={user ? user.avatar_url : null}
            avatarAlt="Avatar"
            boxContent={
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.palette.background.default,
                  width: "150px",
                  height: "150px",
                  border: `1px solid ${theme.palette.background.opposite}`,
                })}
              >
                <Stack>
                  <Typography variant="body1" gutterBottom sx={{ marginTop: "5px" }}>
                    Name: {user.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Username: {user.username}
                  </Typography>
                  {isLogin ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={onClickHandle_LogOut}
                      sx={{ margin: "5px auto" }}
                    >
                      LogOut
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={onClickHandle_Login} sx={{ margin: "5px auto" }}>
                      Go To Login
                    </Button>
                  )}
                </Stack>
              </Box>
            }
          />

          {isDarkMode ? (
            <IconButton aria-label="dark mode" onClick={toggleTheme}>
              <DarkModeIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="light mode" onClick={toggleTheme}>
              <LightModeIcon />
            </IconButton>
          )}
        </Grid>
      </Box>
    </>
  );
}

// If the margin property has four values:
// margin: 25px 50px 75px 100px;
// top margin is 25px
// right margin is 50px
// bottom margin is 75px
// left margin is 100px
