# 🎓 G-Scores — National Exam Score Management System

G-Scores is a fullstack web application built for the **Golden Owl Intern Challenge**. It allows users to look up national exam results, view statistical reports by subject, and display top-performing students from specific subject groups.

Video demo link of the project: [inserted_link](https://example.com)

---

## 🧩 Project Structure

```d

goldenowl-js-intern-assignment/
├── db-migrate/        # Raw data migration script (CSV to PostgreSQL)
├── g-scores-api/      # NestJS backend (API service)
├── g-scores/          # React + Vite + TailwindCSS frontend
├── nginx/nginx.conf   # NGINX reverse proxy config
├── docker-compose.yml # Full production deployment stack
└── README.md          # You're here

````

---

## 📦 Tech Stack Overview

| Layer         | Technology                              |
|---------------|------------------------------------------|
| Frontend      | React + Vite + TailwindCSS + shadcn/ui + TypeScript |
| Backend       | NestJS + TypeScript + PostgreSQL        |
| Database      | PostgreSQL 13                           |
| Deployment    | Docker, Docker Compose, NGINX           |
| Charts        | Recharts or Chart.js (in frontend)      |

---

## 📌 Core Features

- 🔍 **Search Scores**: Enter a student registration number (SBD) to view all exam results
- 📊 **Subject Reports**: View score distribution across all subjects grouped by performance ranges
- 🏆 **Top 10 Group A**: See top 10 students ranked by scores in Math, Physics, Chemistry
- 📱 **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- 🐳 **Production-ready Docker setup** with NGINX reverse proxy

---

## 🛠 Installation for Development

Each part of the system is separated into its own folder. Please follow the specific README for each component:

1. **🔁 Migrate CSV to Database**
   - Go to `/db-migrate`
   - Follow setup in [`db-migrate/README.md`](./db-migrate/README.md)

2. **⚙️ Backend (NestJS API)**
   - Go to `/g-scores-api`
   - Follow setup in [`g-scores-api/README.md`](./g-scores-api/README.md)

3. **🎨 Frontend (React UI)**
   - Go to `/g-scores`
   - Follow setup in [`g-scores/README.md`](./g-scores/README.md)

Once all 3 parts are running, your full development environment should be working independently.

---

## 🚀 Installation for Production

To spin up the **entire application in production mode**, use the Docker setup provided in the root directory.

### ⚙️ Prerequisites

- Docker
- Docker Compose

### ▶️ Run Application

```bash
docker-compose up --build
````

Then open your browser at:

```
http://localhost
```

The reverse proxy will route:

* `/` → to the frontend (port 5173 internally)
* `/api/` → to the NestJS backend (port 3000 internally)

### 🧾 Notes

* PostgreSQL runs as a container (`postgres_db`)
* NGINX exposes the application on port `80`
* Backend connects to the database using the environment variables defined in the `docker-compose.yml`

You may customize:

* `nginx.conf` for routing or HTTPS
* `.env` files for DB and API configuration
* Dockerfiles for each service if deploying to production cloud

---

## 📈 Example API Routes

* `GET /api/students/:sbd` — fetch scores of a student
* `GET /api/reports/subject-distribution` — report of score ranges
* `GET /api/reports/top10-groupA` — top performers in Group A

---

## 📚 Future Improvements

* [ ] Swagger API documentation
* [ ] CI/CD integration for auto-deploy
* [ ] Dark mode toggle in frontend
* [ ] Comprehensive test coverage (unit/integration)

---

## 📖 License

Distributed under the Apache License 2.0. See `LICENSE` for more information.

---

## 👨‍💻 Author

* \[Vo Tran Phi]
* Email: \[[votranphi04@gmail.com](mailto:votranphi04@gmail.com)]
* LinkedIn: \[[https://www.linkedin.com/in/votranphi/](https://www.linkedin.com/in/votranphi/)]