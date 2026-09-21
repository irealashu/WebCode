/**
 * WebCode Universal IDE - Master Application Engine
 * Multi-Language Runtimes (Web, Python 3 Pyodide, SQL AlaSQL, Markdown)
 * Multi-File Project Explorer, CodeMirror syntax highlighting, Terminal & DevTools
 */

// --- 1. Localization (English) ---
const i18n = {
  en: {
    run: "Run",
    save: "Save",
    newFile: "New File",
    explorer: "Explorer",
    search: "Search",
    runtimes: "Runtimes",
    packages: "Packages",
    tools: "Tools",
    history: "History",
    settings: "Settings",
    templates: "Templates",
    exportZip: "Export ZIP",
    share: "Share Link",
    console: "Console",
    terminal: "Terminal",
    sqlViewer: "SQL Results",
    problems: "Problems",
    commandPalette: "Command Palette",
    evalPrompt: "Execute command or JS...",
    filesTitle: "PROJECT FILES",
    clearLogs: "Clear",
    livePreview: "Live Output",
    formatCode: "Format",
    copied: "Link copied to clipboard!",
    savedSuccess: "Project saved successfully!",
    pyReady: "Python 3 (Pyodide WebAssembly) is ready!",
    pyRunning: "Running Python script in WebAssembly...",
    sqlRunning: "Executing SQL queries...",
    noFilesFound: "No files found",
    shortcuts: "Shortcuts: Ctrl+S (Save), Ctrl+Enter (Run), Ctrl+Shift+P (Command Palette)",
  }
};

let currentLang = "en";

// --- 2. Multi-File Virtual Workspace State ---
let workspaceFiles = [];
let activeFileName = "";
let openTabs = [];
let activeLibraries = JSON.parse(localStorage.getItem("wc_libs") || '["confetti"]');
let customCdnPackages = JSON.parse(localStorage.getItem("wc_custom_cdns") || '[]');
let isLiveSyncEnabled = localStorage.getItem("wc_live_sync") !== "false";
let liveSyncDebounceTimer = null;
let currentPackageFilter = "all";
let packageSearchQuery = "";
let codeMirrorEditor = null;
let pyodideInstance = null;
let isPyodideLoading = false;

// Predefined Starter Templates for On-Demand Environment Creation
const starterPresets = {
  web: [
    {
      name: "index.html",
      language: "html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Cyber Sandbox</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <canvas id="bgCanvas"></canvas>
  
  <main class="cyber-container">
    <header class="app-header">
      <div class="badge-pulse">⚡ Cyber Sandbox v2.5</div>
      <h1 class="glow-title">Modern Web Engine</h1>
      <p class="subtitle">HTML5 • CSS3 • Web Audio Synth • Confetti Physics</p>
    </header>

    <div class="clock-display">
      <div class="clock-label">LIVE SYSTEM TIME</div>
      <div id="clockTime" class="clock-time">00:00:00</div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <span class="m-label">Celebrations</span>
        <span id="clickCount" class="m-val">0</span>
      </div>
      <div class="metric-card">
        <span class="m-label">Audio Synth</span>
        <span id="audioStatus" class="m-val active">READY</span>
      </div>
    </div>

    <div class="action-zone">
      <button id="btnCelebrate" class="btn-glow">🎉 Trigger Celebration</button>
      <button id="btnSound" class="btn-outline">🎵 Play Synth Chime</button>
    </div>

    <footer class="app-footer">
      <span>Theme:</span>
      <div class="theme-picker">
        <button class="theme-dot active" data-theme="cyber" title="Cyber Cyan"></button>
        <button class="theme-dot" data-theme="aurora" title="Aurora Purple"></button>
        <button class="theme-dot" data-theme="sunset" title="Sunset Amber"></button>
      </div>
    </footer>
  </main>

  <script src="script.js"></script>
</body>
</html>`
    },
    {
      name: "style.css",
      language: "css",
      content: `:root {
  --bg-gradient: radial-gradient(circle at 50% 20%, #0f172a 0%, #070a12 100%);
  --accent: #38bdf8;
  --accent-glow: rgba(56, 189, 248, 0.4);
  --card-bg: rgba(15, 23, 42, 0.85);
  --border: rgba(255, 255, 255, 0.12);
}

[data-theme-name="aurora"] {
  --accent: #a855f7;
  --accent-glow: rgba(168, 85, 247, 0.4);
}

[data-theme-name="sunset"] {
  --accent: #f59e0b;
  --accent-glow: rgba(245, 158, 11, 0.4);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg-gradient);
  color: #f8fafc;
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 20px;
  overflow-x: hidden;
  position: relative;
}

#bgCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
}

.cyber-container {
  position: relative;
  z-index: 10;
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px 28px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px var(--accent-glow);
  text-align: center;
  transition: all 0.3s ease;
}

.badge-pulse {
  display: inline-block;
  background: rgba(56, 189, 248, 0.12);
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.glow-title {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 24px;
}

.clock-display {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 20px;
}

.clock-label {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.clock-time {
  font-family: monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
  text-shadow: 0 0 10px var(--accent-glow);
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.metric-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.m-label { font-size: 11px; color: #94a3b8; }
.m-val { font-size: 18px; font-weight: 700; color: white; }
.m-val.active { color: #10b981; }

.action-zone {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.btn-glow {
  background: var(--accent);
  color: #090d16;
  border: none;
  padding: 14px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 15px var(--accent-glow);
  transition: all 0.2s ease;
}

.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--accent-glow);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 1px solid var(--border);
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.08);
}

.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.theme-picker { display: flex; gap: 8px; }
.theme-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
}

.theme-dot[data-theme="cyber"] { background: #38bdf8; }
.theme-dot[data-theme="aurora"] { background: #a855f7; }
.theme-dot[data-theme="sunset"] { background: #f59e0b; }
.theme-dot.active { border-color: white; transform: scale(1.15); }`
    },
    {
      name: "script.js",
      language: "javascript",
      content: `let count = 0;
const clickCountEl = document.getElementById("clickCount");
const clockEl = document.getElementById("clockTime");
const btnCelebrate = document.getElementById("btnCelebrate");
const btnSound = document.getElementById("btnSound");

function updateClock() {
  const now = new Date();
  if (clockEl) clockEl.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function playSynthSound(freq = 520, type = 'sine', duration = 0.25) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch(e) {}
}

if (btnCelebrate) {
  btnCelebrate.addEventListener("click", () => {
    count++;
    if (clickCountEl) clickCountEl.textContent = count;
    playSynthSound(600, 'triangle', 0.3);
    
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
    }
    console.log("🎉 Celebration triggered! Count:", count);
  });
}

if (btnSound) {
  btnSound.addEventListener("click", () => {
    playSynthSound(440, 'sine', 0.2);
    setTimeout(() => playSynthSound(880, 'sine', 0.3), 100);
    console.log("🎵 Web Audio Chime played!");
  });
}

document.querySelectorAll(".theme-dot").forEach(dot => {
  dot.addEventListener("click", (e) => {
    document.querySelectorAll(".theme-dot").forEach(d => d.classList.remove("active"));
    e.target.classList.add("active");
    const theme = e.target.dataset.theme;
    document.body.setAttribute("data-theme-name", theme);
  });
});

const canvas = document.getElementById("bgCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let pts = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    }));
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    pts.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

console.log("⚡ Cyber Sandbox ready.");`
    }
  ],
  python: [
    {
      name: "main.py",
      language: "python",
      content: `# WebCode Universal IDE - Python 3 Runtime (WebAssembly Pyodide)
import math
import sys

print(f"🐍 Python {sys.version.split()[0]} running in browser!")

def fibonacci(n):
    a, b = 0, 1
    series = []
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

print("\\n--- Fibonacci Sequence Benchmark ---")
fib_series = fibonacci(12)
print(f"First 12 Fibonacci numbers: {fib_series}")

print("\\n--- Mathematical Calculations ---")
print(f"Pi approximation: {math.pi}")
print(f"Factorial of 8: {math.factorial(8):,}")
print(f"Square root of 256: {math.sqrt(256)}")
print("\\nExecution completed successfully!")`
    }
  ],
  sql: [
    {
      name: "database.sql",
      language: "sql",
      content: `-- WebCode In-Browser SQL Relational Database Engine
CREATE TABLE users (id INT, name STRING, role STRING, score INT);
INSERT INTO users VALUES (1, 'Alice Dev', 'Senior Architect', 98);
INSERT INTO users VALUES (2, 'Bob Coder', 'Fullstack Engineer', 91);
INSERT INTO users VALUES (3, 'Charlie Data', 'ML Researcher', 95);
INSERT INTO users VALUES (4, 'Diana Cloud', 'DevOps Specialist', 94);

CREATE TABLE projects (id INT, user_id INT, title STRING, stars INT);
INSERT INTO projects VALUES (101, 1, 'WebCode Studio IDE', 1240);
INSERT INTO projects VALUES (102, 2, 'Reactive UI Framework', 850);
INSERT INTO projects VALUES (103, 3, 'Wasm Neural Network', 2100);

-- Query with JOIN and Aggregations
SELECT 
  u.name AS Developer, 
  u.role AS Position, 
  p.title AS Project, 
  p.stars AS Stars 
FROM users u 
JOIN projects p ON u.id = p.user_id 
ORDER BY p.stars DESC;`
    }
  ],
  markdown: [
    {
      name: "README.md",
      language: "markdown",
      content: `# 📝 My Project Notes & Documentation

Welcome to your Markdown workspace in **WebCode Universal IDE**.

## 🌟 Features
- **Live GFM Rendering**: Tables, checklists, code blocks, and formatted text
- **Responsive Preview**: Live split view rendering as you write

### 📋 To-Do Checklist
- [x] Create project environment
- [ ] Draft system specifications
- [ ] Share with team

> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra`
    }
  ],
  react: [
    {
      name: "index.html",
      language: "html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React 18 Playground</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" src="App.jsx"></script>
</body>
</html>`
    },
    {
      name: "style.css",
      language: "css",
      content: `body {
  background: #0f172a;
  color: white;
  display: grid;
  place-items: center;
  min-height: 100vh;
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
}

.react-box {
  background: #1e293b;
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #334155;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

button {
  background: #61dafb;
  color: #0b0f19;
  font-weight: bold;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin: 0 4px;
}`
    },
    {
      name: "App.jsx",
      language: "javascript",
      content: `const { useState } = React;

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="react-box">
      <h2>⚛️ React 18 in WebCode</h2>
      <p style={{ color: '#94a3b8', margin: '12px 0' }}>Live JSX in-browser transpilation</p>
      <h1 style={{ fontSize: '48px', color: '#61dafb', margin: '16px 0' }}>{count}</h1>
      <div style={{ marginTop: '16px' }}>
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`
    }
  ]
};

// --- 3. CDN Packages Catalog ---
const cdnPackages = [
  // CSS & UI Frameworks
  { id: "tailwind", name: "Tailwind CSS", category: "css", desc: "Utility-first CSS framework with instant compilation", url: "https://cdn.tailwindcss.com", type: "js" },
  { id: "bootstrap", name: "Bootstrap 5.3", category: "css", desc: "Responsive component system & flexbox grid", url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", type: "css" },
  { id: "bulma", name: "Bulma CSS", category: "css", desc: "Modern CSS framework based on Flexbox", url: "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css", type: "css" },
  { id: "animatecss", name: "Animate.css", category: "css", desc: "Cross-browser CSS animations library", url: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css", type: "css" },
  
  // Icon Kits
  { id: "fontawesome", name: "Font Awesome 6", category: "icons", desc: "Icon library and styling toolkit with 2,000+ icons", url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", type: "css" },
  { id: "lucide", name: "Lucide Icons", category: "icons", desc: "Clean & modern SVG icon collection with auto-rendering", url: "https://unpkg.com/lucide@latest", type: "js" },
  { id: "remixicon", name: "Remix Icon", category: "icons", desc: "Open-source neutral-style icon system", url: "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css", type: "css" },

  // JavaScript & Reactive Frameworks
  { id: "react", name: "React 18 & ReactDOM", category: "frameworks", desc: "Declarative UI components with JSX transpilation", url: "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js", extra: "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js", type: "js" },
  { id: "vue", name: "Vue 3", category: "frameworks", desc: "Progressive reactive framework for web UIs", url: "https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.21/vue.global.prod.min.js", type: "js" },
  { id: "alpine", name: "Alpine.js", category: "frameworks", desc: "Rugged, minimal tool for composing behavior directly in HTML", url: "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js", type: "js" },
  { id: "babel", name: "Babel Standalone", category: "frameworks", desc: "In-browser JSX, TypeScript & ESNext transpiler", url: "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.4/babel.min.js", type: "js" },

  // Animation & 3D Graphics
  { id: "confetti", name: "Canvas Confetti", category: "animation", desc: "Particle confetti physics engine for celebrations", url: "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js", type: "js" },
  { id: "threejs", name: "Three.js", category: "animation", desc: "3D WebGL computer graphics & scenes engine", url: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", type: "js" },
  { id: "gsap", name: "GSAP (GreenSock)", category: "animation", desc: "High-performance JavaScript web animation engine", url: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", type: "js" },
  { id: "animejs", name: "Anime.js", category: "animation", desc: "Lightweight JavaScript animation library", url: "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js", type: "js" },

  // Data & Utilities
  { id: "chartjs", name: "Chart.js", category: "data", desc: "HTML5 Canvas charting and data visualization", url: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js", type: "js" },
  { id: "d3", name: "D3.js", category: "data", desc: "Data-Driven Documents for interactive visualizations", url: "https://cdn.jsdelivr.net/npm/d3@7", type: "js" },
  { id: "axios", name: "Axios", category: "data", desc: "Promise-based HTTP client for browser API requests", url: "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js", type: "js" },
  { id: "lodash", name: "Lodash", category: "data", desc: "Modern utility library delivering modularity & performance", url: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js", type: "js" }
];

// --- 4. Templates Catalog ---
const ideTemplates = [
  {
    id: "react-app",
    title: "⚛️ React 18 JSX Counter & State",
    category: "React",
    desc: "Modern React 18 component with interactive hooks, state counter, and styled UI",
    libs: ["react", "babel"],
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React 18 Playground</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" src="App.jsx"></script>
</body>
</html>`
      },
      {
        name: "style.css",
        language: "css",
        content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: #0f172a;
  color: #f8fafc;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 24px;
}
.react-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 32px;
  max-width: 440px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}
.react-badge {
  display: inline-block;
  background: rgba(97, 218, 251, 0.15);
  color: #61dafb;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}
.react-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 6px;
}
.counter-display {
  font-size: 56px;
  font-weight: 800;
  color: #61dafb;
  margin: 20px 0;
  font-variant-numeric: tabular-nums;
}
.btn-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.react-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.react-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}
.react-btn.secondary {
  background: #334155;
  color: #cbd5e1;
}
.react-btn.secondary:hover {
  background: #475569;
}`
      },
      {
        name: "App.jsx",
        language: "javascript",
        content: `const { useState } = React;

function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const updateCount = (newVal) => {
    setCount(newVal);
    setHistory(prev => [newVal, ...prev.slice(0, 4)]);
  };

  return (
    <div className="react-card">
      <div className="react-badge">⚛️ React 18 + Babel JSX</div>
      <h1 className="react-title">Interactive Counter</h1>
      <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 16px' }}>
        Live in-browser JSX transpilation with state hooks
      </p>

      <div className="counter-display">{count}</div>

      <div className="btn-group">
        <button className="react-btn" onClick={() => updateCount(count - 1)}>- Decrement</button>
        <button className="react-btn secondary" onClick={() => updateCount(0)}>Reset</button>
        <button className="react-btn" onClick={() => updateCount(count + 1)}>+ Increment</button>
      </div>

      {history.length > 0 && (
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #334155', fontSize: '12px', color: '#64748b' }}>
          Recent values: {history.join(', ')}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`
      }
    ]
  },
  {
    id: "web-starter",
    title: "⚡ Modern Web Application",
    category: "Web",
    desc: "Interactive web sandbox with Web Audio synthesizer, live clock, theme engine, and confetti particle physics",
    libs: ["confetti"],
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Cyber Sandbox</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <canvas id="bgCanvas"></canvas>
  
  <main class="cyber-container">
    <header class="app-header">
      <div class="badge-pulse">⚡ Cyber Sandbox v2.5</div>
      <h1 class="glow-title">Modern Web Engine</h1>
      <p class="subtitle">HTML5 • CSS3 • Web Audio Synth • Confetti Physics</p>
    </header>

    <div class="clock-display">
      <div class="clock-label">LIVE SYSTEM TIME</div>
      <div id="clockTime" class="clock-time">00:00:00</div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <span class="m-label">Celebrations</span>
        <span id="clickCount" class="m-val">0</span>
      </div>
      <div class="metric-card">
        <span class="m-label">Audio Synth</span>
        <span id="audioStatus" class="m-val active">READY</span>
      </div>
    </div>

    <div class="action-zone">
      <button id="btnCelebrate" class="btn-glow">🎉 Trigger Celebration</button>
      <button id="btnSound" class="btn-outline">🎵 Play Synth Chime</button>
    </div>

    <footer class="app-footer">
      <span>Theme:</span>
      <div class="theme-picker">
        <button class="theme-dot active" data-theme="cyber" title="Cyber Cyan"></button>
        <button class="theme-dot" data-theme="aurora" title="Aurora Purple"></button>
        <button class="theme-dot" data-theme="sunset" title="Sunset Amber"></button>
      </div>
    </footer>
  </main>

  <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: "style.css",
        language: "css",
        content: `:root {
  --bg-gradient: radial-gradient(circle at 50% 20%, #0f172a 0%, #070a12 100%);
  --accent: #38bdf8;
  --accent-glow: rgba(56, 189, 248, 0.4);
  --card-bg: rgba(15, 23, 42, 0.85);
  --border: rgba(255, 255, 255, 0.12);
}

[data-theme-name="aurora"] {
  --accent: #a855f7;
  --accent-glow: rgba(168, 85, 247, 0.4);
}

[data-theme-name="sunset"] {
  --accent: #f59e0b;
  --accent-glow: rgba(245, 158, 11, 0.4);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg-gradient);
  color: #f8fafc;
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 20px;
  overflow-x: hidden;
  position: relative;
}

#bgCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
}

.cyber-container {
  position: relative;
  z-index: 10;
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px 28px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px var(--accent-glow);
  text-align: center;
  transition: all 0.3s ease;
}

.badge-pulse {
  display: inline-block;
  background: rgba(56, 189, 248, 0.12);
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.glow-title {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 24px;
}

.clock-display {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 20px;
}

.clock-label {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.clock-time {
  font-family: monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--accent);
  text-shadow: 0 0 10px var(--accent-glow);
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.metric-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.m-label { font-size: 11px; color: #94a3b8; }
.m-val { font-size: 18px; font-weight: 700; color: white; }
.m-val.active { color: #10b981; }

.action-zone {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.btn-glow {
  background: var(--accent);
  color: #090d16;
  border: none;
  padding: 14px 20px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 15px var(--accent-glow);
  transition: all 0.2s ease;
}

.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--accent-glow);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 1px solid var(--border);
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.08);
}

.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.theme-picker { display: flex; gap: 8px; }
.theme-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
}

.theme-dot[data-theme="cyber"] { background: #38bdf8; }
.theme-dot[data-theme="aurora"] { background: #a855f7; }
.theme-dot[data-theme="sunset"] { background: #f59e0b; }
.theme-dot.active { border-color: white; transform: scale(1.15); }`
      },
      {
        name: "script.js",
        language: "javascript",
        content: `let count = 0;
const clickCountEl = document.getElementById("clickCount");
const clockEl = document.getElementById("clockTime");
const btnCelebrate = document.getElementById("btnCelebrate");
const btnSound = document.getElementById("btnSound");

function updateClock() {
  const now = new Date();
  if (clockEl) clockEl.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function playSynthSound(freq = 520, type = 'sine', duration = 0.25) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch(e) {}
}

if (btnCelebrate) {
  btnCelebrate.addEventListener("click", () => {
    count++;
    if (clickCountEl) clickCountEl.textContent = count;
    playSynthSound(600, 'triangle', 0.3);
    
    if (typeof confetti === "function") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
    }
    console.log("🎉 Celebration triggered! Count:", count);
  });
}

if (btnSound) {
  btnSound.addEventListener("click", () => {
    playSynthSound(440, 'sine', 0.2);
    setTimeout(() => playSynthSound(880, 'sine', 0.3), 100);
    console.log("🎵 Web Audio Chime played!");
  });
}

document.querySelectorAll(".theme-dot").forEach(dot => {
  dot.addEventListener("click", (e) => {
    document.querySelectorAll(".theme-dot").forEach(d => d.classList.remove("active"));
    e.target.classList.add("active");
    const theme = e.target.dataset.theme;
    document.body.setAttribute("data-theme-name", theme);
  });
});

const canvas = document.getElementById("bgCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let pts = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    }));
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    pts.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

console.log("⚡ Cyber Sandbox ready.");`
      }
    ]
  },
  {
    id: "todo-app",
    title: "📋 Responsive Task Manager",
    category: "Web App",
    desc: "Complete CRUD todo application with filters, status badges, and deletion",
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Manager</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="todo-app">
    <header class="todo-header">
      <h2>📋 Task Manager</h2>
      <span class="todo-count" id="taskCount">0 tasks</span>
    </header>
    
    <form id="todoForm" class="todo-input-row">
      <input type="text" id="todoInput" placeholder="Add a new task..." autocomplete="off">
      <button type="submit" class="btn-add">Add</button>
    </form>

    <div class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
    </div>

    <ul id="todoList" class="todo-list"></ul>
  </div>
  <script src="app.js"></script>
</body>
</html>`
      },
      {
        name: "style.css",
        language: "css",
        content: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0f172a;
  color: #f8fafc;
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 20px;
}
.todo-app {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.todo-count {
  font-size: 12px;
  color: #94a3b8;
  background: #334155;
  padding: 2px 8px;
  border-radius: 12px;
}
.todo-input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.todo-input-row input {
  flex: 1;
  background: #0f172a;
  border: 1px solid #334155;
  color: #f8fafc;
  padding: 10px 14px;
  border-radius: 8px;
  outline: none;
}
.todo-input-row input:focus { border-color: #3b82f6; }
.btn-add {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.filters {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
}
.filter-btn {
  background: transparent;
  border: 1px solid #334155;
  color: #94a3b8;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}
.filter-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}
.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 280px;
  overflow-y: auto;
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0f172a;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
}
.todo-item.done span {
  text-decoration: line-through;
  color: #64748b;
}
.todo-delete {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 6px;
  border-radius: 4px;
}`
      },
      {
        name: "app.js",
        language: "javascript",
        content: `let todos = [
  { id: 1, text: "Explore WebCode Studio IDE", done: true },
  { id: 2, text: "Test multi-file project templates", done: true },
  { id: 3, text: "Create your next big idea", done: false }
];
let currentFilter = "all";

const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const countEl = document.getElementById("taskCount");

function renderTodos() {
  list.innerHTML = "";
  const filtered = todos.filter(t => {
    if (currentFilter === "active") return !t.done;
    if (currentFilter === "completed") return t.done;
    return true;
  });

  filtered.forEach(t => {
    const li = document.createElement("li");
    li.className = \`todo-item \${t.done ? 'done' : ''}\`;
    li.innerHTML = \`
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;flex:1;">
        <input type="checkbox" \${t.done ? 'checked' : ''} onchange="toggleTodo(\${t.id})">
        <span>\${t.text}</span>
      </label>
      <button class="todo-delete" onclick="deleteTodo(\${t.id})">✕</button>
    \`;
    list.appendChild(li);
  });

  const activeCount = todos.filter(t => !t.done).length;
  countEl.textContent = \`\${activeCount} active task\${activeCount === 1 ? '' : 's'}\`;
}

window.toggleTodo = function(id) {
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  renderTodos();
};

window.deleteTodo = function(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  input.value = "";
  renderTodos();
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

renderTodos();`
      }
    ]
  },
  {
    id: "canvas-particles",
    title: "🎨 Interactive Canvas Physics",
    category: "Graphics",
    desc: "Fluid particle physics simulation reacting to mouse cursor movements & clicks",
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Canvas Particle Physics</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="overlay-info">
    <h3>✨ Particle Physics</h3>
    <p>Move mouse or click canvas to interact</p>
  </div>
  <canvas id="particleCanvas"></canvas>
  <script src="canvas.js"></script>
</body>
</html>`
      },
      {
        name: "style.css",
        language: "css",
        content: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #090d16;
  overflow: hidden;
  font-family: system-ui, sans-serif;
  height: 100vh;
}
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}
.overlay-info {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 18px;
  border-radius: 12px;
  color: white;
  pointer-events: none;
}
.overlay-info h3 { font-size: 14px; margin-bottom: 2px; }
.overlay-info p { font-size: 11px; color: #94a3b8; }`
      },
      {
        name: "canvas.js",
        language: "javascript",
        content: `const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
const particleCount = 80;
const mouse = { x: null, y: null, radius: 120 };

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 30) + 1;
    this.color = \`hsl(\${Math.random() * 60 + 190}, 90%, 65%)\`;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = (dx / distance) * force * this.density;
    let directionY = (dy / distance) * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

function animate() {
  ctx.fillStyle = "rgba(9, 13, 22, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.strokeStyle = \`rgba(56, 189, 248, \${1 - dist / 90})\`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

animate();`
      }
    ]
  },
  {
    id: "chartjs-dashboard",
    title: "📊 Chart.js Analytics Dashboard",
    category: "Data Viz",
    desc: "Interactive business analytics cards with dynamic line and doughnut charts",
    libs: ["chartjs"],
    files: [
      {
        name: "index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Analytics Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="dashboard-container">
    <header class="dash-header">
      <h2>📊 Revenue & Traffic Analytics</h2>
      <button id="btnRandomize" class="btn-refresh">↻ Refresh Data</button>
    </header>
    
    <div class="charts-grid">
      <div class="chart-card">
        <h3>Monthly Revenue ($k)</h3>
        <canvas id="revenueChart"></canvas>
      </div>
      <div class="chart-card">
        <h3>Traffic by Channel</h3>
        <canvas id="trafficChart"></canvas>
      </div>
    </div>
  </div>
  <script src="dashboard.js"></script>
</body>
</html>`
      },
      {
        name: "style.css",
        language: "css",
        content: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #0b0f19;
  color: #f8fafc;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 24px;
}
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
}
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.btn-refresh {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 640px) {
  .charts-grid { grid-template-columns: 1fr; }
}
.chart-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 18px;
}
.chart-card h3 {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 12px;
}`
      },
      {
        name: "dashboard.js",
        language: "javascript",
        content: `const revCtx = document.getElementById('revenueChart').getContext('2d');
const trafCtx = document.getElementById('trafficChart').getContext('2d');

const revenueChart = new Chart(revCtx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue ($k)',
      data: [32, 45, 41, 64, 58, 82],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } }
  }
});

const trafficChart = new Chart(trafCtx, {
  type: 'doughnut',
  data: {
    labels: ['Direct', 'Search', 'Social', 'Referral'],
    datasets: [{
      data: [40, 30, 20, 10],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
    }]
  },
  options: {
    responsive: true
  }
});

document.getElementById('btnRandomize').addEventListener('click', () => {
  revenueChart.data.datasets[0].data = Array.from({ length: 6 }, () => Math.floor(Math.random() * 60) + 30);
  revenueChart.update();
  trafficChart.data.datasets[0].data = Array.from({ length: 4 }, () => Math.floor(Math.random() * 50) + 10);
  trafficChart.update();
});`
      }
    ]
  },
  {
    id: "python-math",
    title: "🐍 Python Math & Monte Carlo Pi",
    category: "Python 3",
    desc: "Mathematical simulation with WebAssembly Pyodide engine and benchmark statistics",
    files: [
      {
        name: "main.py",
        language: "python",
        content: `# Python 3 Mathematical Benchmark & Simulation
import math
import random
import time

print("🐍 Starting Python 3 WebAssembly Pyodide Benchmark...")

def monte_carlo_pi(samples=60000):
    inside = 0
    start = time.time()
    for _ in range(samples):
        x, y = random.random(), random.random()
        if x*x + y*y <= 1.0:
            inside += 1
    duration = time.time() - start
    return (4 * inside) / samples, duration

print("\\n1. Estimating Pi via Monte Carlo (60,000 samples)...")
pi_est, elapsed = monte_carlo_pi()
print(f"   Estimated Pi  : {pi_est:.5f}")
print(f"   True Math Pi  : {math.pi:.5f}")
print(f"   Absolute Error: {abs(pi_est - math.pi):.5f}")
print(f"   Elapsed Time  : {elapsed*1000:.2f} ms")

def prime_factors(n):
    factors = []
    d = 2
    while d * d <= n:
        while (n % d) == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors

target_num = 104729 * 23
print(f"\\n2. Prime Factorization of {target_num:,}:")
print(f"   Factors: {prime_factors(target_num)}")

print("\\n✨ All Python benchmarks completed successfully!")`
      }
    ]
  },
  {
    id: "sql-ecommerce",
    title: "🗄️ SQL Database & E-Commerce",
    category: "SQL",
    desc: "In-browser relational SQL queries with tables, JOIN statements, and analytical aggregations",
    files: [
      {
        name: "database.sql",
        language: "sql",
        content: `-- In-Browser Relational SQL Database Schema
CREATE TABLE products (
  id INT, 
  title STRING, 
  category STRING, 
  price FLOAT,
  stock INT
);

INSERT INTO products VALUES (1, 'Pro Mechanical Keyboard', 'Hardware', 129.99, 45);
INSERT INTO products VALUES (2, 'Ergonomic Precision Mouse', 'Hardware', 69.50, 80);
INSERT INTO products VALUES (3, '4K HDR Monitor 27"', 'Displays', 389.00, 20);
INSERT INTO products VALUES (4, 'Standing Desk Converter', 'Office', 249.99, 15);
INSERT INTO products VALUES (5, 'Noise Cancelling Headset', 'Audio', 179.95, 30);
INSERT INTO products VALUES (6, 'USB-C Universal Hub', 'Hardware', 59.99, 110);

-- Query 1: Inventory Value by Category
SELECT 
  category AS Category, 
  COUNT(*) AS Total_Items, 
  ROUND(AVG(price), 2) AS Avg_Price, 
  ROUND(SUM(price * stock), 2) AS Total_Stock_Value 
FROM products 
GROUP BY category 
ORDER BY Total_Stock_Value DESC;`
      }
    ]
  },
  {
    id: "markdown-docs",
    title: "📝 Markdown Project Guide",
    category: "Markdown",
    desc: "Rich GitHub-flavored markdown with checklists, code blocks, and live formatted preview",
    files: [
      {
        name: "README.md",
        language: "markdown",
        content: `# 🚀 Project Documentation

Welcome to your documentation workspace in **WebCode Studio**.

## 🌟 Overview
WebCode Universal IDE is an all-in-one in-browser development environment.

### 📋 Feature Checklist
- [x] Multi-file project workspace
- [x] React 18 JSX transpilation
- [x] WebAssembly Python 3 runtime
- [x] In-browser SQL relational engine
- [ ] Export full ZIP archive

## 💻 Code Example
\`\`\`javascript
function createAwesomeApp() {
  console.log("Ready to build!");
}
\`\`\`

> *"Code is like humor. When you have to explain it, it’s bad."* — Cory House`
      },
      {
        name: "architecture.md",
        language: "markdown",
        content: `# 🏗️ Architecture Specifications

### Runtime Engines
1. **Web Engine**: HTML5 / CSS3 / ESNext JS / React 18 JSX
2. **Pyodide Engine**: WebAssembly Python 3 with math/sys/time
3. **AlaSQL Engine**: Client-side relational database executor`
      }
    ]
  }
];

// --- 5. Resilient Editor & CodeMirror Management ---
class ResilientEditor {
  constructor(target, options = {}) {
    this.target = target;
    this.options = Object.assign({
      value: "",
      tabSize: 2,
      lineNumbers: true
    }, options);
    this.eventListeners = {
      change: [],
      cursorActivity: []
    };
    this.render();
  }

  render() {
    this.target.innerHTML = "";
    const container = document.createElement("div");
    container.className = "resilient-editor";
    
    this.gutter = document.createElement("div");
    this.gutter.className = "resilient-gutter";
    
    this.textarea = document.createElement("textarea");
    this.textarea.className = "resilient-textarea";
    this.textarea.value = this.options.value || "";
    this.textarea.spellcheck = false;
    this.textarea.autocomplete = "off";
    this.textarea.autocapitalize = "off";

    container.appendChild(this.gutter);
    container.appendChild(this.textarea);
    this.target.appendChild(container);

    this.updateGutter();

    this.textarea.addEventListener("input", () => {
      this.updateGutter();
      this.trigger("change");
      this.trigger("cursorActivity");
    });

    this.textarea.addEventListener("scroll", () => {
      this.gutter.scrollTop = this.textarea.scrollTop;
    });

    this.textarea.addEventListener("keyup", () => {
      this.trigger("cursorActivity");
    });

    this.textarea.addEventListener("click", () => {
      this.trigger("cursorActivity");
    });

    this.textarea.addEventListener("keydown", (e) => {
      const tabSpaces = " ".repeat(this.options.tabSize || 2);
      
      // Handle Tab
      if (e.key === "Tab") {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const val = this.textarea.value;
        this.textarea.value = val.substring(0, start) + tabSpaces + val.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + tabSpaces.length;
        this.updateGutter();
        this.trigger("change");
        this.trigger("cursorActivity");
      }
      // Auto-indent on Enter
      else if (e.key === "Enter") {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const val = this.textarea.value;
        const curLine = val.substring(0, start).split("\n").pop() || "";
        const indentMatch = curLine.match(/^\s*/);
        const indent = indentMatch ? indentMatch[0] : "";
        const insert = "\n" + indent;
        this.textarea.value = val.substring(0, start) + insert + val.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + insert.length;
        this.updateGutter();
        this.trigger("change");
        this.trigger("cursorActivity");
      }
      // Auto-close brackets
      const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
      if (pairs[e.key]) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        if (start === end) {
          e.preventDefault();
          const close = pairs[e.key];
          const val = this.textarea.value;
          this.textarea.value = val.substring(0, start) + e.key + close + val.substring(end);
          this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
          this.trigger("change");
        }
      }
    });
  }

  updateGutter() {
    const lines = (this.textarea.value || "").split("\n").length;
    let numbers = [];
    for (let i = 1; i <= Math.max(1, lines); i++) {
      numbers.push(i);
    }
    this.gutter.textContent = numbers.join("\n");
  }

  getValue() {
    return this.textarea ? this.textarea.value : "";
  }

  setValue(val) {
    if (this.textarea) {
      this.textarea.value = val || "";
      this.updateGutter();
      this.trigger("change");
      this.trigger("cursorActivity");
    }
  }

  getSelection() {
    if (!this.textarea) return "";
    return this.textarea.value.substring(this.textarea.selectionStart, this.textarea.selectionEnd);
  }

  replaceSelection(text) {
    if (!this.textarea) return;
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const val = this.textarea.value;
    this.textarea.value = val.substring(0, start) + text + val.substring(end);
    this.textarea.selectionStart = this.textarea.selectionEnd = start + text.length;
    this.updateGutter();
    this.trigger("change");
  }

  getCursor() {
    if (!this.textarea) return { line: 0, ch: 0 };
    const pos = this.textarea.selectionStart || 0;
    const lines = this.textarea.value.substring(0, pos).split("\n");
    return {
      line: Math.max(0, lines.length - 1),
      ch: (lines[lines.length - 1] || "").length
    };
  }

  lineCount() {
    if (!this.textarea) return 1;
    return (this.textarea.value || "").split("\n").length;
  }

  setOption(key, val) {
    this.options[key] = val;
    if (key === "tabSize" && this.textarea) {
      this.textarea.style.tabSize = val;
    }
  }

  getOption(key) {
    return this.options[key];
  }

  on(event, handler) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].push(handler);
    }
  }

  off(event, handler) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(h => h !== handler);
    }
  }

  trigger(event) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(fn => {
        try { fn(this); } catch(e){}
      });
    }
  }

  clearHistory() {}
  refresh() {
    if (this.textarea) this.updateGutter();
  }
  focus() {
    if (this.textarea) this.textarea.focus();
  }
}

function initCodeMirror() {
  const target = document.getElementById("codeMirrorContainer");
  if (!target) return;

  const initialFile = getFile(activeFileName);
  const initialMode = getModeForLanguage(initialFile ? initialFile.language : "html");

  if (typeof CodeMirror === "function") {
    try {
      codeMirrorEditor = CodeMirror(target, {
        value: initialFile ? initialFile.content : "",
        mode: initialMode,
        theme: "material-ocean",
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        tabSize: 2,
        indentUnit: 2,
        indentWithTabs: false,
        extraKeys: {
          "Ctrl-Enter": () => runActiveFile(),
          "Cmd-Enter": () => runActiveFile(),
          "Ctrl-S": () => { saveProjectSnapshot(); },
          "Cmd-S": () => { saveProjectSnapshot(); },
          "Ctrl-Space": "autocomplete"
        }
      });
    } catch (err) {
      console.warn("CodeMirror initialization failed, activating resilient editor:", err);
      codeMirrorEditor = new ResilientEditor(target, { value: initialFile ? initialFile.content : "" });
    }
  } else {
    // Resilient offline/firewall safe editor
    codeMirrorEditor = new ResilientEditor(target, { value: initialFile ? initialFile.content : "" });
  }

  codeMirrorEditor.on("change", () => {
    const active = getFile(activeFileName);
    if (active) {
      active.content = codeMirrorEditor.getValue();
      saveDraftDebounced();
      updateBreadcrumbStats();
      if (isLiveSyncEnabled && isWebOrMarkdownLang(active.language)) {
        scheduleLiveSync();
      }
    }
  });

  codeMirrorEditor.on("cursorActivity", () => {
    updateBreadcrumbStats();
  });
}

function getModeForLanguage(lang) {
  switch (lang) {
    case "html": return "htmlmixed";
    case "css": return "css";
    case "javascript": case "jsx": case "ts": case "js": return "javascript";
    case "python": case "py": return "python";
    case "sql": return "text/x-sql";
    case "markdown": case "md": return "gfm";
    case "json": return { name: "javascript", json: true };
    default: return "htmlmixed";
  }
}

function getFile(name) {
  return workspaceFiles.find(f => f.name === name);
}

function isWebOrMarkdownLang(lang) {
  return ["html", "css", "javascript", "jsx", "ts", "js", "markdown", "json"].includes((lang || "").toLowerCase());
}

function scheduleLiveSync() {
  if (liveSyncDebounceTimer) clearTimeout(liveSyncDebounceTimer);
  liveSyncDebounceTimer = setTimeout(() => {
    try {
      const active = getFile(activeFileName);
      if (active && active.language === "markdown") {
        renderMarkdownDoc(active.content);
      } else if (active && active.language === "sql") {
        runSqlQuery(active.content);
      } else if (active && active.language === "python") {
        // Python runs on demand via Run button
      } else {
        runWebProject();
      }
    } catch(e) {
      console.warn("Live sync error:", e);
    }
  }, 120);
}

window.toggleLiveReload = function() {
  isLiveSyncEnabled = !isLiveSyncEnabled;
  localStorage.setItem("wc_live_sync", isLiveSyncEnabled ? "true" : "false");
  syncLiveToggleBtn();
  if (isLiveSyncEnabled) {
    showToast("Live Sync enabled (preview auto-updates)", "success");
    runActiveFile();
  } else {
    showToast("Live Sync paused (press Run to execute)", "info");
  }
};

function syncLiveToggleBtn() {
  const btn = document.getElementById("btnLiveToggle");
  const txt = document.getElementById("liveToggleText");
  if (btn) {
    btn.classList.toggle("active", isLiveSyncEnabled);
  }
  if (txt) {
    txt.textContent = isLiveSyncEnabled ? "Live Sync" : "Sync Off";
  }
}

function updatePackageBadges() {
  const totalCount = activeLibraries.length + customCdnPackages.length;
  const activityBadge = document.getElementById("activityPackagesBadge");
  if (activityBadge) {
    activityBadge.textContent = totalCount;
    activityBadge.style.display = totalCount > 0 ? "inline-block" : "none";
  }
  const pillCount = document.getElementById("breadcrumbPackagesCount");
  if (pillCount) {
    pillCount.textContent = `${totalCount} Package${totalCount === 1 ? '' : 's'}`;
  }
}

function updateBreadcrumbStats() {
  if (!codeMirrorEditor) return;
  const cursor = codeMirrorEditor.getCursor();
  const totalLines = codeMirrorEditor.lineCount();
  const file = getFile(activeFileName);
  const lang = file ? file.language.toUpperCase() : "TXT";

  const statEl = document.getElementById("editorStats");
  if (statEl) {
    statEl.textContent = `Ln ${cursor.line + 1}, Col ${cursor.ch + 1} | ${totalLines} lines`;
  }
  const activeTabEl = document.getElementById("activeFileBreadcrumb");
  if (activeTabEl) {
    activeTabEl.textContent = activeFileName || "No File Open";
  }
  const langTagEl = document.getElementById("activeLangTag");
  if (langTagEl) {
    langTagEl.textContent = lang;
  }
  const fileIconEl = document.getElementById("breadcrumbFileIcon");
  if (fileIconEl && activeFileName) {
    fileIconEl.innerHTML = getFileIcon(activeFileName);
  }
  updatePackageBadges();
}

// Utility string escapers
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJsStr(str) {
  if (!str) return "";
  return String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function detectLanguageFromName(name) {
  const lower = (name || "").toLowerCase();
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return "html";
  if (lower.endsWith(".css")) return "css";
  if (lower.endsWith(".js") || lower.endsWith(".jsx") || lower.endsWith(".ts") || lower.endsWith(".tsx")) return "javascript";
  if (lower.endsWith(".py")) return "python";
  if (lower.endsWith(".sql")) return "sql";
  if (lower.endsWith(".md") || lower.endsWith(".markdown")) return "markdown";
  if (lower.endsWith(".json")) return "json";
  return "text";
}

function getPythonSvgIcon(size = 14) {
  return `<svg class="python-svg-icon" viewBox="0 0 128 128" width="${size}" height="${size}">
    <path fill="#387eb8" d="M63.5 6c-26.6 0-25 11.5-25 11.5l.03 11.9h25.4v3.6H28.1S11 31.1 11 58.3c0 27.1 15 26.2 15 26.2h8.9V71.9s-.5-15 14.8-15h25.2s14.2.2 14.2-14V20.2S91 6 63.5 6zm-14 7.7a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4z"/>
    <path fill="#ffd43b" d="M64.5 122c26.6 0 25-11.5 25-11.5l-.03-11.9H64.1V95h35.8s17.1 1.9 17.1-25.3c0-27.1-15-26.2-15-26.2h-8.9v12.6s.5 15-14.8 15H43.1s-14.2-.2-14.2 14v22.7s-1.9 14.2 35.6 14.2zm14-7.7a4.7 4.7 0 1 1 0-9.4 4.7 4.7 0 0 1 0 9.4z"/>
  </svg>`;
}

function getFileIcon(name) {
  const lower = (name || "").toLowerCase();
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return "🌐";
  if (lower.endsWith(".css")) return "🎨";
  if (lower.endsWith(".js") || lower.endsWith(".jsx") || lower.endsWith(".ts") || lower.endsWith(".tsx")) return "📜";
  if (lower.endsWith(".py")) return getPythonSvgIcon(14);
  if (lower.endsWith(".sql")) return "🗄️";
  if (lower.endsWith(".md")) return "📝";
  if (lower.endsWith(".json")) return "⚙️";
  return "📄";
}

// Clear and Hide Preview Sandbox when no files are loaded
function clearAndHidePreview() {
  const previewFrame = document.getElementById("previewFrame");
  const markdownContainer = document.getElementById("markdownContainer");
  const sqlContainer = document.getElementById("sqlContainer");
  const emptyState = document.getElementById("previewEmptyState");
  const liveIndicator = document.getElementById("previewLiveIndicator");

  if (previewFrame) {
    previewFrame.style.display = "none";
    previewFrame.srcdoc = "";
  }
  if (markdownContainer) {
    markdownContainer.style.display = "none";
    markdownContainer.innerHTML = "";
  }
  if (sqlContainer) {
    sqlContainer.style.display = "none";
    sqlContainer.innerHTML = "";
  }
  if (emptyState) {
    emptyState.style.display = "flex";
  }
  if (liveIndicator) {
    liveIndicator.style.display = "none";
  }
  lastCompiledWebHtml = "";
}

// Welcome Screen Controls
window.showEditorWelcome = function() {
  const welcomeScreen = document.getElementById("editorWelcomeScreen");
  const codeContainer = document.getElementById("codeMirrorContainer");
  const activeBreadcrumb = document.getElementById("activeFileBreadcrumb");
  const editorStats = document.getElementById("editorStats");
  const runtimeBadge = document.getElementById("runtimeBadge");

  // Ensure editor pane is visible if user was in preview-only mode
  const container = document.getElementById("editorAndPreviewContainer");
  if (container && container.classList.contains("layout-preview-only")) {
    setIdeLayout("split");
  }

  if (welcomeScreen) welcomeScreen.style.display = "flex";
  if (codeContainer) codeContainer.style.display = "none";
  if (activeBreadcrumb) activeBreadcrumb.textContent = "No File Open";
  if (editorStats) editorStats.textContent = "Choose or create a file to start editing";
  if (runtimeBadge) runtimeBadge.textContent = "WebCode";

  clearAndHidePreview();
};

window.hideEditorWelcome = function() {
  const welcomeScreen = document.getElementById("editorWelcomeScreen");
  const codeContainer = document.getElementById("codeMirrorContainer");

  if (welcomeScreen) welcomeScreen.style.display = "none";
  if (codeContainer) codeContainer.style.display = "flex";
};

// Start Clean Project (Do not auto-load files, let user choose)
window.startNewProjectClean = function() {
  workspaceFiles = [];
  openTabs = [];
  activeFileName = "";
  localStorage.removeItem("wc_files_v2");
  localStorage.removeItem("wc_tabs_v2");
  localStorage.removeItem("wc_active_v2");
  localStorage.setItem("wc_user_has_project", "false");

  const titleEl = document.getElementById("projectTitle");
  if (titleEl) titleEl.value = "My Project";

  clearAndHidePreview();
  renderFileExplorer();
  showEditorWelcome();
  showToast("Clean workspace ready! Use ＋ or Templates to add files.", "info");
};

// Create On-Demand Starter Environment
window.createStarterEnvironment = function(type) {
  if (type === "custom") {
    promptCreateNewFile();
    return;
  }

  const preset = starterPresets[type];
  if (!preset) return;

  if (type === "react") {
    if (!activeLibraries.includes("react")) activeLibraries.push("react");
    if (!activeLibraries.includes("babel")) activeLibraries.push("babel");
    localStorage.setItem("wc_libs", JSON.stringify(activeLibraries));
  }

  // Deep clone preset files into workspace
  preset.forEach(newF => {
    const existingIdx = workspaceFiles.findIndex(f => f.name === newF.name);
    const cloned = { ...newF };
    if (existingIdx >= 0) {
      workspaceFiles[existingIdx] = cloned;
    } else {
      workspaceFiles.push(cloned);
    }
    if (!openTabs.includes(cloned.name)) {
      openTabs.push(cloned.name);
    }
  });

  const fileToOpen = preset[0].name;
  localStorage.setItem("wc_user_has_project", "true");
  
  // Ensure editor is visible
  const container = document.getElementById("editorAndPreviewContainer");
  if (container && container.classList.contains("layout-preview-only")) {
    setIdeLayout("split");
  }

  hideEditorWelcome();
  renderFileExplorer();
  switchToFile(fileToOpen);
  saveDraftDebounced();
  showToast(`Loaded ${type.toUpperCase()} environment!`, "success");

  setTimeout(() => {
    try { runActiveFile(); } catch(e){}
  }, 120);
};

// --- 6. File Renaming Engine ---
function renameFile(oldName, newName) {
  if (!newName) return false;
  newName = newName.trim();
  if (!newName || newName === oldName) return false;

  // Validate illegal filename characters
  if (/[\/\\:*?"<>|]/.test(newName)) {
    showToast("Filename contains invalid characters: / \\ : * ? \" < > |", "error");
    return false;
  }

  // Ensure unique name
  if (workspaceFiles.some(f => f.name.toLowerCase() === newName.toLowerCase() && f.name !== oldName)) {
    showToast(`A file named "${newName}" already exists!`, "error");
    return false;
  }

  const targetFile = getFile(oldName);
  if (!targetFile) return false;

  // Update file name and recalculate syntax mode
  targetFile.name = newName;
  targetFile.language = detectLanguageFromName(newName);

  // Update tabs
  openTabs = openTabs.map(t => t === oldName ? newName : t);

  // If active file was renamed, update active state & syntax mode
  if (activeFileName === oldName) {
    activeFileName = newName;
    if (codeMirrorEditor) {
      codeMirrorEditor.setOption("mode", getModeForLanguage(targetFile.language));
    }
    updateBreadcrumbStats();
    updateRuntimeBadgeForLang(targetFile.language);
  }

  saveDraftDebounced();
  renderFileExplorer();
  renderOpenTabs();
  showToast(`Renamed "${oldName}" to "${newName}"`, "success");
  return true;
}

function startRenameFile(fileName, event) {
  if (event) event.stopPropagation();
  const fileItem = document.querySelector(`.file-item[data-filename="${CSS.escape(fileName)}"]`);
  if (!fileItem) {
    renameFilePrompt(fileName);
    return;
  }

  const nameSpan = fileItem.querySelector(".file-name-text");
  if (!nameSpan) {
    renameFilePrompt(fileName);
    return;
  }

  // Inline rename mode
  fileItem.classList.add("renaming");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "file-rename-inline-input";
  input.value = fileName;

  nameSpan.replaceWith(input);
  input.focus();

  // Select name part before extension for convenience
  const dotIdx = fileName.lastIndexOf(".");
  if (dotIdx > 0) {
    input.setSelectionRange(0, dotIdx);
  } else {
    input.select();
  }

  let committed = false;
  const finish = (apply) => {
    if (committed) return;
    committed = true;
    if (apply) {
      const newName = input.value.trim();
      if (newName && newName !== fileName) {
        renameFile(fileName, newName);
        return;
      }
    }
    renderFileExplorer();
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      finish(true);
    } else if (e.key === "Escape") {
      e.preventDefault();
      finish(false);
    }
  });

  input.addEventListener("blur", () => {
    finish(true);
  });

  input.addEventListener("click", (e) => e.stopPropagation());
}

function renameFilePrompt(fileName) {
  const modal = document.getElementById("renameModal");
  const input = document.getElementById("renameInput");
  const hidden = document.getElementById("renameOldName");
  if (modal && input && hidden) {
    hidden.value = fileName;
    input.value = fileName;
    openModal("renameModal");
    setTimeout(() => {
      input.focus();
      const dotIdx = fileName.lastIndexOf(".");
      if (dotIdx > 0) input.setSelectionRange(0, dotIdx);
      else input.select();
    }, 50);
  } else {
    const newName = prompt(`Enter new file name:`, fileName);
    if (newName) renameFile(fileName, newName);
  }
}

window.submitRenameModal = function() {
  const hidden = document.getElementById("renameOldName");
  const input = document.getElementById("renameInput");
  if (!hidden || !input) return;
  const oldName = hidden.value;
  const newName = input.value.trim();
  if (renameFile(oldName, newName)) {
    closeModal("renameModal");
  }
};

function updateRuntimeBadgeForLang(language) {
  const badge = document.getElementById("runtimeBadge");
  if (badge) {
    if (language === "python") badge.textContent = "Python 3 Wasm";
    else if (language === "sql") badge.textContent = "SQL Engine";
    else if (language === "markdown") badge.textContent = "Markdown Preview";
    else badge.textContent = "Web Engine";
  }
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let explorerSearchQuery = "";

window.handleExplorerSearch = function(query) {
  explorerSearchQuery = (query || "").trim();
  const clearBtn = document.getElementById("explorerSearchClearBtn");
  if (clearBtn) {
    clearBtn.classList.toggle("visible", explorerSearchQuery.length > 0);
  }
  renderFileExplorer();
};

window.clearExplorerSearch = function() {
  explorerSearchQuery = "";
  const input = document.getElementById("explorerSearchInput");
  if (input) {
    input.value = "";
    input.focus();
  }
  const clearBtn = document.getElementById("explorerSearchClearBtn");
  if (clearBtn) {
    clearBtn.classList.remove("visible");
  }
  renderFileExplorer();
};

// --- 6. File Explorer & Tab Navigation ---
function renderFileExplorer() {
  const container = document.getElementById("fileTreeList");
  if (!container) return;
  container.innerHTML = "";

  const searchInput = document.getElementById("explorerSearchInput");
  const clearBtn = document.getElementById("explorerSearchClearBtn");
  if (searchInput && searchInput.value !== explorerSearchQuery) {
    searchInput.value = explorerSearchQuery;
  }
  if (clearBtn) {
    clearBtn.classList.toggle("visible", (explorerSearchQuery || "").length > 0);
  }

  if (workspaceFiles.length === 0) {
    container.innerHTML = `
      <div class="empty-explorer">
        <span style="font-size:22px;margin-bottom:4px;opacity:0.6;">📁</span>
        <strong style="color:var(--text-main);font-size:13px;">No Files Open</strong>
        <p style="font-size:11px;color:var(--text-dim);margin:4px 0 12px;text-align:center;">Create a new file or select a template to start coding.</p>
        <button class="btn btn-sm btn-primary" onclick="openNewFileModal()" style="width:100%;margin-bottom:6px;">＋ New File</button>
        <button class="btn btn-sm" onclick="openTemplatesModal()" style="width:100%;">📋 Templates</button>
      </div>
    `;
    renderOpenTabs();
    return;
  }

  let filtered = workspaceFiles;
  if (explorerSearchQuery) {
    const qLower = explorerSearchQuery.toLowerCase();
    filtered = workspaceFiles.filter(file => {
      const matchName = file.name.toLowerCase().includes(qLower);
      const matchContent = (file.content || "").toLowerCase().includes(qLower);
      return matchName || matchContent;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="padding:16px 8px;text-align:center;color:var(--text-dim);font-size:12px;">
          <div>No files matching "<strong>${escapeHtml(explorerSearchQuery)}</strong>"</div>
          <button class="btn btn-sm" onclick="clearExplorerSearch()" style="margin-top:8px;font-size:11px;padding:3px 8px;">Clear Filter</button>
        </div>
      `;
      renderOpenTabs();
      return;
    }
  }

  filtered.forEach(file => {
    const item = document.createElement("div");
    item.className = `file-item ${file.name === activeFileName ? 'active' : ''}`;
    item.setAttribute("data-filename", file.name);
    
    const icon = getFileIcon(file.name);
    let nameHtml = escapeHtml(file.name);
    if (explorerSearchQuery && file.name.toLowerCase().includes(explorerSearchQuery.toLowerCase())) {
      const regex = new RegExp(`(${escapeRegex(explorerSearchQuery)})`, 'gi');
      nameHtml = nameHtml.replace(regex, '<mark style="background:var(--accent-light);color:var(--accent);padding:0 2px;border-radius:2px;font-weight:700;">$1</mark>');
    }

    item.innerHTML = `
      <div class="file-item-left" onclick="switchToFile('${escapeJsStr(file.name)}')" title="Double-click to rename" ondblclick="startRenameFile('${escapeJsStr(file.name)}', event)">
        <span class="file-icon">${icon}</span>
        <span class="file-name-text">${nameHtml}</span>
      </div>
      <div class="file-item-actions">
        <button class="tree-action-btn file-item-rename" onclick="startRenameFile('${escapeJsStr(file.name)}', event)" title="Rename File (✏️)">✏️</button>
        <button class="tree-action-btn file-item-delete" onclick="deleteFile('${escapeJsStr(file.name)}', event)" title="Delete File">✕</button>
      </div>
    `;
    container.appendChild(item);
  });

  renderOpenTabs();
}

function renderOpenTabs() {
  const tabsBar = document.getElementById("editorTabsBar");
  if (!tabsBar) return;
  tabsBar.innerHTML = "";

  openTabs.forEach(fileName => {
    const file = getFile(fileName);
    if (!file) return;
    const tab = document.createElement("div");
    tab.className = `editor-tab ${fileName === activeFileName ? 'active' : ''}`;
    tab.title = `${fileName} (Double-click to rename)`;
    tab.innerHTML = `
      <span class="tab-title-text" onclick="switchToFile('${escapeJsStr(fileName)}')" ondblclick="startRenameFile('${escapeJsStr(fileName)}', event)">${escapeHtml(fileName)}</span>
      <span class="tab-close-btn" onclick="closeTab('${escapeJsStr(fileName)}', event)" title="Close Tab">✕</span>
    `;
    tabsBar.appendChild(tab);
  });

  // Plus button to open new file dialog or starter
  const addBtn = document.createElement("button");
  addBtn.className = "editor-tab-add-btn";
  addBtn.innerHTML = "＋";
  addBtn.title = "Create New File (＋)";
  addBtn.onclick = () => openNewFileModal();
  tabsBar.appendChild(addBtn);
}

function switchToFile(fileName) {
  const file = getFile(fileName);
  if (!file) {
    if (workspaceFiles.length === 0 || openTabs.length === 0) {
      showEditorWelcome();
      clearAndHidePreview();
    }
    return;
  }

  hideEditorWelcome();

  if (!openTabs.includes(fileName)) {
    openTabs.push(fileName);
  }

  activeFileName = fileName;
  if (codeMirrorEditor) {
    codeMirrorEditor.setValue(file.content);
    codeMirrorEditor.setOption("mode", getModeForLanguage(file.language));
    codeMirrorEditor.clearHistory();
    if (typeof codeMirrorEditor.refresh === "function") {
      setTimeout(() => codeMirrorEditor.refresh(), 30);
    }
  }

  updateRuntimeBadgeForLang(file.language);
  renderFileExplorer();
  updateBreadcrumbStats();

  if (isLiveSyncEnabled) {
    if (file.language === "markdown") {
      renderMarkdownDoc(file.content);
    } else if (file.language === "sql") {
      runSqlQuery(file.content);
    } else if (file.language === "python") {
      clearAndHidePreview();
    } else {
      runWebProject();
    }
  }
}

function closeTab(fileName, event) {
  if (event) event.stopPropagation();
  openTabs = openTabs.filter(name => name !== fileName);
  if (openTabs.length === 0) {
    activeFileName = "";
    renderFileExplorer();
    showEditorWelcome();
    clearAndHidePreview();
    return;
  }
  if (activeFileName === fileName) {
    activeFileName = openTabs[0];
    switchToFile(activeFileName);
  } else {
    renderOpenTabs();
  }
}

window.openNewFileModal = function(defaultName = "") {
  const modal = document.getElementById("newFileModal");
  const input = document.getElementById("newFileInput");
  if (!modal || !input) {
    const fallbackName = prompt("Enter file name (e.g. index.html, main.py, query.sql):", defaultName);
    if (fallbackName) createNewFileDirect(fallbackName);
    return;
  }
  input.value = defaultName || "";
  openModal("newFileModal");
  setTimeout(() => {
    input.focus();
    if (defaultName) input.select();
  }, 50);
};

window.quickFillNewFileName = function(name) {
  const input = document.getElementById("newFileInput");
  if (input) {
    input.value = name;
    input.focus();
    const dotIdx = name.lastIndexOf(".");
    if (dotIdx > 0) {
      input.setSelectionRange(0, dotIdx);
    }
  }
};

window.submitCreateNewFileModal = function() {
  const input = document.getElementById("newFileInput");
  if (!input) return;
  const name = input.value.trim();
  if (!name) {
    showToast("Please enter a file name", "error");
    return;
  }

  if (/[\/\\:*?"<>|]/.test(name)) {
    showToast("Filename contains invalid characters: / \\ : * ? \" < > |", "error");
    return;
  }

  if (workspaceFiles.some(f => f.name.toLowerCase() === name.toLowerCase())) {
    showToast(`A file named "${name}" already exists!`, "error");
    return;
  }

  closeModal("newFileModal");
  createNewFileDirect(name);
};

function createNewFileDirect(name) {
  const trimmed = name.trim();
  if (!trimmed) return;

  const lang = detectLanguageFromName(trimmed);
  let initialContent = "";
  if (lang === "html") {
    initialContent = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>";
  } else if (lang === "python") {
    initialContent = "# Python 3 Script\nprint('Hello from Python!')\n";
  } else if (lang === "markdown") {
    initialContent = `# ${trimmed.replace(/\.[^/.]+$/, "")}\n\nStart writing notes or documentation...\n`;
  } else if (lang === "sql") {
    initialContent = "-- SQL Query\nSELECT 'Hello SQL' AS greeting;\n";
  } else if (lang === "css") {
    initialContent = "/* Custom Styles */\nbody {\n  font-family: system-ui, sans-serif;\n  padding: 1rem;\n}\n";
  } else if (lang === "javascript") {
    initialContent = "// JavaScript\nconsole.log('App ready');\n";
  }

  workspaceFiles.push({
    name: trimmed,
    language: lang,
    content: initialContent
  });

  if (!openTabs.includes(trimmed)) {
    openTabs.push(trimmed);
  }

  localStorage.setItem("wc_user_has_project", "true");
  hideEditorWelcome();
  renderFileExplorer();
  switchToFile(trimmed);
  saveDraftDebounced();
  showToast(`Created ${trimmed}`, "success");
}

window.promptCreateNewFile = function() {
  openNewFileModal();
};

function deleteFile(fileName, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  workspaceFiles = workspaceFiles.filter(f => f.name !== fileName);
  openTabs = openTabs.filter(name => name !== fileName);

  if (workspaceFiles.length === 0) {
    activeFileName = "";
    localStorage.removeItem("wc_files_v2");
    localStorage.removeItem("wc_tabs_v2");
    localStorage.removeItem("wc_active_v2");
    localStorage.setItem("wc_user_has_project", "false");
    renderFileExplorer();
    showEditorWelcome();
    clearAndHidePreview();
    showToast(`Deleted ${fileName}. Workspace is empty.`, "info");
    return;
  }

  // Persist updated workspace immediately
  localStorage.setItem("wc_files_v2", JSON.stringify(workspaceFiles));
  localStorage.setItem("wc_tabs_v2", JSON.stringify(openTabs));
  localStorage.setItem("wc_user_has_project", "true");

  if (activeFileName === fileName) {
    activeFileName = openTabs[0] || workspaceFiles[0].name;
    localStorage.setItem("wc_active_v2", activeFileName);
    switchToFile(activeFileName);
  } else {
    localStorage.setItem("wc_active_v2", activeFileName);
    renderFileExplorer();
    renderOpenTabs();
  }

  showToast(`Deleted ${fileName}`, "info");
}

// --- 7. Execution Engine (Universal Runtimes) ---
async function runActiveFile() {
  const activeFile = getFile(activeFileName);
  if (!activeFile || workspaceFiles.length === 0) {
    clearAndHidePreview();
    showToast("No files loaded in editor.", "info");
    showEditorWelcome();
    return;
  }

  if (activeFile.language === "python") {
    clearAndHidePreview();
    await runPythonScript(activeFile.content);
  } else if (activeFile.language === "sql") {
    runSqlQuery(activeFile.content);
  } else if (activeFile.language === "markdown") {
    renderMarkdownDoc(activeFile.content);
  } else {
    runWebProject();
  }
}

let lastCompiledWebHtml = "";

// --- 7.1 Web Engine (HTML/CSS/JS/JSX) ---
function runWebProject() {
  const emptyState = document.getElementById("previewEmptyState");
  const liveIndicator = document.getElementById("previewLiveIndicator");
  const previewFrame = document.getElementById("previewFrame");
  const markdownContainer = document.getElementById("markdownContainer");
  const sqlContainer = document.getElementById("sqlContainer");

  if (workspaceFiles.length === 0 || !activeFileName || !getFile(activeFileName)) {
    clearAndHidePreview();
    return;
  }

  const htmlFile = getFile("index.html") || workspaceFiles.find(f => f.language === "html" || f.name.endsWith(".html")) || { name: "index.html", content: '<div id="root"></div>' };
  const cssFiles = workspaceFiles.filter(f => f.language === "css" || f.name.endsWith(".css"));
  const jsFiles = workspaceFiles.filter(f => f.language === "javascript" || f.language === "jsx" || f.language === "js" || f.language === "ts" || f.name.endsWith(".js") || f.name.endsWith(".jsx") || f.name.endsWith(".ts"));

  let rawHtml = htmlFile.content || "";

  // 1. In-memory local CSS inlining: match <link rel="stylesheet" href="..."> and replace with inline <style>
  cssFiles.forEach(cf => {
    const escapedName = cf.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const linkRegex = new RegExp('<link[^>]*href=["\'](?:\\.\\/)?' + escapedName + '["\'][^>]*>', 'gi');
    if (linkRegex.test(rawHtml)) {
      rawHtml = rawHtml.replace(linkRegex, '<style data-file="' + cf.name + '">\n' + cf.content + '\n</style>');
    }
  });

  // 2. In-memory local script stripping: match <script src="..."> to prevent 404 network delays inside iframe
  jsFiles.forEach(jf => {
    const escapedName = jf.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const scriptRegex = new RegExp('<script[^>]*src=["\'](?:\\.\\/)?' + escapedName + '["\'][^>]*>\\s*<\\/script>', 'gi');
    rawHtml = rawHtml.replace(scriptRegex, '');
  });

  // Strip any dangling relative stylesheet/script links that don't exist
  rawHtml = rawHtml.replace(/<link[^>]*href=["'](?!\/\/|https?:\/\/|data:)[^"']+["'][^>]*>/gi, '');

  // 3. Collect all remaining workspace CSS
  let remainingCss = "";
  cssFiles.forEach(cf => {
    if (!rawHtml.includes('data-file="' + cf.name + '"')) {
      remainingCss += '\n/* --- ' + cf.name + ' --- */\n' + cf.content + '\n';
    }
  });

  // 4. Bundle all workspace JS/JSX scripts
  let scriptsBundle = "";
  let hasJsxOrReact = activeLibraries.includes("react") || activeLibraries.includes("babel");

  jsFiles.forEach(f => {
    if (f.name.endsWith(".jsx") || (f.content.includes("<") && f.content.includes("/>")) || f.content.includes("React") || f.content.includes("useState") || f.content.includes("ReactDOM")) {
      hasJsxOrReact = true;
    }
    scriptsBundle += '\n// --- ' + f.name + ' ---\n' + f.content + '\n';
  });

  // 5. Fast In-Memory JSX Transpilation using window.Babel if available on parent
  let compiledJs = scriptsBundle;
  let scriptTagType = 'type="text/javascript"';
  let needBabelInIframe = false;

  if (hasJsxOrReact) {
    if (typeof window.Babel !== "undefined" && window.Babel.transform) {
      try {
        const transpiled = window.Babel.transform(scriptsBundle, {
          presets: ["react", "env"],
          sourceType: "script"
        });
        compiledJs = transpiled.code;
        scriptTagType = 'type="text/javascript"';
        needBabelInIframe = false;
      } catch (transformErr) {
        console.warn("Fast in-memory JSX transform note:", transformErr.message || transformErr);
        compiledJs = scriptsBundle;
        scriptTagType = 'type="text/babel"';
        needBabelInIframe = true;
      }
    } else {
      compiledJs = scriptsBundle;
      scriptTagType = 'type="text/babel"';
      needBabelInIframe = true;
    }
  }

  // 6. Build CDN script/style links
  let cdnHeaders = "";
  const allLibsToLoad = new Set(activeLibraries);
  if (needBabelInIframe && !allLibsToLoad.has("babel")) {
    allLibsToLoad.add("babel");
  }

  allLibsToLoad.forEach(libId => {
    const lib = cdnPackages.find(p => p.id === libId);
    if (lib) {
      if (lib.type === "css") {
        cdnHeaders += '<link rel="stylesheet" href="' + lib.url + '">\n';
      } else if (lib.type === "js") {
        cdnHeaders += '<script src="' + lib.url + '"></script>\n';
        if (lib.extra) {
          cdnHeaders += '<script src="' + lib.extra + '"></script>\n';
        }
      }
    }
  });

  // Custom User CDNs
  customCdnPackages.forEach(custom => {
    if (custom.type === "css") {
      cdnHeaders += '<link rel="stylesheet" href="' + custom.url + '">\n';
    } else {
      cdnHeaders += '<script src="' + custom.url + '"></script>\n';
    }
  });

  const baseStyles = '<style>\n' +
    '* { scrollbar-width: thin; scrollbar-color: #64748b transparent; }\n' +
    '::-webkit-scrollbar { width: 6px; height: 6px; }\n' +
    '::-webkit-scrollbar-track { background: transparent; }\n' +
    '::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }\n' +
    '::-webkit-scrollbar-thumb:hover { background: #64748b; }\n' +
    remainingCss + '\n' +
  '</style>';

  const lucideAutoInit = activeLibraries.includes("lucide") ? (
    '<script>\n' +
    '  window.addEventListener("DOMContentLoaded", () => {\n' +
    '    if (window.lucide && typeof window.lucide.createIcons === "function") {\n' +
    '      window.lucide.createIcons();\n' +
    '    }\n' +
    '  });\n' +
    '</script>\n'
  ) : "";

  const consoleBridge = '<script>\n' +
  '(function(){\n' +
  '  const original = { log: console.log, warn: console.warn, error: console.error, info: console.info };\n' +
  '  function post(type, args){\n' +
  '    try {\n' +
  '      const msg = Array.from(args).map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ");\n' +
  '      window.parent.postMessage({ source: "webcode-preview", type, message: msg, time: new Date().toLocaleTimeString() }, "*");\n' +
  '    } catch(e){}\n' +
  '  }\n' +
  '  console.log = function(){ original.log.apply(console, arguments); post("log", arguments); };\n' +
  '  console.warn = function(){ original.warn.apply(console, arguments); post("warn", arguments); };\n' +
  '  console.error = function(){ original.error.apply(console, arguments); post("error", arguments); };\n' +
  '  console.info = function(){ original.info.apply(console, arguments); post("info", arguments); };\n' +
  '  window.onerror = function(msg, url, line){ post("error", ["[Line " + line + "] " + msg]); return false; };\n' +
  '})();\n' +
  '</script>';

  const scriptTag = lucideAutoInit + '\n' +
  '<script ' + scriptTagType + '>\n' +
  '  try {\n' +
  compiledJs + '\n' +
  '    if (window.lucide && typeof window.lucide.createIcons === "function") {\n' +
  '      window.lucide.createIcons();\n' +
  '    }\n' +
  '  } catch(err) {\n' +
  '    console.error(err.message || err);\n' +
  '  }\n' +
  '</script>';

  if (emptyState) emptyState.style.display = "none";
  if (markdownContainer) markdownContainer.style.display = "none";
  if (sqlContainer) sqlContainer.style.display = "none";
  if (previewFrame) previewFrame.style.display = "block";
  if (liveIndicator) liveIndicator.style.display = "inline-block";

  let fullHtml = "";
  if (/<html[\s>]/i.test(rawHtml)) {
    if (/<head[\s>]/i.test(rawHtml)) {
      fullHtml = rawHtml.replace(/<head[\s>]/i, match => `${match}\n${cdnHeaders}\n${baseStyles}\n${consoleBridge}`);
    } else {
      fullHtml = `<head>\n${cdnHeaders}\n${baseStyles}\n${consoleBridge}\n</head>\n` + rawHtml;
    }

    if (/<\/body>/i.test(fullHtml)) {
      fullHtml = fullHtml.replace(/<\/body>/i, `${scriptTag}\n</body>`);
    } else {
      fullHtml = fullHtml + `\n${scriptTag}`;
    }
  } else {
    fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${cdnHeaders}
  ${baseStyles}
  ${consoleBridge}
</head>
<body>
  ${rawHtml}
  ${scriptTag}
</body>
</html>`;
  }

  lastCompiledWebHtml = fullHtml;
  if (previewFrame) {
    previewFrame.srcdoc = fullHtml;
  }
  updatePackageBadges();
  appendTerminalLog("term-success", "⚡ Live Sandbox compiled & synchronized.");
}

window.popoutPreviewWindow = function() {
  if (workspaceFiles.length === 0 || !activeFileName || !getFile(activeFileName)) {
    showToast("No files loaded in editor to preview", "info");
    return;
  }
  if (!lastCompiledWebHtml) {
    runWebProject();
  }
  if (!lastCompiledWebHtml) {
    showToast("No live web preview available to pop out", "info");
    return;
  }
  const blob = new Blob([lastCompiledWebHtml], { type: "text/html;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  const win = window.open(blobUrl, "_blank");
  if (win) {
    win.focus();
    showToast("Opened preview in standalone window!", "success");
  } else {
    showToast("Popup blocked. Please allow popups for preview tab.", "error");
  }
};

// --- 7.2 Python 3 (Pyodide WebAssembly) Runtime ---
async function initPyodideEngine() {
  if (pyodideInstance || isPyodideLoading) return pyodideInstance;
  isPyodideLoading = true;
  appendTerminalLog("term-info", "⏳ Initializing Pyodide Python 3 WebAssembly engine...");

  try {
    if (typeof loadPyodide === "undefined") {
      await loadScript("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");
    }
    pyodideInstance = await loadPyodide({
      stdout: (text) => appendTerminalLog("term-log", text),
      stderr: (text) => appendTerminalLog("term-error", text)
    });
    isPyodideLoading = false;
    appendTerminalLog("term-success", "🐍 Python 3 WebAssembly runtime ready!");
    return pyodideInstance;
  } catch (err) {
    isPyodideLoading = false;
    appendTerminalLog("term-error", "Failed to load Pyodide: " + err.message);
    throw err;
  }
}

async function runPythonScript(code) {
  switchBottomTab("terminal");
  appendTerminalLog("term-info", "▶ Running Python script in WebAssembly...");
  try {
    const py = await initPyodideEngine();
    await py.runPythonAsync(code);
    appendTerminalLog("term-success", "✓ Python execution finished successfully.");
  } catch (err) {
    appendTerminalLog("term-error", "Python Error: " + err.message);
  }
}

// --- 7.3 High-Performance SQL Engine (AlaSQL with Virtualized Pagination & Filter) ---
let sqlEngineState = {
  rawRows: [],
  columns: [],
  filterQuery: "",
  sortColumn: null,
  sortAsc: true,
  currentPage: 1,
  pageSize: 25,
  execTime: "0.0",
  totalRows: 0,
  hasExecuted: false,
  lastQuery: ""
};

function executeDatabaseSqlFile() {
  const file = getFile("database.sql") || workspaceFiles.find(f => f.language === "sql");
  if (file) {
    switchToFile(file.name);
    runSqlQuery(file.content);
  } else {
    showToast("No SQL file in workspace", "info");
  }
}

async function runSqlQuery(sqlCode) {
  if (workspaceFiles.length === 0 || !activeFileName || !getFile(activeFileName)) {
    clearAndHidePreview();
    return;
  }

  const previewFrame = document.getElementById("previewFrame");
  const markdownContainer = document.getElementById("markdownContainer");
  const sqlContainer = document.getElementById("sqlContainer");
  const emptyState = document.getElementById("previewEmptyState");
  const liveIndicator = document.getElementById("previewLiveIndicator");

  if (emptyState) emptyState.style.display = "none";
  if (previewFrame) previewFrame.style.display = "none";
  if (markdownContainer) markdownContainer.style.display = "none";
  if (sqlContainer) sqlContainer.style.display = "flex";
  if (liveIndicator) liveIndicator.style.display = "inline-block";

  // Safely switch tab without re-executing query
  switchBottomTab("sqlViewer");
  appendTerminalLog("term-info", "🗄️ Executing SQL statements in browser database...");

  try {
    if (typeof alasql === "undefined") {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/alasql@4/dist/alasql.min.js");
      } catch (e1) {
        await loadScript("https://unpkg.com/alasql@4/dist/alasql.min.js");
      }
    }

    // Clean SQL: remove line comments
    const cleaned = (sqlCode || "")
      .split("\n")
      .map(line => {
        const idx = line.indexOf("--");
        return idx >= 0 ? line.substring(0, idx) : line;
      })
      .join("\n");

    const statements = cleaned
      .split(";")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (statements.length === 0) {
      appendTerminalLog("term-info", "No executable SQL statements found.");
      return;
    }

    const tStart = performance.now();
    let finalResult = null;
    let lastTabularResult = null;

    for (const stmt of statements) {
      const res = alasql(stmt);
      finalResult = res;
      if (Array.isArray(res)) {
        lastTabularResult = res;
      }
    }

    const tEnd = performance.now();
    const duration = (tEnd - tStart).toFixed(1);

    const rows = lastTabularResult || (Array.isArray(finalResult) ? finalResult : []);
    sqlEngineState.rawRows = rows;
    sqlEngineState.columns = rows.length > 0 ? Object.keys(rows[0]) : [];
    sqlEngineState.totalRows = rows.length;
    sqlEngineState.execTime = duration;
    sqlEngineState.currentPage = 1;
    sqlEngineState.filterQuery = "";
    sqlEngineState.sortColumn = null;
    sqlEngineState.sortAsc = true;
    sqlEngineState.hasExecuted = true;
    sqlEngineState.lastQuery = sqlCode;
    window._lastSqlResult = rows;

    renderSqlViewerIntoContainer("sqlContainer");
    renderSqlViewerIntoContainer("bottomSqlContainer");

    if (rows.length > 0) {
      appendTerminalLog("term-success", `✓ Query returned ${rows.length} rows (${duration}ms).`);
    } else {
      appendTerminalLog("term-success", `✓ Statements executed in ${duration}ms (no tabular data).`);
    }
  } catch (err) {
    const msg = err.message || String(err);
    appendTerminalLog("term-error", "SQL Error: " + msg);
    const errHtml = `
      <div style="padding:16px;color:var(--danger);font-family:var(--font-mono);font-size:12px;">
        <strong style="display:flex;align-items:center;gap:6px;">⚠️ SQL Execution Error</strong>
        <p style="margin-top:8px;background:rgba(239,68,68,0.1);padding:10px;border-radius:6px;border:1px solid rgba(239,68,68,0.2);">${escapeHtml(msg)}</p>
      </div>`;
    if (sqlContainer) sqlContainer.innerHTML = errHtml;
    const bSql = document.getElementById("bottomSqlContainer");
    if (bSql) bSql.innerHTML = errHtml;
  }
}

function renderSqlViewerIntoContainer(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!sqlEngineState.hasExecuted && sqlEngineState.rawRows.length === 0) {
    container.innerHTML = `
      <div class="sql-empty-state">
        <span style="font-size:14px;font-weight:600;">📊 No SQL query executed yet</span>
        <p style="font-size:12px;color:var(--text-dim);max-width:320px;">Run database.sql or custom queries with joins, filters & aggregations.</p>
        <button class="btn btn-sm btn-primary" onclick="executeDatabaseSqlFile()">▶ Run database.sql</button>
      </div>`;
    return;
  }

  if (sqlEngineState.rawRows.length === 0) {
    container.innerHTML = `
      <div class="sql-empty-state">
        <span style="color:var(--success);font-size:13px;font-weight:600;">✓ Statements executed successfully in ${sqlEngineState.execTime}ms.</span>
        <span style="font-size:11px;color:var(--text-dim);">(No tabular result set returned)</span>
      </div>`;
    return;
  }

  // Filter rows
  let rows = sqlEngineState.rawRows;
  if (sqlEngineState.filterQuery) {
    const q = sqlEngineState.filterQuery.toLowerCase();
    rows = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(q)));
  }

  // Sort rows
  if (sqlEngineState.sortColumn) {
    const col = sqlEngineState.sortColumn;
    const mult = sqlEngineState.sortAsc ? 1 : -1;
    rows = [...rows].sort((a, b) => {
      const va = a[col];
      const vb = b[col];
      if (va === vb) return 0;
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      return va > vb ? mult : -mult;
    });
  }

  // Pagination
  const pageSize = sqlEngineState.pageSize;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  if (sqlEngineState.currentPage > totalPages) sqlEngineState.currentPage = totalPages;
  const startIdx = (sqlEngineState.currentPage - 1) * pageSize;
  const pageRows = rows.slice(startIdx, startIdx + pageSize);

  let html = `
    <div class="sql-toolbar">
      <div class="sql-toolbar-left">
        <span class="sql-pill">✓ ${rows.length} rows (${sqlEngineState.execTime}ms)</span>
        <input type="text" class="sql-search-box" placeholder="Filter rows..." value="${escapeHtml(sqlEngineState.filterQuery)}" oninput="updateSqlFilter(this.value)">
      </div>
      <div class="sql-toolbar-right">
        <div class="sql-pagination-controls">
          <button class="btn btn-sm" onclick="changeSqlPage(-1)" ${sqlEngineState.currentPage <= 1 ? 'disabled' : ''}>◀</button>
          <span>${sqlEngineState.currentPage} / ${totalPages}</span>
          <button class="btn btn-sm" onclick="changeSqlPage(1)" ${sqlEngineState.currentPage >= totalPages ? 'disabled' : ''}>▶</button>
        </div>
        <button class="btn btn-sm" onclick="exportSqlJson()" title="Export JSON">JSON</button>
        <button class="btn btn-sm" onclick="exportSqlCsv()" title="Export CSV">CSV</button>
      </div>
    </div>
    <div class="sql-table-scroll">
      <table class="sql-table">
        <thead>
          <tr>
            <th style="width:36px;text-align:center;color:var(--text-dim);">#</th>`;

  sqlEngineState.columns.forEach(col => {
    const isSorted = sqlEngineState.sortColumn === col;
    const sortIcon = isSorted ? (sqlEngineState.sortAsc ? " ▲" : " ▼") : "";
    html += `<th onclick="sortSqlColumn('${escapeHtml(col)}')">${escapeHtml(col)}${sortIcon}</th>`;
  });

  html += `</tr></thead><tbody>`;

  if (pageRows.length === 0) {
    html += `<tr><td colspan="${sqlEngineState.columns.length + 1}" style="text-align:center;padding:20px;color:var(--text-dim);">No matching rows found</td></tr>`;
  } else {
    pageRows.forEach((row, i) => {
      const rowNum = startIdx + i + 1;
      html += `<tr><td style="text-align:center;color:var(--text-dim);">${rowNum}</td>`;
      sqlEngineState.columns.forEach(col => {
        const val = row[col];
        if (val === null || val === undefined) {
          html += `<td><span class="sql-null-val">NULL</span></td>`;
        } else {
          html += `<td>${escapeHtml(String(val))}</td>`;
        }
      });
      html += `</tr>`;
    });
  }

  html += `</tbody></table></div>`;
  container.innerHTML = html;
}

window.updateSqlFilter = function(val) {
  sqlEngineState.filterQuery = val;
  sqlEngineState.currentPage = 1;
  renderSqlViewerIntoContainer("sqlContainer");
  renderSqlViewerIntoContainer("bottomSqlContainer");
};

window.changeSqlPage = function(delta) {
  sqlEngineState.currentPage += delta;
  renderSqlViewerIntoContainer("sqlContainer");
  renderSqlViewerIntoContainer("bottomSqlContainer");
};

window.sortSqlColumn = function(colName) {
  if (sqlEngineState.sortColumn === colName) {
    sqlEngineState.sortAsc = !sqlEngineState.sortAsc;
  } else {
    sqlEngineState.sortColumn = colName;
    sqlEngineState.sortAsc = true;
  }
  renderSqlViewerIntoContainer("sqlContainer");
  renderSqlViewerIntoContainer("bottomSqlContainer");
};

window.exportSqlJson = function() {
  if (!sqlEngineState.rawRows || sqlEngineState.rawRows.length === 0) {
    showToast("No SQL results to export", "info");
    return;
  }
  const jsonStr = JSON.stringify(sqlEngineState.rawRows, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "query_results.json";
  a.click();
  showToast("SQL Results downloaded as JSON!", "success");
};

window.exportSqlCsv = function() {
  if (!sqlEngineState.rawRows || sqlEngineState.rawRows.length === 0) {
    showToast("No SQL results to export", "info");
    return;
  }
  const cols = sqlEngineState.columns;
  let csv = cols.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",") + "\n";
  sqlEngineState.rawRows.forEach(row => {
    const line = cols.map(c => {
      const v = row[c] !== undefined && row[c] !== null ? String(row[c]) : "";
      return `"${v.replace(/"/g, '""')}"`;
    }).join(",");
    csv += line + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "query_results.csv";
  a.click();
  showToast("SQL Results downloaded as CSV!", "success");
};

window.exportSqlResults = window.exportSqlJson;

// --- 7.4 Markdown Render Engine ---
async function renderMarkdownDoc(mdContent) {
  if (workspaceFiles.length === 0 || !activeFileName || !getFile(activeFileName)) {
    clearAndHidePreview();
    return;
  }

  const previewFrame = document.getElementById("previewFrame");
  const markdownContainer = document.getElementById("markdownContainer");
  const sqlContainer = document.getElementById("sqlContainer");
  const emptyState = document.getElementById("previewEmptyState");
  const liveIndicator = document.getElementById("previewLiveIndicator");

  if (emptyState) emptyState.style.display = "none";
  if (previewFrame) previewFrame.style.display = "none";
  if (sqlContainer) sqlContainer.style.display = "none";
  if (markdownContainer) markdownContainer.style.display = "block";
  if (liveIndicator) liveIndicator.style.display = "inline-block";

  try {
    if (typeof marked === "undefined") {
      await loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
    }
    markdownContainer.innerHTML = marked.parse(mdContent);
  } catch (e) {
    markdownContainer.innerHTML = `<pre>${escapeHtml(mdContent)}</pre>`;
  }
}

// Utility script loader
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// --- 8. Real-Time Terminal & Console Logs ---
window.addEventListener("message", (e) => {
  if (e.data && e.data.source === "webcode-preview") {
    appendTerminalLog(`term-${e.data.type}`, e.data.message, e.data.time);
  }
});

function appendTerminalLog(typeClass, message, time) {
  const termStream = document.getElementById("terminalLogs");
  if (!termStream) return;

  const line = document.createElement("div");
  line.className = `term-line ${typeClass}`;
  const timeStr = time || new Date().toLocaleTimeString();
  line.innerHTML = `<span class="term-time">[${timeStr}]</span> <span>${escapeHtml(String(message))}</span>`;
  termStream.appendChild(line);
  termStream.scrollTop = termStream.scrollHeight;
}

function clearTerminal() {
  const termStream = document.getElementById("terminalLogs");
  if (termStream) termStream.innerHTML = "";
}

function switchBottomTab(tabId) {
  document.querySelectorAll(".panel-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  const drawer = document.getElementById("bottomPanel");
  if (drawer) {
    drawer.classList.remove("collapsed");
    const savedHeight = parseInt(localStorage.getItem("wc_bottom_height"), 10) || 190;
    drawer.style.height = Math.max(100, savedHeight) + "px";
  }

  const tabTerminal = document.getElementById("bottomTabTerminal");
  const tabSql = document.getElementById("bottomTabSql");

  if (tabId === "terminal") {
    if (tabTerminal) tabTerminal.style.display = "flex";
    if (tabSql) tabSql.style.display = "none";
  } else if (tabId === "sqlViewer") {
    if (tabTerminal) tabTerminal.style.display = "none";
    if (tabSql) tabSql.style.display = "flex";
    renderSqlViewerIntoContainer("bottomSqlContainer");
  }
}

function toggleBottomPanel() {
  const panel = document.getElementById("bottomPanel");
  if (!panel) return;
  const isCollapsed = panel.classList.contains("collapsed");
  if (isCollapsed) {
    panel.classList.remove("collapsed");
    const savedHeight = parseInt(localStorage.getItem("wc_bottom_height"), 10) || 190;
    panel.style.height = Math.max(100, savedHeight) + "px";
  } else {
    const curH = parseInt(panel.style.height, 10);
    if (curH && curH > 36) {
      localStorage.setItem("wc_bottom_height", curH);
    }
    panel.classList.add("collapsed");
    panel.style.height = "32px";
  }
}

// Interactive Terminal REPL input
document.addEventListener("DOMContentLoaded", () => {
  const replInput = document.getElementById("termReplInput");
  if (replInput) {
    replInput.addEventListener("keydown", async (e) => {
      if (e.key === "Enter" && replInput.value.trim()) {
        const cmd = replInput.value.trim();
        appendTerminalLog("term-info", `> ${cmd}`);
        replInput.value = "";

        const activeFile = getFile(activeFileName);
        if (activeFile && activeFile.language === "python" && pyodideInstance) {
          try {
            await pyodideInstance.runPythonAsync(cmd);
          } catch (err) {
            appendTerminalLog("term-error", err.message);
          }
        } else {
          try {
            const frame = document.getElementById("previewFrame");
            if (frame && frame.contentWindow) {
              const res = frame.contentWindow.eval(cmd);
              appendTerminalLog("term-log", `< ${res}`);
            }
          } catch (err) {
            appendTerminalLog("term-error", err.message);
          }
        }
      }
    });
  }
});

// --- 9. Activity Bar & Sidebar Views ---
let sidebarHoverTimer = null;
let isSidebarPinned = false;

function switchSidebarView(viewId, openExplicitly = true) {
  const sidebar = document.getElementById("sidebarPanel");
  const buttons = document.querySelectorAll(".activity-btn");
  const btnNewFileTree = document.getElementById("btnNewFileTree");
  
  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewId);
  });

  if (!sidebar) return;

  sidebar.dataset.currentView = viewId;
  if (openExplicitly) {
    sidebar.classList.add("is-open");
  }

  // Only display the "＋" (New File) button in the Project Files Explorer view
  if (btnNewFileTree) {
    btnNewFileTree.style.display = (viewId === "explorer") ? "" : "none";
  }

  const headerTitle = document.getElementById("sidebarHeaderTitle");
  const contentArea = document.getElementById("sidebarContentArea");

  if (viewId === "explorer") {
    if (headerTitle) headerTitle.textContent = i18n[currentLang]?.explorer || "PROJECT FILES";
    if (contentArea) {
      contentArea.innerHTML = `
        <div class="explorer-search-box" id="explorerSearchBox">
          <span class="explorer-search-icon">🔍</span>
          <input type="text" id="explorerSearchInput" class="explorer-search-input" placeholder="Search files..." oninput="handleExplorerSearch(this.value)">
          <button type="button" class="explorer-search-clear" id="explorerSearchClearBtn" onclick="clearExplorerSearch()" title="Clear search">✕</button>
        </div>
        <div class="file-list" id="fileTreeList"></div>
      `;
      renderFileExplorer();
    }
  } else if (viewId === "packages") {
    if (headerTitle) headerTitle.textContent = i18n[currentLang]?.packages || "PACKAGES & CDNS";
    if (contentArea) renderPackagesList(contentArea);
  } else if (viewId === "history") {
    if (headerTitle) headerTitle.textContent = i18n[currentLang]?.history || "SNAPSHOTS & HISTORY";
    if (contentArea) renderSnapshotsView(contentArea);
  } else if (viewId === "settings") {
    if (headerTitle) headerTitle.textContent = i18n[currentLang]?.settings || "IDE SETTINGS";
    if (contentArea) renderSettingsView(contentArea);
  }
}

function initDynamicSidebarHover() {
  const activityBar = document.getElementById("activityBar");
  const sidebar = document.getElementById("sidebarPanel");
  if (!activityBar || !sidebar) return;

  isSidebarPinned = localStorage.getItem("wc_sidebar_pinned") === "true";
  const pinBtn = document.getElementById("btnPinSidebar");
  if (isSidebarPinned) {
    sidebar.classList.add("is-pinned", "is-open");
    if (pinBtn) pinBtn.style.color = "var(--accent)";
  } else {
    sidebar.classList.remove("is-pinned", "is-open");
    if (pinBtn) pinBtn.style.color = "";
  }

  const openSidebarOnHover = (viewId = null) => {
    if (sidebarHoverTimer) {
      clearTimeout(sidebarHoverTimer);
      sidebarHoverTimer = null;
    }
    if (viewId) {
      switchSidebarView(viewId, true);
    } else {
      const current = sidebar.dataset.currentView || "explorer";
      switchSidebarView(current, true);
    }
    sidebar.classList.add("is-open");
  };

  const closeSidebarOnLeave = () => {
    if (isSidebarPinned) return;
    if (sidebarHoverTimer) clearTimeout(sidebarHoverTimer);
    sidebarHoverTimer = setTimeout(() => {
      sidebar.classList.remove("is-open");
    }, 180);
  };

  activityBar.addEventListener("mouseenter", () => {
    openSidebarOnHover();
  });
  activityBar.addEventListener("mouseleave", () => {
    closeSidebarOnLeave();
  });

  activityBar.querySelectorAll(".activity-btn").forEach(btn => {
    const view = btn.dataset.view;
    if (!view) return;
    btn.addEventListener("mouseenter", () => {
      openSidebarOnHover(view);
    });
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSidebarOnHover(view);
    });
  });

  sidebar.addEventListener("mouseenter", () => {
    if (sidebarHoverTimer) {
      clearTimeout(sidebarHoverTimer);
      sidebarHoverTimer = null;
    }
    sidebar.classList.add("is-open");
  });
  sidebar.addEventListener("mouseleave", () => {
    closeSidebarOnLeave();
  });
}

window.togglePinSidebar = function() {
  const sidebar = document.getElementById("sidebarPanel");
  const pinBtn = document.getElementById("btnPinSidebar");
  if (!sidebar) return;
  isSidebarPinned = !isSidebarPinned;
  if (isSidebarPinned) {
    sidebar.classList.add("is-pinned", "is-open");
    if (pinBtn) pinBtn.style.color = "var(--accent)";
    showToast("Sidebar pinned open", "info");
  } else {
    sidebar.classList.remove("is-pinned");
    if (pinBtn) pinBtn.style.color = "";
    showToast("Dynamic hover mode enabled (default closed)", "info");
  }
  localStorage.setItem("wc_sidebar_pinned", isSidebarPinned ? "true" : "false");
  if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
    setTimeout(() => codeMirrorEditor.refresh(), 50);
  }
};

function performGlobalSearch(query) {
  const resultsDiv = document.getElementById("searchResults");
  if (!query) { resultsDiv.innerHTML = ""; return; }
  let html = "";
  workspaceFiles.forEach(f => {
    const lines = f.content.split("\n");
    lines.forEach((line, idx) => {
      if (line.toLowerCase().includes(query.toLowerCase())) {
        html += `<div class="file-item" onclick="switchToFile('${f.name}')">
          <strong>${f.name}:${idx+1}</strong> <span>${escapeHtml(line.trim().substring(0, 40))}</span>
        </div>`;
      }
    });
  });
  resultsDiv.innerHTML = html || `<div style="color:var(--text-dim);padding:8px;">No matches found</div>`;
}

function renderPackagesList(container) {
  if (!container) return;

  let filtered = cdnPackages;
  if (currentPackageFilter !== "all") {
    filtered = filtered.filter(p => p.category === currentPackageFilter);
  }
  if (packageSearchQuery) {
    const q = packageSearchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
  }

  const activeCount = activeLibraries.length + customCdnPackages.length;

  let html = `
    <div class="packages-wrapper">
      <div class="package-search-container">
        <div class="explorer-search-box" style="margin-bottom:0;">
          <span class="explorer-search-icon">🔍</span>
          <input type="text" class="explorer-search-input" placeholder="Search libraries (Tailwind, Lucide, React...)" value="${escapeHtml(packageSearchQuery)}" oninput="handlePackageSearch(this.value)">
          ${packageSearchQuery ? `<button type="button" class="explorer-search-clear visible" onclick="clearPackageSearch()" title="Clear">✕</button>` : ''}
        </div>
        <div class="package-filter-pills">
          <button class="filter-pill ${currentPackageFilter === 'all' ? 'active' : ''}" onclick="setPackageCategoryFilter('all')">All</button>
          <button class="filter-pill ${currentPackageFilter === 'css' ? 'active' : ''}" onclick="setPackageCategoryFilter('css')">CSS & UI</button>
          <button class="filter-pill ${currentPackageFilter === 'frameworks' ? 'active' : ''}" onclick="setPackageCategoryFilter('frameworks')">JS Frameworks</button>
          <button class="filter-pill ${currentPackageFilter === 'icons' ? 'active' : ''}" onclick="setPackageCategoryFilter('icons')">Icons</button>
          <button class="filter-pill ${currentPackageFilter === 'animation' ? 'active' : ''}" onclick="setPackageCategoryFilter('animation')">Animation</button>
          <button class="filter-pill ${currentPackageFilter === 'data' ? 'active' : ''}" onclick="setPackageCategoryFilter('data')">Data & Utils</button>
        </div>
      </div>

      <!-- Custom CDN / Script Adder -->
      <div class="custom-pkg-box">
        <div style="font-size:11px;font-weight:700;color:var(--text-main);display:flex;align-items:center;justify-content:space-between;">
          <span>＋ Custom CDN / Script URL</span>
        </div>
        <div class="custom-pkg-input-row">
          <input type="text" id="customCdnInput" class="custom-pkg-input" placeholder="https://cdn.example.com/lib.js or .css" onkeydown="if(event.key==='Enter')addCustomCdnPackage()">
          <button class="btn btn-sm btn-primary" onclick="addCustomCdnPackage()" style="padding:4px 10px;">Add</button>
        </div>
      </div>
  `;

  if (customCdnPackages.length > 0) {
    html += `<div style="font-size:11px;font-weight:700;color:var(--text-dim);margin-top:4px;">CUSTOM PACKAGES (${customCdnPackages.length})</div>`;
    customCdnPackages.forEach((custom, idx) => {
      html += `
        <div class="pkg-card installed">
          <div class="pkg-card-top">
            <div class="pkg-title-area">
              <span class="pkg-name">${escapeHtml(custom.name)}</span>
              <span class="pkg-category-tag">${custom.type.toUpperCase()}</span>
            </div>
            <button class="btn btn-sm btn-danger" onclick="removeCustomCdnPackage(${idx})">Remove</button>
          </div>
          <p class="pkg-desc" style="font-family:var(--font-mono);font-size:10px;word-break:break-all;">${escapeHtml(custom.url)}</p>
        </div>
      `;
    });
  }

  html += `<div style="font-size:11px;font-weight:700;color:var(--text-dim);margin-top:4px;">POPULAR LIBRARIES (${filtered.length})</div>`;

  if (filtered.length === 0) {
    html += `<div style="color:var(--text-dim);padding:14px;text-align:center;font-size:12px;">No packages found matching "${escapeHtml(packageSearchQuery)}"</div>`;
  } else {
    filtered.forEach(pkg => {
      const isInstalled = activeLibraries.includes(pkg.id);
      html += `
        <div class="pkg-card ${isInstalled ? 'installed' : ''}">
          <div class="pkg-card-top">
            <div class="pkg-title-area">
              <span class="pkg-name">${pkg.name}</span>
              <span class="pkg-category-tag">${pkg.category}</span>
            </div>
            <button class="btn btn-sm ${isInstalled ? 'btn-danger' : 'btn-primary'}" onclick="toggleCdnPkg('${pkg.id}')">
              ${isInstalled ? 'Remove' : 'Add'}
            </button>
          </div>
          <p class="pkg-desc">${pkg.desc}</p>
          ${isInstalled ? `
            <div class="pkg-status-indicator">
              <span class="pkg-status-dot"></span>
              <span>Active in live preview</span>
            </div>
          ` : ''}
        </div>
      `;
    });
  }

  html += `</div>`;
  container.innerHTML = html;
  updatePackageBadges();
}

window.handlePackageSearch = function(q) {
  packageSearchQuery = q || "";
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "packages") {
    renderPackagesList(contentArea);
  }
};

window.clearPackageSearch = function() {
  packageSearchQuery = "";
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "packages") {
    renderPackagesList(contentArea);
  }
};

window.setPackageCategoryFilter = function(category) {
  currentPackageFilter = category;
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "packages") {
    renderPackagesList(contentArea);
  }
};

window.addCustomCdnPackage = function() {
  const input = document.getElementById("customCdnInput");
  if (!input) return;
  const url = input.value.trim();
  if (!url) return;

  if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("//")) {
    showToast("Please enter a valid HTTP/HTTPS URL", "error");
    return;
  }

  const isCss = url.toLowerCase().includes(".css") || url.toLowerCase().includes("font");
  const type = isCss ? "css" : "js";
  const name = url.split("/").pop().split("?")[0] || "Custom CDN";

  customCdnPackages.push({ url, type, name });
  localStorage.setItem("wc_custom_cdns", JSON.stringify(customCdnPackages));
  input.value = "";
  
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "packages") {
    renderPackagesList(contentArea);
  }
  updatePackageBadges();
  runWebProject();
  showToast(`Added custom ${type.toUpperCase()} package!`, "success");
};

window.removeCustomCdnPackage = function(idx) {
  customCdnPackages.splice(idx, 1);
  localStorage.setItem("wc_custom_cdns", JSON.stringify(customCdnPackages));
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "packages") {
    renderPackagesList(contentArea);
  }
  updatePackageBadges();
  runWebProject();
  showToast("Removed custom package", "info");
};

window.toggleCdnPkg = function(id) {
  if (activeLibraries.includes(id)) {
    activeLibraries = activeLibraries.filter(x => x !== id);
    showToast(`Removed package`, "info");
  } else {
    activeLibraries.push(id);
    showToast(`Added package — integrated in real time!`, "success");
  }
  localStorage.setItem("wc_libs", JSON.stringify(activeLibraries));
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "packages") {
    renderPackagesList(contentArea);
  }
  updatePackageBadges();
  runWebProject();
};

function renderSnapshotsView(container) {
  const db = JSON.parse(localStorage.getItem("wc_snapshots_v2") || "[]");
  if (db.length === 0) {
    container.innerHTML = `<div style="color:var(--text-dim);padding:14px;text-align:center;">No snapshots saved yet.<br>Click 'Save' in the top bar to capture one.</div>`;
    return;
  }
  let html = `<div style="display:flex;flex-direction:column;gap:8px;">`;
  db.forEach(snap => {
    html += `
      <div class="file-item" style="justify-content:space-between;padding:8px 10px;align-items:center;">
        <div style="flex:1;overflow:hidden;padding-right:8px;">
          <div style="font-weight:600;font-size:12px;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(snap.name)}</div>
          <div style="font-size:10px;color:var(--text-dim);margin-top:2px;">${snap.time} (${snap.files ? snap.files.length : 0} files)</div>
        </div>
        <div style="display:flex;gap:4px;align-items:center;flex-shrink:0;">
          <button class="btn btn-sm btn-primary" onclick="restoreSnapshotV2(${snap.id})" title="Restore snapshot" style="padding:3px 8px;font-size:11px;">Restore</button>
          <button class="btn btn-sm" onclick="deleteSnapshotV2(${snap.id})" title="Delete snapshot" style="padding:3px 8px;font-size:11px;color:var(--danger);" onmouseover="this.style.background='rgba(239,68,68,0.15)'" onmouseout="this.style.background=''">🗑️</button>
        </div>
      </div>
    `;
  });
  html += `
    <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);">
      <button class="btn btn-sm" onclick="clearAllSnapshotsV2()" style="width:100%;color:var(--danger);display:flex;align-items:center;justify-content:center;gap:6px;">
        <span>🗑️</span>
        <span>Clear All Snapshots</span>
      </button>
    </div>
  </div>`;
  container.innerHTML = html;
}

window.deleteSnapshotV2 = function(id) {
  let db = JSON.parse(localStorage.getItem("wc_snapshots_v2") || "[]");
  db = db.filter(s => s.id !== id);
  localStorage.setItem("wc_snapshots_v2", JSON.stringify(db));
  showToast("Snapshot deleted", "info");
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "history") {
    renderSnapshotsView(contentArea);
  }
};

window.clearAllSnapshotsV2 = function() {
  localStorage.removeItem("wc_snapshots_v2");
  showToast("All snapshots cleared", "info");
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "history") {
    renderSnapshotsView(contentArea);
  }
};

function renderSettingsView(container) {
  const currentFontSize = localStorage.getItem("wc_font_size") || "13px";
  const currentTabSize = localStorage.getItem("wc_tab_size") || "2";
  const currentLineWrap = localStorage.getItem("wc_line_wrap") !== "false";
  const currentTheme = localStorage.getItem("wc_theme") || "midnight";
  const currentFontFamily = localStorage.getItem("wc_font_family") || "'JetBrains Mono', monospace";

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px;padding:4px 0;">
      <div>
        <label style="display:block;margin-bottom:6px;font-size:11px;font-weight:600;color:var(--text-muted);letter-spacing:0.5px;">EDITOR FONT SIZE</label>
        <select class="custom-select" style="width:100%;" onchange="setFontSize(this.value)">
          <option value="11px" ${currentFontSize === '11px' ? 'selected' : ''}>11px (Tiny)</option>
          <option value="12px" ${currentFontSize === '12px' ? 'selected' : ''}>12px (Compact)</option>
          <option value="13px" ${currentFontSize === '13px' ? 'selected' : ''}>13px (Default)</option>
          <option value="14px" ${currentFontSize === '14px' ? 'selected' : ''}>14px (Comfortable)</option>
          <option value="15px" ${currentFontSize === '15px' ? 'selected' : ''}>15px (Medium)</option>
          <option value="16px" ${currentFontSize === '16px' ? 'selected' : ''}>16px (Large)</option>
          <option value="18px" ${currentFontSize === '18px' ? 'selected' : ''}>18px (Extra Large)</option>
          <option value="20px" ${currentFontSize === '20px' ? 'selected' : ''}>20px (Huge)</option>
        </select>
      </div>

      <div>
        <label style="display:block;margin-bottom:6px;font-size:11px;font-weight:600;color:var(--text-muted);letter-spacing:0.5px;">FONT FAMILY</label>
        <select class="custom-select" style="width:100%;" onchange="setFontFamily(this.value)">
          <option value="'JetBrains Mono', monospace" ${currentFontFamily.includes('JetBrains') ? 'selected' : ''}>JetBrains Mono (Default)</option>
          <option value="'Fira Code', monospace" ${currentFontFamily.includes('Fira') ? 'selected' : ''}>Fira Code</option>
          <option value="'Source Code Pro', monospace" ${currentFontFamily.includes('Source Code') ? 'selected' : ''}>Source Code Pro</option>
          <option value="'Roboto Mono', monospace" ${currentFontFamily.includes('Roboto') ? 'selected' : ''}>Roboto Mono</option>
          <option value="'Inconsolata', monospace" ${currentFontFamily.includes('Inconsolata') ? 'selected' : ''}>Inconsolata</option>
          <option value="Consolas, monospace" ${currentFontFamily.includes('Consolas') ? 'selected' : ''}>Consolas</option>
          <option value="'Courier New', monospace" ${currentFontFamily.includes('Courier') ? 'selected' : ''}>Courier New</option>
          <option value="monospace" ${currentFontFamily === 'monospace' ? 'selected' : ''}>System Monospace</option>
        </select>
      </div>

      <div>
        <label style="display:block;margin-bottom:6px;font-size:11px;font-weight:600;color:var(--text-muted);letter-spacing:0.5px;">TAB INDENTATION</label>
        <select class="custom-select" style="width:100%;" onchange="setTabSize(this.value)">
          <option value="2" ${currentTabSize === '2' ? 'selected' : ''}>2 Spaces</option>
          <option value="4" ${currentTabSize === '4' ? 'selected' : ''}>4 Spaces</option>
        </select>
      </div>

      <div>
        <label style="display:block;margin-bottom:6px;font-size:11px;font-weight:600;color:var(--text-muted);letter-spacing:0.5px;">LINE WRAPPING</label>
        <select class="custom-select" style="width:100%;" onchange="setLineWrapping(this.value === 'true')">
          <option value="true" ${currentLineWrap ? 'selected' : ''}>Wrap Long Lines</option>
          <option value="false" ${!currentLineWrap ? 'selected' : ''}>No Wrap (Horizontal Scroll)</option>
        </select>
      </div>

      <div>
        <label style="display:block;margin-bottom:6px;font-size:11px;font-weight:600;color:var(--text-muted);letter-spacing:0.5px;">IDE THEME</label>
        <div class="theme-cards-grid">
          <div class="theme-picker-card ${currentTheme === 'midnight' ? 'active' : ''}" onclick="setIdeTheme('midnight')" role="button" tabindex="0">
            <div class="theme-card-top">
              <span class="theme-card-title">🌙 Midnight</span>
              ${currentTheme === 'midnight' ? '<span class="theme-active-dot"></span>' : ''}
            </div>
            <div class="theme-swatch-box" style="background:#0f141f;">
              <span class="theme-swatch-accent" style="background:#3b82f6;"></span>
              <span class="theme-swatch-line" style="background:#232d3f;"></span>
            </div>
            <span class="theme-card-desc">Dark slate & electric blue</span>
          </div>

          <div class="theme-picker-card ${currentTheme === 'light' ? 'active' : ''}" onclick="setIdeTheme('light')" role="button" tabindex="0">
            <div class="theme-card-top">
              <span class="theme-card-title">☀️ Light</span>
              ${currentTheme === 'light' ? '<span class="theme-active-dot"></span>' : ''}
            </div>
            <div class="theme-swatch-box" style="background:#f8fafc;border-color:#cbd5e1;">
              <span class="theme-swatch-accent" style="background:#2563eb;"></span>
              <span class="theme-swatch-line" style="background:#cbd5e1;"></span>
            </div>
            <span class="theme-card-desc">Crisp white & sapphire</span>
          </div>

          <div class="theme-picker-card ${currentTheme === 'dracula' ? 'active' : ''}" onclick="setIdeTheme('dracula')" role="button" tabindex="0">
            <div class="theme-card-top">
              <span class="theme-card-title">🧛 Dracula</span>
              ${currentTheme === 'dracula' ? '<span class="theme-active-dot"></span>' : ''}
            </div>
            <div class="theme-swatch-box" style="background:#21222c;">
              <span class="theme-swatch-accent" style="background:#bd93f9;"></span>
              <span class="theme-swatch-line" style="background:#44475a;"></span>
            </div>
            <span class="theme-card-desc">Dark vampire & orchid</span>
          </div>

          <div class="theme-picker-card ${currentTheme === 'monokai' ? 'active' : ''}" onclick="setIdeTheme('monokai')" role="button" tabindex="0">
            <div class="theme-card-top">
              <span class="theme-card-title">🎨 Monokai</span>
              ${currentTheme === 'monokai' ? '<span class="theme-active-dot"></span>' : ''}
            </div>
            <div class="theme-swatch-box" style="background:#1e1f1c;">
              <span class="theme-swatch-accent" style="background:#a6e22e;"></span>
              <span class="theme-swatch-line" style="background:#3e3d32;"></span>
            </div>
            <span class="theme-card-desc">Charcoal dark & lime</span>
          </div>
        </div>
      </div>

      <div style="margin-top:6px;padding-top:12px;border-top:1px solid var(--border);">
        <button class="btn btn-sm" onclick="resetEditorSettings()" style="width:100%;">↺ Reset Settings to Default</button>
      </div>
    </div>
  `;
}

window.setFontSize = function(size) {
  localStorage.setItem("wc_font_size", size);
  document.documentElement.style.setProperty("--editor-font-size", size);
  document.querySelectorAll(".CodeMirror, .resilient-textarea, .resilient-gutter").forEach(el => {
    el.style.setProperty("font-size", size, "important");
  });
  if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
    codeMirrorEditor.refresh();
  }
  showToast(`Font size set to ${size}`, "info");
};

window.setFontFamily = function(font) {
  localStorage.setItem("wc_font_family", font);
  document.documentElement.style.setProperty("--editor-font-family", font);
  document.querySelectorAll(".CodeMirror, .resilient-textarea, .resilient-gutter").forEach(el => {
    el.style.setProperty("font-family", font, "important");
  });
  if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
    codeMirrorEditor.refresh();
  }
  showToast("Font family updated!", "info");
};

window.setTabSize = function(tabSize) {
  const sizeNum = parseInt(tabSize, 10) || 2;
  localStorage.setItem("wc_tab_size", String(sizeNum));
  if (codeMirrorEditor) {
    if (typeof codeMirrorEditor.setOption === "function") {
      codeMirrorEditor.setOption("tabSize", sizeNum);
      codeMirrorEditor.setOption("indentUnit", sizeNum);
    }
  }
  showToast(`Tab size set to ${sizeNum} spaces`, "info");
};

window.setLineWrapping = function(isWrapped) {
  localStorage.setItem("wc_line_wrap", String(isWrapped));
  if (codeMirrorEditor && typeof codeMirrorEditor.setOption === "function") {
    codeMirrorEditor.setOption("lineWrapping", isWrapped);
    if (typeof codeMirrorEditor.refresh === "function") codeMirrorEditor.refresh();
  }
  const resTa = document.querySelector(".resilient-textarea");
  if (resTa) {
    resTa.style.whiteSpace = isWrapped ? "pre-wrap" : "pre";
    resTa.style.wordBreak = isWrapped ? "break-word" : "normal";
  }
  showToast(`Line wrapping: ${isWrapped ? "Enabled" : "Disabled"}`, "info");
};

window.resetEditorSettings = function() {
  localStorage.removeItem("wc_font_size");
  localStorage.removeItem("wc_tab_size");
  localStorage.removeItem("wc_line_wrap");
  localStorage.removeItem("wc_font_family");
  applySavedEditorSettings();
  const contentArea = document.getElementById("sidebarContentArea");
  if (contentArea && document.getElementById("sidebarPanel").dataset.currentView === "settings") {
    renderSettingsView(contentArea);
  }
  showToast("Settings reset to defaults", "success");
};

function applySavedEditorSettings() {
  const savedFontSize = localStorage.getItem("wc_font_size") || "13px";
  const savedTabSize = parseInt(localStorage.getItem("wc_tab_size") || "2", 10);
  const savedLineWrap = localStorage.getItem("wc_line_wrap") !== "false";
  const savedFontFamily = localStorage.getItem("wc_font_family") || "'JetBrains Mono', monospace";

  document.documentElement.style.setProperty("--editor-font-size", savedFontSize);
  document.documentElement.style.setProperty("--editor-font-family", savedFontFamily);

  document.querySelectorAll(".CodeMirror, .resilient-textarea, .resilient-gutter").forEach(el => {
    el.style.setProperty("font-size", savedFontSize, "important");
    el.style.setProperty("font-family", savedFontFamily, "important");
  });

  if (codeMirrorEditor && typeof codeMirrorEditor.setOption === "function") {
    codeMirrorEditor.setOption("tabSize", savedTabSize);
    codeMirrorEditor.setOption("indentUnit", savedTabSize);
    codeMirrorEditor.setOption("lineWrapping", savedLineWrap);
    if (typeof codeMirrorEditor.refresh === "function") {
      setTimeout(() => codeMirrorEditor.refresh(), 50);
    }
  }

  const resTa = document.querySelector(".resilient-textarea");
  if (resTa) {
    resTa.style.whiteSpace = savedLineWrap ? "pre-wrap" : "pre";
    resTa.style.wordBreak = savedLineWrap ? "break-word" : "normal";
  }
}

// --- 10. Command Palette (VS Code Style Ctrl+Shift+P) ---
const ideCommands = [
  { name: "Run Active File / Project", key: "Ctrl+Enter", action: runActiveFile },
  { name: "Save Project Snapshot", key: "Ctrl+S", action: saveProjectSnapshot },
  { name: "Rename Current File", key: "F2", action: () => { if (activeFileName) renameFilePrompt(activeFileName); } },
  { name: "New Project (Clean Start)", key: "Alt+Shift+N", action: startNewProjectClean },
  { name: "Create New File (＋)", key: "Alt+N", action: promptCreateNewFile },
  { name: "Browse Templates Catalog", key: "", action: openTemplatesModal },
  { name: "Export Project ZIP Archive", key: "", action: exportProjectZip },
  { name: "Clear Terminal Logs", key: "", action: clearTerminal },
  { name: "Switch to Explorer", key: "Ctrl+1", action: () => switchSidebarView("explorer") },
  { name: "Switch to Search", key: "Ctrl+2", action: () => switchSidebarView("search") },
  { name: "Switch to Settings", key: "", action: () => switchSidebarView("settings") }
];

function toggleCommandPalette() {
  const el = document.getElementById("commandPaletteModal");
  el.classList.toggle("active");
  if (el.classList.contains("active")) {
    const input = document.getElementById("commandSearchInput");
    input.value = "";
    input.focus();
    renderCommandList("");
  }
}

function renderCommandList(filter) {
  const list = document.getElementById("commandList");
  list.innerHTML = "";
  const filtered = ideCommands.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(cmd => {
    const row = document.createElement("div");
    row.className = "command-item";
    row.innerHTML = `
      <span>${cmd.name}</span>
      ${cmd.key ? `<span class="command-key">${cmd.key}</span>` : ''}
    `;
    row.onclick = () => {
      toggleCommandPalette();
      cmd.action();
    };
    list.appendChild(row);
  });
}

// --- 11. Templates Modal ---
function openTemplatesModal() {
  const grid = document.getElementById("templatesGrid");
  if (!grid) return;
  grid.innerHTML = "";

  ideTemplates.forEach(t => {
    const card = document.createElement("div");
    card.className = "template-card";
    
    // Generate chips for all files included in this template
    const filesHtml = (t.files || []).map(f => `
      <span class="template-file-chip">
        <span style="font-size:12px;">${getFileIcon(f.name)}</span>
        <span>${escapeHtml(f.name)}</span>
      </span>
    `).join("");

    const libTagsHtml = (t.libs && t.libs.length > 0)
      ? `<span class="template-lib-tag">📦 ${t.libs.join(", ")}</span>`
      : "";

    card.innerHTML = `
      <div class="template-card-header">
        <span class="runtime-badge">${t.category}</span>
        ${libTagsHtml}
      </div>
      <h3 class="template-card-title">${escapeHtml(t.title)}</h3>
      <p class="template-card-desc">${escapeHtml(t.desc || "Ready-to-run template workspace")}</p>
      
      <div style="margin-top:6px;">
        <span style="display:block;font-size:10px;font-weight:700;color:var(--text-dim);letter-spacing:0.5px;margin-bottom:4px;text-transform:uppercase;">INCLUDED FILES (${(t.files || []).length})</span>
        <div class="template-files-list">
          ${filesHtml}
        </div>
      </div>

      <div class="template-card-footer">
        <span style="font-size:11px;color:var(--text-dim);">Click to load project</span>
        <span class="template-load-btn">Load Workspace →</span>
      </div>
    `;

    card.onclick = () => {
      loadTemplate(t);
      closeModal("templatesModal");
    };

    grid.appendChild(card);
  });

  openModal("templatesModal");
}

function loadTemplate(t) {
  if (!t || !t.files || t.files.length === 0) {
    showToast("Selected template has no files.", "error");
    return;
  }

  // Deep clone all files so template content remains pristine
  workspaceFiles = JSON.parse(JSON.stringify(t.files));
  openTabs = workspaceFiles.map(f => f.name);
  activeFileName = workspaceFiles[0].name;

  // Activate required libraries
  if (t.libs && Array.isArray(t.libs)) {
    t.libs.forEach(lib => {
      if (!activeLibraries.includes(lib)) {
        activeLibraries.push(lib);
      }
    });
  }

  // Persist directly to localStorage
  localStorage.setItem("wc_files_v2", JSON.stringify(workspaceFiles));
  localStorage.setItem("wc_tabs_v2", JSON.stringify(openTabs));
  localStorage.setItem("wc_active_v2", activeFileName);
  localStorage.setItem("wc_libs", JSON.stringify(activeLibraries));
  localStorage.setItem("wc_user_has_project", "true");

  const titleEl = document.getElementById("projectTitle");
  if (titleEl && t.title) {
    const cleanTitle = t.title.replace(/^[\p{Emoji}\s]+/u, '').trim() || t.title;
    titleEl.value = cleanTitle;
    localStorage.setItem("wc_title_v2", cleanTitle);
  }

  // Ensure editor pane is open if previously hidden
  const container = document.getElementById("editorAndPreviewContainer");
  if (container && container.classList.contains("layout-preview-only")) {
    setIdeLayout("split");
  }

  hideEditorWelcome();
  renderFileExplorer();
  renderOpenTabs();
  switchToFile(activeFileName);
  updatePackageBadges();

  setTimeout(() => {
    try {
      runActiveFile();
    } catch (e) {
      console.warn("Template runtime execution error:", e);
    }
  }, 100);

  showToast(`Loaded ${t.title} (${workspaceFiles.length} files)!`, "success");
}

// --- 12. Project Export & Share ---
async function exportProjectZip() {
  try {
    if (typeof JSZip === "undefined") {
      showToast("Initializing JSZip...", "info");
      await loadScript("./jszip.min.js");
    }
    const zip = new JSZip();
    const projName = document.getElementById("projectTitle").value || "webcode-project";
    const safeName = projName.replace(/[^a-z0-9_\-]/gi, "_");

    workspaceFiles.forEach(file => {
      zip.file(file.name, file.content);
    });

    zip.file("project.json", JSON.stringify({
      name: projName,
      activeLibraries,
      exportedAt: new Date().toISOString()
    }, null, 2));

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName}.zip`;
    a.click();
    showToast("Project ZIP downloaded!", "success");
  } catch (err) {
    showToast("Export failed: " + err.message, "error");
  }
}

function copyShareUrl() {
  const payload = {
    name: document.getElementById("projectTitle").value,
    files: workspaceFiles,
    libs: activeLibraries
  };
  const str = encodeURIComponent(JSON.stringify(payload));
  const url = `${window.location.origin}${window.location.pathname}#workspace=${btoa(str)}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast(i18n[currentLang]?.copied || "Link copied to clipboard!", "success");
  }).catch(() => {
    showToast("Unable to copy link", "error");
  });
}

function checkWorkspaceUrlHash() {
  if (window.location.hash.startsWith("#workspace=")) {
    try {
      const b64 = window.location.hash.replace("#workspace=", "");
      const json = decodeURIComponent(atob(b64));
      const data = JSON.parse(json);
      if (data && data.files) {
        workspaceFiles = data.files;
        openTabs = workspaceFiles.map(f => f.name);
        activeFileName = workspaceFiles[0].name;
        if (data.name) document.getElementById("projectTitle").value = data.name;
        if (data.libs) activeLibraries = data.libs;
        switchToFile(activeFileName);
        showToast("Shared workspace loaded!", "success");
      }
    } catch (e) {
      console.warn("Could not load shared workspace", e);
    }
  }
}

// --- 13. Snapshots & Draft Persistence ---
let draftTimer = null;
function saveDraftDebounced() {
  clearTimeout(draftTimer);
  draftTimer = setTimeout(() => {
    if (workspaceFiles.length > 0) {
      localStorage.setItem("wc_files_v2", JSON.stringify(workspaceFiles));
      localStorage.setItem("wc_title_v2", document.getElementById("projectTitle").value);
      localStorage.setItem("wc_tabs_v2", JSON.stringify(openTabs));
      localStorage.setItem("wc_active_v2", activeFileName);
      localStorage.setItem("wc_user_has_project", "true");
    } else {
      localStorage.removeItem("wc_files_v2");
      localStorage.removeItem("wc_tabs_v2");
      localStorage.removeItem("wc_active_v2");
      localStorage.setItem("wc_user_has_project", "false");
    }
  }, 500);
}

function saveProjectSnapshot() {
  const db = JSON.parse(localStorage.getItem("wc_snapshots_v2") || "[]");
  const snap = {
    id: Date.now(),
    name: document.getElementById("projectTitle").value || "Untitled",
    time: new Date().toLocaleString(),
    files: JSON.parse(JSON.stringify(workspaceFiles)),
    libs: activeLibraries
  };
  db.unshift(snap);
  if (db.length > 25) db.pop();
  localStorage.setItem("wc_snapshots_v2", JSON.stringify(db));
  showToast(i18n[currentLang]?.savedSuccess || "Project saved!", "success");
}

window.restoreSnapshotV2 = function(id) {
  const db = JSON.parse(localStorage.getItem("wc_snapshots_v2") || "[]");
  const found = db.find(s => s.id === id);
  if (found) {
    workspaceFiles = found.files;
    openTabs = workspaceFiles.map(f => f.name);
    activeFileName = workspaceFiles[0].name;
    document.getElementById("projectTitle").value = found.name;
    activeLibraries = found.libs || [];
    localStorage.setItem("wc_user_has_project", "true");
    switchToFile(activeFileName);
    runActiveFile();
    showToast("Snapshot restored!", "success");
  }
};

function restoreLocalDraft() {
  const userHasProject = localStorage.getItem("wc_user_has_project");
  if (userHasProject === "true") {
    const savedFiles = localStorage.getItem("wc_files_v2");
    if (savedFiles) {
      try {
        const parsed = JSON.parse(savedFiles);
        if (Array.isArray(parsed) && parsed.length > 0) {
          workspaceFiles = parsed;
          openTabs = JSON.parse(localStorage.getItem("wc_tabs_v2") || "[]");
          if (openTabs.length === 0) openTabs = workspaceFiles.map(f => f.name);
          activeFileName = localStorage.getItem("wc_active_v2") || workspaceFiles[0].name;
          document.getElementById("projectTitle").value = localStorage.getItem("wc_title_v2") || "My Project";
          return true;
        }
      } catch(e){}
    }
  }
  // Default clean state: no automatic files loaded
  workspaceFiles = [];
  openTabs = [];
  activeFileName = "";
  return false;
}

// --- 14. Theme & Layout ---
window.setIdeTheme = function(theme) {
  document.body.className = `theme-${theme}`;
  localStorage.setItem("wc_theme", theme);
  const sel = document.getElementById("themeSelector");
  if (sel) sel.value = theme;
  
  // Re-render settings panel if active
  const contentArea = document.getElementById("sidebarContentArea");
  const panel = document.getElementById("sidebarPanel");
  if (contentArea && panel && panel.dataset.currentView === "settings") {
    renderSettingsView(contentArea);
  }
};

window.setIdeLayout = function(layout) {
  const container = document.getElementById("editorAndPreviewContainer");
  const editorPane = document.getElementById("editorPane");
  if (!container) return;

  container.className = `editor-and-preview-container layout-${layout}`;
  document.querySelectorAll("#layoutGroup .btn-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.layout === layout);
  });

  if (layout === "split") {
    const savedPct = localStorage.getItem("wc_editor_split_pct") || 50;
    if (editorPane) editorPane.style.width = savedPct + "%";
  } else if (layout === "code-only") {
    if (editorPane) editorPane.style.width = "100%";
  } else if (layout === "preview-only") {
    if (editorPane) editorPane.style.width = "0%";
  }

  if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
    setTimeout(() => codeMirrorEditor.refresh(), 60);
  }

  const frame = document.getElementById("previewFrame");
  if (frame && frame.contentWindow) {
    try {
      frame.contentWindow.dispatchEvent(new Event("resize"));
    } catch(e){}
  }
};

window.setDevicePreview = function(device, btn) {
  const iframe = document.getElementById("previewFrame");
  const buttons = document.querySelectorAll("#previewHeader .btn-tab");
  buttons.forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  if (!iframe) return;
  iframe.className = "preview-iframe";
  if (device === "mobile") {
    iframe.classList.add("device-mobile");
  } else if (device === "tablet") {
    iframe.classList.add("device-tablet");
  } else if (device === "laptop") {
    iframe.classList.add("device-laptop");
  } // 'desktop' is standard 100% fluid

  setTimeout(() => {
    if (iframe.contentWindow) {
      try {
        iframe.contentWindow.dispatchEvent(new Event("resize"));
      } catch(e){}
    }
  }, 60);
};

window.executeDatabaseSqlFile = function() {
  const sqlFile = workspaceFiles.find(f => f.name.endsWith(".sql") || f.language === "sql");
  if (sqlFile) {
    switchToFile(sqlFile.name);
    runSqlQuery(sqlFile.content);
  } else {
    createStarterEnvironment("sql");
  }
};

function setIdeLanguage(lang = "en") {
  currentLang = "en";
}

// --- 15. UI Modals & Notifications ---
window.openModal = function(id) { const el = document.getElementById(id); if (el) el.classList.add("active"); };
window.closeModal = function(id) { const el = document.getElementById(id); if (el) el.classList.remove("active"); };

function showToast(msg, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

// --- 16. Keyboard Global Shortcuts ---
document.addEventListener("keydown", (e) => {
  if (e.key === "F2" && activeFileName) {
    e.preventDefault();
    renameFilePrompt(activeFileName);
  } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "P" || e.key === "p")) {
    e.preventDefault();
    toggleCommandPalette();
  } else if (e.altKey && e.shiftKey && (e.key === "N" || e.key === "n")) {
    e.preventDefault();
    startNewProjectClean();
  } else if (e.altKey && (e.key === "n" || e.key === "N")) {
    e.preventDefault();
    promptCreateNewFile();
  } else if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
    e.preventDefault();
    saveProjectSnapshot();
  } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    runActiveFile();
  } else if (e.key === "Escape") {
    document.querySelectorAll(".modal-backdrop, .command-palette-backdrop").forEach(el => el.classList.remove("active"));
  }
});

// --- 17. Draggable Workspace & Bottom Panel Resizers ---
function initResizeObservers() {
  const viewport = document.getElementById("previewViewport");
  const editorPane = document.getElementById("editorPane");

  if (window.ResizeObserver) {
    if (viewport) {
      const roViewport = new ResizeObserver(() => {
        const frame = document.getElementById("previewFrame");
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.dispatchEvent(new Event("resize"));
          } catch(e){}
        }
      });
      roViewport.observe(viewport);
    }

    if (editorPane) {
      const roEditor = new ResizeObserver(() => {
        if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
          codeMirrorEditor.refresh();
        }
      });
      roEditor.observe(editorPane);
    }
  }

  window.addEventListener("resize", () => {
    if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
      codeMirrorEditor.refresh();
    }
    const frame = document.getElementById("previewFrame");
    if (frame && frame.contentWindow) {
      try {
        frame.contentWindow.dispatchEvent(new Event("resize"));
      } catch(e){}
    }
  });
}

function initWorkspaceResizers() {
  const splitter = document.getElementById("workspaceSplitter");
  const container = document.getElementById("editorAndPreviewContainer");
  const editorPane = document.getElementById("editorPane");
  const bottomResizer = document.getElementById("bottomPanelResizer");
  const bottomPanel = document.getElementById("bottomPanel");

  // Restore saved horizontal split
  const savedSplit = localStorage.getItem("wc_editor_split_pct");
  if (savedSplit && editorPane) {
    const pct = parseFloat(savedSplit);
    if (!isNaN(pct) && pct >= 15 && pct <= 85) {
      editorPane.style.width = pct + "%";
    }
  }

  // Ensure bottom panel starts collapsed by default
  if (bottomPanel) {
    bottomPanel.classList.add("collapsed");
  }

  // Workspace Splitter (Editor vs Live Output)
  if (splitter && container && editorPane) {
    let isDraggingH = false;

    const onMouseDownH = (e) => {
      if (container.classList.contains("layout-code-only") || container.classList.contains("layout-preview-only")) {
        return;
      }
      e.preventDefault();
      isDraggingH = true;
      splitter.classList.add("dragging");
      document.body.classList.add("is-resizing-h");
    };

    const onMouseMoveH = (e) => {
      if (!isDraggingH) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0) return;

      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(15, Math.min(85, pct));
      editorPane.style.width = pct + "%";

      if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
        codeMirrorEditor.refresh();
      }
      const frame = document.getElementById("previewFrame");
      if (frame && frame.contentWindow) {
        try {
          frame.contentWindow.dispatchEvent(new Event("resize"));
        } catch(e){}
      }
    };

    const onMouseUpH = () => {
      if (isDraggingH) {
        isDraggingH = false;
        splitter.classList.remove("dragging");
        document.body.classList.remove("is-resizing-h");
        const pct = parseFloat(editorPane.style.width) || 50;
        localStorage.setItem("wc_editor_split_pct", pct);
        if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
          codeMirrorEditor.refresh();
        }
        const frame = document.getElementById("previewFrame");
        if (frame && frame.contentWindow) {
          try {
            frame.contentWindow.dispatchEvent(new Event("resize"));
          } catch(e){}
        }
      }
    };

    splitter.addEventListener("mousedown", onMouseDownH);
    splitter.addEventListener("touchstart", onMouseDownH, { passive: false });

    splitter.addEventListener("dblclick", () => {
      editorPane.style.width = "50%";
      localStorage.setItem("wc_editor_split_pct", 50);
      if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") {
        codeMirrorEditor.refresh();
      }
      const frame = document.getElementById("previewFrame");
      if (frame && frame.contentWindow) {
        try {
          frame.contentWindow.dispatchEvent(new Event("resize"));
        } catch(e){}
      }
      showToast("Split layout reset to 50 / 50", "info");
    });

    window.addEventListener("mousemove", onMouseMoveH);
    window.addEventListener("touchmove", onMouseMoveH, { passive: false });
    window.addEventListener("mouseup", onMouseUpH);
    window.addEventListener("touchend", onMouseUpH);
  }

  // Bottom Panel Resizer (Terminal / SQL Height)
  if (bottomResizer && bottomPanel) {
    let isDraggingV = false;

    const onMouseDownV = (e) => {
      e.preventDefault();
      isDraggingV = true;
      bottomResizer.classList.add("dragging");
      document.body.classList.add("is-resizing-v");
    };

    const onMouseMoveV = (e) => {
      if (!isDraggingV) return;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const newH = window.innerHeight - clientY;
      const minH = 34;
      const maxH = window.innerHeight - 120;
      const clamped = Math.max(minH, Math.min(maxH, newH));

      bottomPanel.style.height = clamped + "px";
      if (clamped <= 36) {
        bottomPanel.classList.add("collapsed");
      } else {
        bottomPanel.classList.remove("collapsed");
      }
    };

    const onMouseUpV = () => {
      if (isDraggingV) {
        isDraggingV = false;
        bottomResizer.classList.remove("dragging");
        document.body.classList.remove("is-resizing-v");
        const curHeight = parseInt(bottomPanel.style.height, 10) || 190;
        if (curHeight > 36) {
          localStorage.setItem("wc_bottom_height", curHeight);
          bottomPanel.classList.remove("collapsed");
        } else {
          bottomPanel.classList.add("collapsed");
          bottomPanel.style.height = "32px";
        }
      }
    };

    bottomResizer.addEventListener("mousedown", onMouseDownV);
    bottomResizer.addEventListener("touchstart", onMouseDownV, { passive: false });

    bottomResizer.addEventListener("dblclick", () => {
      toggleBottomPanel();
    });
    window.addEventListener("mousemove", onMouseMoveV);
    window.addEventListener("touchmove", onMouseMoveV, { passive: false });
    window.addEventListener("mouseup", onMouseUpV);
    window.addEventListener("touchend", onMouseUpV);
  }
}

// Attach top-level interactive handlers to window
window.switchSidebarView = switchSidebarView;
window.initDynamicSidebarHover = initDynamicSidebarHover;
window.togglePinSidebar = togglePinSidebar;
window.handleExplorerSearch = handleExplorerSearch;
window.clearExplorerSearch = clearExplorerSearch;
window.handlePackageSearch = handlePackageSearch;
window.clearPackageSearch = clearPackageSearch;
window.setPackageCategoryFilter = setPackageCategoryFilter;
window.addCustomCdnPackage = addCustomCdnPackage;
window.removeCustomCdnPackage = removeCustomCdnPackage;
window.toggleCdnPkg = toggleCdnPkg;
window.toggleLiveReload = toggleLiveReload;
window.popoutPreviewWindow = popoutPreviewWindow;
window.promptCreateNewFile = promptCreateNewFile;
window.openNewFileModal = openNewFileModal;
window.quickFillNewFileName = quickFillNewFileName;
window.submitCreateNewFileModal = submitCreateNewFileModal;
window.switchToFile = switchToFile;
window.closeTab = closeTab;
window.deleteFile = deleteFile;
window.startRenameFile = startRenameFile;
window.renameFilePrompt = renameFilePrompt;
window.submitRenameModal = submitRenameModal;
window.runActiveFile = runActiveFile;
window.saveProjectSnapshot = saveProjectSnapshot;
window.restoreSnapshotV2 = restoreSnapshotV2;
window.deleteSnapshotV2 = deleteSnapshotV2;
window.clearAllSnapshotsV2 = clearAllSnapshotsV2;
window.openTemplatesModal = openTemplatesModal;
window.exportProjectZip = exportProjectZip;
window.clearTerminal = clearTerminal;
window.toggleBottomPanel = toggleBottomPanel;
window.switchBottomTab = switchBottomTab;

// --- 18. Application Bootloader ---
window.addEventListener("DOMContentLoaded", () => {
  let hasDraft = false;
  try { hasDraft = restoreLocalDraft(); } catch(e){ console.warn("Draft restore:", e); }
  try { initCodeMirror(); } catch(e){ console.warn("Editor init:", e); }
  try { renderFileExplorer(); } catch(e){ console.warn("Explorer render:", e); }
  try { initWorkspaceResizers(); } catch(e){ console.warn("Resizers init:", e); }
  try { initResizeObservers(); } catch(e){ console.warn("Observers init:", e); }
  try { initDynamicSidebarHover(); } catch(e){ console.warn("Hover init:", e); }
  try { syncLiveToggleBtn(); } catch(e){}
  try { updatePackageBadges(); } catch(e){}

  // Modal input keyboard handlers
  const newFileInput = document.getElementById("newFileInput");
  if (newFileInput) {
    newFileInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitCreateNewFileModal();
      }
    });
  }

  const renameInput = document.getElementById("renameInput");
  if (renameInput) {
    renameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitRenameModal();
      }
    });
  }

  // Restore Theme, Language & Editor Settings
  try {
    const savedTheme = localStorage.getItem("wc_theme") || "midnight";
    setIdeTheme(savedTheme);
    setIdeLanguage(currentLang);
    applySavedEditorSettings();
  } catch(e){}

  try { checkWorkspaceUrlHash(); } catch(e){}

  // Only auto-load and run if there was an explicitly saved project with files
  if (hasDraft && activeFileName && getFile(activeFileName)) {
    try {
      switchToFile(activeFileName);
      runActiveFile();
    } catch(e){}
  } else {
    // Show clean interactive welcome screen for user to choose what they want to create
    showEditorWelcome();
  }
});
