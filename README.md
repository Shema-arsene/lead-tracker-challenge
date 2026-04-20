Lead Tracker CRM - Full Stack Application

## Tech Stack

Backend: NestJS, MongoDB, Mongoose
Frontend: Next.js, Tailwind CSS
Database: MongoDB
Container: Docker, Docker Compose

# APIs

Frontend: http://localhost:3000
Backend API: http://localhost:10000/api
API Docs: http://localhost:10000/api/docs

# How to run Locally

## Backend

cd backend
npm install
npm run start:dev

## Frontend

cd frontend
npm install
npm run dev

## Docker

docker compose up --build

# Environment Variables

## Backend (backend/.env)

MONGODB_URI=mongodb:URI/lead-tracker
PORT=10000

## Frontend (frontend/.env.local)

NEXT_PUBLIC_API_URL=http://localhost:10000/api

# API Examples

## Create lead

POST /api/leads
{
"name": "Bob Johnson",
"email": "bob@startup.io",
"company": "Startup Inc",
"status": "IN_PROGRESS",
"value": 100000,
"notes": "Hot lead, ready to close"
}

## Update Lead

PATCH /api/leads/{leadId}
Content-Type: application/json

{
"status": "CONTACTED",
"value": 150000
}

## Delete Lead

DELETE /api/leads/{leadId}

## List leads

GET /api/leads?page=1&limit=10 - (Get all leads)
GET /api/leads?q=john - Search by name/company
GET /api/leads?status=NEW - Search by status

## Add comment

POST /api/leads/{leadId}/comments
{
"text": "Great lead!"
}

## Get Lead Comments

GET /api/leads/{leadId}/comments

# Production Build

## Backend

cd backend
npm run build
npm run start:prod

## frontend

cd frontend
npm run build
npm run start

# Demo URLs:

## Web app

https://lead-tracker-challenge.vercel.app/

## API

https://lead-tracker-challenge.onrender.com/

## Swagger

- **Local Swagger**: http://localhost:10000/api/docs#/
- **Live Swagger**: https://lead-tracker-challenge.onrender.com/api/docs
