import React from "react";
import Box from "@mui/material/Box";
import { ReactTyped } from "react-typed"; // https://www.npmjs.com/package/react-typed
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "83vh",
          backgroundColor: "#1A2027",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: "3rem",
            marginBottom: "2rem",
          }}
        >
          <Typography variant="h2" gutterBottom>
            WELCOME TO&nbsp;
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ fontSize: "inherit" }}>
            <ReactTyped strings={["Northcoders News", "My Frontend Portfolio"]} typeSpeed={100} backSpeed={50} loop />
          </Typography>
        </Box>
        <Button
          sx={{
            marginTop: "1rem",
          }}
          onClick={() => {
            navigate("/topic_articles");
          }}
          size="large"
        >
          GET STARTED
        </Button>
      </Box>
    </>
  );
}
