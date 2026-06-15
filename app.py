import csv
import sqlite3
from pathlib import Path

from flask import Flask, redirect, render_template, request, session, url_for

from model import match_jobs


app = Flask(__name__)
app.secret_key = "job-portal-secret-key"

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "database.db"
JOBS_CSV = BASE_DIR / "jobs.csv"


def get_connection():
    return sqlite3.connect(DB_PATH)


def init_db():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            location TEXT,
            education TEXT,
            skills TEXT
        )
        """
    )

    cur.execute("PRAGMA table_info(users)")
    user_columns = {row[1] for row in cur.fetchall()}

    if "username" not in user_columns:
        cur.execute("ALTER TABLE users ADD COLUMN username TEXT")
        if "name" in user_columns:
            cur.execute("UPDATE users SET username = name WHERE username IS NULL")
    if "location" not in user_columns:
        cur.execute("ALTER TABLE users ADD COLUMN location TEXT")
    if "education" not in user_columns:
        cur.execute("ALTER TABLE users ADD COLUMN education TEXT")
    if "skills" not in user_columns:
        cur.execute("ALTER TABLE users ADD COLUMN skills TEXT")

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            skills TEXT NOT NULL,
            location TEXT NOT NULL,
            mobile TEXT
        )
        """
    )

    cur.execute("PRAGMA table_info(jobs)")
    job_columns = {row[1] for row in cur.fetchall()}

    if "mobile" not in job_columns:
        cur.execute("ALTER TABLE jobs ADD COLUMN mobile TEXT")

    cur.execute("SELECT COUNT(*) FROM jobs")
    if cur.fetchone()[0] == 0 and JOBS_CSV.exists():
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


def fetch_all_jobs():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(
        """
        SELECT title, skills, location, COALESCE(mobile, '') AS mobile
        FROM jobs
        ORDER BY id DESC
        """
    )
    jobs = [dict(row) for row in cur.fetchall()]
    conn.close()
    return jobs


def fetch_user(user_id):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(
        """
        SELECT id, username, location, education, skills
        FROM users
        WHERE id = ?
        """,
        (user_id,),
    )
    user = cur.fetchone()
    conn.close()
    return dict(user) if user else None


init_db()


@app.route("/")
@app.route("/en")
@app.route("/hi")
@app.route("/te")
def index():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "SELECT id FROM users WHERE username = ? AND password = ?",
            (username, password),
        )
        user = cur.fetchone()
        conn.close()

        if user:
            session["user_id"] = user[0]
            return redirect(url_for("dashboard"))

        error = "Invalid username or password"

    return render_template("login.html", error=error)


@app.route("/register", methods=["GET", "POST"])
def register():
    error = None

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        location = request.form.get("location", "").strip()
        education = request.form.get("education", "").strip()
        skills = request.form.get("skills", "").strip()

        try:
            conn = get_connection()
            cur = conn.cursor()
            cur.execute(
                """
                INSERT INTO users (username, password, location, education, skills)
                VALUES (?, ?, ?, ?, ?)
                """,
                (username, password, location, education, skills),
            )
            conn.commit()
            conn.close()
            return redirect("/login")
        except sqlite3.IntegrityError:
            error = "Username already exists"

    return render_template("register.html", error=error)


@app.route("/welcome")
def welcome():
    return render_template("welcome.html")


@app.route("/required_skills")
def required_skills():
    unskilled_jobs = [
        {
            "title": "Farm Laborer",
            "skills": "Physical strength, basic farming knowledge, teamwork",
        },
        {
            "title": "Dairy Farm Helper",
            "skills": "Animal handling, cleaning, feeding support",
        },
        {
            "title": "Agricultural Field Worker",
            "skills": "Crop work basics, tool handling, stamina",
        },
        {
            "title": "Plantation Worker",
            "skills": "Plant care, harvesting skills, discipline",
        },
        {
            "title": "Construction Helper",
            "skills": "Lifting materials, following instructions",
        },
        {
            "title": "MGNREGA Worker",
            "skills": "Manual work skills, punctuality",
        },
        {
            "title": "Loader / Unloader",
            "skills": "Strength, safety awareness",
        },
        {
            "title": "Cleaning & Sanitation Worker",
            "skills": "Hygiene knowledge, consistency",
        },
        {
            "title": "Watchman",
            "skills": "Alertness, basic communication",
        },
        {
            "title": "Animal Shed Cleaner",
            "skills": "Cleanliness, waste handling",
        },
    ]

    skilled_jobs = [
        {
            "title": "Farmer / Crop Grower",
            "skills": "Crop planning, soil knowledge, irrigation",
        },
        {
            "title": "Dairy Farmer",
            "skills": "Animal care, milking, feed management",
        },
        {
            "title": "Poultry Farmer",
            "skills": "Bird care, disease control, feeding",
        },
        {
            "title": "Fish Farmer",
            "skills": "Pond management, fish feeding, water quality",
        },
        {
            "title": "Tractor Driver",
            "skills": "Driving skill, machine handling, safety",
        },
        {
            "title": "Electrician",
            "skills": "Wiring, fault detection, safety rules",
        },
        {
            "title": "Plumber",
            "skills": "Pipe fitting, leakage repair",
        },
        {
            "title": "Carpenter",
            "skills": "Wood cutting, measuring, tool use",
        },
        {
            "title": "Mason",
            "skills": "Brick laying, cement mixing",
        },
        {
            "title": "Tailor",
            "skills": "Stitching, measuring, machine handling",
        },
        {
            "title": "Handloom Weaver",
            "skills": "Loom operation, design skills",
        },
        {
            "title": "Pottery Maker",
            "skills": "Clay shaping, firing techniques",
        },
        {
            "title": "Mobile Repair Technician",
            "skills": "Hardware repair, troubleshooting",
        },
        {
            "title": "Veterinary Assistant",
            "skills": "Animal health care, injections, record keeping",
        },
    ]

    return render_template(
        "required_skills.html",
        unskilled_jobs=unskilled_jobs,
        skilled_jobs=skilled_jobs,
    )


@app.route("/dashboard")
def dashboard():
    user_id = session.get("user_id")
    if not user_id:
        return redirect(url_for("login"))

    user = fetch_user(user_id)
    if not user:
        session.clear()
        return redirect(url_for("login"))

    recommended_jobs = match_jobs(user.get("skills", ""), user.get("location", ""))
    return render_template(
        "dashboard.html",
        user=user,
        recommended_jobs=recommended_jobs[:5],
    )


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.route("/result", methods=["GET", "POST"])
def result():
    jobs = []
    skills = ""
    location = ""

    if request.method == "POST":
        skills = request.form.get("skills", "").strip()
        location = request.form.get("location", "").strip()
        if skills or location:
            jobs = match_jobs(skills, location)

    return render_template(
        "result.html",
        jobs=jobs,
        skills=skills,
        location=location,
        searched=request.method == "POST",
    )


@app.route("/add_job", methods=["GET", "POST"])
def add_job():
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        skills = request.form.get("skills", "").strip()
        location = request.form.get("location", "").strip()
        mobile = request.form.get("mobile", "").strip()

        if title and skills and location and mobile:
            conn = get_connection()
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO jobs (title, skills, location, mobile) VALUES (?, ?, ?, ?)",
                (title, skills, location, mobile),
            )
            conn.commit()
            conn.close()
            return redirect("/all_jobs")

    return render_template("add_job.html")


@app.route("/all_jobs")
def all_jobs():
    return render_template("all_job_list.html", jobs=fetch_all_jobs())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
