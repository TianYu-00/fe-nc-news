import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {backToTopButton && (
        <IconButton
          aria-label="back to top"
          onClick={scrollUp}
          sx={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            backgroundColor: (theme) => theme.palette.background.container,
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </>
  );
}
