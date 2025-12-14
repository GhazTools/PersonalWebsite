# PersonalWebsite

My personal portfolio site, hosted at [ghaz.dev](https://ghaz.dev), built with **React 18 + TypeScript + Vite**.  
Originally based on the [`vscode-portfolio`](https://github.com/GhazanfarShahbaz/vscode-portfolio) template by [caglarturali](https://github.com/caglarturali/vscode-portfolio), now completely modernized with a fresh design system.

## Features

### Navigation and Layout
- macOS-inspired UI with frosted glass effects, dock-style sidebar, modern tab bar
- Tabbed Navigation with VS Code-style file tabs for seamless section browsing
- Smart Sidebar with icon dock, tooltips, social links, and quick navigation
- Fully Responsive mobile-first design with collapsible navigation

### Content Sections
- Resume/Experience with filter by Work, Research, or All with loading states
- Projects Portfolio with categorized projects and expandable highlights
- Skills Showcase organized by category (Languages, Frameworks, Tools, etc.)
- Education with academic background and coursework details
- Interactive Timeline showing career journey with animated milestones
- GitHub Activity with live stats, repos, and recent activity from GitHub API
- Achievements showing certifications, awards, and accomplishments
- Contact with direct links to email, LinkedIn, and social profiles

### UI/UX Enhancements
- Framer Motion Animations with smooth transitions and hover effects
- Loading States with skeleton loaders and progress indicators
- Resume Downloads with one-click PDF download for Resume and CV
- Dark Theme with modern color scheme and accent colors
- Expandable Cards with show more/less for detailed content

## Tech Stack

- Framework: React 18.3
- Build Tool: Vite 6.4
- Language: TypeScript 5.8
- UI Library: Material UI (MUI) 7.1
- Animations: Framer Motion 12.12
- Icons: FontAwesome 6.7 + MUI Icons
- Routing: React Router 6.30
- Testing: Vitest 4.0 + React Testing Library
- Linting: ESLint 9.28 + Prettier

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

Clone the repository:
git clone https://github.com/GhazTools/PersonalWebsite.git
cd PersonalWebsite

Install dependencies:
pnpm install (or npm install)

Start development server:
pnpm dev (or npm run dev)

The site will be available at http://localhost:3000

### Build for Production

pnpm build (or npm run build)
pnpm preview (to preview the production build)

### Run Tests

pnpm test (to run all tests)

## Project Structure

src/
  components/ - Reusable UI components
    GitHubActivity/ - GitHub stats widget
    Timeline/ - Interactive timeline
    Achievements/ - Awards and certifications
  views/ - Page-level components
    ExperienceView/ - Resume/work experience
    ProjectsView/ - Project portfolio
    SkillsView/ - Skills showcase
    EducationView/ - Education details
  layouts/ - Layout components (Header, Sidebar, etc.)
  data/ - JSON data files for content
  theme/ - Colors, fonts, and design tokens
  utils/ - Helper functions

## License

This project is open source under the GPL-3.0 License (see COPYING).

## Credits

- Original template: vscode-portfolio by Caglar Turali
- Icons: FontAwesome and MUI Icons
