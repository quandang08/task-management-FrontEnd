import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    background: {
      default: '#000000',
      paper: '#1A1A1A',
    },

    text: {
      primary: '#ffffff',
    },

    primary: {
      main: '#ff4081',
    },

    secondary: {
      main: '#80d8ff',
    },
  },
});

export default darkTheme;
