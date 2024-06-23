import { createTheme } from "@mui/material/styles";
// https://next.mui.com/material-ui/customization/default-theme/
// https://imagecolorpicker.com/color-code/ffffff
// https://encycolorpedia.com/html

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#22282f",
      paper: "#1b2026",
      container: "#1A2027",
      footer: "#22282F",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
  typography: {
    fontFamily: "Dosis, Arial, sans-serif",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8F6F4",
      paper: "#E3F4F4",
      container: "#D2E9E9",
      footer: "#C4DFDF",
    },
    text: {
      primary: "#000000",
      secondary: "#37474f",
    },
  },
  typography: {
    fontFamily: "Dosis, Arial, sans-serif",
  },
});

export { darkTheme, lightTheme };
