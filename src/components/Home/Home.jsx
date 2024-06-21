import React from "react";
import Box from "@mui/material/Box";
import { ReactTyped } from "react-typed"; // https://www.npmjs.com/package/react-typed
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "83vh",
          backgroundColor: "#1A2027",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: "3rem",
            marginTop: "-25vh",
          }}
        >
          <Typography variant="h2" gutterBottom>
            WELCOME TO&nbsp;
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontSize: "inherit" }}>
            <ReactTyped strings={["Northcoders News", "My Frontend Portfolio"]} typeSpeed={100} backSpeed={50} loop />
          </Typography>
        </Box>
      </Box>
    </>
  );
}
