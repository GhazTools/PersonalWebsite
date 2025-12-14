/**
 * 404 Not Found Page - VS Code themed with interactive terminal
 */
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Container, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SEO from "../../components/SEO";

// Available pages for navigation
const availablePages = [
  { path: "/", name: "home", description: "Go to homepage" },
  { path: "/resume", name: "resume", description: "View my experience" },
  { path: "/projects", name: "projects", description: "Browse my projects" },
  { path: "/skills", name: "skills", description: "See my tech stack" },
  { path: "/github", name: "github", description: "GitHub activity" },
  { path: "/education", name: "education", description: "My education" },
  { path: "/timeline", name: "timeline", description: "Career timeline" },
  { path: "/achievements", name: "achievements", description: "Achievements" },
  { path: "/contact", name: "contact", description: "Get in touch" },
];

const NotFoundView: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme.palette.mode === "dark";
  const requestedPath = location.pathname;
  const inputRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ type: "input" | "output" | "error"; text: string }>
  >([
    { type: "input", text: `cd ${requestedPath}` },
    {
      type: "error",
      text: `bash: cd: ${requestedPath}: No such file or directory`,
    },
    { type: "input", text: "ls available-pages/" },
    { type: "output", text: availablePages.map((p) => p.name).join("  ") },
  ]);

  // Filter suggestions based on input
  const suggestions = userInput
    ? availablePages.filter(
        (p) =>
          p.name.toLowerCase().includes(userInput.toLowerCase()) ||
          p.path.toLowerCase().includes(userInput.toLowerCase()),
      )
    : [];

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      // Autocomplete with selected suggestion
      setUserInput(suggestions[selectedSuggestion].name);
      setShowSuggestions(false);
    } else if (e.key === "ArrowDown" && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        Math.min(prev + 1, suggestions.length - 1),
      );
    } else if (e.key === "ArrowUp" && showSuggestions) {
      e.preventDefault();
      setSelectedSuggestion((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const input = userInput.trim().toLowerCase();
    const matchedPage = availablePages.find(
      (p) =>
        p.name.toLowerCase() === input || p.path.toLowerCase() === `/${input}`,
    );

    if (matchedPage) {
      // Add success message and navigate
      setTerminalHistory((prev) => [
        ...prev,
        { type: "input", text: `cd ${matchedPage.path}` },
        { type: "output", text: `Navigating to ${matchedPage.name}...` },
      ]);
      setTimeout(() => navigate(matchedPage.path), 500);
    } else {
      // Show error with suggestions
      const closestMatch = availablePages.find((p) =>
        p.name.toLowerCase().startsWith(input.charAt(0)),
      );
      setTerminalHistory((prev) => [
        ...prev,
        { type: "input", text: `cd /${input}` },
        {
          type: "error",
          text: `bash: cd: /${input}: No such file or directory`,
        },
        {
          type: "output",
          text: closestMatch
            ? `Did you mean: ${closestMatch.name}?`
            : "Try: home, resume, projects, skills, github, education, timeline",
        },
      ]);
      setUserInput("");
    }
  };

  // Update suggestions visibility
  useEffect(() => {
    setShowSuggestions(userInput.length > 0 && suggestions.length > 0);
    setSelectedSuggestion(0);
  }, [userInput, suggestions.length]);

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 500);
    return () => clearTimeout(timer);
  }, []);

  // Terminal colors that work in both themes
  const terminalBg = isDark
    ? "rgba(33, 37, 43, 0.95)"
    : "rgba(250, 250, 250, 0.98)";
  const terminalHeaderBg = isDark
    ? "rgba(0, 0, 0, 0.3)"
    : "rgba(0, 0, 0, 0.06)";
  const terminalBorder = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";
  const textColor = isDark ? "#abb2bf" : "#383a42";
  const errorColor = isDark ? "#e06c75" : "#e45649";
  const promptColor = theme.palette.primary.main;
  const suggestionBg = isDark
    ? "rgba(86, 156, 214, 0.15)"
    : "rgba(86, 156, 214, 0.12)";

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
                color: theme.palette.primary.main,
                lineHeight: 1,
                mb: 2,
              }}
            >
              404
            </Typography>
          </motion.div>

          {/* Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ width: "100%", maxWidth: 550 }}
          >
            <Box
              sx={{
                background: terminalBg,
                borderRadius: 2,
                overflow: "hidden",
                border: `1px solid ${terminalBorder}`,
                boxShadow: isDark
                  ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                  : "0 4px 20px rgba(0, 0, 0, 0.1)",
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
                  backgroundColor: terminalHeaderBg,
                  borderBottom: `1px solid ${terminalBorder}`,
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
                    color: isDark
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                    fontFamily: "monospace",
                  }}
                >
                  ghaz@portfolio ~ 404
                </Typography>
              </Box>

              {/* Terminal content */}
              <Box
                sx={{
                  p: 2,
                  fontFamily: "monospace",
                  textAlign: "left",
                  maxHeight: 280,
                  overflowY: "auto",
                }}
              >
                {/* History */}
                {terminalHistory.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        color: line.type === "error" ? errorColor : textColor,
                        mb: 0.5,
                        fontSize: "0.85rem",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {line.type === "input" && (
                        <span style={{ color: promptColor, fontWeight: 600 }}>
                          ${" "}
                        </span>
                      )}
                      {line.text}
                    </Typography>
                  </motion.div>
                ))}

                {/* Interactive input line */}
                <Box sx={{ position: "relative", mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: "monospace",
                        color: promptColor,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      ${" "}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: "monospace",
                        color: textColor,
                        fontSize: "0.85rem",
                        mr: 0.5,
                      }}
                    >
                      cd /
                    </Typography>
                    <Box
                      component="input"
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="type a page name..."
                      autoComplete="off"
                      spellCheck={false}
                      sx={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontFamily: "monospace",
                        fontSize: "0.85rem",
                        color: textColor,
                        caretColor: promptColor,
                        "&::placeholder": {
                          color: isDark
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(0,0,0,0.3)",
                        },
                      }}
                    />
                  </Box>

                  {/* Autocomplete suggestions */}
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Box
                          sx={{
                            mt: 1,
                            p: 1,
                            borderRadius: 1,
                            backgroundColor: isDark
                              ? "rgba(40, 44, 52, 0.95)"
                              : "rgba(255, 255, 255, 0.95)",
                            border: `1px solid ${terminalBorder}`,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: isDark ? "#9599a0" : "#86868b",
                              fontSize: "0.7rem",
                              display: "block",
                              mb: 0.5,
                            }}
                          >
                            Tab to autocomplete • Enter to navigate
                          </Typography>
                          {suggestions.slice(0, 5).map((suggestion, index) => (
                            <Box
                              key={suggestion.path}
                              onClick={() => {
                                setUserInput(suggestion.name);
                                setShowSuggestions(false);
                                inputRef.current?.focus();
                              }}
                              sx={{
                                px: 1,
                                py: 0.5,
                                borderRadius: 0.5,
                                cursor: "pointer",
                                backgroundColor:
                                  index === selectedSuggestion
                                    ? suggestionBg
                                    : "transparent",
                                "&:hover": {
                                  backgroundColor: suggestionBg,
                                },
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "monospace",
                                  fontSize: "0.8rem",
                                  color: textColor,
                                }}
                              >
                                <span style={{ color: promptColor }}>
                                  {suggestion.name}
                                </span>
                                <span style={{ opacity: 0.5, marginLeft: 8 }}>
                                  {suggestion.description}
                                </span>
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
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
              Type a page name in the terminal above, or use the buttons below.
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
