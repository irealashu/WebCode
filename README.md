# ⚡ WebCode - Universal In-Browser IDE & Playground

WebCode is a comprehensive, client-side in-browser Integrated Development Environment (IDE) with multi-language execution runtimes, a multi-file project workspace, CodeMirror editor, live sandboxed preview, interactive terminal, command palette, and package manager. Built entirely with modern web technologies, WebCode runs 100% in the browser without requiring any backend server or installation.

---

## 🌟 Supported Language Runtimes & Engines

### 🌐 1. Web Engine (HTML, CSS, JavaScript & JSX)
- **HTML5 & Modern CSS3**: Live rendered preview in an isolated, sandboxed iframe.
- **ESNext JavaScript & JSX**: Write standard JavaScript or React JSX components (transpiled live in-browser via Babel Standalone).
- **Responsive Viewports**: Switch between Desktop (100%), Tablet (768px), and Mobile (375px) device preview frames.
- **Console Bridge**: Real-time interception of `console.log`, `console.info`, `console.warn`, and `console.error` streamed directly into the IDE Terminal with timestamps.

### 🐍 2. Python 3 WebAssembly Runtime (Pyodide)
- **Real Python 3 in Browser**: Powered by Pyodide WebAssembly compiled directly for the browser.
- **Standard Library Support**: Perform mathematical calculations, algorithms, string operations, simulations, and data structures.
- **Standard Streams**: Live streaming of `sys.stdout` and `sys.stderr` into the integrated terminal.
- **Interactive REPL**: Execute single Python statements directly through the terminal command bar.

### 🗄️ 3. SQL Relational Database Engine (AlaSQL)
- **In-Memory SQL Execution**: Execute `CREATE TABLE`, `INSERT`, `SELECT`, `JOIN`, `GROUP BY`, and aggregation queries.
- **Tabular Data Viewer**: Query results are formatted into an interactive data grid with sticky headers.
- **1-Click JSON Export**: Download raw SQL query result sets as formatted `.json` files.

### 📝 4. Markdown Document Renderer
- **GitHub-Flavored Markdown (GFM)**: Live rendered preview for documentation, notes, and README files.
- **Rich Elements**: Supports formatted headings, styled tables, code blocks, checklists, blockquotes, and links.

---

## ✨ Full Feature Overview

### 📁 Multi-File Project Workspace & Tree
- Create, rename, edit, and delete any number of project files (`.html`, `.css`, `.js`, `.jsx`, `.py`, `.sql`, `.md`, `.json`).
- Tabbed editor bar with active tab indicators and quick tab closing.
- Breadcrumb bar with dynamic file stats (Cursor line, column, and total line count).

### 🎨 VS Code-Style Activity Bar
- **📁 File Explorer**: Navigate, manage, and create project files.
- **🔍 Global Search**: Search text across all files with line number highlighting and 1-click jump-to-file.
- **📦 Packages & CDNs**: 1-click install/toggle popular libraries:
  - Tailwind CSS, Bootstrap 5.3, Font Awesome 6, Lucide Icons, Canvas Confetti, Three.js, Chart.js, React 18, Vue 3, Babel Standalone.
- **🛠️ Developer Toolbox**:
  - Color Picker with hex code display.
  - 1-Click JSON Formatter & Syntax Validator.
  - Base64 Text Encoder / Decoder.
- **🕒 Snapshots & History**: Save named timestamped versions and restore previous project states with one click.
- **⚙️ IDE Settings**: Adjust editor font size, tab indentation (2 vs 4 spaces), and editor themes.

### ⌨️ Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
- Keyboard-first command launcher with instant fuzzy searching.
- Execute any IDE action: run project, save snapshot, create file, clear logs, format code, or switch themes without taking hands off the keyboard.

### 💻 Interactive Terminal & REPL
- Multi-tab bottom panel (Terminal & SQL Results).
- Resizable and collapsible bottom drawer.
- Filtered color-coded logs (Success, Info, Warning, Error).
- Interactive REPL prompt to evaluate JavaScript expressions or Python commands live.

### 📋 Ready-to-Use Project Templates
- **⚡ Modern Web Starter**: HTML5, CSS3, and JavaScript interactive playground.
- **🐍 Python Data & Math Algorithms**: Monte Carlo simulations and mathematical calculations.
- **🗄️ SQL Analytics & E-Commerce**: Multi-table database queries, aggregations, and category summaries.
- **⚛️ React 18 JSX Counter App**: Interactive React 18 counter with live JSX transpilation.

### 🌍 10-Language Internationalization (i18n) & RTL
Full UI localization for 10 languages:
- 🇺🇸 English (EN)
- 🇪🇸 Spanish (ES)
- 🇫🇷 French (FR)
- 🇩🇪 German (DE)
- 🇨🇳 Chinese (ZH)
- 🇯🇵 Japanese (JA)
- 🇮🇳 Hindi (HI)
- 🇧🇷 Portuguese (PT)
- 🇷🇺 Russian (RU)
- 🇸🇦 Arabic (AR) with full RTL (Right-to-Left) layout support.

### 🎨 Modern Theme Presets
- **🌙 Midnight**: Deep contrast dark theme.
- **☀️ Light Slate**: Clean, high-legibility light theme.
- **🧛 Dracula**: Vibrant purple and pastel contrast theme.
- **🎨 Monokai**: Iconic code editor palette with warm accents.

### 📦 Export & Sharing
- **ZIP Project Archive**: Download a complete `.zip` archive preserving the exact file structure and contents (powered by JSZip).
- **Shareable URLs**: Generate a self-contained, base64-encoded URL containing the full project to share with others.
- **Local Persistence**: Automatic draft saving to `localStorage` so work is never lost between browser refreshes.

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Command |
|---|---|
| `Ctrl + Enter` / `Cmd + Enter` | **Run Active File / Project** |
| `Ctrl + S` / `Cmd + S` | **Save Project Snapshot** |
| `Ctrl + Shift + P` / `Cmd + Shift + P` | **Open Command Palette** |
| `Alt + N` | **Create New File** |
| `Ctrl + 1` | **Switch to File Explorer** |
| `Ctrl + 2` | **Switch to Search** |
| `Ctrl + 3` | **Switch to Package Manager** |
| `Ctrl + 4` | **Switch to Developer Toolbox** |
| `Ctrl + 5` | **Switch to Snapshots & History** |
| `Ctrl + ,` | **Switch to IDE Settings** |
| `Escape` | **Close Modals / Command Palette** |

---

## 📁 Project Architecture

```text
WebCode/
├── .github/
│   └── workflows/
│       └── deploy.yml # GitHub Actions automated GitHub Pages deployment workflow
├── index.html         # Main IDE application markup, layout structure & dialogs
├── styles.css         # Complete IDE styling, theme variables, Activity Bar & split views
├── app.js             # Core IDE engine, runtimes (Web, Python Wasm, SQL, Markdown), i18n
├── jszip.min.js       # JSZip library for in-browser ZIP archiving
├── metadata.json      # Platform application manifest & capabilities
└── README.md          # Comprehensive documentation and feature guide
```

---

## 🚀 Deployment & GitHub Pages

WebCode is zero-configuration static web software ready for immediate publishing:

- **Automated GitHub Pages CI/CD**: Pushing to the `main` or `master` branch triggers `.github/workflows/deploy.yml` to automatically build and deploy your WebCode IDE instance live to GitHub Pages.
- **Local / Self-Hosted**: Open `index.html` in any browser or serve with any static web server (Nginx, Caddy, Vercel, Netlify, Cloudflare Pages).

---

## 🚀 Getting Started

1. Open `index.html` in any modern web browser.
2. Select your desired runtime by creating or opening a file (`.js`/`.html` for Web, `.py` for Python, `.sql` for SQL, or `.md` for Markdown).
3. Click **▶ Run** or press `Ctrl + Enter` to execute.
4. Export your work anytime as a `.zip` archive or share it via URL!

---

## 🔒 Security & Sandbox Isolation

- **Iframe Sandboxing**: Web outputs are rendered inside an isolated iframe with `sandbox="allow-scripts allow-modals allow-same-origin allow-forms"`.
- **Zero Backend Required**: All code execution occurs in-browser on the client side using WebAssembly (Pyodide) and local JavaScript engines.

---

## 📜 License

Copyright © 2026. Licensed under the **Apache License, Version 2.0**.
