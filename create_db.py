import csv
import sqlite3
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "database.db"
JOBS_CSV = BASE_DIR / "jobs.csv"


conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS users")
cur.execute("DROP TABLE IF EXISTS jobs")

cur.execute(
    """
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        location TEXT,
        education TEXT,
        skills TEXT
    )
    """
)

cur.execute(
    """
    CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        skills TEXT NOT NULL,
        location TEXT NOT NULL,
        mobile TEXT
    )
    """
)

if JOBS_CSV.exists():
    with JOBS_CSV.open(newline="", encoding="utf-8") as file:
        for row in csv.DictReader(file):
            cur.execute(
                "INSERT INTO jobs (title, skills, location, mobile) VALUES (?, ?, ?, ?)",
                (
                    (row.get("title") or row.get("job_title") or "").strip(),
                    row.get("skills", "").strip(),
                    row.get("location", "").strip(),
                    (row.get("mobile") or row.get("phone") or "").strip(),
                ),
            )

conn.commit()
conn.close()

print("Database created successfully")
