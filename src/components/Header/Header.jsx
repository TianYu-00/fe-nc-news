import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../UserLoginProvider/UserLoginProvider";
import "./header.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import ArticleIcon from "@mui/icons-material/Article";

export default function Header() {
  const { user } = useContext(LoginContext);
  useEffect(() => {}, []);
  return (
    <>
      <Box sx={{ backgroundColor: "#1A2027", margin: "0px 0px 20px 0px" }}>
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

          <Grid
            sx={{
              flexShrink: 0,
              margin: "5px",
            }}
          >
            {/* https://placehold.co/ */}
            <Avatar alt={"place holder"} src={user ? user.avatar_url : null} sx={{ width: 35, height: 35 }} />
          </Grid>
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
