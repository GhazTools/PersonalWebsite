import React from "react";
import TimelineView from "../views/TimelineView";
import ContactView from "../views/ContactView";
import GitHubActivityView from "../views/GitHubActivityView";
import AchievementsView from "../views/AchievementsView";
import SkillsView from "../views/SkillsView";
import EducationView from "../views/EducationView";
import ProjectsView from "../views/ProjectsView";
import ExperienceView from "../views/ExperienceView";
import { PageLink, TabLink } from "../models";
import { jsOrange, midBlue, green, pink } from "../theme/colors";

export const pages: PageLink[] = [
  {
    name: "Achievements",
    url: "/achievements",
    icon: "trophy",
    isInternal: true,
    comp: () => <AchievementsView />,
  },
  {
    name: "Contact",
    url: "/contact",
    icon: "envelope",
    isInternal: true,
    comp: () => <ContactView />,
  },
];

export const tabs: TabLink[] = [
  {
    name: "resume.md",
    url: "/resume",
    icon: "file",
    color: pink,
    comp: () => <ExperienceView />,
  },
  {
    name: "projects.config",
    url: "/projects",
    icon: "sliders-h",
    color: green,
    comp: () => <ProjectsView />,
  },
  {
    name: "skills.js",
    url: "/skills",
    icon: ["fab", "js"],
    color: jsOrange,
    comp: () => <SkillsView />,
  },
  {
    name: "github.io",
    url: "/github",
    icon: ["fab", "github"],
    color: "#e5c07b",
    comp: () => <GitHubActivityView />,
  },
  {
    name: ".educationrc",
    url: "/education",
    icon: "university",
    color: midBlue,
    comp: () => <EducationView />,
  },
  {
    name: "timeline.time",
    url: "/timeline",
    icon: "clock",
    color: "#61afef",
    comp: () => <TimelineView />,
  },
];
