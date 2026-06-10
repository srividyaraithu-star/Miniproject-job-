import sqlite3
import re
from difflib import SequenceMatcher

import pandas as pd


def normalize_token(word):
    word = word.lower().strip()
    if len(word) > 3 and word.endswith("s"):
        word = word[:-1]
    return word


def tokenize(text):
    return {
        normalize_token(word)
        for word in re.findall(r"[a-zA-Z0-9]+", text or "")
        if word.strip()
    }


def text_match_score(job_text, user_text):
    user_tokens = tokenize(user_text)
    job_tokens = tokenize(job_text)

    if not user_tokens:
        return 0
    if not job_tokens:
        return 0

    exact_matches = len(user_tokens & job_tokens)
    score = exact_matches / len(user_tokens)

    # Give partial credit for close spellings like "basic" and "basics".
    for user_token in user_tokens - job_tokens:
        if any(SequenceMatcher(None, user_token, job_token).ratio() >= 0.82 for job_token in job_tokens):
            score += 0.5 / len(user_tokens)

    return min(score, 1)


def location_match_score(job_location, user_location):
    job_location = (job_location or "").strip().lower()
    user_location = (user_location or "").strip().lower()

    if not user_location:
        return 0
    if job_location == user_location:
        return 1
    if user_location in job_location or job_location in user_location:
        return 0.7

    user_words = tokenize(user_location)
    job_words = tokenize(job_location)
    if not user_words:
        return 0

    exact_score = len(user_words & job_words) / len(user_words)
    if exact_score > 0:
        return exact_score

    # Give partial credit for small spelling differences in place names.
    close_matches = 0
    for user_word in user_words:
        if any(SequenceMatcher(None, user_word, job_word).ratio() >= 0.82 for job_word in job_words):
            close_matches += 1

    return (close_matches / len(user_words)) * 0.7


def match_message(skill_score, location_score, user_skills, user_location):
    skill_ok = skill_score > 0
    location_ok = location_score > 0

    if user_skills and user_location:
        if skill_ok and location_ok:
            return "Skills and location are matching"
        if skill_ok:
            return "Skills are matching, but location is not matching"
        if location_ok:
            return "Location is matching, but skills are not matching"
        return "Skills and location are not matching"

    if user_skills:
        return "Skills are matching" if skill_ok else "Skills are not matching"

    if user_location:
        return "Location is matching" if location_ok else "Location is not matching"

    return "No search details entered"


def match_jobs(user_skills, user_location):
    conn = sqlite3.connect("database.db")

    # Load jobs into DataFrame
    df = pd.read_sql_query("SELECT * FROM jobs", conn)
    conn.close()

    if df.empty:
        return []

    df["skills"] = df["skills"].fillna("")
    df["location"] = df["location"].fillna("")
    df["title"] = df["title"].fillna("")

    user_skills = (user_skills or "").strip()
    user_location = (user_location or "").strip()
    if not user_skills and not user_location:
        return []

    skill_scores = [
        text_match_score(f"{title} {skills}", user_skills)
        for title, skills in zip(df["title"].tolist(), df["skills"].tolist())
    ]

    location_scores = [
        location_match_score(location, user_location)
        for location in df["location"].tolist()
    ]

    if user_skills and user_location:
        final_scores = [(skill * 0.75) + (location * 0.25) for skill, location in zip(skill_scores, location_scores)]
    elif user_skills:
        final_scores = skill_scores
    else:
        final_scores = location_scores

    df["score"] = final_scores
    df["match_score"] = (df["score"] * 100).round().astype(int)
    df["match_message"] = [
        match_message(skill, location, user_skills, user_location)
        for skill, location in zip(skill_scores, location_scores)
    ]

    df = df.sort_values(by="score", ascending=False)

    # Filter only good matches
    df = df[df["score"] > 0]

    # Convert to list of dict
    if "mobile" not in df.columns:
        df["mobile"] = ""
    else:
        df["mobile"] = df["mobile"].fillna("")

    result = df[["title", "skills", "location", "mobile", "match_score", "match_message"]].to_dict(orient="records")

    return result
