import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../UserLoginProvider/UserLoginProvider";
import "./header.css";

export default function Header() {
  const { user } = useContext(LoginContext);
  useEffect(() => {}, []);
  return (
    <>
      <h1>NC News</h1>
      <Grid container spacing={0} sx={{ justifyContent: "center" }} xs>
        <Grid sx={{ margin: "5px" }}>
          <Link to="/home" className="noDecoLink">
            Home
          </Link>
        </Grid>
        <Grid sx={{ margin: "5px" }}>
          <Link to="/login" className="noDecoLink">
            Login
          </Link>
        </Grid>
        <Grid sx={{ margin: "5px" }}>
          <Link to="/topic_articles" className="noDecoLink">
            Articles
          </Link>
        </Grid>
        <Grid
          sx={{
            flexShrink: 0,
            margin: "5px",
          }}
        >
          {/* https://placehold.co/ */}
          <Avatar alt={"place holder"} src={user ? user.avatar_url : null} sx={{ width: 27, height: 27 }} />
        </Grid>
      </Grid>
    </>
  );
}
