import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createCustomTheme } from "./theme/muiTheme";
import { ThemeProvider, useThemeMode } from "./contexts/ThemeContext";
import "normalize.css";
import "./styles/scrollbar.css";
import "./styles/accessibility.css";
import "./theme/icons";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
const root = createRoot(container!);

const AppWithTheme = () => {
  const { mode } = useThemeMode();
  const theme = React.useMemo(() => createCustomTheme(mode), [mode]);

  // Update data-theme attribute for scrollbar styling
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </MuiThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
