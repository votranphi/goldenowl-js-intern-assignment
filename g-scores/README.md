# 🎯 G-Scores Frontend

This is the **frontend** application for the G-Scores project — a student score management and statistics platform built for the Golden Owl Intern Challenge.

The frontend consumes RESTful APIs from the NestJS backend and provides a responsive, clean UI using modern technologies.

---

## 🖥️ Tech Stack

- **React 18** + **Vite**
- **TailwindCSS**
- **shadcn/ui** (headless UI components)
- **TypeScript**
- **Axios** for API calls
- **React Router** for routing
- **Chart.js / Recharts** (depending on implementation)

---

## 🌐 Features

- Search for a student's scores by registration number (SBD)
- View statistical reports of subject performance (in chart form)
- Display top 10 students from Group A (Math + Physics + Chemistry)
- Fully responsive layout (Mobile, Tablet, Desktop)
- Simple and clean UI similar to the provided mockup

---

## 🏗️ Project Structure

```

/frontend/
├── src/
│   ├── components/         # UI reusable and shadcn components
│   ├── pages/              # Page views
│   ├── services/           # Axios API clients
│   ├── types/              # TypeScript type definitions
│   ├── routes/             # Page views routing
│   ├── App.tsx             # Routing setup
│   └── main.tsx            # Vite entry point
├── tailwind.config.js
├── vite.config.ts
└── README.md

````

---

## 📦 Installation & Setup

### 1. ⬇️ Install Dependencies

```bash
cd frontend
npm install
````

---

### 2. 🌍 Environment Variables

Create a `.env` file in `goldenowl-js-intern-assignment` folder:

```
# Posgres Config
POSTGRES_USER=gscores
POSTGRES_PASSWORD=gscores
POSTGRES_DB=gscores
POSTGRES_HOST=192.168.130.129
POSTGRES_PORT=5432

# Frontend
VITE_API_BASE_URL=http://localhost:3000

# Backend
SERVER_PORT=3000
NODE_ENV=development
```

Update the URL to match your backend port if different.

---

### 3. ▶️ Start Development Server

```bash
npm run dev
```

The app will be running at [http://localhost:5173](http://localhost:5173)

---

## 🔌 API Integration

The frontend integrates with the following backend APIs:

| Feature        | Method | Endpoint                        | Description                                      |
| -------------- | ------ | ------------------------------- | ------------------------------------------------ |
| Search by SBD  | GET    | `/students/:sbd`                | Fetch scores of a student                        |
| Score Report   | GET    | `/reports/subject-distribution` | Get score distribution for subjects              |
| Top 10 Group A | GET    | `/reports/top10-groupA`         | Get top 10 students (Math + Physics + Chemistry) |

All requests are made using **Axios** through wrapper functions in `services/api.ts`.

---

## 📱 Responsive Design

* Layout adapts to all screen sizes: mobile, tablet, and desktop
* Tailwind breakpoints are used (`sm`, `md`, `lg`)
* Sidebar collapses on mobile
* Charts scale fluidly using flex/grid layout

---

## 🧪 TypeScript Support

* All props, API responses, and form inputs are strictly typed
* Types are defined in `/types/`

---

## 🖼️ UI Mockup Reference

The UI is based on the mockup provided in the challenge assignment and further improved using:

* `shadcn/ui` for consistent, accessible components
* TailwindCSS spacing and color utilities

---

## 📬 Future Improvements

* Add dark mode
* Improve error handling (toast notifications)
* Add loading skeletons for API fetches