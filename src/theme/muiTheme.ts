import { createTheme, Theme, PaletteMode } from "@mui/material/styles";

// Custom color palette
const customColors = {
  gray: "#636363",
  blue: "#66a2fb",
  yellow: "#e1db6e",
  dark: "#21252b",
  darker: "#282c34",
  light: "#f3f3f3",
  lightBg: "#f5f5f7",
  lightPaper: "#ffffff",
};

export const createCustomTheme = (mode: PaletteMode): Theme =>
  createTheme({
    palette: {
      mode,
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
        default: mode === "dark" ? customColors.darker : customColors.lightBg,
        paper: mode === "dark" ? customColors.dark : customColors.lightPaper,
      },
      text: {
        primary: mode === "dark" ? customColors.light : "#1d1d1f",
        secondary: mode === "dark" ? customColors.gray : "#86868b",
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
          root: ({ theme }) => ({
            backgroundImage: "none",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(33, 37, 43, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.2)"
                : "0 4px 20px rgba(0, 0, 0, 0.08)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 12px 48px rgba(0, 0, 0, 0.3)"
                  : "0 8px 32px rgba(0, 0, 0, 0.12)",
              border: `1px solid ${theme.palette.primary.main}40`,
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(33, 37, 43, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }),
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(33, 37, 43, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            borderBottom:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "none",
          }),
        },
      },
    },
  });

// Default dark theme for backwards compatibility
export const theme = createCustomTheme("dark");
