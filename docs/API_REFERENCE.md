# API Reference

**Base URL:** `https://selfhost.smpp.asia`

## Authentication

All API requests require authentication via Bearer token.

```
Authorization: Bearer YOUR_TOKEN
```

Get your token by logging in at [selfhost.smpp.asia/portal.html](https://selfhost.smpp.asia/portal.html)

---

## Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Your Name",
  "email": "you@example.com",
  "phone": "09xxxxxxxxx",
  "password": "your_password"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "you@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "your-session-token",
  "client": {
    "id": "uuid",
    "name": "Your Name",
    "email": "you@example.com"
  }
}
```

---

### SMS

#### Send SMS
```http
POST /api/sms/send
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "phone": "09xxxxxxxxx",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "smsId": "uuid",
  "status": "queued"
}
```

#### Get SMS History
```http
GET /api/sms/history?limit=50&offset=0
Authorization: Bearer YOUR_TOKEN
```

---

### OTP

#### Request OTP
```http
POST /api/otp/request
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "phone": "09xxxxxxxxx",
  "brand": "YourApp"
}
```

#### Verify OTP
```http
POST /api/otp/verify
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "phone": "09xxxxxxxxx",
  "code": "123456"
}
```

---

### Profile

#### Get Profile
```http
GET /api/client/profile
Authorization: Bearer YOUR_TOKEN
```

#### Get Credentials
```http
GET /api/client/credentials
Authorization: Bearer YOUR_TOKEN
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 401 | Authentication required |
| 403 | Account suspended / Trial expired |
| 429 | Rate limit exceeded |
| 500 | Server error |

---

## Rate Limits

- API: 100 requests/minute
- SMS: Based on your package (daily/monthly limits)
