import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function WildCardPath() {
  const navigate = useNavigate();
  return (
    <>
      <h2>404</h2>
      <p>Page Not Found</p>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/home");
        }}
      >
        GO TO HOME
      </Button>
    </>
  );
}
