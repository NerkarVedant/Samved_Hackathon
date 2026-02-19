# Postman Collection for Project SANJEEVANI

## Setup Instructions

1. Open Postman
2. Create a new collection named "Project SANJEEVANI"
3. Set collection variable:
   - `baseUrl` = `http://localhost:8080`
   - `token` = (will be set after login)

## Environment Variables

Create an environment with:
- `baseUrl`: http://localhost:8080
- `token`: (empty - will be populated after login)
- `userId`: (empty - will be populated after registration)
- `areaId`: (empty - will be populated after creating area)
- `hospitalId`: (empty - will be populated after creating hospital)
- `doctorId`: (empty - will be populated after creating doctor)

---

## Requests to Add

### 1. AUTH - Register User
**POST** `{{baseUrl}}/api/auth/register`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "username": "john_citizen",
  "email": "john@example.com",
  "password": "Password123"
}
```

Tests (JavaScript):
```javascript
if (pm.response.code === 201) {
    var jsonData = pm.response.json();
    pm.environment.set("token", jsonData.token);
    pm.environment.set("userId", jsonData.userId);
}
```

---

### 2. AUTH - Login
**POST** `{{baseUrl}}/api/auth/login`

Headers:
```
Content-Type: application/json
```

Body (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Tests (JavaScript):
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("token", jsonData.token);
    pm.environment.set("userId", jsonData.userId);
}
```

---

### 3. USER - Update Profile
**POST** `{{baseUrl}}/api/users/profile`

Headers:
```
Content-Type: application/json
Authorization: Bearer {{token}}
```

Body (raw JSON):
```json
{
  "age": 30,
  "gender": "MALE",
  "phoneNumber": "+91-9876543210",
  "address": "123 Main Street, Pune, Maharashtra"
}
```

---

### 4. USER - Get My Profile
**GET** `{{baseUrl}}/api/users/profile`

Headers:
```
Authorization: Bearer {{token}}
```

---

### 5. AREA - Get All Areas
**GET** `{{baseUrl}}/api/areas`

Headers:
```
Content-Type: application/json
```

---

### 6. AREA - Create Area (SUPER_ADMIN)
**POST** `{{baseUrl}}/api/areas`

Headers:
```
Content-Type: application/json
Authorization: Bearer {{token}}
```

Body (raw JSON):
```json
{
  "wardNumber": "W001",
  "name": "Koregaon Park"
}
```

Tests (JavaScript):
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("areaId", jsonData.id);
}
```

---

### 7. HOSPITAL - Get All Hospitals
**GET** `{{baseUrl}}/api/hospitals`

Headers:
```
Content-Type: application/json
```

---

### 8. HOSPITAL - Create Hospital (SUPER_ADMIN)
**POST** `{{baseUrl}}/api/hospitals`

Headers:
```
Content-Type: application/json
Authorization: Bearer {{token}}
```

Body (raw JSON):
```json
{
  "name": "Ruby Hall Clinic",
  "areaId": "{{areaId}}",
  "totalBeds": 200,
  "availableBeds": 50
}
```

Tests (JavaScript):
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("hospitalId", jsonData.id);
}
```

---

### 9. DOCTOR - Get All Doctors
**GET** `{{baseUrl}}/api/doctors`

Headers:
```
Content-Type: application/json
```

---

### 10. DOCTOR - Create Doctor Profile (HOSPITAL_ADMIN)
**POST** `{{baseUrl}}/api/doctors`

Headers:
```
Content-Type: application/json
Authorization: Bearer {{token}}
```

Body (raw JSON):
```json
{
  "userId": "USER_ID_OF_DOCTOR_ROLE",
  "hospitalId": "{{hospitalId}}",
  "specialization": "Cardiology"
}
```

Tests (JavaScript):
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("doctorId", jsonData.id);
}
```

---

### 11. APPOINTMENT - Book Appointment (CITIZEN)
**POST** `{{baseUrl}}/api/appointments`

Headers:
```
Content-Type: application/json
Authorization: Bearer {{token}}
```

Body (raw JSON):
```json
{
  "doctorId": "{{doctorId}}",
  "hospitalId": "{{hospitalId}}",
  "appointmentDateTime": "2026-02-25T10:00:00"
}
```

Tests (JavaScript):
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set("appointmentId", jsonData.id);
}
```

---

### 12. APPOINTMENT - Get My Appointments
**GET** `{{baseUrl}}/api/appointments/my`

Headers:
```
Authorization: Bearer {{token}}
```

---

### 13. APPOINTMENT - Update Status (DOCTOR)
**PUT** `{{baseUrl}}/api/appointments/{{appointmentId}}/status?status=COMPLETED`

Headers:
```
Authorization: Bearer {{token}}
```

Query Parameters:
- `status`: COMPLETED (or BOOKED, CANCELLED)

---

### 14. SYMPTOM - Report Symptom
**POST** `{{baseUrl}}/api/symptoms/report`

Headers:
```
Content-Type: application/json
Authorization: Bearer {{token}}
```

Body (raw JSON):
```json
{
  "areaId": "{{areaId}}",
  "symptom": "High fever and persistent cough",
  "severity": "HIGH"
}
```

---

### 15. SYMPTOM - Get Symptoms by Area (SUPER_ADMIN)
**GET** `{{baseUrl}}/api/symptoms/area/{{areaId}}`

Headers:
```
Authorization: Bearer {{token}}
```

---

### 16. DASHBOARD - Get Area Risk
**GET** `{{baseUrl}}/api/dashboard/area-risk/{{areaId}}`

Headers:
```
Content-Type: application/json
```

---

## Testing Workflow

### A. CITIZEN Flow
1. Register as CITIZEN (default role)
2. Login to get token
3. Update profile with personal details
4. View available areas
5. View available hospitals
6. View available doctors
7. Book appointment
8. View my appointments
9. Report symptoms

### B. SUPER_ADMIN Flow
1. Register with role: SUPER_ADMIN
2. Login to get token
3. Create areas
4. Create hospitals
5. View all symptom reports by area
6. Check area risk levels

### C. HOSPITAL_ADMIN Flow
1. Register with role: HOSPITAL_ADMIN
2. Login to get token
3. Create doctor profiles (assign users with DOCTOR role to hospitals)

### D. DOCTOR Flow
1. Register with role: DOCTOR
2. Login to get token
3. View appointments
4. Update appointment status
5. Report symptoms

---

## Expected Response Codes

- **200 OK** - Successful GET/PUT
- **201 Created** - Successful registration
- **400 Bad Request** - Validation error
- **401 Unauthorized** - Invalid credentials or missing token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## Tips

1. **Save requests** in folders by category (Auth, User, Area, etc.)
2. **Use environments** for different stages (dev, staging, prod)
3. **Set up tests** to automatically capture tokens and IDs
4. **Create a pre-request script** at collection level to refresh token if expired
5. **Export collection** for team sharing

---

## Pre-Request Script (Collection Level)

Add this to the collection's Pre-request Scripts tab:

```javascript
// Auto-refresh token if needed
const token = pm.environment.get("token");
if (!token && pm.request.url.path.join("/") !== "api/auth/login") {
    console.log("No token found. Please login first.");
}
```

---

## Collection Export

After setting up, export the collection:
1. Click three dots on collection name
2. Select "Export"
3. Choose "Collection v2.1"
4. Save as `SANJEEVANI_Postman_Collection.json`

---

**Ready to test! 🚀**

