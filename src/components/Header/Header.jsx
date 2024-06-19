import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../UserLoginProvider/UserLoginProvider";
export default function Header() {
  const { user } = useContext(LoginContext);
  useEffect(() => {}, []);
  return (
    <>
      <h1>NC News</h1>

      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid>
          <Link to="/home">Home</Link>
        </Grid>
        <Grid>
          <Link to="/login">Login</Link>
        </Grid>
        <Grid>
          <Link to="/topic_articles">Articles</Link>
        </Grid>
        <Grid
          sx={{
            flexShrink: 0,
          }}
        >
          {/* https://placehold.co/ */}
          <Avatar alt={"place holder"} src={user ? user.avatar_url : null} sx={{ width: 25, height: 25 }} />
        </Grid>
      </Grid>
    </>
  );
}
