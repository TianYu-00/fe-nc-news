import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Footer() {
  return (
    <Box
      sx={{
        // border: "1px solid white",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        backgroundColor: "#161a1e",
      }}
    >
      <Button
        onClick={() => {
          window.open("https://github.com/TianYu-00/fe-nc-news", "_blank");
        }}
        size="small"
      >
        Github Repo
      </Button>
      <Typography variant="body1" gutterBottom>
        Copyright © 2024 TianYu. All rights reserved.
      </Typography>
    </Box>
  );
}
