/**
 * 404 Not Found Page - VS Code themed
 */
import React from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SEO from "../../components/SEO";

const NotFoundView: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const terminalLines = [
    { prompt: "$ ", command: "cd /requested-page", delay: 0 },
    {
      prompt: "",
      command: "bash: cd: /requested-page: No such file or directory",
      delay: 0.3,
      isError: true,
    },
    { prompt: "$ ", command: "ls -la", delay: 0.6 },
    { prompt: "", command: "total 404", delay: 0.9 },
    {
      prompt: "",
      command: "drwxr-xr-x  2 ghaz  staff  404 Dec 14 00:00 .",
      delay: 1.0,
    },
    { prompt: "$ ", command: "echo $?", delay: 1.3 },
    { prompt: "", command: "404", delay: 1.5, isError: true },
    { prompt: "$ ", command: "# Maybe try going home?", delay: 1.8 },
  ];

  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist."
      />
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "calc(100vh - 200px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 8,
          }}
        >
          {/* Big 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "6rem", md: "10rem" },
                fontWeight: 900,
                fontFamily: "monospace",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #c678dd 50%, #e06c75 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
                mb: 2,
              }}
            >
              404
            </Typography>
          </motion.div>

          {/* Terminal-style error message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,
                background: isDark
                  ? "rgba(33, 37, 43, 0.95)"
                  : "rgba(40, 44, 52, 0.95)",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                mb: 4,
              }}
            >
              {/* Terminal header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#e06c75",
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#e5c07b",
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#98c379",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    ml: 2,
                    color: "rgba(255, 255, 255, 0.5)",
                    fontFamily: "monospace",
                  }}
                >
                  ghaz@portfolio ~ 404
                </Typography>
              </Box>

              {/* Terminal content */}
              <Box sx={{ p: 2, fontFamily: "monospace", textAlign: "left" }}>
                {terminalLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: line.delay }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        color: line.isError ? "#e06c75" : "#abb2bf",
                        mb: 0.5,
                        fontSize: "0.85rem",
                      }}
                    >
                      <span style={{ color: "#98c379" }}>{line.prompt}</span>
                      {line.command}
                    </Typography>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontFamily: "monospace",
                      color: "#98c379",
                      fontSize: "0.85rem",
                    }}
                  >
                    ${" "}
                    <Box
                      component="span"
                      sx={{
                        backgroundColor: "#abb2bf",
                        width: 8,
                        height: 16,
                        display: "inline-block",
                        ml: 0.5,
                      }}
                    />
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 600,
                mb: 1,
              }}
            >
              Page not found
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
                maxWidth: 400,
              }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </Typography>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/")}
                startIcon={<FontAwesomeIcon icon="home" />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #42a5f5 100%)`,
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 20px ${theme.palette.primary.main}40`,
                  },
                }}
              >
                Go Home
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(-1)}
                startIcon={<FontAwesomeIcon icon="arrow-left" />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: theme.palette.text.secondary,
                  color: theme.palette.text.primary,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: `${theme.palette.primary.main}10`,
                  },
                }}
              >
                Go Back
              </Button>
            </Box>
          </motion.div>

          {/* Keyboard hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Typography
              variant="caption"
              sx={{
                mt: 4,
                color: theme.palette.text.secondary,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Press{" "}
              <Box
                component="kbd"
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 0.5,
                  fontSize: "0.7rem",
                  fontFamily: "monospace",
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.08)",
                  border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"}`,
                }}
              >
                ⌘K
              </Box>{" "}
              to search for a page
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </>
  );
};

export default NotFoundView;
