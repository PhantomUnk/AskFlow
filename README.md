# 🧠 AskFlow

**AskFlow** is an open social platform where users can ask questions to an AI and browse public answers. Every interaction creates a post visible to others, fostering curiosity and shared discovery.

---

## 🚀 Features

- Ask questions and receive concise AI-generated answers (2–3 sentences)
- Browse a public feed of all user interactions
- Toggle between light and dark themes for comfortable viewing

---

## 🛠 Tech Stack

### Frontend

- **React (Vite)** — modern frontend tooling for fast development
- **Zustand** — lightweight state management
- **Axios** — promise-based HTTP client
- **Tailwind CSS** & **SCSS** — responsive and modular styling
- **React Toastify** — UI notifications

### Backend

- **Python + FastAPI** — high-performance backend framework
- **sqlite3** — lightweight database for prototyping
- **g4f** — wrapper for various AI providers (ChatGPT-like behavior)

---

## ⚙️ Getting Started

### Backend

> Create and activate a virtual environment before installation

```bash
cd Backend
python -m venv .venv
source .venv/bin/activate  # or .\.venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app # --reload - for auto reload. --port and --host - for port and host respectively
```

> ⚙️ If you want the backend to directly serve the website (without running the frontend separately), you can place your built frontend files into a `dist` directory inside the `Backend` folder.

1. In the root of the `Backend` folder, create a `dist` directory.
2. Inside `dist`, place:

   - `index.html`
   - `ico.svg` or any icons _(optional)_
   - A subfolder `static/` with your compiled frontend files (e.g., `index.js`, `index.css`, `favicon.ico`).

Example structure:

```
Backend/
├── dist/
│   ├── index.html
│   ├── ico.svg
│   └── static/
│       ├── index.js
│       ├── index.css
│       └── favicon.ico
```

3. Example FastAPI setup:

```python

app = FastAPI()

app.mount("/dist", StaticFiles(directory="dist"), name="static")
templates = Jinja2Templates(directory="dist")

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request}, media_type="text/html")
```

> 📃 To change the `dist` directory name, update your FastAPI setup like this in main.py:

```python
app.mount("/your_folder_name", StaticFiles(directory="your_folder_name"), name="static")
templates = Jinja2Templates(directory="your_folder_name")
```

4. In your `index.html`, use `url_for` to link static assets:

```html
<link
  rel="stylesheet"
  href="{{ url_for('static', path='static/index.css') }}"
/>
<script
  type="module"
  src="{{ url_for('static', path='static/index.js') }}"
></script>
<link
  rel="icon"
  href="{{ url_for('static', path='static/favicon.ico') }}"
  type="image/x-icon"
/>
```

---

### Frontend

```bash
cd Frontend
npm install
npm run dev  # for development
# or
npm run build  # for production
```

> Make sure to configure environment variables appropriately for both backend and frontend.

---

## 📌 Project Status

This is a Minimum Viable Product (MVP) with core functionality:

- ✅ Public question feed
- ✅ AI-generated responses
- ✅ Theme switching support

### 🛠 Planned Features

- User authentication and session management
- Direct messaging system between users

---

## 🧑‍💻 Author

Created by [@PhantomUnk](https://github.com/PhantomUnk)

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 🌐 Live Demo

```
No Live Demo yet(
```
