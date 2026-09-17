# 💻 WebCode

A lightweight, browser-based web development playground for writing, testing, saving, and exporting **HTML**, **CSS**, and **JavaScript** projects with a live preview. Built entirely with **HTML, CSS, Vanilla JavaScript, Local Storage, and JSZip**, WebCode runs directly in the browser without requiring a backend.

---

## ✨ Features

### 🧱 Multi-Panel Editor
- Dedicated editors for:
  - HTML (`index.html`)
  - CSS (`style.css`)
  - JavaScript (`script.js`)
- Clean and responsive interface.

### ⚡ Live Preview
- Instantly render HTML, CSS, and JavaScript inside a sandboxed iframe.
- Automatic preview refresh supported via Auto Run.

### 🔄 Auto Run
- Automatically updates the preview while typing.
- Can be enabled or disabled at any time.

### 💾 Draft Auto Save
- Automatically saves:
  - Project name
  - HTML code
  - CSS code
  - JavaScript code
- Stored locally using browser Local Storage.

### 📂 Project Save System
- Save project snapshots manually.
- Preserves a history of previous versions.

### 🕒 Version History
- Stores up to **50 versions**.
- Restore any previously saved revision with one click.

### 📦 ZIP Export
Export projects as a ZIP package containing:

```text
index.html
style.css
script.js
```

Powered by **JSZip**.

### 📥 Import Existing Files
Import:

- `.html`
- `.css`
- `.js`

Files are automatically loaded into their respective editors.

### 🌗 Light & Dark Themes
- Dark mode (default)
- Light mode
- Theme preference persists across sessions

### ⛶ Fullscreen Preview
Launch the preview panel in fullscreen mode for easier testing.

### 📊 Code Statistics
Displays:

- Character count
- Line count

For:

- HTML
- CSS
- JavaScript

### ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|-----------|---------|
| Ctrl + S | Save Project |
| Ctrl + Enter | Run Code |
| Ctrl + L | Clear Editors |

---

## 📁 Project Structure

```text
WebCode/
│
├── index.html
├── jszip.min.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Download JSZip

WebCode requires JSZip for ZIP export functionality.

Place the library beside `index.html`:

```text
WebCode/
│
├── index.html
└── jszip.min.js
```

Download JSZip from:

https://stuk.github.io/jszip/

### 2. Open WebCode

Simply open:

```text
index.html
```

in a modern browser.

No server setup is required.

---

## 🖥️ How It Works

The preview window dynamically generates an HTML document and injects the user's HTML, CSS, and JavaScript:

```javascript
preview.srcdoc = `
<!DOCTYPE html>
<html>
<head>
<style>${css}</style>
</head>
<body>
${html}
<script>
${js}
<\/script>
</body>
</html>
`;
```

Any runtime JavaScript errors are displayed directly in the preview panel.

---

## 💾 Local Storage Structure

### Draft Storage

```text
draft-html
draft-css
draft-js
draft-name
```

### Project Database

```text
webcode-db
```

Example:

```json
{
  "history": [
    {
      "name": "My Project",
      "html": "<h1>Hello</h1>",
      "css": "body{}",
      "js": "console.log('Hello');",
      "timestamp": "2026-01-01"
    }
  ]
}
```

---

## 🔒 Security Features

### Sandboxed Preview

```html
<iframe
sandbox="allow-scripts allow-modals allow-forms allow-popups">
</iframe>
```

This helps isolate executed user scripts from the editor itself.

### Script Injection Protection

User JavaScript is sanitized before injection:

```javascript
js.replace(
    /<\/script>/gi,
    "<\\/script>"
);
```

This prevents accidental script tag termination.

---

## 🌗 Theme System

### Dark Mode

```css
:root{
    --bg:#0f172a;
    --card:#1e293b;
    --border:#334155;
    --text:#f8fafc;
}
```

### Light Mode

```css
body.light{
    --bg:#f8fafc;
    --card:#ffffff;
    --border:#d1d5db;
    --text:#111827;
}
```

The selected theme is automatically saved in Local Storage.

---

## 📦 Export Example

Generated ZIP:

```text
MyProject.zip
│
├── index.html
├── style.css
└── script.js
```

Generated HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- User HTML -->

    <script src="script.js"></script>
</body>
</html>
```

The exported project works independently outside of WebCode.

---

## 📱 Responsive Design

Desktop layout:

```css
grid-template-columns: repeat(3, 1fr);
```

Mobile layout:

```css
@media(max-width:1000px){
    .editors{
        grid-template-columns:1fr;
    }
}
```

The editor panels automatically stack vertically on smaller screens.

---

## 🔄 Startup Lifecycle

On launch, WebCode performs the following:

1. Restore saved theme
2. Restore draft content
3. Load project history
4. Refresh statistics
5. Execute preview

```javascript
restoreDraft();
loadHistory();
updateStats();
runCode();
```

---

## 🛠️ Future Enhancement Ideas

Potential upgrades include:

- Syntax highlighting
- Code formatter
- Console output panel
- Multi-file project support
- Project templates
- GitHub integration
- Progressive Web App (PWA)
- AI-assisted coding tools

---

## 🔧 Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Local Storage API
- Fullscreen API
- Blob API
- JSZip

---

## ✅ Browser Compatibility

| Browser | Supported |
|----------|-----------|
| Google Chrome | ✅ |
| Microsoft Edge | ✅ |
| Mozilla Firefox | ✅ |
| Safari | ✅ |

Recommended requirements:

- ES6 Support
- Local Storage
- Fullscreen API
- Blob API

---

## 📜 License

Copyright © 2026

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this project except in compliance with the License.

You may obtain a copy of the License at:

```text
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an **"AS IS" BASIS**, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.

---

## ❤️ About WebCode

WebCode is designed as a lightweight browser IDE for rapid front-end development and experimentation. It provides real-time feedback, automatic persistence, version history, import/export functionality, and theme customization, all without requiring any backend services.

Perfect for:

- Learning HTML, CSS, and JavaScript
- Rapid prototyping
- Classroom demonstrations
- Front-end experimentation
- Offline development

---

### 🎉 Happy Coding with WebCode!
