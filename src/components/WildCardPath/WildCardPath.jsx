import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function WildCardPath() {
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
          textAlign: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <h2>404</h2>
        <p>Page Not Found</p>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/home");
          }}
          sx={{ marginTop: "25px", width: "200px" }}
        >
          GO TO HOME
        </Button>
      </Box>
    </>
  );
}
