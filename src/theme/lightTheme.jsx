import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: 'light',

    background: {
      default: '#f0f2f5',     // Xám nhạt pha chút xanh - nền dịu
      paper: '#ffffff',       // Card / Paper vẫn trắng để tạo lớp nổi bật
    },

    text: {
      primary: '#1c1c1e',     // Đen nhẹ, không quá tương phản
      secondary: '#4d4d4f',   // Xám tro dịu
    },

    primary: {
      main: '#5c6ac4',        // Xanh tím nhạt, dễ chịu (Polaris vibe)
    },

    secondary: {
      main: '#f472b6',        // Hồng pastel nhẹ
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
