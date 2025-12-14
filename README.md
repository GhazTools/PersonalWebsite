# PersonalWebsite

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite)
![MUI](https://img.shields.io/badge/MUI-7.3-007FFF?style=flat-square&logo=mui)

A modern, VS Code-inspired developer portfolio built with **React 18 + TypeScript + Vite**.

[Live Demo](https://ghaz.dev) • [Report Bug](https://github.com/GhazTools/PersonalWebsite/issues) • [Request Feature](https://github.com/GhazTools/PersonalWebsite/issues)

</div>

---

## ✨ Features

### 🎨 Design & Layout

| Feature | Description |
|---------|-------------|
| **VS Code Theme** | Dark/light mode with Atom One Dark inspired colors |
| **macOS-style UI** | Frosted glass effects, dock-style sidebar, modern tab bar |
| **Responsive Design** | Mobile-first design with collapsible navigation |
| **Smooth Animations** | Framer Motion powered transitions and hover effects |

### 🧭 Navigation

| Feature | Description |
|---------|-------------|
| **Command Palette** | Press `⌘K` (Mac) or `Ctrl+K` (Windows) to quick-navigate anywhere |
| **Tab System** | VS Code-style file tabs with drag-and-drop reordering |
| **Smart Sidebar** | Icon dock with tooltips and social links |
| **Interactive 404** | Terminal-style 404 page with autocomplete navigation |

### 📄 Content Sections

| Section | Description |
|---------|-------------|
| **Resume/Experience** | Work history with filter by Work, Research, or All |
| **Projects** | Categorized portfolio with tech badges and GitHub links |
| **Skills** | Visual skill bars organized by category |
| **Education** | Academic background with coursework details |
| **Timeline** | Interactive career journey with animated milestones |
| **GitHub Activity** | Live stats, repos, and recent activity from GitHub API |
| **Achievements** | Certifications, awards, and accomplishments |
| **Contact** | Email (with copy button), LinkedIn, GitHub links |

### 🔧 Developer Features

| Feature | Description |
|---------|-------------|
| **JSON-Driven Content** | All content loaded from JSON files - easy to customize |
| **SEO Optimized** | Meta tags, JSON-LD structured data, Open Graph support |
| **Accessibility** | Skip links, focus states, reduced motion support |
| **Type-Safe** | Full TypeScript coverage with strict mode |
| **Testing** | Vitest + React Testing Library setup |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18.3 |
| **Build Tool** | Vite 6.4 |
| **Language** | TypeScript 5.8 |
| **UI Library** | Material UI (MUI) 7.3 |
| **Animations** | Framer Motion 12.12 |
| **Icons** | FontAwesome 6.7 + MUI Icons |
| **Routing** | React Router 6.28 |
| **Testing** | Vitest 4.0 + React Testing Library |
| **Linting** | ESLint 9 + Prettier |
| **Git Hooks** | Husky + lint-staged |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/GhazTools/PersonalWebsite.git
cd PersonalWebsite

# Install dependencies
pnpm install  # or npm install

# Start development server
pnpm dev  # or npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Build
pnpm build  # or npm run build

# Preview production build
pnpm preview
```

### Run Tests

```bash
pnpm test        # Run all tests
pnpm test:watch  # Watch mode
```

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CommandPalette/   # ⌘K quick navigation
│   ├── Timeline/         # Interactive career timeline
│   ├── InteractiveResume/# Resume with filtering
│   ├── SEO/              # Meta tags & JSON-LD
│   └── ...
├── views/                # Page-level components
│   ├── ExperienceView/   # Resume/work experience
│   ├── ProjectsView/     # Project portfolio
│   ├── SkillsView/       # Skills showcase
│   ├── EducationView/    # Education details
│   ├── TimelineView/     # Career timeline
│   ├── GitHubActivityView/
│   ├── NotFoundView/     # Interactive 404 page
│   └── ...
├── layouts/              # Layout components
│   └── Main/
│       └── components/
│           ├── Header/   # Tab bar
│           ├── LeftBar/  # Sidebar dock
│           ├── StatusBar/# Bottom status bar
│           └── Explorer/ # File explorer panel
├── data/                 # JSON content files
│   └── json/
│       ├── static.json   # Site metadata
│       ├── contact.json  # Contact info
│       └── ...
├── theme/                # Design tokens
│   ├── colors.ts
│   ├── fonts.ts
│   └── muiTheme.ts
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Dark/light mode
├── hooks/                # Custom hooks
├── models/               # TypeScript interfaces
├── utils/                # Helper functions
└── styles/               # Global CSS
    ├── scrollbar.css
    └── accessibility.css
```

---

## ⚙️ Customization

### Updating Content

All content is driven by JSON files in `src/data/json/`:

| File | Content |
|------|---------|
| `static.json` | Site title, description, greeting text |
| `contact.json` | Email, social links |
| `swe.json` | Work experience entries |
| `ba.json` | Education and academic info |
| `metadata.json` | Skills, projects, achievements |

### Adding a New Page

1. Create a new view in `src/views/YourView/index.tsx`
2. Add the route in `src/data/index.tsx`:
   ```tsx
   {
     name: "yourpage.ext",
     url: "/yourpage",
     icon: "icon-name",
     color: "#hexcolor",
     comp: () => <YourView />,
   }
   ```
3. The page will automatically appear in the sidebar and command palette

### Changing Theme Colors

Edit `src/theme/colors.ts` and `src/theme/muiTheme.ts` to customize the color scheme.

### Adding Social Links

Edit `src/data/json/contact.json` to add your social profiles.

---

## 🎹 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `↑` / `↓` | Navigate suggestions |
| `Enter` | Select / Navigate |
| `Escape` | Close modal |
| `Tab` | Autocomplete (in 404 terminal) |

---

## 🌐 SEO Features

- **Meta Tags**: Title, description, keywords for each page
- **Open Graph**: Social sharing cards for LinkedIn, Twitter, Facebook
- **JSON-LD**: Structured data for search engines (Person + WebSite schemas)
- **Sitemap**: `public/sitemap.xml` for search engine indexing
- **Robots.txt**: Search engine crawling rules

---

## ♿ Accessibility

- **Skip to Content**: Hidden link appears on Tab for keyboard users
- **Focus Indicators**: Visible focus states for all interactive elements
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **High Contrast**: Supports `prefers-contrast: high`
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Keyboard Navigation**: Full site navigable via keyboard

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source under the **GPL-3.0 License**. See [COPYING](COPYING) for details.

---

## 🙏 Credits

- Original template: [vscode-portfolio](https://github.com/caglarturali/vscode-portfolio) by [Caglar Turali](https://github.com/caglarturali)
- Icons: [FontAwesome](https://fontawesome.com/) and [MUI Icons](https://mui.com/material-ui/material-icons/)
- Fonts: [Ubuntu](https://fonts.google.com/specimen/Ubuntu) and [Ubuntu Mono](https://fonts.google.com/specimen/Ubuntu+Mono)

---

<div align="center">

Made with ❤️ by [Ghazanfar Shahbaz](https://ghaz.dev)

</div>
