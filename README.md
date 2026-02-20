# 🏥 Project SANJEEVANI - Hospital Management System

<div align="center">

**A comprehensive hospital management platform with role-based access control, appointment booking, symptom reporting, and area-wise disease outbreak tracking.**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Educational-orange.svg)](LICENSE)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [User Roles & Permissions](#-user-roles--permissions)
- [Design System](#-design-system)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🌟 Overview

**Project SANJEEVANI** is a modern, full-stack hospital management system designed to streamline healthcare operations. The platform enables efficient management of hospitals, doctors, patient appointments, and tracks disease outbreaks by geographical area.

### Key Highlights

- 🔐 **Secure Authentication** - JWT-based authentication with role-based access control
- 🏥 **Hospital Management** - Comprehensive hospital and doctor profile management
- 📅 **Appointment System** - Easy appointment booking and tracking
- 🦠 **Symptom Reporting** - Real-time disease outbreak monitoring
- 📊 **Risk Assessment** - Automatic area-wise risk level calculation
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔄 **RESTful API** - Well-documented REST API endpoints

---

## ✨ Features

### For Citizens
- ✅ Register and create profiles with health information
- ✅ Book appointments with doctors by specialty
- ✅ Report symptoms for disease tracking
- ✅ View personal appointment history
- ✅ Check area-wise health risk levels

### For Doctors
- ✅ View and manage appointments
- ✅ Update appointment status
- ✅ Report patient symptoms
- ✅ Access patient health records

### For Hospital Administrators
- ✅ Create and manage doctor profiles
- ✅ Assign doctors to hospitals
- ✅ Manage hospital staff
- ✅ Track hospital operations

### For Super Admins
- ✅ Create and manage areas/wards
- ✅ Create and manage hospitals
- ✅ View all system data
- ✅ Full system administration

---

## 🛠️ Technology Stack

### Backend
- **Framework:** Spring Boot 4.0.2
- **Language:** Java 17
- **Database:** MongoDB
- **Security:** Spring Security + JWT
- **Build Tool:** Maven
- **Libraries:**
  - Lombok - Reduce boilerplate code
  - BCrypt - Password encryption
  - Jakarta Validation - Input validation

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.18
- **Routing:** React Router DOM 7.13.0
- **Storage:** React Secure Storage
- **Fonts:** Inter (headings), Source Sans 3 (body)

### DevOps & Tools
- **Version Control:** Git
- **API Testing:** Postman/cURL
- **Development:** Hot reload with Vite & Spring DevTools

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Client Layer                       │
│              (React + Vite + Tailwind CSS)              │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP/REST
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   API Gateway Layer                      │
│               (Spring Boot REST Controllers)             │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  Security Layer                          │
│           (JWT Authentication + RBAC)                    │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                 Business Logic Layer                     │
│              (Services + Domain Logic)                   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                 Data Access Layer                        │
│           (MongoDB Repositories + Models)                │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    Database                              │
│                    (MongoDB)                             │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Prerequisites

### Required Software
- **Java Development Kit (JDK):** 17 or higher
- **Node.js:** 16.x or higher
- **npm:** 8.x or higher
- **Maven:** 3.6+ (or use included Maven wrapper)
- **MongoDB:** 5.0+ (Local installation or MongoDB Atlas account)

### Optional Tools
- **IDE:** IntelliJ IDEA, Eclipse, VS Code
- **API Client:** Postman, Insomnia, or Thunder Client
- **Git Client:** Git Bash, GitHub Desktop

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/NerkarVedant/Samved_Hackathon.git
cd Samved_Hackathon
```

### 2. Setup Backend

```bash
cd Backend

# Configure MongoDB connection
# Edit src/main/resources/application.properties
# Update MongoDB URI and database name

# Install dependencies and build
mvn clean install

# Run the backend server
mvn spring-boot:run
```

Backend will start on: **http://localhost:8080**

### 3. Setup Frontend

```bash
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on: **http://localhost:5173** (or as shown in terminal)

### 4. Initial Setup

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Register a Super Admin** (via API or manual MongoDB insert)

3. **Create Areas and Hospitals** through the admin interface

4. **Add Doctors** through hospital admin accounts

5. **Ready to Use!** Citizens can now register and book appointments

---

## 📁 Project Structure

```
Samved_Hackathon/
│
├── Backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/Samved/Hackathon/
│   │   │   │   ├── config/           # Security & app configuration
│   │   │   │   ├── controller/       # REST API endpoints
│   │   │   │   ├── dto/              # Data transfer objects
│   │   │   │   ├── entity/           # MongoDB document models
│   │   │   │   ├── exception/        # Global exception handling
│   │   │   │   ├── repository/       # Data access layer
│   │   │   │   ├── security/         # JWT & authentication
│   │   │   │   └── service/          # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                     # Unit & integration tests
│   ├── pom.xml                       # Maven dependencies
│   ├── README.md                     # Backend documentation
│   └── API_DOCUMENTATION.md          # Detailed API docs
│
├── Frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Page components
│   │   ├── layouts/                  # Layout components
│   │   ├── routes/                   # Route definitions
│   │   ├── utils/                    # Utility functions
│   │   ├── data/                     # Static data/constants
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static assets
│   ├── package.json                  # npm dependencies
│   ├── vite.config.js                # Vite configuration
│   └── README.md                     # Frontend documentation
│
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

---

## 👥 User Roles & Permissions

### 🔴 SUPER_ADMIN
**Highest level access** - System-wide administration
- Create and manage geographical areas
- Create and manage hospitals
- View all system data and reports
- Access to all administrative functions

### 🟠 HOSPITAL_ADMIN
**Hospital management** - Manage hospital operations
- Create and manage doctor profiles
- Assign doctors to departments
- View hospital-specific data
- Manage hospital staff

### 🔵 DOCTOR
**Medical professional** - Patient care and management
- View and manage appointments
- Update appointment status
- Report patient symptoms
- Access patient health records
- View assigned hospital information

### 🟢 CITIZEN (Default)
**General user** - Access healthcare services
- Register and create profile
- Update personal information
- Book appointments with doctors
- Report personal symptoms
- View appointment history
- Check area risk levels

---

## 🎨 Design System

### Color Palette

Our application uses a clean, professional color scheme optimized for healthcare applications:

| Purpose          | Color Name  | Hex Code  | Usage                          |
|------------------|-------------|-----------|--------------------------------|
| Background       | Clean White | `#FFFFFF` | Main page background           |
| Surface / Card   | Soft Gray   | `#F5F7F9` | Cards, sections, panels        |
| Border / Divider | Cool Gray   | `#D6DCE2` | Borders, dividers, separators  |
| Primary Text     | Charcoal    | `#1F2933` | Headings, important text       |
| Secondary Text   | Slate Gray  | `#4B5563` | Body text, descriptions        |
| Disabled Text    | Muted Gray  | `#9CA3AF` | Disabled elements, hints       |

### Typography

**Fonts:**
- **Headings:** Inter (clean, modern sans-serif)
- **Body Text:** Source Sans 3 (readable, professional)

**Font Sizes:**

| Element         | Size        | Weight     | Usage                |
|-----------------|-------------|------------|----------------------|
| H1              | 28–32px     | Bold       | Page titles          |
| H2              | 22–24px     | Semibold   | Section headings     |
| Body            | 16px (base) | Regular    | Main content         |
| Small Text      | 14px        | Regular    | Captions, labels     |
| Button Text     | 16px        | Medium     | Interactive elements |

### Design Principles
- ✅ **Accessibility:** WCAG 2.1 AA compliant color contrast
- ✅ **Responsiveness:** Mobile-first, adaptive layouts
- ✅ **Consistency:** Unified component library
- ✅ **Clarity:** Clear visual hierarchy

---

## 📚 API Documentation

The backend exposes a comprehensive REST API. For detailed API documentation, refer to:

📄 **[Backend/API_DOCUMENTATION.md](./Backend/API_DOCUMENTATION.md)**

### Quick API Reference

#### Authentication Endpoints
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login user
```

#### User Management
```
POST /api/users/profile    - Update citizen profile
GET  /api/users/me         - Get current user info
```

#### Hospital & Doctor Management
```
GET  /api/areas            - List all areas
POST /api/areas            - Create area (SUPER_ADMIN)
GET  /api/hospitals        - List all hospitals
POST /api/hospitals        - Create hospital (SUPER_ADMIN)
GET  /api/doctors          - List all doctors
POST /api/doctors          - Create doctor (HOSPITAL_ADMIN)
```

#### Appointments
```
POST /api/appointments     - Book appointment (CITIZEN)
GET  /api/appointments     - Get user appointments
PUT  /api/appointments/:id - Update appointment (DOCTOR)
```

#### Symptom Reporting & Risk Assessment
```
POST /api/symptoms/report          - Report symptoms
GET  /api/dashboard/area-risk/:id  - Get area risk level
```

### Authentication
Protected endpoints require JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🧪 Testing

### Backend Testing

```bash
cd Backend

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn clean test jacoco:report
```

### Frontend Testing

```bash
cd Frontend

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Manual Testing

1. **API Testing with cURL:**
   ```bash
   # Register user
   curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"Test123"}'
   
   # Login
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123"}'
   ```

2. **Postman Collection:**
   Import the API endpoints from `API_DOCUMENTATION.md` into Postman for interactive testing.

3. **UI Testing:**
   - Navigate to http://localhost:5173
   - Test registration, login, and user flows
   - Verify responsive design on different screen sizes

---

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**Problem: Port 8080 already in use**
```bash
# Windows
Get-Process -Name "java" | Stop-Process -Force

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

**Problem: MongoDB connection refused**
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `application.properties`
- For MongoDB Atlas, check network access whitelist

**Problem: JWT token expired**
- Tokens expire after 24 hours
- Login again to get a new token

**Problem: Build fails**
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests
```

#### Frontend Issues

**Problem: npm install fails**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem: Vite dev server won't start**
```bash
# Check if port 5173 is in use
lsof -ti:5173 | xargs kill -9  # Linux/Mac
```

**Problem: API calls fail from frontend**
- Check CORS configuration in backend
- Verify backend is running on port 8080
- Check API URLs in frontend configuration

#### Database Issues

**Problem: MongoDB authentication failed**
- Verify username/password in connection string
- Check database permissions
- For Atlas, verify cluster credentials

**Problem: Data not persisting**
- Check MongoDB is running and accessible
- Verify database name in configuration
- Check collection permissions

### Getting Help

1. Check the relevant README files:
   - [Backend README](./Backend/README.md)
   - [Frontend README](./Frontend/README.md)

2. Review application logs:
   - Backend: Console output or logs directory
   - Frontend: Browser console (F12)

3. Verify configuration:
   - Backend: `application.properties`
   - Frontend: Environment variables

4. Check API documentation:
   - [API_DOCUMENTATION.md](./Backend/API_DOCUMENTATION.md)

---

## 📈 Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Backend: Edit Java files in `Backend/src`
   - Frontend: Edit React components in `Frontend/src`

3. **Test changes**
   - Backend: `mvn test`
   - Frontend: `npm run lint` and manual testing

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request** on GitHub

### Hot Reload

- **Backend:** Spring DevTools enables automatic restart on file changes
- **Frontend:** Vite provides instant HMR (Hot Module Replacement)

---

## 🚀 Deployment

### Production Build

#### Backend
```bash
cd Backend
mvn clean package
java -jar target/hackathon-0.0.1-SNAPSHOT.jar
```

#### Frontend
```bash
cd Frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Environment Variables

Configure for production:

**Backend (`application.properties`):**
```properties
server.port=8080
spring.data.mongodb.uri=<production-mongodb-uri>
spring.data.mongodb.database=sanjeevani
jwt.secret=<strong-secret-key>
jwt.expiration=86400000
```

**Frontend:**
- Update API base URL to production backend URL
- Configure environment-specific settings

---

## 👨‍💻 Contributors

- **Vedant Prashant Nerkar** - Developer - AISSMS College of Engineering

---

## 📄 License

This project is developed for educational and hackathon purposes. 

---

## 🎯 Future Enhancements

- [ ] Add pagination for large data sets
- [ ] Implement refresh token mechanism
- [ ] Add rate limiting for API endpoints
- [ ] Email notifications for appointments
- [ ] SMS alerts for high-risk areas
- [ ] Real-time updates with WebSockets
- [ ] Mobile application (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] PDF report generation
- [ ] Integration with external health APIs
- [ ] Telemedicine video consultation
- [ ] Prescription management system
- [ ] Insurance integration

---

## 🌐 Additional Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [React Documentation](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [JWT Introduction](https://jwt.io/introduction)

---

## 📞 Support

For questions, issues, or contributions:

1. **Issues:** Open an issue on GitHub
2. **Documentation:** Check the docs in `Backend/` and `Frontend/` folders
3. **Email:** Contact the development team

---

<div align="center">

**Built with ❤️ for better healthcare management**

⭐ Star this repository if you find it helpful!

</div>
