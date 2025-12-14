/**
 * Timeline Types - Shared type definitions for the Timeline component
 */

export interface TimelineEvent {
  id: string;
  startDate: string;
  endDate: string | null;
  title: string;
  role: string;
  description: string;
  type: "education" | "work" | "research" | "leadership";
  isCurrent: boolean;
}

export interface TimelineConfig {
  title: string;
  subtitle: string;
  events: TimelineEvent[];
  typeColors: Record<string, string>;
}

export interface PathPoint {
  x: number;
  y: number;
}
