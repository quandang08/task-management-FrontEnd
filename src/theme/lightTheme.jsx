import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: 'light',

    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },

    text: {
      primary: '#1c1c1e',
      secondary: '#4d4d4f',
    },

    primary: {
      main: '#5c6ac4',
    },

    secondary: {
      main: '#f472b6',
    },
  },

  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

export default lightTheme;
