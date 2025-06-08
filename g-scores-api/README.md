# 🚀 G-Scores Backend

This is the backend service for the **G-Scores** challenge project. It exposes RESTful APIs for interacting with student score data, including searching, reporting, and ranking functionality.

Built with **NestJS (Monolithic architecture)** and uses **PostgreSQL** as the database, following proper OOP design and form validation.

---

## 📦 Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: class-validator
- **Architecture**: Monolithic
- **Dockerized**: ✅

---

## 🏗️ Project Structure

```

/backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── students/             # Domain for student data
│   │   ├── student.entity.ts
│   │   ├── students.controller.ts
│   │   ├── students.dto.ts
│   │   ├── students.module.ts
│   │   ├── students.service.ts
│   │   └── dto/
│   └── filters/             # Http filtering
│       └── http-exception.filter.ts
├── .env
├── docker-compose.yml
└── README.md

````

---

## ⚙️ Setup Instructions

### 1. 🐳 Start PostgreSQL with Docker

Use this `docker-compose.yml` (provided in project root):

```yaml
services:
  postgres_db:
    image: postgres:13.5
    environment:
      - POSTGRES_USER=gscores 
      - POSTGRES_PASSWORD=gscores 
      - POSTGRES_DB=gscores 
    ports:
      - "5432:5432"
````

Start the service:

```bash
docker compose up -d
```

---

### 2. 🧪 Environment Variables

Create a `.env` file in the root (`goldenowl-js-intern-assignment`) directory:

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

---

### 3. 🚀 Run the Server

```bash
cd backend
npm install
npm run start:dev
```

- The API endpoints will be available on: [http://localhost:3000](http://localhost:3000)
- The API Documentation will be available on: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🔌 API Endpoints

### 📘 Search Score by Registration Number (SBD)

* **GET** `/students/:sbd`
* **Description**: Get detailed score of a student
* **Response**:

```json
{
  "sbd": "01000001",
  "toan": "8.40",
  "ngu_van": "6.75",
  "ngoai_ngu": "8.00",
  "vat_li": "6.00",
  "hoa_hoc": "5.25",
  "sinh_hoc": "5.00",
  "lich_su": null,
  "dia_li": null,
  "gdcd": null,
  "ma_ngoai_ngu": "N1"
}
```

---

### 📊 Subject Score Distribution Report

* **GET** `/reports/subject-distribution`
* **Description**: Returns number of students in 4 score levels for each subject
* **Response**:

```json
{
  "toan": {
    ">=8": 198392,
    "6-8": 505836,
    "4-6": 258654,
    "<4": 82731
  },
  "ngu_van": {
    ">=8": 377879,
    "6-8": 513116,
    "4-6": 141056,
    "<4": 18050
  },
  "ngoai_ngu": {
    ">=8": 133483,
    "6-8": 219652,
    "4-6": 363532,
    "<4": 196038
  },
  "vat_li": {
    ">=8": 94146,
    "6-8": 148641,
    "4-6": 79272,
    "<4": 23556
  },
  "hoa_hoc": {
    ">=8": 93333,
    "6-8": 144959,
    "4-6": 88447,
    "<4": 19779
  },
  "sinh_hoc": {
    ">=8": 34438,
    "6-8": 182049,
    "4-6": 116263,
    "<4": 9628
  },
  "lich_su": {
    ">=8": 138533,
    "6-8": 342577,
    "4-6": 200392,
    "<4": 24712
  },
  "dia_li": {
    ">=8": 218515,
    "6-8": 382087,
    "4-6": 96226,
    "<4": 7854
  },
  "gdcd": {
    ">=8": 384222,
    "6-8": 181440,
    "4-6": 16886,
    "<4": 1061
  }
}
```

---

### 🏆 Top 10 Students - Group A (Math, Physics, Chemistry)

* **GET** `/reports/top10-groupA`
* **Description**: Get top 10 students ranked by total score of `toan + vat_li + hoa_hoc`
* **Response**:

```json
{
  "students": [
    {
      "sbd": "26020938",
      "toan": 9.6,
      "vat_li": 10,
      "hoa_hoc": 10,
      "total_score": 29.6
    },
    {
      "sbd": "26009943",
      "toan": 9.8,
      "vat_li": 9.75,
      "hoa_hoc": 10,
      "total_score": 29.55
    },
    {
      "sbd": "19016615",
      "toan": 9.6,
      "vat_li": 9.75,
      "hoa_hoc": 10,
      "total_score": 29.35
    },
    {
      "sbd": "19013166",
      "toan": 9.8,
      "vat_li": 9.75,
      "hoa_hoc": 9.75,
      "total_score": 29.3
    },
    {
      "sbd": "26014736",
      "toan": 9.8,
      "vat_li": 9.5,
      "hoa_hoc": 10,
      "total_score": 29.3
    },
    {
      "sbd": "55006046",
      "toan": 9.8,
      "vat_li": 9.5,
      "hoa_hoc": 10,
      "total_score": 29.3
    },
    {
      "sbd": "28035804",
      "toan": 9.2,
      "vat_li": 10,
      "hoa_hoc": 10,
      "total_score": 29.2
    },
    {
      "sbd": "19002020",
      "toan": 9.2,
      "vat_li": 10,
      "hoa_hoc": 10,
      "total_score": 29.2
    },
    {
      "sbd": "32005631",
      "toan": 9.2,
      "vat_li": 10,
      "hoa_hoc": 10,
      "total_score": 29.2
    },
    {
      "sbd": "03005012",
      "toan": 9.4,
      "vat_li": 9.75,
      "hoa_hoc": 10,
      "total_score": 29.15
    }
  ]
}
```

---

## ✨ Features

* [x] Full CRUD logic for student scores
* [x] Score validation and data typing
* [x] Reporting and statistics logic
* [x] Proper error handling and DTO validation
* [x] Dockerized PostgreSQL support

---

## 📬 Future Improvements

* [ ] Add test coverage (unit/integration)
* [ ] API Rate limiting
* [ ] Swagger documentation