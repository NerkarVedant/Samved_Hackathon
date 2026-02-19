# Project SANJEEVANI - Hospital Management Backend

A complete backend MVP for a hospital management system with role-based access control, appointment booking, symptom reporting, and area risk assessment.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization** - JWT-based secure authentication
- **Role-Based Access Control (RBAC)** - 4 user roles: SUPER_ADMIN, HOSPITAL_ADMIN, DOCTOR, CITIZEN
- **Hospital Management** - Manage hospitals, beds availability
- **Doctor Management** - Assign doctors to hospitals with specializations
- **Appointment System** - Citizens can book appointments with doctors
- **Symptom Reporting** - Track disease outbreaks by area
- **Area Risk Assessment** - Automatic risk level calculation based on symptom reports
- **Citizen Profiles** - Extended user profiles with health information

### Technical Features
- Spring Boot 4.0.2
- MongoDB Database
- JWT Token Authentication
- BCrypt Password Encryption
- Input Validation
- Global Exception Handling
- RESTful API Design

---

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MongoDB (Local or Cloud - MongoDB Atlas)
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

---

## 🛠️ Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Backend
```

### 2. Configure MongoDB
Edit `src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017
spring.data.mongodb.database=sanjeevani
```

Or use MongoDB Atlas (Cloud):
```properties
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
spring.data.mongodb.database=sanjeevani
```

### 3. Build the Project
```bash
mvn clean install
```

### 4. Run the Application
```bash
mvn spring-boot:run
```

Or run the JAR directly:
```bash
java -jar target/hackathon-0.0.1-SNAPSHOT.jar
```

The application will start on **http://localhost:8080**

---

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Quick Start Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/users/profile` | Update citizen profile | ✅ |
| GET | `/api/areas` | Get all areas | ❌ |
| GET | `/api/hospitals` | Get all hospitals | ❌ |
| GET | `/api/doctors` | Get all doctors | ❌ |
| POST | `/api/appointments` | Book appointment | ✅ (CITIZEN) |
| POST | `/api/symptoms/report` | Report symptoms | ✅ (CITIZEN/DOCTOR) |
| GET | `/api/dashboard/area-risk/{areaId}` | Get area risk level | ❌ |

---

## 🎭 User Roles & Permissions

### SUPER_ADMIN
- Create areas
- Create hospitals
- View all symptom reports
- Full system access

### HOSPITAL_ADMIN
- Create doctor profiles
- Manage hospital staff
- View hospital data

### DOCTOR
- View appointments
- Update appointment status
- Report symptoms
- View patient data

### CITIZEN (Default Role)
- Register and login
- Update personal profile
- Book appointments
- Report symptoms
- View own appointments

---

## 🏥 Business Logic

### Area Risk Assessment

The system automatically calculates risk levels for areas based on symptom reports:

- **HIGH Risk** 🔴
  - More than 5 HIGH severity symptom reports in last 48 hours
  
- **MEDIUM Risk** 🟡
  - More than 5 total symptom reports in last 48 hours
  
- **LOW Risk** 🟢
  - 5 or fewer symptom reports in last 48 hours

**Formula:**
```
IF (high_severity_reports_48h > 5) THEN "HIGH"
ELSE IF (total_reports_48h > 5) THEN "MEDIUM"
ELSE "LOW"
```

---

## 📊 Database Collections

The application uses MongoDB with the following collections:

1. **users** - User accounts with authentication
2. **areas** - Geographic areas/wards
3. **hospitals** - Hospital information
4. **doctors** - Doctor profiles linked to users
5. **citizen_profiles** - Extended citizen information
6. **appointments** - Appointment bookings
7. **symptom_reports** - Disease symptom tracking

---

## 🔒 Security

- **Password Encryption:** BCrypt hashing
- **JWT Tokens:** 24-hour expiration
- **Stateless Authentication:** No server-side sessions
- **Role-Based Authorization:** Method-level security with @PreAuthorize
- **Input Validation:** Jakarta Validation annotations
- **CORS:** Configured for cross-origin requests

---

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

### Using Postman

1. Import the collection (create from API_DOCUMENTATION.md)
2. Set base URL: `http://localhost:8080`
3. For protected endpoints, add header:
   - Key: `Authorization`
   - Value: `Bearer <your-jwt-token>`

---

## 📁 Project Structure

```
Backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/Samved/Hackathon/
│   │   │       ├── config/              # Security configuration
│   │   │       ├── controller/          # REST controllers
│   │   │       ├── dto/                 # Data transfer objects
│   │   │       ├── entity/              # MongoDB entities
│   │   │       │   └── enums/           # Enum types
│   │   │       ├── exception/           # Global exception handler
│   │   │       ├── repository/          # MongoDB repositories
│   │   │       ├── security/            # JWT & security classes
│   │   │       └── service/             # Business logic
│   │   └── resources/
│   │       └── application.properties   # Configuration
│   └── test/                            # Test files
├── target/                              # Compiled files
├── pom.xml                              # Maven dependencies
├── API_DOCUMENTATION.md                 # Complete API docs
└── README.md                            # This file
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill existing Java processes
Get-Process -Name "java" | Stop-Process -Force
```

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in application.properties
- For MongoDB Atlas, check network access and credentials

### JWT Token Expired
- Token validity is 24 hours
- Login again to get a new token

### Build Errors
```bash
# Clean and rebuild
mvn clean install -U
```

---

## 🚦 Application Status

### Health Check
Visit: `http://localhost:8080/api/areas` (public endpoint)

### Logs
Application logs are printed to console with INFO level.

---

## 🔄 Development Workflow

1. **Make changes** to Java files
2. **Rebuild:** `mvn clean install`
3. **Restart** the application
4. **Test** endpoints with Postman/cURL

For auto-restart during development, the project includes Spring DevTools.

---

## 📝 Environment Variables

Configure in `application.properties`:

```properties
# Server
server.port=8080

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017
spring.data.mongodb.database=sanjeevani

# JWT
jwt.secret=sanjeevaniSecretKeyForJwtTokenGenerationAndValidation2026
jwt.expiration=86400000

# Logging
logging.level.com.Samved.Hackathon=INFO
```

---

## 👥 Contributors

- **Vedant Prashant Nerkar** - AISSMS COE

---

## 📄 License

This project is for educational/hackathon purposes.

---

## 🎯 Next Steps for Production

- [ ] Add pagination for list endpoints
- [ ] Implement refresh tokens
- [ ] Add rate limiting
- [ ] Set up proper CORS configuration
- [ ] Add comprehensive unit tests
- [ ] Set up CI/CD pipeline
- [ ] Add API documentation with Swagger
- [ ] Implement logging framework (SLF4J)
- [ ] Add monitoring and health checks
- [ ] Deploy to cloud (AWS, Azure, GCP)

---

## 🆘 Support

For issues or questions:
1. Check API_DOCUMENTATION.md
2. Review application logs
3. Check MongoDB connection
4. Verify JWT token is valid

---

**Happy Coding! 🚀**

