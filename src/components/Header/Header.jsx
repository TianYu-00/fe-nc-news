import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
export default function Header() {
  return (
    <>
      <h1>Header </h1>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid>
          <Link to="/home">Home</Link>
        </Grid>
        <Grid>
          <Link to="/topic_articles">Articles</Link>
        </Grid>
      </Grid>
    </>
  );
}
