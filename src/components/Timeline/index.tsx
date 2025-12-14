/* eslint-disable react/prop-types */
/**
 * Timeline Component - Main timeline display with squiggly animated path
 *
 * Features:
 * - Truly random, organic squiggly line that draws on scroll
 * - Cards appear with staggered animations
 * - Dots positioned ON the squiggly path
 * - Duration badges and "current" indicators
 */

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import TimelineCard from "./TimelineCard";
import SquigglyLine from "./SquigglyLine";
import type { TimelineConfig, TimelineEvent } from "./types";

interface TimelineProps {
  config: TimelineConfig;
}

const Timeline: React.FC<TimelineProps> = ({ config }) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [totalHeight, setTotalHeight] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sort events by start date (oldest first for chronological flow)
  const sortedEvents = useMemo(
    () =>
      [...config.events].sort((a, b) => {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      }),
    [config.events]
  );

  // Calculate card center positions for dot placement
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const positions = cardRefs.current.map((ref) => {
      if (!ref) return 0;
      const rect = ref.getBoundingClientRect();
      // Get center Y relative to timeline container
      return rect.top - containerRect.top + rect.height / 2;
    });

    // Calculate total height for the squiggly line
    const lastCard = cardRefs.current[cardRefs.current.length - 1];
    if (lastCard) {
      const lastRect = lastCard.getBoundingClientRect();
      const totalH = lastRect.bottom - containerRect.top + 100;

      // Only update state if values actually changed
      if (
        positions.length > 0 &&
        (totalH !== totalHeight || positions.length !== cardPositions.length)
      ) {
        setCardPositions(positions);
        setTotalHeight(totalH);
        setIsReady(true);
      }
    }
  }, [totalHeight, cardPositions.length]);

  // Update positions on mount and resize
  useEffect(() => {
    // Wait a bit for cards to render
    const timer = setTimeout(updatePositions, 200);
    window.addEventListener("resize", updatePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePositions);
    };
  }, [updatePositions]);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: "100vh",
        py: 8,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: theme.palette.text.primary,
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              {config.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 400,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              {config.subtitle}
            </Typography>
          </Box>
        </motion.div>

        {/* Timeline Content */}
        <Box
          sx={{
            position: "relative",
            maxWidth: 1000,
            mx: "auto",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* The Squiggly Line - only render when we have positions */}
          {isReady && cardPositions.length > 0 && totalHeight > 0 && (
            <Box
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <SquigglyLine
                totalHeight={totalHeight}
                dotPositions={cardPositions}
                containerRef={containerRef}
              />
            </Box>
          )}

          {/* Event Cards */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 8, // More spacing between cards
            }}
          >
            {sortedEvents.map((event, index) => (
              <Box
                key={event.id}
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[index] = el;
                }}
                sx={{
                  display: "flex",
                  justifyContent: {
                    xs: "center",
                    md: index % 2 === 0 ? "flex-start" : "flex-end",
                  },
                  width: "100%",
                  position: "relative",
                  // Add padding to keep cards away from center line
                  pl: { xs: 0, md: index % 2 === 0 ? 0 : "calc(50% + 60px)" },
                  pr: { xs: 0, md: index % 2 === 0 ? "calc(50% + 60px)" : 0 },
                }}
              >
                <TimelineCard
                  event={event}
                  index={index}
                  typeColors={config.typeColors}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Footer decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Box
            sx={{
              textAlign: "center",
              mt: 12,
              pt: 6,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontStyle: "italic",
              }}
            >
              And the journey continues...
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Timeline;
export type { TimelineConfig, TimelineEvent };
