import { createTheme } from "@mui/material/styles";
// https://next.mui.com/material-ui/customization/default-theme/
// https://imagecolorpicker.com/color-code/ffffff
// https://encycolorpedia.com/html

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // #90caf9 Malibu (Blue)
    },
    secondary: {
      main: "#f48fb1", // #f48fb1 Mauvelous (Pink)
    },
    background: {
      default: "#222831", // #222831 Ebony Clay (Black)
      paper: "#202833", // #393E46 Bright Gray (Gray)
    },
    text: {
      primary: "#ffffff", // White
      secondary: "#b0bec5", // #b0bec5 Tower Gray
    },
  },
});

export default theme;
