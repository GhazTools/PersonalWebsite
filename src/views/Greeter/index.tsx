/**
 * Greeter component - Modernized with MUI
 */
import React, { useEffect } from "react";
import Typed from "typed.js";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
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
      </Box>
    </>
  );
};

export default Greeter;
