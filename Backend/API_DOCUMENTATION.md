# Project SANJEEVANI - API Documentation

## Base URL
```
http://localhost:8080
```

## Authentication
Most endpoints require JWT authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 1. AUTH APIs

### 1.1 Register User
**Endpoint:** `POST /api/auth/register`  
**Description:** Register a new user (default role: CITIZEN)  
**Authentication:** Not required

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "CITIZEN",
  "areaId": "area123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": "65f1234567890abcdef12345",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "CITIZEN",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Roles:** SUPER_ADMIN, HOSPITAL_ADMIN, DOCTOR, CITIZEN

---

### 1.2 Login
**Endpoint:** `POST /api/auth/login`  
**Description:** Login with email and password  
**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "userId": "65f1234567890abcdef12345",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "CITIZEN",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. USER PROFILE APIs

### 2.1 Update Citizen Profile
**Endpoint:** `POST /api/users/profile`  
**Description:** Create or update citizen profile details  
**Authentication:** Required

**Request Body:**
```json
{
  "age": 30,
  "gender": "MALE",
  "phoneNumber": "+91-9876543210",
  "address": "123 Main Street, Mumbai"
}
```

**Response:**
```json
{
  "id": "profile123",
  "user": {
    "id": "user123",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "age": 30,
  "gender": "MALE",
  "phoneNumber": "+91-9876543210",
  "address": "123 Main Street, Mumbai"
}
```

---

### 2.2 Get My Profile
**Endpoint:** `GET /api/users/profile`  
**Description:** Get current user's citizen profile  
**Authentication:** Required

**Response:**
```json
{
  "id": "profile123",
  "user": {
    "id": "user123",
    "username": "john_doe"
  },
  "age": 30,
  "gender": "MALE",
  "phoneNumber": "+91-9876543210",
  "address": "123 Main Street, Mumbai"
}
```

---

## 3. AREA APIs

### 3.1 Get All Areas
**Endpoint:** `GET /api/areas`  
**Description:** Get list of all areas  
**Authentication:** Not required

**Response:**
```json
[
  {
    "id": "area123",
    "wardNumber": "W001",
    "name": "Koregaon Park"
  },
  {
    "id": "area124",
    "wardNumber": "W002",
    "name": "Viman Nagar"
  }
]
```

---

### 3.2 Create Area
**Endpoint:** `POST /api/areas`  
**Description:** Create a new area  
**Authentication:** Required (SUPER_ADMIN only)

**Request Body:**
```json
{
  "wardNumber": "W001",
  "name": "Koregaon Park"
}
```

**Response:**
```json
{
  "id": "area123",
  "wardNumber": "W001",
  "name": "Koregaon Park"
}
```

---

## 4. HOSPITAL APIs

### 4.1 Get All Hospitals
**Endpoint:** `GET /api/hospitals`  
**Description:** Get list of all hospitals  
**Authentication:** Not required

**Response:**
```json
[
  {
    "id": "hospital123",
    "name": "Ruby Hall Clinic",
    "area": {
      "id": "area123",
      "wardNumber": "W001",
      "name": "Koregaon Park"
    },
    "totalBeds": 200,
    "availableBeds": 50
  }
]
```

---

### 4.2 Create Hospital
**Endpoint:** `POST /api/hospitals`  
**Description:** Create a new hospital  
**Authentication:** Required (SUPER_ADMIN only)

**Request Body:**
```json
{
  "name": "Ruby Hall Clinic",
  "areaId": "area123",
  "totalBeds": 200,
  "availableBeds": 50
}
```

**Response:**
```json
{
  "id": "hospital123",
  "name": "Ruby Hall Clinic",
  "area": {
    "id": "area123",
    "wardNumber": "W001",
    "name": "Koregaon Park"
  },
  "totalBeds": 200,
  "availableBeds": 50
}
```

---

## 5. DOCTOR APIs

### 5.1 Get All Doctors
**Endpoint:** `GET /api/doctors`  
**Description:** Get list of all doctors  
**Authentication:** Not required

**Response:**
```json
[
  {
    "id": "doctor123",
    "user": {
      "id": "user123",
      "username": "dr_sharma",
      "email": "sharma@example.com"
    },
    "hospital": {
      "id": "hospital123",
      "name": "Ruby Hall Clinic"
    },
    "specialization": "Cardiology"
  }
]
```

---

### 5.2 Create Doctor
**Endpoint:** `POST /api/doctors`  
**Description:** Assign doctor details to a user with DOCTOR role  
**Authentication:** Required (HOSPITAL_ADMIN only)

**Request Body:**
```json
{
  "userId": "user123",
  "hospitalId": "hospital123",
  "specialization": "Cardiology"
}
```

**Response:**
```json
{
  "id": "doctor123",
  "user": {
    "id": "user123",
    "username": "dr_sharma",
    "email": "sharma@example.com",
    "role": "DOCTOR"
  },
  "hospital": {
    "id": "hospital123",
    "name": "Ruby Hall Clinic"
  },
  "specialization": "Cardiology"
}
```

---

## 6. APPOINTMENT APIs

### 6.1 Create Appointment
**Endpoint:** `POST /api/appointments`  
**Description:** Book an appointment with a doctor  
**Authentication:** Required (CITIZEN only)

**Request Body:**
```json
{
  "doctorId": "doctor123",
  "hospitalId": "hospital123",
  "appointmentDateTime": "2026-02-25T10:00:00"
}
```

**Response:**
```json
{
  "id": "appointment123",
  "citizen": {
    "id": "user123",
    "username": "john_doe"
  },
  "doctor": {
    "id": "doctor123",
    "specialization": "Cardiology"
  },
  "hospital": {
    "id": "hospital123",
    "name": "Ruby Hall Clinic"
  },
  "appointmentDateTime": "2026-02-25T10:00:00",
  "status": "BOOKED",
  "createdAt": "2026-02-19T19:00:00"
}
```

---

### 6.2 Get My Appointments
**Endpoint:** `GET /api/appointments/my`  
**Description:** Get all appointments for current user  
**Authentication:** Required

**Response:**
```json
[
  {
    "id": "appointment123",
    "citizen": {
      "id": "user123",
      "username": "john_doe"
    },
    "doctor": {
      "id": "doctor123",
      "specialization": "Cardiology"
    },
    "hospital": {
      "id": "hospital123",
      "name": "Ruby Hall Clinic"
    },
    "appointmentDateTime": "2026-02-25T10:00:00",
    "status": "BOOKED",
    "createdAt": "2026-02-19T19:00:00"
  }
]
```

---

### 6.3 Update Appointment Status
**Endpoint:** `PUT /api/appointments/{id}/status?status=COMPLETED`  
**Description:** Update appointment status  
**Authentication:** Required (DOCTOR only)

**Query Parameters:**
- `status`: BOOKED | COMPLETED | CANCELLED

**Response:**
```json
{
  "id": "appointment123",
  "citizen": {
    "id": "user123",
    "username": "john_doe"
  },
  "doctor": {
    "id": "doctor123",
    "specialization": "Cardiology"
  },
  "hospital": {
    "id": "hospital123",
    "name": "Ruby Hall Clinic"
  },
  "appointmentDateTime": "2026-02-25T10:00:00",
  "status": "COMPLETED",
  "createdAt": "2026-02-19T19:00:00"
}
```

---

## 7. SYMPTOM REPORT APIs

### 7.1 Report Symptom
**Endpoint:** `POST /api/symptoms/report`  
**Description:** Report symptoms in an area  
**Authentication:** Required (CITIZEN or DOCTOR)

**Request Body:**
```json
{
  "areaId": "area123",
  "symptom": "High fever and cough",
  "severity": "HIGH"
}
```

**Severity:** LOW | HIGH

**Response:**
```json
{
  "id": "report123",
  "reportedBy": {
    "id": "user123",
    "username": "john_doe"
  },
  "area": {
    "id": "area123",
    "wardNumber": "W001",
    "name": "Koregaon Park"
  },
  "symptom": "High fever and cough",
  "severity": "HIGH",
  "reportedAt": "2026-02-19T19:00:00"
}
```

---

### 7.2 Get Symptoms by Area
**Endpoint:** `GET /api/symptoms/area/{areaId}`  
**Description:** Get all symptom reports for a specific area  
**Authentication:** Required (SUPER_ADMIN only)

**Response:**
```json
[
  {
    "id": "report123",
    "reportedBy": {
      "id": "user123",
      "username": "john_doe"
    },
    "area": {
      "id": "area123",
      "wardNumber": "W001",
      "name": "Koregaon Park"
    },
    "symptom": "High fever and cough",
    "severity": "HIGH",
    "reportedAt": "2026-02-19T19:00:00"
  }
]
```

---

## 8. DASHBOARD APIs

### 8.1 Get Area Risk Level
**Endpoint:** `GET /api/dashboard/area-risk/{areaId}`  
**Description:** Calculate risk level for an area based on symptom reports  
**Authentication:** Not required

**Response:**
```json
{
  "totalReports": 12,
  "highSeverityReports": 8,
  "riskLevel": "HIGH"
}
```

**Risk Level Logic:**
- **HIGH**: More than 5 HIGH severity reports in last 48 hours
- **MEDIUM**: More than 5 total reports in last 48 hours
- **LOW**: 5 or fewer reports in last 48 hours

---

## Error Responses

### Validation Error
```json
{
  "fieldName": "Email is required"
}
```

### Authentication Error
```json
{
  "error": "Invalid credentials"
}
```

### Authorization Error
```json
{
  "error": "Access denied: Insufficient permissions"
}
```

### Not Found Error
```json
{
  "error": "Resource not found with id: xyz"
}
```

---

## Testing the API

### Example: Complete User Flow

1. **Register as CITIZEN:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

2. **Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

3. **Update Profile (use token from login):**
```bash
curl -X POST http://localhost:8080/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "age": 30,
    "gender": "MALE",
    "phoneNumber": "+91-9876543210",
    "address": "123 Main Street, Mumbai"
  }'
```

4. **Get Areas:**
```bash
curl -X GET http://localhost:8080/api/areas
```

5. **Book Appointment:**
```bash
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "doctorId": "DOCTOR_ID",
    "hospitalId": "HOSPITAL_ID",
    "appointmentDateTime": "2026-02-25T10:00:00"
  }'
```

6. **Report Symptom:**
```bash
curl -X POST http://localhost:8080/api/symptoms/report \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "areaId": "AREA_ID",
    "symptom": "High fever and cough",
    "severity": "HIGH"
  }'
```

7. **Check Area Risk:**
```bash
curl -X GET http://localhost:8080/api/dashboard/area-risk/AREA_ID
```

---

## Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "username": "String (unique)",
  "email": "String (unique, indexed)",
  "password": "String (BCrypt hashed)",
  "role": "SUPER_ADMIN | HOSPITAL_ADMIN | DOCTOR | CITIZEN",
  "area": "DBRef(Area)",
  "createdAt": "DateTime",
  "active": "Boolean"
}
```

### Areas Collection
```json
{
  "_id": "ObjectId",
  "wardNumber": "String",
  "name": "String"
}
```

### Hospitals Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "area": "DBRef(Area)",
  "totalBeds": "Integer",
  "availableBeds": "Integer"
}
```

### Doctors Collection
```json
{
  "_id": "ObjectId",
  "user": "DBRef(User)",
  "hospital": "DBRef(Hospital)",
  "specialization": "String"
}
```

### CitizenProfiles Collection
```json
{
  "_id": "ObjectId",
  "user": "DBRef(User)",
  "age": "Integer",
  "gender": "MALE | FEMALE | OTHER",
  "phoneNumber": "String",
  "address": "String"
}
```

### Appointments Collection
```json
{
  "_id": "ObjectId",
  "citizen": "DBRef(User)",
  "doctor": "DBRef(Doctor)",
  "hospital": "DBRef(Hospital)",
  "appointmentDateTime": "DateTime",
  "status": "BOOKED | COMPLETED | CANCELLED",
  "createdAt": "DateTime"
}
```

### SymptomReports Collection
```json
{
  "_id": "ObjectId",
  "reportedBy": "DBRef(User)",
  "area": "DBRef(Area)",
  "symptom": "String",
  "severity": "LOW | HIGH",
  "reportedAt": "DateTime"
}
```

---

## Security Notes

1. **JWT Token Expiration:** Tokens expire after 24 hours
2. **Password Hashing:** BCrypt with default strength
3. **CORS:** Enabled for all origins (configure for production)
4. **Role-Based Access Control:** Enforced via @PreAuthorize annotations
5. **Stateless Sessions:** No server-side session storage

---

## Application is Ready! 🎉

Your backend MVP for Project SANJEEVANI is now complete with:
✅ JWT Authentication & Authorization
✅ Role-Based Access Control (RBAC)
✅ All Core Entities (User, Area, Hospital, Doctor, Appointment, SymptomReport, CitizenProfile)
✅ Area Risk Assessment Logic
✅ MongoDB Integration
✅ Global Exception Handling
✅ Input Validation
✅ RESTful API Design

The application is running on **http://localhost:8080**

