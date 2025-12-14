/**
 * Types for Awards & Achievements component
 */

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: "award" | "certification" | "publication" | "honor" | "scholarship";
  icon?: string;
  url?: string;
  imageUrl?: string;
}

export interface AchievementsConfig {
  title: string;
  subtitle: string;
  achievements: Achievement[];
}
