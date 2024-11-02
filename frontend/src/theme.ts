import { createTheme } from "@mui/material";

const PRIMARY_FS_COLOR = "#000080";

const theme = createTheme({
  palette: {
    primary: { main: PRIMARY_FS_COLOR },
    background: { default: "grey" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: PRIMARY_FS_COLOR,
        },
        outlined: {
          borderColor: PRIMARY_FS_COLOR,
          color: PRIMARY_FS_COLOR,
        },
      },
    },
  },
});

export default theme;
