# 📦 G-Scores - CSV to PostgreSQL Migration

This script is used to import raw student score data from a CSV file into a PostgreSQL database. It is the initial step in setting up the G-Scores application.

---

## 📁 Project Structure

```

/migrate/
├── migrate.js           # Main script to import CSV into DB
├── diem_thi_thpt_2024.csv   # Raw CSV data file

````

---

## 🧰 Technologies Used

- Node.js
- JavaScript (ES6)
- `pg` – PostgreSQL client
- `csv-parser` – Lightweight CSV parser
- Docker (PostgreSQL runs in a Docker container)

---

## ⚙️ Setup Instructions

### 1. 🚀 Start PostgreSQL via Docker

Ensure your database is running using the following `docker-compose.yml`:

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
    volumes:
      - pg-data:/var/lib/postgresql/data

volumes:
  pg-data:
````

Run:

```bash
docker compose up -d
```

---

### 2. 📦 Install Dependencies

From the root of the `db-migrate` folder:

```bash
npm install
```

---

### 3. 📝 Configure `.env` (Optional)

If you'd like to avoid hardcoding credentials, create a `.env` file:

```
PGHOST=localhost
PGPORT=5432
PGUSER=gscores
PGPASSWORD=gscores
PGDATABASE=gscores
```

---

### 4. ▶️ Run Migration

Make sure `diem_thi_thpt_2024.csv` is present in the same folder, then run:

```bash
node migrate.js
```

You should see output confirming how many records were inserted into the database.

---

## 🧪 Notes

* If you rerun the script, it will truncate the `students` table before inserting new rows (to prevent duplicates).
* The table structure is created if it doesn't already exist.
* Score fields are safely parsed into `float` or `null` if empty.

---

## 📬 Output Table Schema: `students`

| Column         | Type             |
| -------------- | ---------------- |
| sbd            | TEXT PRIMARY KEY |
| toan           | FLOAT            |
| ngu\_van       | FLOAT            |
| ngoai\_ngu     | FLOAT            |
| vat\_li        | FLOAT            |
| hoa\_hoc       | FLOAT            |
| sinh\_hoc      | FLOAT            |
| lich\_su       | FLOAT            |
| dia\_li        | FLOAT            |
| gdcd           | FLOAT            |
| ma\_ngoai\_ngu | TEXT             |