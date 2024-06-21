import React from "react";
import Box from "@mui/material/Box";
import { ReactTyped } from "react-typed"; // https://www.npmjs.com/package/react-typed

export default function Home() {
  return (
    <>
      <Box sx={{ width: "100%", height: "100vh", backgroundColor: "#1A2027" }}>
        <ReactTyped strings={["Welcome To Northcoders News"]} typeSpeed={100} backSpeed={50} loop />
        <p>Not finished</p>
      </Box>
    </>
  );
}
