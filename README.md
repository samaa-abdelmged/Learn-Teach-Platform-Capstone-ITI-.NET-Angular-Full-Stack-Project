# Learn & Teach Platform – Capstone ITI Full Stack Project

Learn & Teach is a full-stack peer-to-peer learning platform that connects learners with contributors who want to share knowledge and skills.

The platform allows users to request learning topics, participate in live sessions, share knowledge through summaries or videos, and build a trusted community based on contribution, reputation, and collaboration.

This project was developed as a Capstone Project during the ITI training program by a team of 6 developers.

The system includes two frontend applications (Admin Dashboard and User Platform) powered by a scalable ASP.NET Core Web API backend.

--------------------------------------------------

System Architecture

User Frontend (Angular)
Admin Dashboard (Angular)
            ↓
      ASP.NET Core Web API
            ↓
        SQL Server Database

The backend serves both frontend applications through RESTful APIs.

--------------------------------------------------

Technologies Used

Frontend
Angular
TypeScript
HTML5
CSS3
Tailwind

Backend
C#
ASP.NET Core Web API
Entity Framework Core
LINQ

Database
SQL Server

Security
JWT Authentication
ASP.NET Core Identity
Email Verification

Development Tools
AutoMapper
FluentValidation
Git
GitHub

API Testing
Swagger
Postman

--------------------------------------------------

Core Features

User Authentication
User registration and login using JWT authentication
Secure password management using ASP.NET Core Identity
Email verification for account confirmation

User Profiles
Create and manage personal profiles
Add skills to teach and skills to learn
Build reputation through ratings and reviews

Learning Requests
Users can request topics they want to learn
Contributors can respond with learning sessions or content

Live Learning Sessions
Integration with Zoom for real-time learning sessions
Session scheduling and participation

Content Contribution
Upload summaries or videos after learning sessions
Build a shared knowledge library

Communication
In-app chat between learners and contributors
Email notifications
SMS notifications
Real-time updates and alerts

Language Support
Arabic and English interface
Built-in translation support between languages

UI Features
Dark Mode and Light Mode
Responsive design for different devices

Trust and Verification
Email confirmation
User verification
Ratings and review system
Content moderation and reporting

Payments
Integration with Paymob for payment processing
Diamond system for accessing sessions and premium features

--------------------------------------------------

Backend Architecture
The backend follows Clean Architecture and SOLID principles to ensure scalability, maintainability, and separation of concerns.

Key practices implemented:
Input validation using FluentValidation
Object mapping using AutoMapper
Consistent API responses using ApiResponseMiddleware
Layered architecture separating Domain, Application, Infrastructure, and API

--------------------------------------------------

Admin Dashboard

Admin panel allows administrators to:

Monitor platform activity
Manage users and reports
Moderate uploaded content
Review reported violations
Track engagement and platform performance

--------------------------------------------------

Team Collaboration

This project was developed by a team of 6 developers as part of the ITI Capstone program.

The team collaborated on:
Backend API development
Frontend development
Database design
Feature implementation
Testing and debugging
System integration
