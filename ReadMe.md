# 💡 Current Bill Splitter

A smart full-stack web app that helps roommates or families **split electricity bills fairly** based on submeter readings. Built with 🔥 Firebase, Express, React, and UnoCSS.

---

## 🏠 Features

- 🔐 Add and manage multiple **houses**
- ⚡ Enter **monthly electricity bills** and submeter readings
- 🧮 Automatic calculation of:
  - Units used by each member
  - Fair portion of the bill (based on usage)
- 🗃️ Stores monthly bills and usage **history**
- 🧼 Clean, responsive UI powered by UnoCSS
- 🔥 Firebase Firestore for real-time storage
- 📦 Express backend with secured API

---

## 🖼️ Preview

![Preview Screenshot](https://user-images.githubusercontent.com/your-username/demo.png) <!-- Replace with actual image URL after deployment -->

---

## 🛠️ Tech Stack

| Layer      | Tech                      |
|------------|---------------------------|
| Frontend   | React + Vite + UnoCSS     |
| Backend    | Express.js (Node.js)      |
| Database   | Firebase Firestore        |
| Hosting    | Vercel (frontend), Render (backend) |

---

## 📂 Folder Structure

bill-splitter-project/
├── bill-splitter-frontend/ # React + UnoCSS app
└── currentbillbackend/ # Express API + Firebase



---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/bill-splitter-project.git
cd bill-splitter-project
```

### 2. Setup Backend
```bash
cd currentbillbackend
npm install
```
# Create .env file
```bash
touch .env
```
### Add this to .env:
``` text
PORT=5000
FIREBASE_SERVICE_KEY=your_service_account_JSON_on_single_line
```
Then run:
```bash
node index.js
```

### 3 Setup Frontend
```bash
cd ../bill-splitter-frontend
npm install
npm run dev
```