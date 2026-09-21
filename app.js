/**
 * WebCode Universal IDE - Master Application Engine
 * Multi-Language Runtimes (Web, Python 3 Pyodide, SQL AlaSQL, Markdown)
 * Multi-File Project Explorer, CodeMirror syntax highlighting, Terminal & DevTools
 */

// --- 1. Comprehensive Internationalization (10 Languages) ---
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
  },
  es: {
    run: "Ejecutar",
    save: "Guardar",
    newFile: "Nuevo Archivo",
    explorer: "Explorador",
    search: "Buscar",
    runtimes: "Entornos",
    packages: "Paquetes",
    tools: "Herramientas",
    history: "Historial",
    settings: "Ajustes",
    templates: "Plantillas",
    exportZip: "Exportar ZIP",
    share: "Compartir",
    console: "Consola",
    terminal: "Terminal",
    sqlViewer: "Resultados SQL",
    problems: "Problemas",
    commandPalette: "Paleta de Comandos",
    evalPrompt: "Ejecutar comando o JS...",
    filesTitle: "ARCHIVOS DEL PROYECTO",
    clearLogs: "Limpiar",
    livePreview: "Salida en Vivo",
    formatCode: "Formatear",
    copied: "¡Enlace copiado al portapapeles!",
    savedSuccess: "¡Proyecto guardado con éxito!",
    pyReady: "¡Python 3 (WebAssembly) está listo!",
    pyRunning: "Ejecutando script Python...",
    sqlRunning: "Ejecutando consultas SQL...",
    noFilesFound: "No se encontraron archivos",
    shortcuts: "Atajos: Ctrl+S (Guardar), Ctrl+Enter (Ejecutar), Ctrl+Shift+P (Comandos)",
  },
  fr: {
    run: "Exécuter",
    save: "Enregistrer",
    newFile: "Nouveau fichier",
    explorer: "Explorateur",
    search: "Recherche",
    runtimes: "Exécutions",
    packages: "Paquets",
    tools: "Outils",
    history: "Historique",
    settings: "Paramètres",
    templates: "Modèles",
    exportZip: "Exporter ZIP",
    share: "Partager",
    console: "Console",
    terminal: "Terminal",
    sqlViewer: "Résultats SQL",
    problems: "Problèmes",
    commandPalette: "Palette de Commandes",
    evalPrompt: "Exécuter commande ou JS...",
    filesTitle: "FICHIERS DU PROJET",
    clearLogs: "Effacer",
    livePreview: "Aperçu en Direct",
    formatCode: "Formater",
    copied: "Lien copié dans le presse-papier !",
    savedSuccess: "Projet sauvegardé avec succès !",
    pyReady: "Python 3 (WebAssembly) est prêt !",
    pyRunning: "Exécution du script Python...",
    sqlRunning: "Exécution des requêtes SQL...",
    noFilesFound: "Aucun fichier trouvé",
    shortcuts: "Raccourcis : Ctrl+S (Enregistrer), Ctrl+Enter (Exécuter)",
  },
  de: {
    run: "Ausführen",
    save: "Speichern",
    newFile: "Neue Datei",
    explorer: "Explorer",
    search: "Suchen",
    runtimes: "Runtimes",
    packages: "Pakete",
    tools: "Werkzeuge",
    history: "Historie",
    settings: "Einstellungen",
    templates: "Vorlagen",
    exportZip: "ZIP exportieren",
    share: "Teilen",
    console: "Konsole",
    terminal: "Terminal",
    sqlViewer: "SQL-Ergebnisse",
    problems: "Probleme",
    commandPalette: "Befehlspalette",
    evalPrompt: "Befehl oder JS ausführen...",
    filesTitle: "PROJEKTDATEIEN",
    clearLogs: "Löschen",
    livePreview: "Live-Ausgabe",
    formatCode: "Formatieren",
    copied: "Link in Zwischenablage kopiert!",
    savedSuccess: "Projekt erfolgreich gespeichert!",
    pyReady: "Python 3 (WebAssembly) bereit!",
    pyRunning: "Python-Skript wird ausgeführt...",
    sqlRunning: "SQL-Abfragen werden ausgeführt...",
    noFilesFound: "Keine Dateien gefunden",
    shortcuts: "Tastenkombinationen: Strg+S (Speichern), Strg+Enter (Ausführen)",
  },
  zh: {
    run: "运行",
    save: "保存",
    newFile: "新建文件",
    explorer: "资源管理器",
    search: "搜索",
    runtimes: "运行环境",
    packages: "包管理器",
    tools: "开发者工具",
    history: "历史快照",
    settings: "设置",
    templates: "项目模版",
    exportZip: "导出 ZIP",
    share: "分享链接",
    console: "控制台",
    terminal: "终端",
    sqlViewer: "SQL 查询结果",
    problems: "问题排查",
    commandPalette: "命令面板",
    evalPrompt: "执行命令或 JS 代码...",
    filesTitle: "项目文件列表",
    clearLogs: "清空",
    livePreview: "实时预览",
    formatCode: "格式化",
    copied: "链接已复制到剪贴板！",
    savedSuccess: "项目保存成功！",
    pyReady: "Python 3 (Pyodide WebAssembly) 就绪！",
    pyRunning: "正在执行 Python 脚本...",
    sqlRunning: "正在执行 SQL 查询...",
    noFilesFound: "未找到文件",
    shortcuts: "快捷键：Ctrl+S (保存), Ctrl+Enter (运行), Ctrl+Shift+P (命令面板)",
  },
  ja: {
    run: "実行",
    save: "保存",
    newFile: "新規ファイル",
    explorer: "エクスプローラー",
    search: "検索",
    runtimes: "ランタイム",
    packages: "パッケージ",
    tools: "ツール",
    history: "履歴",
    settings: "設定",
    templates: "テンプレート",
    exportZip: "ZIP出力",
    share: "共有リンク",
    console: "コンソール",
    terminal: "ターミナル",
    sqlViewer: "SQL結果",
    problems: "問題",
    commandPalette: "コマンドパレット",
    evalPrompt: "コマンドまたはJSを実行...",
    filesTitle: "プロジェクトファイル",
    clearLogs: "クリア",
    livePreview: "ライブ出力",
    formatCode: "整形",
    copied: "リンクをコピーしました！",
    savedSuccess: "プロジェクトを保存しました！",
    pyReady: "Python 3 (WebAssembly) の準備完了！",
    pyRunning: "Python スクリプトを実行中...",
    sqlRunning: "SQL クエリを実行中...",
    noFilesFound: "ファイルが見つかりません",
    shortcuts: "ショートカット: Ctrl+S (保存), Ctrl+Enter (実行)",
  },
  hi: {
    run: "चलाएं",
    save: "सहेजें",
    newFile: "नई फ़ाइल",
    explorer: "एक्सप्लोरर",
    search: "खोजें",
    runtimes: "रनटाइम",
    packages: "पैकेजेस",
    tools: "उपकरण",
    history: "इतिहास",
    settings: "सेटिंग्स",
    templates: "टेम्प्लेट",
    exportZip: "ZIP निर्यात",
    share: "शेयर लिंक",
    console: "कंसोल",
    terminal: "टर्मिनल",
    sqlViewer: "SQL परिणाम",
    problems: "समस्याएं",
    commandPalette: "कमांड पैलेट",
    evalPrompt: "कमांड या JS निष्पादित करें...",
    filesTitle: "प्रोजेक्ट फ़ाइलें",
    clearLogs: "साफ़ करें",
    livePreview: "लाइव आउटपुट",
    formatCode: "फॉर्मेट",
    copied: "लिंक क्लिपबोर्ड पर कॉपी किया गया!",
    savedSuccess: "परियोजना सफलतापूर्वक सहेजी गई!",
    pyReady: "Python 3 (WebAssembly) तैयार है!",
    pyRunning: "Python स्क्रिप्ट चल रही है...",
    sqlRunning: "SQL निष्पादित हो रहा है...",
    noFilesFound: "कोई फ़ाइल नहीं मिली",
    shortcuts: "शॉर्टकट: Ctrl+S (सहेजें), Ctrl+Enter (चलाएं)",
  },
  pt: {
    run: "Executar",
    save: "Salvar",
    newFile: "Novo Arquivo",
    explorer: "Explorador",
    search: "Pesquisar",
    runtimes: "Ambientes",
    packages: "Pacotes",
    tools: "Ferramentas",
    history: "Histórico",
    settings: "Configurações",
    templates: "Modelos",
    exportZip: "Exportar ZIP",
    share: "Compartilhar",
    console: "Console",
    terminal: "Terminal",
    sqlViewer: "Resultados SQL",
    problems: "Problemas",
    commandPalette: "Paleta de Comandos",
    evalPrompt: "Executar comando ou JS...",
    filesTitle: "ARQUIVOS DO PROJETO",
    clearLogs: "Limpar",
    livePreview: "Saída ao Vivo",
    formatCode: "Formatar",
    copied: "Link copiado para a área de transferência!",
    savedSuccess: "Projeto salvo com sucesso!",
    pyReady: "Python 3 (WebAssembly) está pronto!",
    pyRunning: "Executando script Python...",
    sqlRunning: "Executando consultas SQL...",
    noFilesFound: "Nenhum arquivo encontrado",
    shortcuts: "Atalhos: Ctrl+S (Salvar), Ctrl+Enter (Executar)",
  },
  ru: {
    run: "Запуск",
    save: "Сохранить",
    newFile: "Новый файл",
    explorer: "Проводник",
    search: "Поиск",
    runtimes: "Среды",
    packages: "Пакеты",
    tools: "Инструменты",
    history: "История",
    settings: "Настройки",
    templates: "Шаблоны",
    exportZip: "Экспорт ZIP",
    share: "Поделиться",
    console: "Консоль",
    terminal: "Терминал",
    sqlViewer: "Результаты SQL",
    problems: "Ошибки",
    commandPalette: "Палитра команд",
    evalPrompt: "Выполнить команду или JS...",
    filesTitle: "ФАЙЛЫ ПРОЕКТА",
    clearLogs: "Очистить",
    livePreview: "Превью",
    formatCode: "Форматировать",
    copied: "Ссылка скопирована в буфер!",
    savedSuccess: "Проект успешно сохранен!",
    pyReady: "Python 3 (WebAssembly) готов к работе!",
    pyRunning: "Выполнение Python скрипта...",
    sqlRunning: "Выполнение SQL запросов...",
    noFilesFound: "Файлы не найдены",
    shortcuts: "Горячие клавиши: Ctrl+S (Сохранить), Ctrl+Enter (Запуск)",
  },
  ar: {
    run: "تشغيل",
    save: "حفظ",
    newFile: "ملف جديد",
    explorer: "المستكشف",
    search: "بحث",
    runtimes: "بيئات التشغيل",
    packages: "الحزم",
    tools: "الأدوات",
    history: "السجل",
    settings: "الإعدادات",
    templates: "القوالب",
    exportZip: "تصدير ZIP",
    share: "مشاركة",
    console: "وحدة التحكم",
    terminal: "الطرفية",
    sqlViewer: "نتائج SQL",
    problems: "المشاكل",
    commandPalette: "لوحة الأوامر",
    evalPrompt: "تنفيذ أمر أو كود JS...",
    filesTitle: "ملفات المشروع",
    clearLogs: "مسح",
    livePreview: "المعاينة المباشرة",
    formatCode: "تنسيق",
    copied: "تم نسخ الرابط إلى الحافظة!",
    savedSuccess: "تم حفظ المشروع بنجاح!",
    pyReady: "بايثون 3 (WebAssembly) جاهز!",
    pyRunning: "جاري تشغيل سكربت بايثون...",
    sqlRunning: "جاري تنفيذ استعلامات SQL...",
    noFilesFound: "لم يتم العثور على ملفات",
    shortcuts: "اختصارات: Ctrl+S (حفظ), Ctrl+Enter (تشغيل)",
  }
};

let currentLang = localStorage.getItem("wc_lang") || "en";

// --- 2. Multi-File Virtual Workspace State ---
let workspaceFiles = [
  {
    name: "index.html",
    language: "html",
    content: `<div class="card">
  <div class="badge">🚀 WebCode Universal IDE</div>
  <h1>Multi-Language Development Playground</h1>
  <p>Seamlessly build Web applications, execute Python 3 scripts in WebAssembly, query SQL databases, and write Markdown.</p>
  <div class="actions">
    <button id="btnClick" class="btn">✨ Test Interactivity</button>
    <button id="btnConfetti" class="btn btn-primary">🎉 Celebrate</button>
  </div>
  <div id="outputBox" class="output">Click Count: 0</div>
</div>`
  },
  {
    name: "style.css",
    language: "css",
    content: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
body { min-height: 100vh; display: grid; place-items: center; background: #0b0f19; color: #f8fafc; padding: 20px; }
.card { background: #161e2e; border: 1px solid #232d3f; border-radius: 16px; padding: 32px; max-width: 480px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.badge { display: inline-block; background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 16px; }
h1 { font-size: 24px; font-weight: 800; margin-bottom: 12px; }
p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
.actions { display: flex; gap: 12px; justify-content: center; }
.btn { background: #232d3f; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn:hover { background: #334155; transform: translateY(-2px); }
.btn-primary { background: #3b82f6; }
.btn-primary:hover { background: #2563eb; }
.output { margin-top: 20px; padding: 10px; background: #0a0d14; border-radius: 8px; font-family: monospace; color: #38bdf8; }`
  },
  {
    name: "script.js",
    language: "javascript",
    content: `let count = 0;
const output = document.getElementById('outputBox');
const btnClick = document.getElementById('btnClick');
const btnConfetti = document.getElementById('btnConfetti');

btnClick.addEventListener('click', () => {
  count++;
  output.textContent = 'Click Count: ' + count;
  console.log('Button clicked! Total:', count);
});

btnConfetti.addEventListener('click', () => {
  console.info('Triggering celebration particles!');
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  } else {
    alert('🎉 Woohoo! Add Canvas Confetti from Packages catalog for particle effects.');
  }
});

console.log("WebCode Studio initialized ready for development.");`
  },
  {
    name: "main.py",
    language: "python",
    content: `# WebCode Universal IDE - Python 3 Runtime (WebAssembly)
import math
import sys
import time

print(f"🐍 Python Engine running in browser: {sys.version}")

def fibonacci(n):
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print("\\n--- Fibonacci Sequence Benchmark ---")
fib_series = fibonacci(15)
print(f"First 15 Fibonacci numbers: {fib_series}")

print("\\n--- Mathematical Calculations ---")
print(f"Pi approximation: {math.pi}")
print(f"Factorial of 10: {math.factorial(10):,}")
print(f"Square root of 256: {math.sqrt(256)}")
print("\\nExecution completed successfully!")`
  },
  {
    name: "database.sql",
    language: "sql",
    content: `-- WebCode In-Browser SQL Database Engine
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
  },
  {
    name: "README.md",
    language: "markdown",
    content: `# ⚡ WebCode - Universal In-Browser IDE & Playground

WebCode is a comprehensive, client-side in-browser Integrated Development Environment (IDE) with multi-language execution runtimes, a multi-file project workspace, CodeMirror editor, live sandboxed preview, interactive terminal, command palette, and package manager.

## 🌟 Supported Language Runtimes & Engines
- **🌐 Web Engine**: HTML5, Modern CSS3, ESNext JavaScript, JSX, React 18, and Vue 3.
- **🐍 Python 3 WebAssembly**: Pyodide Wasm runtime with math, random, sys, and standard libraries.
- **🗄️ SQL Database Engine**: In-memory relational queries (AlaSQL), joins, aggregations, and JSON export.
- **📝 Markdown Renderer**: GitHub-flavored markdown with live preview, tables, and code syntax styling.

## ✨ Core Features
- **📁 Multi-File Workspace**: Add, edit, rename, and delete project files across multiple languages.
- **🎨 Activity Bar Navigation**: File Explorer, Search in files, Packages & CDNs, Toolbox, Snapshots, Settings.
- **📦 1-Click Package Manager**: Tailwind CSS, Bootstrap 5.3, Font Awesome 6, Lucide, Canvas Confetti, Three.js, Chart.js, React 18, Vue 3, Babel.
- **🛠️ Built-in Developer Tools**: Color Picker, JSON Formatter & Validator, Base64 Encoder/Decoder.
- **💻 Interactive Terminal & REPL**: Live iframe console streaming, interactive JavaScript & Python evaluator.
- **⌨️ Command Palette**: Press \`Ctrl+Shift+P\` or \`Cmd+Shift+P\` for instant fuzzy command launching.
- **🌍 10-Language i18n & RTL**: English, Spanish, French, German, Chinese, Japanese, Hindi, Portuguese, Russian, and Arabic.
- **🎨 Themes**: Midnight, Light Slate, Dracula, and Monokai.
- **📦 Export & Share**: 1-click full ZIP archive download and shareable project URLs.

## ⚡ Keyboard Shortcuts
- \`Ctrl + Enter\` / \`Cmd + Enter\`: Run active file / project
- \`Ctrl + S\` / \`Cmd + S\`: Save Snapshot
- \`Ctrl + Shift + P\` / \`Cmd + Shift + P\`: Command Palette
- \`Alt + N\`: Create New File`
  }
];

let activeFileName = "index.html";
let openTabs = ["index.html", "style.css", "script.js", "main.py"];
let activeLibraries = JSON.parse(localStorage.getItem("wc_libs") || '["confetti"]');
let codeMirrorEditor = null;
let pyodideInstance = null;
let isPyodideLoading = false;

// --- 3. CDN Packages Catalog ---
const cdnPackages = [
  { id: "tailwind", name: "Tailwind CSS", desc: "Utility-first CSS framework", url: "https://cdn.tailwindcss.com", type: "js" },
  { id: "bootstrap", name: "Bootstrap 5.3", desc: "CSS framework with responsive grid", url: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", type: "css" },
  { id: "fontawesome", name: "Font Awesome 6", desc: "Icon library and styling toolkit", url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", type: "css" },
  { id: "lucide", name: "Lucide Icons", desc: "Clean & modern SVG icon collection", url: "https://unpkg.com/lucide@latest", type: "js" },
  { id: "confetti", name: "Canvas Confetti", desc: "Particle confetti physics engine", url: "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js", type: "js" },
  { id: "threejs", name: "Three.js", desc: "3D WebGL computer graphics library", url: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", type: "js" },
  { id: "chartjs", name: "Chart.js", desc: "HTML5 Canvas charting and visualization", url: "https://cdn.jsdelivr.net/npm/chart.js", type: "js" },
  { id: "react", name: "React 18 & ReactDOM", desc: "Declarative component engine", url: "https://unpkg.com/react@18/umd/react.production.min.js", extra: "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js", type: "js" },
  { id: "vue", name: "Vue 3", desc: "Progressive reactive framework", url: "https://unpkg.com/vue@3/dist/vue.global.js", type: "js" },
  { id: "babel", name: "Babel Standalone", desc: "In-browser JSX & TypeScript transpiler", url: "https://unpkg.com/@babel/standalone/babel.min.js", type: "js" }
];

// --- 4. Templates Catalog ---
const ideTemplates = [
  {
    id: "web-starter",
    title: "⚡ Modern Web Starter",
    category: "Web",
    files: [
      { name: "index.html", language: "html", content: `<div class="card"><h1>⚡ Modern Web App</h1><p>Interactive playground ready!</p><button onclick="alert('Hello from WebCode!')">Click Me</button></div>` },
      { name: "style.css", language: "css", content: `body { background: #0f172a; color: white; display: grid; place-items: center; min-height: 100vh; font-family: sans-serif; }\n.card { background: #1e293b; padding: 2rem; border-radius: 12px; text-align: center; }\nbutton { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-top: 12px; }` },
      { name: "script.js", language: "javascript", content: `console.log("Modern web app loaded!");` }
    ]
  },
  {
    id: "python-math",
    title: "🐍 Python Data & Math Algorithms",
    category: "Python 3",
    files: [
      { name: "main.py", language: "python", content: `# Python 3 Mathematical Benchmark\nimport math\nimport random\n\ndef monte_carlo_pi(samples=50000):\n    inside = 0\n    for _ in range(samples):\n        x, y = random.random(), random.random()\n        if x*x + y*y <= 1.0:\n            inside += 1\n    return (4 * inside) / samples\n\nprint("Estimating Pi via Monte Carlo Simulation (50,000 samples)...")\npi_est = monte_carlo_pi()\nprint(f"Estimated Pi: {pi_est:.5f}")\nprint(f"True Math Pi: {math.pi:.5f}")\nprint(f"Absolute Error: {abs(pi_est - math.pi):.5f}")` }
    ]
  },
  {
    id: "sql-ecommerce",
    title: "🗄️ SQL Analytics & E-Commerce",
    category: "SQL",
    files: [
      { name: "query.sql", language: "sql", content: `CREATE TABLE products (id INT, title STRING, category STRING, price FLOAT);\nINSERT INTO products VALUES (1, 'Mechanical Keyboard', 'Electronics', 119.99);\nINSERT INTO products VALUES (2, 'Wireless Mouse', 'Electronics', 49.99);\nINSERT INTO products VALUES (3, 'Ergonomic Chair', 'Furniture', 299.50);\nINSERT INTO products VALUES (4, 'Standing Desk', 'Furniture', 450.00);\nINSERT INTO products VALUES (5, 'USB-C Dock', 'Electronics', 79.99);\n\n-- Analytical Category Summary\nSELECT \n  category AS Category, \n  COUNT(*) AS Total_Products, \n  ROUND(AVG(price), 2) AS Average_Price, \n  ROUND(SUM(price), 2) AS Inventory_Value \nFROM products \nGROUP BY category \nORDER BY Inventory_Value DESC;` }
    ]
  },
  {
    id: "react-app",
    title: "⚛️ React 18 JSX Counter App",
    category: "React",
    libs: ["react", "babel"],
    files: [
      { name: "index.html", language: "html", content: `<div id="root"></div>` },
      { name: "style.css", language: "css", content: `body { background: #0f172a; color: white; display: grid; place-items: center; min-height: 100vh; font-family: system-ui; }\n.react-box { background: #1e293b; padding: 30px; border-radius: 16px; text-align: center; border: 1px solid #334155; }\nbutton { background: #61dafb; color: #000; font-weight: bold; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin: 0 4px; }` },
      { name: "App.jsx", language: "javascript", content: `const { useState } = React;

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="react-box">
      <h2>⚛️ React 18 in WebCode</h2>
      <p style={{margin: '12px 0', color: '#94a3b8'}}>Live transpiled JSX in WebAssembly playground</p>
      <h1 style={{fontSize: '48px', color: '#61dafb'}}>{count}</h1>
      <div style={{marginTop: '16px'}}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);` }
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

function updateBreadcrumbStats() {
  if (!codeMirrorEditor) return;
  const cursor = codeMirrorEditor.getCursor();
  const totalLines = codeMirrorEditor.lineCount();
  const file = getFile(activeFileName);
  const lang = file ? file.language.toUpperCase() : "TXT";

  const statEl = document.getElementById("editorStats");
  if (statEl) {
    statEl.textContent = `${lang} | Ln ${cursor.line + 1}, Col ${cursor.ch + 1} | ${totalLines} lines`;
  }
  const activeTabEl = document.getElementById("activeFileBreadcrumb");
  if (activeTabEl) {
    activeTabEl.textContent = activeFileName;
  }
}

// --- 6. File Explorer & Tab Navigation ---
function renderFileExplorer() {
  const container = document.getElementById("fileTreeList");
  if (!container) return;
  container.innerHTML = "";

  workspaceFiles.forEach(file => {
    const item = document.createElement("div");
    item.className = `file-item ${file.name === activeFileName ? 'active' : ''}`;
    
    let icon = "📄";
    if (file.name.endsWith(".html")) icon = "🌐";
    else if (file.name.endsWith(".css")) icon = "🎨";
    else if (file.name.endsWith(".js") || file.name.endsWith(".jsx")) icon = "📜";
    else if (file.name.endsWith(".py")) icon = "🐍";
    else if (file.name.endsWith(".sql")) icon = "🗄️";
    else if (file.name.endsWith(".md")) icon = "📝";
    else if (file.name.endsWith(".json")) icon = "⚙️";

    item.innerHTML = `
      <div class="file-item-left" onclick="switchToFile('${file.name}')">
        <span>${icon}</span>
        <span>${file.name}</span>
      </div>
      <button class="file-item-delete tree-action-btn" onclick="deleteFile('${file.name}', event)" title="Delete File">✕</button>
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
    tab.innerHTML = `
      <span onclick="switchToFile('${fileName}')">${fileName}</span>
      <span class="tab-close-btn" onclick="closeTab('${fileName}', event)">✕</span>
    `;
    tabsBar.appendChild(tab);
  });
}

function switchToFile(fileName) {
  const file = getFile(fileName);
  if (!file) return;

  if (!openTabs.includes(fileName)) {
    openTabs.push(fileName);
  }

  activeFileName = fileName;
  if (codeMirrorEditor) {
    codeMirrorEditor.setValue(file.content);
    codeMirrorEditor.setOption("mode", getModeForLanguage(file.language));
    codeMirrorEditor.clearHistory();
  }

  // Update IDE runtime badge
  const badge = document.getElementById("runtimeBadge");
  if (badge) {
    if (file.language === "python") badge.textContent = "Python 3 Wasm";
    else if (file.language === "sql") badge.textContent = "SQL Engine";
    else if (file.language === "markdown") badge.textContent = "Markdown Preview";
    else badge.textContent = "Web Engine";
  }

  renderFileExplorer();
  updateBreadcrumbStats();
}

function closeTab(fileName, event) {
  if (event) event.stopPropagation();
  openTabs = openTabs.filter(name => name !== fileName);
  if (activeFileName === fileName) {
    activeFileName = openTabs[0] || (workspaceFiles[0] ? workspaceFiles[0].name : "");
    if (activeFileName) switchToFile(activeFileName);
  }
  renderFileExplorer();
}

function promptCreateNewFile() {
  const name = prompt("Enter file name (e.g. app.jsx, server.py, test.sql, notes.md):");
  if (!name) return;
  
  if (workspaceFiles.some(f => f.name === name)) {
    showToast("File already exists!", "error");
    return;
  }

  let lang = "javascript";
  if (name.endsWith(".html")) lang = "html";
  else if (name.endsWith(".css")) lang = "css";
  else if (name.endsWith(".py")) lang = "python";
  else if (name.endsWith(".sql")) lang = "sql";
  else if (name.endsWith(".md")) lang = "markdown";
  else if (name.endsWith(".json")) lang = "json";

  workspaceFiles.push({
    name: name,
    language: lang,
    content: ""
  });

  switchToFile(name);
  showToast(`Created ${name}`, "success");
}

function deleteFile(fileName, event) {
  if (event) event.stopPropagation();
  if (workspaceFiles.length <= 1) {
    showToast("Cannot delete the only remaining file!", "error");
    return;
  }
  if (!confirm(`Are you sure you want to delete ${fileName}?`)) return;

  workspaceFiles = workspaceFiles.filter(f => f.name !== fileName);
  openTabs = openTabs.filter(name => name !== fileName);
  if (activeFileName === fileName) {
    activeFileName = workspaceFiles[0].name;
    switchToFile(activeFileName);
  }
  renderFileExplorer();
  showToast(`Deleted ${fileName}`, "info");
}

// --- 7. Execution Engine (Universal Runtimes) ---
async function runActiveFile() {
  const activeFile = getFile(activeFileName);
  if (!activeFile) return;

  if (activeFile.language === "python") {
    await runPythonScript(activeFile.content);
  } else if (activeFile.language === "sql") {
    runSqlQuery(activeFile.content);
  } else if (activeFile.language === "markdown") {
    renderMarkdownDoc(activeFile.content);
  } else {
    runWebProject();
  }
}

// --- 7.1 Web Engine (HTML/CSS/JS/JSX) ---
function runWebProject() {
  const htmlFile = getFile("index.html") || workspaceFiles.find(f => f.language === "html") || { content: "" };
  const cssFile = getFile("style.css") || workspaceFiles.find(f => f.language === "css") || { content: "" };
  const jsFiles = workspaceFiles.filter(f => f.language === "javascript" || f.language === "jsx" || f.language === "js");

  let scriptsBundle = "";
  jsFiles.forEach(f => {
    scriptsBundle += `\n// --- ${f.name} ---\n` + f.content;
  });

  // Collect CDN script/style links
  let cdnHeaders = "";
  activeLibraries.forEach(libId => {
    const lib = cdnPackages.find(p => p.id === libId);
    if (lib) {
      if (lib.type === "css") {
        cdnHeaders += `<link rel="stylesheet" href="${lib.url}">\n`;
      } else if (lib.type === "js") {
        cdnHeaders += `<script src="${lib.url}"><\/script>\n`;
        if (lib.extra) {
          cdnHeaders += `<script src="${lib.extra}"><\/script>\n`;
        }
      }
    }
  });

  const consoleBridge = `
<script>
(function(){
  const original = { log: console.log, warn: console.warn, error: console.error, info: console.info };
  function post(type, args){
    try {
      const msg = Array.from(args).map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
      window.parent.postMessage({ source: 'webcode-preview', type, message: msg, time: new Date().toLocaleTimeString() }, '*');
    } catch(e){}
  }
  console.log = function(){ original.log.apply(console, arguments); post('log', arguments); };
  console.warn = function(){ original.warn.apply(console, arguments); post('warn', arguments); };
  console.error = function(){ original.error.apply(console, arguments); post('error', arguments); };
  console.info = function(){ original.info.apply(console, arguments); post('info', arguments); };
  window.onerror = function(msg, url, line){ post('error', ['[Line ' + line + '] ' + msg]); return false; };
})();
<\/script>`;

  const previewFrame = document.getElementById("previewFrame");
  const markdownContainer = document.getElementById("markdownContainer");
  const sqlContainer = document.getElementById("sqlContainer");

  previewFrame.style.display = "block";
  markdownContainer.style.display = "none";
  sqlContainer.style.display = "none";

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${cdnHeaders}
  <style>${cssFile.content}</style>
  ${consoleBridge}
</head>
<body>
  ${htmlFile.content}
  <script type="text/babel">
    try {
      ${scriptsBundle}
    } catch(err) {
      console.error(err.message || err);
    }
  <\/script>
</body>
</html>`;

  previewFrame.srcdoc = fullHtml;
  appendTerminalLog("term-success", "Web Application refreshed & compiled.");
}

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

// --- 7.3 SQL Engine (AlaSQL / SQLite In-Browser) ---
async function runSqlQuery(sqlCode) {
  switchBottomTab("sqlViewer");
  const sqlContainer = document.getElementById("sqlContainer");
  const previewFrame = document.getElementById("previewFrame");
  const markdownContainer = document.getElementById("markdownContainer");

  previewFrame.style.display = "none";
  markdownContainer.style.display = "none";
  sqlContainer.style.display = "block";

  appendTerminalLog("term-info", "🗄️ Executing SQL statements...");

  try {
    if (typeof alasql === "undefined") {
      await loadScript("https://cdn.jsdelivr.net/npm/alasql@4/dist/alasql.min.js");
    }

    // Execute queries
    const statements = sqlCode.split(";").map(s => s.trim()).filter(s => s.length > 0);
    let finalResult = null;

    for (const stmt of statements) {
      finalResult = alasql(stmt);
    }

    // Render results in interactive table
    if (Array.isArray(finalResult) && finalResult.length > 0) {
      const keys = Object.keys(finalResult[0]);
      let tableHtml = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <strong style="color:var(--accent);">Query Returned ${finalResult.length} Rows</strong>
        <button class="btn btn-sm btn-primary" onclick="exportSqlResults()">Export JSON</button>
      </div>
      <table class="sql-table"><thead><tr>`;
      keys.forEach(k => { tableHtml += `<th>${k}</th>`; });
      tableHtml += `</tr></thead><tbody>`;

      finalResult.forEach(row => {
        tableHtml += `<tr>`;
        keys.forEach(k => {
          tableHtml += `<td>${row[k] !== undefined ? row[k] : ''}</td>`;
        });
        tableHtml += `</tr>`;
      });
      tableHtml += `</tbody></table>`;
      sqlContainer.innerHTML = tableHtml;
      window._lastSqlResult = finalResult;
      appendTerminalLog("term-success", `✓ SQL Query returned ${finalResult.length} rows.`);
    } else {
      sqlContainer.innerHTML = `<div style="padding:20px;color:var(--success);">✓ Statement executed successfully. (No tabular result set)</div>`;
      appendTerminalLog("term-success", "✓ SQL Statement executed successfully.");
    }
  } catch (err) {
    sqlContainer.innerHTML = `<div style="padding:20px;color:var(--danger);">SQL Error: ${err.message}</div>`;
    appendTerminalLog("term-error", "SQL Error: " + err.message);
  }
}

window.exportSqlResults = function() {
  if (!window._lastSqlResult) return;
  const jsonStr = JSON.stringify(window._lastSqlResult, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "query_results.json";
  a.click();
  showToast("SQL Results downloaded as JSON!", "success");
};

// --- 7.4 Markdown Render Engine ---
async function renderMarkdownDoc(mdContent) {
  const previewFrame = document.getElementById("previewFrame");
  const markdownContainer = document.getElementById("markdownContainer");
  const sqlContainer = document.getElementById("sqlContainer");

  previewFrame.style.display = "none";
  sqlContainer.style.display = "none";
  markdownContainer.style.display = "block";

  try {
    if (typeof marked === "undefined") {
      await loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
    }
    markdownContainer.innerHTML = marked.parse(mdContent);
  } catch (e) {
    markdownContainer.innerHTML = `<pre>${mdContent}</pre>`;
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

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function switchBottomTab(tabId) {
  document.querySelectorAll(".panel-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  const drawer = document.getElementById("bottomPanel");
  drawer.classList.remove("collapsed");

  if (tabId === "sqlViewer") {
    runSqlQuery(getFile("database.sql")?.content || "SELECT 1;");
  }
}

function toggleBottomPanel() {
  document.getElementById("bottomPanel").classList.toggle("collapsed");
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
function switchSidebarView(viewId) {
  const sidebar = document.getElementById("sidebarPanel");
  const buttons = document.querySelectorAll(".activity-btn");
  
  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === viewId);
  });

  if (sidebar.dataset.currentView === viewId && !sidebar.classList.contains("collapsed")) {
    sidebar.classList.add("collapsed");
    return;
  }

  sidebar.classList.remove("collapsed");
  sidebar.dataset.currentView = viewId;

  const headerTitle = document.getElementById("sidebarHeaderTitle");
  const contentArea = document.getElementById("sidebarContentArea");

  if (viewId === "explorer") {
    headerTitle.textContent = i18n[currentLang]?.explorer || "EXPLORER";
    contentArea.innerHTML = `<div class="file-list" id="fileTreeList"></div>`;
    renderFileExplorer();
  } else if (viewId === "search") {
    headerTitle.textContent = i18n[currentLang]?.search || "SEARCH";
    contentArea.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <input type="text" id="globalSearchInput" placeholder="Search in files..." class="project-title-input" style="width:100%;max-width:none;" oninput="performGlobalSearch(this.value)">
        <div id="searchResults" style="font-size:12px;display:flex;flex-direction:column;gap:4px;"></div>
      </div>
    `;
  } else if (viewId === "packages") {
    headerTitle.textContent = i18n[currentLang]?.packages || "PACKAGES & CDNS";
    renderPackagesList(contentArea);
  } else if (viewId === "tools") {
    headerTitle.textContent = i18n[currentLang]?.tools || "DEV TOOLS";
    renderToolsView(contentArea);
  } else if (viewId === "history") {
    headerTitle.textContent = i18n[currentLang]?.history || "SNAPSHOTS";
    renderSnapshotsView(contentArea);
  } else if (viewId === "settings") {
    headerTitle.textContent = i18n[currentLang]?.settings || "SETTINGS";
    renderSettingsView(contentArea);
  }
}

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
  let html = `<div style="display:flex;flex-direction:column;gap:8px;">`;
  cdnPackages.forEach(pkg => {
    const isInstalled = activeLibraries.includes(pkg.id);
    html += `
      <div class="tool-card" style="padding:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong>${pkg.name}</strong>
          <button class="btn btn-sm ${isInstalled ? 'btn-danger' : 'btn-primary'}" onclick="toggleCdnPkg('${pkg.id}')">
            ${isInstalled ? 'Remove' : 'Add'}
          </button>
        </div>
        <p style="font-size:11px;color:var(--text-muted);">${pkg.desc}</p>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

window.toggleCdnPkg = function(id) {
  if (activeLibraries.includes(id)) {
    activeLibraries = activeLibraries.filter(x => x !== id);
  } else {
    activeLibraries.push(id);
  }
  localStorage.setItem("wc_libs", JSON.stringify(activeLibraries));
  renderPackagesList(document.getElementById("sidebarContentArea"));
  runWebProject();
  showToast("Updated libraries!", "success");
};

function renderToolsView(container) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div class="tool-card">
        <strong>🎨 Color Picker</strong>
        <input type="color" value="#3b82f6" onchange="showToast('Hex: ' + this.value, 'info')" style="width:100%;height:32px;cursor:pointer;border:none;background:transparent;">
      </div>
      <div class="tool-card">
        <strong>⚡ JSON Formatter</strong>
        <button class="btn btn-sm btn-primary" onclick="formatActiveJson()">Format Current File</button>
      </div>
      <div class="tool-card">
        <strong>🔐 Base64 Encoder/Decoder</strong>
        <button class="btn btn-sm" onclick="base64Tool()">Convert Selection</button>
      </div>
    </div>
  `;
}

window.formatActiveJson = function() {
  try {
    const file = getFile(activeFileName);
    if (!file) return;
    const formatted = JSON.stringify(JSON.parse(file.content), null, 2);
    codeMirrorEditor.setValue(formatted);
    showToast("JSON formatted!", "success");
  } catch(e) {
    showToast("Invalid JSON: " + e.message, "error");
  }
};

window.base64Tool = function() {
  const sel = codeMirrorEditor.getSelection();
  if (!sel) {
    showToast("Please select text in editor to convert", "info");
    return;
  }
  try {
    const converted = btoa(sel);
    codeMirrorEditor.replaceSelection(converted);
    showToast("Converted to Base64!", "success");
  } catch (e) {
    showToast("Conversion error", "error");
  }
};

function renderSnapshotsView(container) {
  const db = JSON.parse(localStorage.getItem("wc_snapshots_v2") || "[]");
  if (db.length === 0) {
    container.innerHTML = `<div style="color:var(--text-dim);padding:14px;text-align:center;">No snapshots saved yet.<br>Click 'Save' to capture one.</div>`;
    return;
  }
  let html = `<div style="display:flex;flex-direction:column;gap:6px;">`;
  db.forEach(snap => {
    html += `
      <div class="file-item" style="justify-content:space-between;">
        <div>
          <div><strong>${escapeHtml(snap.name)}</strong></div>
          <div style="font-size:10px;color:var(--text-dim);">${snap.time}</div>
        </div>
        <button class="btn btn-sm btn-primary" onclick="restoreSnapshotV2(${snap.id})">Restore</button>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

function renderSettingsView(container) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div>
        <label style="display:block;margin-bottom:4px;font-size:11px;color:var(--text-muted);">FONT SIZE</label>
        <select class="custom-select" style="width:100%;" onchange="setFontSize(this.value)">
          <option value="12px">12px (Compact)</option>
          <option value="13px" selected>13px (Default)</option>
          <option value="15px">15px (Medium)</option>
          <option value="17px">17px (Large)</option>
        </select>
      </div>
      <div>
        <label style="display:block;margin-bottom:4px;font-size:11px;color:var(--text-muted);">TAB INDENTATION</label>
        <select class="custom-select" style="width:100%;" onchange="codeMirrorEditor.setOption('tabSize', parseInt(this.value))">
          <option value="2" selected>2 Spaces</option>
          <option value="4">4 Spaces</option>
        </select>
      </div>
      <div>
        <label style="display:block;margin-bottom:4px;font-size:11px;color:var(--text-muted);">THEME PRESET</label>
        <select class="custom-select" style="width:100%;" onchange="setIdeTheme(this.value)">
          <option value="midnight">Midnight (Default)</option>
          <option value="light">Light Slate</option>
          <option value="dracula">Dracula</option>
          <option value="monokai">Monokai</option>
        </select>
      </div>
    </div>
  `;
}

window.setFontSize = function(size) {
  const cmEl = document.querySelector(".CodeMirror");
  if (cmEl) cmEl.style.fontSize = size;
  const resTa = document.querySelector(".resilient-textarea");
  if (resTa) resTa.style.fontSize = size;
  const resGt = document.querySelector(".resilient-gutter");
  if (resGt) resGt.style.fontSize = size;
  if (codeMirrorEditor && typeof codeMirrorEditor.refresh === "function") codeMirrorEditor.refresh();
};

// --- 10. Command Palette (VS Code Style Ctrl+Shift+P) ---
const ideCommands = [
  { name: "Run Active File / Project", key: "Ctrl+Enter", action: runActiveFile },
  { name: "Save Project Snapshot", key: "Ctrl+S", action: saveProjectSnapshot },
  { name: "Create New File", key: "Alt+N", action: promptCreateNewFile },
  { name: "Export Project ZIP Archive", key: "", action: exportProjectZip },
  { name: "Copy Shareable Link", key: "", action: copyShareUrl },
  { name: "Clear Terminal Logs", key: "", action: clearTerminal },
  { name: "Switch to Explorer", key: "Ctrl+1", action: () => switchSidebarView("explorer") },
  { name: "Switch to Search", key: "Ctrl+2", action: () => switchSidebarView("search") },
  { name: "Open Templates Catalog", key: "", action: openTemplatesModal },
  { name: "Toggle Theme: Dark / Light", key: "", action: () => setIdeTheme(document.body.classList.contains("theme-light") ? "midnight" : "light") }
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
  grid.innerHTML = "";

  ideTemplates.forEach(t => {
    const card = document.createElement("div");
    card.className = "template-card";
    card.innerHTML = `
      <span class="runtime-badge" style="align-self:flex-start;">${t.category}</span>
      <strong>${t.title}</strong>
      <p style="font-size:12px;color:var(--text-muted);">Click to load project workspace</p>
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
  workspaceFiles = JSON.parse(JSON.stringify(t.files));
  openTabs = workspaceFiles.map(f => f.name);
  activeFileName = workspaceFiles[0].name;
  if (t.libs) activeLibraries = t.libs;

  switchToFile(activeFileName);
  runActiveFile();
  showToast(`Loaded ${t.title}!`, "success");
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
    localStorage.setItem("wc_files_v2", JSON.stringify(workspaceFiles));
    localStorage.setItem("wc_title_v2", document.getElementById("projectTitle").value);
    localStorage.setItem("wc_tabs_v2", JSON.stringify(openTabs));
    localStorage.setItem("wc_active_v2", activeFileName);
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
    switchToFile(activeFileName);
    runActiveFile();
    showToast("Snapshot restored!", "success");
  }
};

function restoreLocalDraft() {
  const savedFiles = localStorage.getItem("wc_files_v2");
  if (savedFiles) {
    try {
      workspaceFiles = JSON.parse(savedFiles);
      openTabs = JSON.parse(localStorage.getItem("wc_tabs_v2") || "[]");
      activeFileName = localStorage.getItem("wc_active_v2") || workspaceFiles[0].name;
      document.getElementById("projectTitle").value = localStorage.getItem("wc_title_v2") || "💻 My Web App";
    } catch(e){}
  }
}

// --- 14. Theme, Layout & i18n ---
function setIdeTheme(theme) {
  document.body.className = `theme-${theme} ${currentLang === 'ar' ? 'rtl' : ''}`;
  localStorage.setItem("wc_theme", theme);
  const sel = document.getElementById("themeSelector");
  if (sel) sel.value = theme;
}

function setIdeLayout(layout) {
  const container = document.getElementById("editorAndPreviewContainer");
  container.className = `editor-and-preview-container layout-${layout}`;
  document.querySelectorAll("#layoutGroup .btn-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.layout === layout);
  });
}

function setIdeLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem("wc_lang", lang);

  if (lang === "ar") {
    document.body.classList.add("rtl");
  } else {
    document.body.classList.remove("rtl");
  }

  const t = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (t[k]) el.textContent = t[k];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const k = el.getAttribute("data-i18n-placeholder");
    if (t[k]) el.placeholder = t[k];
  });

  const sel = document.getElementById("langSelector");
  if (sel) sel.value = lang;
}

// --- 15. UI Modals & Notifications ---
function openModal(id) { document.getElementById(id).classList.add("active"); }
function closeModal(id) { document.getElementById(id).classList.remove("active"); }

function showToast(msg, type = "success") {
  const container = document.getElementById("toastContainer");
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
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "P" || e.key === "p")) {
    e.preventDefault();
    toggleCommandPalette();
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

// --- 17. Application Bootloader ---
window.addEventListener("DOMContentLoaded", () => {
  try { restoreLocalDraft(); } catch(e){ console.warn("Draft restore:", e); }
  try { initCodeMirror(); } catch(e){ console.warn("Editor init:", e); }
  try { renderFileExplorer(); } catch(e){ console.warn("Explorer render:", e); }

  // Restore Theme & Language
  try {
    const savedTheme = localStorage.getItem("wc_theme") || "midnight";
    setIdeTheme(savedTheme);
    setIdeLanguage(currentLang);
  } catch(e){}

  try { checkWorkspaceUrlHash(); } catch(e){}

  // Initial Run
  try { runActiveFile(); } catch(e){}
});
