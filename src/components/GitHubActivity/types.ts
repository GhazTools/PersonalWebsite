/**
 * Types for GitHub Activity Widget
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: Array<{
      sha: string;
      message: string;
    }>;
    pull_request?: {
      title: string;
      html_url: string;
    };
    issue?: {
      title: string;
      html_url: string;
    };
    release?: {
      tag_name: string;
      name: string;
      html_url: string;
    };
  };
  created_at: string;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubActivityConfig {
  username: string;
  showContributions?: boolean;
  showRepos?: boolean;
  showEvents?: boolean;
  maxRepos?: number;
  maxEvents?: number;
}
