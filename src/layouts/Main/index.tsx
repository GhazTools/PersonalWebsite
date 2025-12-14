/**
 * Main layout - Modernized with MUI
 */
import React, { useState, useEffect, useCallback } from "react";
import { Box, Drawer, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import Header from "./components/Header";
import LeftBar from "./components/LeftBar";
import Explorer from "./components/Explorer";
import StatusBar from "./components/StatusBar";
import CommandPalette from "../../components/CommandPalette";
import { ContactItem, TabLink } from "../../models";

export interface TabProps {
  tabs: TabLink[];
}

export interface ContactProps {
  contactData: ContactItem[];
}

export type MainLayoutProps = TabProps &
  ContactProps & {
    children?: React.ReactNode;
  };

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  tabs,
  contactData,
}) => {
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle ⌘K / Ctrl+K to open command palette
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setCommandPaletteOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        position: "relative",
      }}
    >
      {/* Left Sidebar - Hidden on mobile */}
      {!isMobile && (
        <Box
          component={motion.div}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          sx={{
            width: 56,
            flexShrink: 0,
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <LeftBar contactData={contactData} />
        </Box>
      )}

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "rgba(33, 37, 43, 0.98)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <LeftBar contactData={contactData} />
        </Box>
      </Drawer>

      {/* Explorer Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={explorerOpen}
        onClose={() => setExplorerOpen(false)}
        sx={{
          width: explorerOpen ? 240 : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            left: 56,
            backgroundColor: "rgba(33, 37, 43, 0.95)",
            backdropFilter: "blur(10px)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Explorer tabs={tabs} open={explorerOpen} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: { xs: 0, md: "56px" },
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(explorerOpen &&
            !isMobile && {
              marginLeft: "296px",
            }),
        }}
      >
        <Header
          tabs={tabs}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            pt: { xs: 2, md: 2 },
            pb: 25, // Even more padding to allow full scroll
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Status Bar */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar,
        }}
      >
        <StatusBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      </Box>

      {/* Command Palette (⌘K) */}
      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </Box>
  );
};

export default MainLayout;
