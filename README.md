# 🧠 AskFlow

**AskFlow** is an open social platform where users can ask questions to an AI and browse public answers. Every interaction creates a post visible to others, fostering curiosity and shared discovery.

---

## 🚀 Features

* Ask questions and receive concise AI-generated answers (2–3 sentences)
* Browse a public feed of all user interactions
* Toggle between light and dark themes for comfortable viewing

---

## 🛠 Tech Stack

### Frontend

* **React (Vite)** — modern frontend tooling for fast development
* **Zustand** — lightweight state management
* **Axios** — promise-based HTTP client
* **Tailwind CSS** & **SCSS** — responsive and modular styling
* **React Toastify** — UI notifications

### Backend

* **Python + FastAPI** — high-performance backend framework
* **sqlite3** — lightweight database for prototyping
* **g4f** — wrapper for various AI providers (ChatGPT-like behavior)

---

## ⚙️ Getting Started

### Backend

> Create and activate a virtual environment before installation

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
./main.py # or uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev  # for development
# or
npm run build  # for production
```

> Make sure to configure environment variables appropriately for both backend and frontend.

---

## 📌 Project Status

This is a Minimum Viable Product (MVP) with core functionality:

* ✅ Public question feed
* ✅ AI-generated responses
* ✅ Theme switching support

### 🛠 Planned Features

* User authentication and session management
* Direct messaging system between users

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
