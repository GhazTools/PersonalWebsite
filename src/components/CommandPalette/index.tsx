/**
 * Command Palette - VS Code-style quick navigation (⌘K)
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Typography,
  Modal,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { pages, tabs } from "../../data";

interface CommandItem {
  id: string;
  name: string;
  category: string;
  url: string;
  icon: IconProp;
  color: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Extract a clean display name from a tab filename
 * Handles: resume.md -> resume, .educationrc -> education, skills.js -> skills
 */
const getDisplayName = (filename: string): string => {
  // Remove leading dot for dotfiles
  let name = filename.startsWith(".") ? filename.slice(1) : filename;
  // Remove file extension
  name = name.replace(/\.[^/.]+$/, "");
  // Remove common suffixes like 'rc'
  name = name.replace(/rc$/, "");
  return name || filename; // Fallback to original if empty
};

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Build command list from pages and tabs
  const commands: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [
      // Home
      {
        id: "home",
        name: "Home",
        category: "Navigation",
        url: "/",
        icon: "home" as IconProp,
        color: "#61afef",
        keywords: ["start", "landing", "main"],
      },
      // Tabs
      ...tabs.map((tab) => ({
        id: tab.url,
        name: getDisplayName(tab.name),
        category: "Sections",
        url: tab.url,
        icon: tab.icon as IconProp,
        color: tab.color,
        keywords: [tab.name],
      })),
      // Pages
      ...pages.map((page) => ({
        id: page.url,
        name: page.name,
        category: "Pages",
        url: page.url,
        icon: (Array.isArray(page.icon) ? page.icon : page.icon) as IconProp,
        color: "#abb2bf",
        keywords: [],
      })),
      // Quick actions
      {
        id: "github",
        name: "Open GitHub",
        category: "Actions",
        url: "https://github.com/GhazanfarShahbaz",
        icon: ["fab", "github"] as IconProp,
        color: "#abb2bf",
        keywords: ["source", "code", "repo"],
      },
      {
        id: "linkedin",
        name: "Open LinkedIn",
        category: "Actions",
        url: "https://linkedin.com/in/GhazanfarShahbaz",
        icon: ["fab", "linkedin"] as IconProp,
        color: "#0077b5",
        keywords: ["connect", "network", "profile"],
      },
    ];
    return items;
  }, []);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(lowerQuery) ||
        cmd.category.toLowerCase().includes(lowerQuery) ||
        cmd.keywords?.some((k) => k.toLowerCase().includes(lowerQuery)),
    );
  }, [commands, query]);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, filteredCommands.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            handleSelect(filteredCommands[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIndex, filteredCommands, onClose]);

  // Keep selected index in bounds
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);

  const handleSelect = (cmd: CommandItem) => {
    onClose();
    if (cmd.url.startsWith("http")) {
      window.open(cmd.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(cmd.url);
    }
  };

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Get flat index for an item
  const getFlatIndex = (category: string, itemIndex: number): number => {
    let flatIndex = 0;
    for (const cat of Object.keys(groupedCommands)) {
      if (cat === category) {
        return flatIndex + itemIndex;
      }
      flatIndex += groupedCommands[cat].length;
    }
    return flatIndex;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        pt: "15vh",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: isDark
              ? "rgba(0, 0, 0, 0.7)"
              : "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        sx={{
          width: "100%",
          maxWidth: 560,
          mx: 2,
          background: isDark
            ? "linear-gradient(180deg, rgba(40, 44, 52, 0.98) 0%, rgba(33, 37, 43, 0.98) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 249, 250, 0.98) 100%)",
          borderRadius: 2,
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: isDark
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
      >
        {/* Search Input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderBottom: isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <FontAwesomeIcon
            icon="search"
            style={{
              fontSize: 14,
              color: theme.palette.text.secondary,
            }}
          />
          <InputBase
            inputRef={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            fullWidth
            sx={{
              fontSize: "0.95rem",
              color: theme.palette.text.primary,
              "& input::placeholder": {
                color: theme.palette.text.secondary,
                opacity: 0.7,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 0.5,
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.65rem",
                color: theme.palette.text.secondary,
              }}
            >
              esc
            </Typography>
          </Box>
        </Box>

        {/* Results */}
        <Box
          sx={{
            maxHeight: 400,
            overflowY: "auto",
            py: 1,
          }}
        >
          {filteredCommands.length === 0 ? (
            <Box sx={{ px: 2, py: 4, textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                No results found
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedCommands).map(([category, items]) => (
              <Box key={category}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    px: 2,
                    py: 0.75,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: theme.palette.text.secondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {category}
                </Typography>
                <List dense disablePadding>
                  {items.map((cmd, itemIdx) => {
                    const flatIdx = getFlatIndex(category, itemIdx);
                    const isSelected = flatIdx === selectedIndex;

                    return (
                      <ListItem
                        key={cmd.id}
                        onClick={() => handleSelect(cmd)}
                        sx={{
                          px: 2,
                          py: 0.75,
                          cursor: "pointer",
                          backgroundColor: isSelected
                            ? isDark
                              ? "rgba(97, 175, 239, 0.15)"
                              : "rgba(97, 175, 239, 0.1)"
                            : "transparent",
                          "&:hover": {
                            backgroundColor: isDark
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FontAwesomeIcon
                            icon={cmd.icon}
                            style={{
                              fontSize: 14,
                              color: cmd.color,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={cmd.name}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: "0.875rem",
                              fontWeight: isSelected ? 500 : 400,
                              color: theme.palette.text.primary,
                            },
                          }}
                        />
                        {isSelected && (
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: "0.65rem",
                              color: theme.palette.text.secondary,
                              px: 0.75,
                              py: 0.25,
                              borderRadius: 0.5,
                              backgroundColor: isDark
                                ? "rgba(255, 255, 255, 0.06)"
                                : "rgba(0, 0, 0, 0.06)",
                            }}
                          >
                            ↵
                          </Typography>
                        )}
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            ))
          )}
        </Box>

        {/* Footer hint */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            px: 2,
            py: 1,
            borderTop: isDark
              ? "1px solid rgba(255, 255, 255, 0.06)"
              : "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.6rem",
                color: theme.palette.text.secondary,
                px: 0.5,
                py: 0.125,
                borderRadius: 0.25,
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(0, 0, 0, 0.06)",
              }}
            >
              ↑↓
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.6rem",
                color: theme.palette.text.secondary,
              }}
            >
              navigate
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.6rem",
                color: theme.palette.text.secondary,
                px: 0.5,
                py: 0.125,
                borderRadius: 0.25,
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.06)"
                  : "rgba(0, 0, 0, 0.06)",
              }}
            >
              ↵
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.6rem",
                color: theme.palette.text.secondary,
              }}
            >
              select
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommandPalette;
