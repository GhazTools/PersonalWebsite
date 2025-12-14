/**
 * Greeter component - Modernized with MUI
 */
import React, { useEffect } from "react";
import Typed from "typed.js";
import { Box, Typography, useTheme, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainButtons, { MainButtonsProps } from "./components/MainButtons";
import SEO from "../../components/SEO";
import { Static } from "../../models";
import { randomHello } from "../../utils";

export interface GreeterProps extends MainButtonsProps {
  staticData: Static;
}

const Greeter: React.FC<GreeterProps> = ({
  staticData,
  contactData,
  repoUrl,
}) => {
  const theme = useTheme();

  useEffect(() => {
    const options = {
      strings: staticData.typed,
      typeSpeed: 70,
      backSpeed: 50,
      loop: true,
      smartBackspace: true,
    };

    const typed = new Typed("#typed-insert-point", options);

    return () => {
      typed.destroy();
    };
  }, [staticData]);

  const hello = randomHello();

  return (
    <>
      <SEO title={hello} />
      <Box
        component={motion.section}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: "calc(100vh - 120px)",
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Typography
          component={motion.h1}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            color: theme.palette.mode === "light" ? "#2d323a" : "#c2c2c2",
            fontWeight: 400,
            fontSize: { xs: "2rem", md: "3rem" },
            letterSpacing: "2px",
            m: "10px 20px",
            p: 0,
            textShadow:
              theme.palette.mode === "light"
                ? "5px 5px rgba(200, 200, 200, 0.3)"
                : "5px 5px rgba(33, 37, 43, 0.8)",
            userSelect: "none",
          }}
        >
          {staticData.mainLine}
        </Typography>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          sx={{
            color: theme.palette.mode === "light" ? "#5a5f69" : "#909295",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            fontWeight: 400,
            m: "5px",
            p: 0,
            userSelect: "none",
            "& #typed-insert-point": {
              whiteSpace: "pre",
            },
            "& a": {
              textDecoration: "none",
              borderBottom: "1px dashed #909295",
              color: "#42a5f5",
              "&:hover": {
                color: "#66b3ff",
              },
            },
            "& strong": {
              fontWeight: "500",
            },
            "& .typed-cursor": {
              color: "#42a5f5",
            },
          }}
        >
          <span id="typed-insert-point" />
        </Box>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MainButtons contactData={contactData} repoUrl={repoUrl} />
        </Box>

        {/* Keyboard shortcut hint */}
        <Tooltip title="Quick navigation to any page or section" arrow>
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 6,
              px: 2,
              py: 1,
              borderRadius: 2,
              cursor: "pointer",
              color: theme.palette.text.secondary,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(0, 0, 0, 0.02)",
              border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(102, 162, 251, 0.1)"
                    : "rgba(102, 162, 251, 0.08)",
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(102, 162, 251, 0.3)"
                    : "rgba(102, 162, 251, 0.4)",
                color: theme.palette.primary.main,
              },
            }}
            onClick={() => {
              // Trigger the keyboard event for ⌘K
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                bubbles: true,
              });
              window.dispatchEvent(event);
            }}
          >
            <FontAwesomeIcon
              icon="keyboard"
              style={{ fontSize: 14, opacity: 0.7 }}
            />
            <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
              Press
            </Typography>
            <Box
              component="kbd"
              sx={{
                px: 0.8,
                py: 0.2,
                borderRadius: 0.5,
                fontSize: "0.75rem",
                fontFamily: "monospace",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.08)",
                border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"}`,
              }}
            >
              ⌘K
            </Box>
            <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
              to navigate
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </>
  );
};

export default Greeter;
