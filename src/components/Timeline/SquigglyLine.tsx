/* eslint-disable react/prop-types */
/**
 * SquigglyLine - A truly random, organic path representing life's journey
 * Generates a new random path on each page load
 */

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useTheme } from "@mui/material";

interface SquigglyLineProps {
  /** Total height the line should cover */
  totalHeight: number;
  /** Y positions where dots should appear (event card positions) */
  dotPositions: number[];
  /** Container ref for scroll tracking */
  containerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Seeded random number generator for consistent randomness within a session
 */
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

/**
 * Generate a truly squiggly, organic SVG path
 * Uses multiple random control points per segment to create natural waviness
 */
const generateSquigglyPath = (
  height: number,
  width: number,
  seed: number,
): string => {
  const centerX = width / 2;
  const segments = Math.ceil(height / 100); // One squiggle every ~100px (faster)

  let path = `M ${centerX} 0`;
  let currentY = 0;
  let seedCounter = seed;

  for (let i = 0; i < segments; i++) {
    const segmentHeight = height / segments;
    const nextY = currentY + segmentHeight;

    // Random amplitude (how far left/right) - varies per segment
    const amplitude = 40 + seededRandom(seedCounter++) * 60; // 40-100px

    // Random direction with some tendency to alternate
    const baseDirection = i % 2 === 0 ? 1 : -1;
    const directionNoise = (seededRandom(seedCounter++) - 0.5) * 0.6;
    const direction = baseDirection * (0.7 + Math.abs(directionNoise));

    // Control point 1 (first curve)
    const cp1x = centerX + amplitude * direction * seededRandom(seedCounter++);
    const cp1y =
      currentY + segmentHeight * 0.25 + seededRandom(seedCounter++) * 15;

    // Control point 2 (peak of curve)
    const cp2x = centerX + amplitude * direction;
    const cp2y = currentY + segmentHeight * 0.5;

    // Control point 3 (coming back)
    const cp3x =
      centerX +
      amplitude * direction * (0.5 + seededRandom(seedCounter++) * 0.3);
    const cp3y =
      currentY + segmentHeight * 0.75 + seededRandom(seedCounter++) * 10;

    // End point (with slight random offset to avoid perfect center)
    const endX = centerX + (seededRandom(seedCounter++) - 0.5) * 20;
    const endY = nextY;

    // Use cubic bezier for smoother curves
    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${((cp2x + cp3x) / 2).toFixed(1)} ${((cp2y + cp3y) / 2).toFixed(1)}`;
    path += ` S ${cp3x.toFixed(1)} ${cp3y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;

    currentY = nextY;
  }

  return path;
};

/**
 * Find the X position on the path at a given Y
 */
const getXAtY = (
  pathElement: SVGPathElement | null,
  targetY: number,
  width: number,
): number => {
  if (!pathElement) return width / 2;

  const pathLength = pathElement.getTotalLength();

  // Binary search to find the point at targetY
  let low = 0;
  let high = pathLength;
  let bestX = width / 2;

  for (let i = 0; i < 15; i++) {
    // Reduced iterations for speed
    const mid = (low + high) / 2;
    const point = pathElement.getPointAtLength(mid);

    if (Math.abs(point.y - targetY) < 5) {
      bestX = point.x;
      break;
    }

    if (point.y < targetY) {
      low = mid;
    } else {
      high = mid;
    }

    bestX = point.x;
  }

  return bestX;
};

/**
 * Find what fraction of the path length corresponds to reaching a given Y position
 * This tells us the scroll progress needed for the line to reach this point
 */
const getPathProgressAtY = (
  pathElement: SVGPathElement,
  targetY: number,
  totalPathLength: number,
): number => {
  // Binary search to find the path length at targetY
  let low = 0;
  let high = totalPathLength;
  let bestLength = 0;

  for (let i = 0; i < 15; i++) {
    const mid = (low + high) / 2;
    const point = pathElement.getPointAtLength(mid);

    if (Math.abs(point.y - targetY) < 5) {
      bestLength = mid;
      break;
    }

    if (point.y < targetY) {
      low = mid;
      bestLength = mid;
    } else {
      high = mid;
    }
  }

  // Return as a fraction of total path length (0 to 1)
  return bestLength / totalPathLength;
};

// Generate a random seed once when the module loads (persists for session)
const SESSION_SEED = Math.floor(Math.random() * 10000);

const SquigglyLine: React.FC<SquigglyLineProps> = ({
  totalHeight,
  dotPositions,
  containerRef,
}) => {
  const theme = useTheme();
  const [pathLength, setPathLength] = useState(0);
  const [dotXPositions, setDotXPositions] = useState<number[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const hasCalculatedDots = useRef(false);

  const svgWidth = 300;

  // Generate the squiggly path with random seed (stable for session)
  const squigglyPath = useMemo(
    () => generateSquigglyPath(totalHeight, svgWidth, SESSION_SEED),
    [totalHeight],
  );

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring animation - less stiff for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.01,
  });

  // Animate the stroke drawing
  const strokeDashoffset = useTransform(
    smoothProgress,
    [0, 1],
    [pathLength, 0],
  );

  // Calculate path length once
  useEffect(() => {
    if (pathRef.current && pathLength === 0) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [squigglyPath, pathLength]);

  // Calculate dot X positions only once when we have valid data
  useEffect(() => {
    if (
      pathRef.current &&
      dotPositions.length > 0 &&
      !hasCalculatedDots.current
    ) {
      const xPositions = dotPositions.map((y) =>
        getXAtY(pathRef.current, y, svgWidth),
      );
      setDotXPositions(xPositions);
      hasCalculatedDots.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotPositions.length]); // Only depend on length to avoid recalculating on every scroll

  if (totalHeight < 100) return null;

  return (
    <svg
      width={svgWidth}
      height={totalHeight + 50}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: 0,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <defs>
        {/* Gradient for the animated line */}
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.palette.primary.main} />
          <stop offset="50%" stopColor={theme.palette.secondary.main} />
          <stop offset="100%" stopColor={theme.palette.primary.main} />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background path (faint guide) */}
      <path
        d={squigglyPath}
        fill="none"
        stroke={theme.palette.divider}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.15}
      />

      {/* Animated foreground path */}
      <motion.path
        ref={pathRef}
        d={squigglyPath}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        strokeDasharray={pathLength}
        style={{ strokeDashoffset }}
      />

      {/* Dots at each event position - positioned ON the squiggly line */}
      {dotXPositions.length === dotPositions.length &&
        pathLength > 0 &&
        dotPositions.map((y, index) => {
          // Calculate when this dot should activate based on path length to reach it
          // Find how far along the path we need to draw to reach this dot's Y position
          const dotPathProgress = pathRef.current
            ? getPathProgressAtY(pathRef.current, y, pathLength)
            : y / totalHeight;

          return (
            <TimelineDot
              key={index}
              cx={dotXPositions[index]}
              cy={y}
              progress={smoothProgress}
              activateAt={dotPathProgress}
              theme={theme}
            />
          );
        })}
    </svg>
  );
};

/**
 * Individual dot component that changes color based on scroll progress
 */
import type { Theme } from "@mui/material";
import type { MotionValue } from "framer-motion";

interface TimelineDotProps {
  cx: number;
  cy: number;
  progress: MotionValue<number>;
  activateAt: number;
  theme: Theme;
}

const TimelineDot: React.FC<TimelineDotProps> = ({
  cx,
  cy,
  progress,
  activateAt,
  theme,
}) => {
  const isDark = theme.palette.mode === "dark";
  const grayColor = isDark ? "#636363" : "#a0a0a0";
  const activeColor = theme.palette.primary.main;

  // Transform progress to determine if this dot is active
  // Dot activates when scroll progress reaches its position on the path
  const isActive = useTransform(progress, (p) => p >= activateAt);

  // Animate colors based on activation
  const strokeColor = useTransform(isActive, (active) =>
    active ? activeColor : grayColor,
  );
  const fillColor = useTransform(isActive, (active) =>
    active ? activeColor : grayColor,
  );
  const bgColor = theme.palette.background.paper;

  return (
    <motion.g>
      {/* Outer ring - shows when active */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={12}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      />
      {/* Main dot */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={8}
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth={3}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      />
      {/* Inner highlight */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={3}
        fill={fillColor}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.1,
        }}
      />
    </motion.g>
  );
};

export default SquigglyLine;
