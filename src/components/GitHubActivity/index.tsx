/* eslint-disable react/prop-types */
/**
 * GitHub Activity Widget - Displays GitHub stats, repos, and recent activity
 * Uses GitHub's public API (no auth needed for public data)
 */

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Skeleton,
  Chip,
  IconButton,
  Tooltip,
  Link,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarIcon from "@mui/icons-material/Star";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import CodeIcon from "@mui/icons-material/Code";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FolderIcon from "@mui/icons-material/Folder";
import LaunchIcon from "@mui/icons-material/Launch";
import CommitIcon from "@mui/icons-material/Commit";
import MergeIcon from "@mui/icons-material/Merge";
import AddIcon from "@mui/icons-material/Add";

import type {
  GitHubRepo,
  GitHubEvent,
  GitHubUser,
  GitHubActivityConfig,
} from "./types";

interface GitHubActivityProps {
  config: GitHubActivityConfig;
}

// Language colors mapping
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

/**
 * Stats Card Component
 */
const StatsCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}> = ({ icon, label, value, color }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 2,
        background: isDark
          ? "rgba(40, 44, 52, 0.6)"
          : "rgba(255, 255, 255, 0.8)",
        borderRadius: 2,
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: 1.5,
          backgroundColor: color + "20",
          color: color,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: "1.25rem",
            lineHeight: 1,
          }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.75rem",
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

/**
 * Repo Card Component
 */
const RepoCard: React.FC<{ repo: GitHubRepo; index: number }> = ({
  repo,
  index,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const langColor = repo.language
    ? languageColors[repo.language] || "#888"
    : "#888";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Box
        sx={{
          p: 2.5,
          height: "100%",
          background: isDark
            ? "rgba(40, 44, 52, 0.6)"
            : "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: theme.palette.primary.main + "40",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FolderIcon
              sx={{ fontSize: 18, color: theme.palette.primary.main }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: "0.9rem",
              }}
            >
              {repo.name}
            </Typography>
          </Box>
          <Tooltip title="View on GitHub">
            <IconButton
              size="small"
              component="a"
              href={repo.html_url}
              target="_blank"
              sx={{ color: theme.palette.text.secondary }}
            >
              <LaunchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            fontSize: "0.8rem",
            minHeight: 40,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {repo.description || "No description available"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {repo.language && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: langColor,
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                {repo.language}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 14, color: "#e1db6e" }} />
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              {repo.stargazers_count}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ForkRightIcon
              sx={{ fontSize: 14, color: theme.palette.text.secondary }}
            />
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              {repo.forks_count}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

/**
 * Event Item Component
 */
const EventItem: React.FC<{ event: GitHubEvent }> = ({ event }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getEventIcon = () => {
    switch (event.type) {
      case "PushEvent":
        return <CommitIcon sx={{ fontSize: 16 }} />;
      case "PullRequestEvent":
        return <MergeIcon sx={{ fontSize: 16 }} />;
      case "CreateEvent":
        return <AddIcon sx={{ fontSize: 16 }} />;
      case "IssuesEvent":
        return <CodeIcon sx={{ fontSize: 16 }} />;
      default:
        return <GitHubIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getEventDescription = () => {
    const repoName = event.repo.name.split("/")[1];
    switch (event.type) {
      case "PushEvent": {
        const commits = event.payload.commits?.length || 0;
        const branch = event.payload.ref?.split("/").pop() || "branch";
        if (commits === 0) {
          return `Updated ${branch} in ${repoName}`;
        }
        return `Pushed ${commits} commit${commits !== 1 ? "s" : ""} to ${repoName}`;
      }
      case "PullRequestEvent": {
        const action =
          event.payload.action === "opened"
            ? "Opened"
            : event.payload.action === "closed"
              ? "Closed"
              : event.payload.action === "merged"
                ? "Merged"
                : event.payload.action?.charAt(0).toUpperCase() +
                  event.payload.action?.slice(1);
        return `${action} PR in ${repoName}`;
      }
      case "CreateEvent":
        return `Created ${event.payload.ref_type}${event.payload.ref ? ` "${event.payload.ref}"` : ""} in ${repoName}`;
      case "IssuesEvent": {
        const action =
          event.payload.action === "opened"
            ? "Opened"
            : event.payload.action === "closed"
              ? "Closed"
              : event.payload.action?.charAt(0).toUpperCase() +
                event.payload.action?.slice(1);
        return `${action} issue in ${repoName}`;
      }
      case "WatchEvent":
        return `Starred ${repoName}`;
      case "ForkEvent":
        return `Forked ${repoName}`;
      case "DeleteEvent":
        return `Deleted ${event.payload.ref_type} in ${repoName}`;
      case "ReleaseEvent":
        return `Released ${event.payload.release?.tag_name || "version"} of ${repoName}`;
      case "IssueCommentEvent":
        return `Commented on issue in ${repoName}`;
      case "PullRequestReviewEvent":
        return `Reviewed PR in ${repoName}`;
      case "PullRequestReviewCommentEvent":
        return `Commented on PR in ${repoName}`;
      default:
        return `Activity in ${repoName}`;
    }
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000,
    );
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        borderRadius: 1,
        transition: "background 0.2s ease",
        "&:hover": {
          background: isDark
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(0, 0, 0, 0.02)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: 1,
          backgroundColor: theme.palette.primary.main + "15",
          color: theme.palette.primary.main,
        }}
      >
        {getEventIcon()}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.primary,
            fontSize: "0.8rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {getEventDescription()}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: "0.7rem",
          whiteSpace: "nowrap",
        }}
      >
        {timeAgo(event.created_at)}
      </Typography>
    </Box>
  );
};

/**
 * Main GitHub Activity Component
 */
const GitHubActivity: React.FC<GitHubActivityProps> = ({ config }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { username, maxRepos = 6, maxEvents = 5 } = config;

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user data, repos, and events in parallel
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}`,
          ),
          fetch(
            `https://api.github.com/users/${username}/events/public?per_page=${maxEvents}`,
          ),
        ]);

        if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const [userData, reposData, eventsData] = await Promise.all([
          userRes.json(),
          reposRes.json(),
          eventsRes.json(),
        ]);

        setUser(userData);
        setRepos(reposData);
        setEvents(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username, maxRepos, maxEvents]);

  if (error) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              p: 4,
              background: isDark
                ? "rgba(224, 108, 117, 0.1)"
                : "rgba(224, 108, 117, 0.05)",
              borderRadius: 2,
              border: "1px solid rgba(224, 108, 117, 0.3)",
            }}
          >
            <Typography sx={{ color: "#e06c75" }}>
              Failed to load GitHub data: {error}
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 6, position: "relative" }}>
            {/* Visit Profile Button - Top Right */}
            <Button
              component="a"
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<LaunchIcon />}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { md: 0 },
                top: { md: 0 },
                mb: { xs: 2, md: 0 },
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.main + "10",
                },
              }}
            >
              Visit GitHub Profile
            </Button>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <GitHubIcon
                sx={{ fontSize: 36, color: theme.palette.text.primary }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                }}
              >
                GitHub Activity
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              My open source contributions and recent coding activity
            </Typography>
          </Box>
        </motion.div>

        {loading ? (
          /* Loading skeletons */
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: 2,
                mb: 4,
              }}
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rounded" height={80} />
              ))}
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} variant="rounded" height={150} />
              ))}
            </Box>
          </Box>
        ) : (
          <>
            {/* Profile & Stats */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mb: 6,
                  }}
                >
                  <StatsCard
                    icon={<FolderIcon />}
                    label="Public Repos"
                    value={user.public_repos}
                    color={theme.palette.primary.main}
                  />
                  <StatsCard
                    icon={<PeopleIcon />}
                    label="Followers"
                    value={user.followers}
                    color="#98c379"
                  />
                  <StatsCard
                    icon={<PersonAddIcon />}
                    label="Following"
                    value={user.following}
                    color="#e1db6e"
                  />
                  <StatsCard
                    icon={<StarIcon />}
                    label="Total Stars"
                    value={repos.reduce(
                      (acc, repo) => acc + repo.stargazers_count,
                      0,
                    )}
                    color="#d19a66"
                  />
                </Box>
              </motion.div>
            )}

            {/* Main Content Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
                gap: 4,
              }}
            >
              {/* Repositories Grid */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <FolderIcon sx={{ fontSize: 20 }} />
                    Top Repositories
                  </Typography>
                  <Link
                    href={`https://github.com/${username}?tab=repositories`}
                    target="_blank"
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    View all →
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  {repos.map((repo, index) => (
                    <RepoCard key={repo.id} repo={repo} index={index} />
                  ))}
                </Box>
              </Box>

              {/* Recent Activity */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CommitIcon sx={{ fontSize: 20 }} />
                  Recent Activity
                </Typography>
                <Box
                  sx={{
                    background: isDark
                      ? "rgba(33, 37, 43, 0.8)"
                      : "rgba(255, 255, 255, 0.9)",
                    borderRadius: 2,
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid rgba(0, 0, 0, 0.08)",
                    overflow: "hidden",
                  }}
                >
                  {events.length > 0 ? (
                    events.map((event) => (
                      <EventItem key={event.id} event={event} />
                    ))
                  ) : (
                    <Box sx={{ p: 3, textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        No recent public activity
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Contribution Graph placeholder - would need auth for real data */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    background: isDark
                      ? "rgba(40, 44, 52, 0.6)"
                      : "rgba(255, 255, 255, 0.8)",
                    borderRadius: 2,
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid rgba(0, 0, 0, 0.08)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    View full contribution graph on
                  </Typography>
                  <br />
                  <Link
                    href={`https://github.com/${username}`}
                    target="_blank"
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      fontWeight: 600,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    github.com/{username}
                  </Link>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default GitHubActivity;
