# 💻 WebCode

A lightweight, browser-based web development playground for creating, testing, saving, importing, and exporting **HTML**, **CSS**, and **JavaScript** projects.

WebCode works entirely inside your browser and requires no installation, build tools, or backend services.

---

## ✨ Features

### 🧱 HTML Editor
Write and edit HTML code in a dedicated editor panel with real-time updates.

### 🎨 CSS Editor
Create and modify styles independently from HTML and JavaScript.

### ⚡ JavaScript Editor
Develop interactive functionality with instant execution in the preview window.

### 👀 Live Preview
Preview results immediately using a sandboxed iframe environment.

### 🔄 Auto Run
Automatically updates the preview whenever code changes.

### 💾 Draft Auto Save
Automatically saves current work to Local Storage and restores it when WebCode is reopened.

### 📦 ZIP Export
Export projects as a ZIP package containing:

```text
index.html
style.css
script.js
```

### 📥 File Import
Import existing project files:

```text
.html
.css
.js
```

### 🕒 Version History
Store project snapshots locally and restore previous versions.

### 🌙 Theme Switching
Toggle between Dark Mode and Light Mode.

### ⛶ Fullscreen Preview
Open the live preview in fullscreen mode.

### 📊 Code Statistics
Display character counts for:

- HTML
- CSS
- JavaScript

### ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|-----------|---------|
| Ctrl + Enter | Run Code |
| Ctrl + S | Save Project |
| Ctrl + L | Clear Editors |

---

# 📂 Project Structure

```text
WebCode/
│
├── index.html
├── jszip.min.js
├── README.md
└── LICENSE
```

---

# 🚀 Installation

## Requirements

- Modern web browser
- JSZip library

Files required:

```text
index.html
jszip.min.js
```

Place both files in the same directory:

```text
project/
│
├── index.html
└── jszip.min.js
```

---

# ▶️ Getting Started

### Step 1

Download or clone the project.

### Step 2

Verify the following files exist:

```text
index.html
jszip.min.js
```

### Step 3

Open:

```text
index.html
```

in any supported browser.

No local server is required.

---

# 📖 Usage

## Creating a Project

1. Enter HTML in the HTML editor.
2. Add styles in the CSS editor.
3. Write JavaScript in the JS editor.
4. View changes instantly in Live Preview.

---

## Saving a Project

Click:

```text
💾 Save
```

or press:

```text
Ctrl + S
```

Saved projects appear in the Version History panel.

---

## Running Code

Click:

```text
▶ Run
```

or press:

```text
Ctrl + Enter
```

---

## Clearing Editors

Press:

```text
Ctrl + L
```

to clear all code editors.

---

## Importing Files

Click:

```text
📥 Import
```

Supported file types:

```text
.html
.css
.js
```

The imported content is automatically loaded into the corresponding editor.

---

## Exporting Projects

Click:

```text
📦 Export ZIP
```

The ZIP file will contain:

```text
index.html
style.css
script.js
```

Example:

```text
MyProject.zip
│
├── index.html
├── style.css
└── script.js
```

---

# 💾 Local Storage

WebCode stores data locally in the browser.

## Storage Keys

| Key | Description |
|------|-------------|
| draft-html | HTML draft |
| draft-css | CSS draft |
| draft-js | JavaScript draft |
| draft-name | Project name |
| theme | Theme preference |
| webcode-db | Saved project history |

No project data is transmitted to any external server.

---

# 🌙 Theme Support

WebCode includes:

- Dark Theme
- Light Theme

Theme preference is automatically saved and restored.

---

# 🔒 Security

The preview uses a sandboxed iframe:

```html
<iframe sandbox="allow-scripts allow-modals">
```

Benefits:

- Isolates user code
- Prevents direct interaction with the editor page
- Reduces unintended script access

---

# 🛠 Technologies Used

### HTML5

Application structure and user interface.

### CSS3

Responsive layouts and theming.

### JavaScript (ES6+)

Editor functionality, live preview, storage, and export features.

### JSZip

ZIP archive generation for project export.

---

# 🌐 Browser Compatibility

Recommended browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Brave Browser
- Opera

Latest browser versions are recommended.

---

# ✅ Included Features

- Live HTML/CSS/JS Preview
- Auto Run
- Theme Switching
- Draft Auto Save
- Local Storage Persistence
- ZIP Export
- Project Import
- Version History
- Character Statistics
- Fullscreen Preview
- Keyboard Shortcuts
- JSZip Integration
- Error Handling

---

# 🔮 Planned Enhancements

Future improvements may include:

- Syntax Highlighting
- Code Formatting
- Search & Replace
- Multiple Tabs
- File Explorer
- IndexedDB Storage
- Project Templates
- Progressive Web App (PWA)
- GitHub Integration
- Mobile Layout Optimization

---

# 🐞 Troubleshooting

## JSZip Not Loaded

Ensure:

```text
jszip.min.js
```

is located in the same folder as:

```text
index.html
```

Correct structure:

```text
project/
│
├── index.html
└── jszip.min.js
```

---

## ZIP Export Not Working

Verify:

- JSZip library exists
- Browser allows downloads
- No JavaScript errors are present

---

## Preview Not Updating

Check:

- Auto Run checkbox is enabled
- Browser console for script errors
- JavaScript syntax validity

---

# 📄 License

See the included:

```text
LICENSE
```

file for licensing terms and conditions.

---

# 👨‍💻 About

WebCode is a lightweight browser-based coding playground designed for:

- Learning Web Development
- Prototyping Ideas
- Frontend Experimentation
- Offline Coding Practice
- Educational Use

No installation, compilation, or server setup required.

---

**Happy Coding! 🚀**
