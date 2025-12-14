import { createTheme } from "@mui/material/styles";

// Custom color palette
const customColors = {
  gray: "#636363",
  blue: "#66a2fb",
  yellow: "#e1db6e",
  dark: "#21252b",
  darker: "#282c34",
  light: "#f3f3f3",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: customColors.blue,
      light: "#88b8fc",
      dark: "#4d8ae8",
    },
    secondary: {
      main: customColors.yellow,
      light: "#e8e395",
      dark: "#cdc858",
    },
    background: {
      default: customColors.darker,
      paper: customColors.dark,
    },
    text: {
      primary: customColors.light,
      secondary: customColors.gray,
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"SF Pro Display"',
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12, // macOS-style rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(102, 162, 251, 0.3)",
            transform: "translateY(-1px)",
            transition: "all 0.2s ease-in-out",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(33, 37, 43, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(102, 162, 251, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(33, 37, 43, 0.95)",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(33, 37, 43, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "none",
        },
      },
    },
  },
});
