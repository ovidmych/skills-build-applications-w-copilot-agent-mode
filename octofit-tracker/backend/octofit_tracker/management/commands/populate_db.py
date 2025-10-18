from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models
from django.conf import settings
from pymongo import MongoClient

# Sample data
USERS = [
    {"username": "Tony Stark", "email": "tony@marvel.com", "team": "marvel"},
    {"username": "Steve Rogers", "email": "steve@marvel.com", "team": "marvel"},
    {"username": "Bruce Wayne", "email": "bruce@dc.com", "team": "dc"},
    {"username": "Clark Kent", "email": "clark@dc.com", "team": "dc"},
]
TEAMS = [
    {"name": "marvel", "members": ["tony@marvel.com", "steve@marvel.com"]},
    {"name": "dc", "members": ["bruce@dc.com", "clark@dc.com"]},
]
ACTIVITIES = [
    {"user": "tony@marvel.com", "type": "Running", "calories": 300, "date": "2024-06-01"},
    {"user": "bruce@dc.com", "type": "Cycling", "calories": 450, "date": "2024-06-02"},
]
LEADERBOARD = [
    {"team": "marvel", "points": 100, "rank": 1},
    {"team": "dc", "points": 90, "rank": 2},
]
WORKOUTS = [
    {"description": "Pushups", "suggested_for": "easy"},
    {"description": "Squats", "suggested_for": "medium"},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient("mongodb://localhost:27017")
        db = client["octofit_db"]

        # Clean up collections
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Insert test data
        db.users.insert_many(USERS)
        db.teams.insert_many(TEAMS)
        db.activities.insert_many(ACTIVITIES)
        db.leaderboard.insert_many(LEADERBOARD)
        db.workouts.insert_many(WORKOUTS)

        # Ensure unique index on email
        db.users.create_index("email", unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
