import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    // Nền tổng thể và các surface
    background: {
      default: '#000000',   // Nền đen
      paper: '#1A1A1A',     // Surface màu đen xám, tạo độ phân biệt so với default
    },

    text: {
      primary: '#ffffff',   // Text trắng nổi bật trên nền đen
    },

    primary: {
      main: '#ff4081',      // Màu hồng sáng làm điểm nhấn chính
    },

    secondary: {
      main: '#80d8ff',      // Màu xanh nhạt cho các điểm nhấn phụ
    },
  },
});

export default darkTheme;
