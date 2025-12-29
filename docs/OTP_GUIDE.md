# OTP Integration Guide

Send and verify OTP codes for user authentication.

## How It Works

1. Your app calls **Request OTP** API
2. User receives SMS with OTP code
3. User enters code in your app
4. Your app calls **Verify OTP** API
5. API returns verification result

## API Endpoints

### Request OTP

```http
POST https://selfhost.smpp.asia/api/otp/request
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "phone": "09xxxxxxxxx",
  "brand": "YourApp"
}
```

**Response:**
```json
{
  "success": true,
  "requestId": "uuid",
  "expiresIn": 300
}
```

The user will receive SMS: `[YourApp] Your OTP code is: 123456`

### Verify OTP

```http
POST https://selfhost.smpp.asia/api/otp/verify
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "phone": "09xxxxxxxxx",
  "code": "123456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "verified": true
}
```

**Response (Failed):**
```json
{
  "success": false,
  "error": "Invalid or expired OTP"
}
```

## OTP Settings

| Setting | Value |
|---------|-------|
| Code Length | 6 digits |
| Expiry | 5 minutes |
| Max Attempts | 3 |

## Code Examples

### PHP

```php
<?php
$token = 'YOUR_TOKEN';
$baseUrl = 'https://selfhost.smpp.asia';

// Request OTP
$response = file_get_contents($baseUrl . '/api/otp/request', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Authorization: Bearer $token\r\nContent-Type: application/json",
        'content' => json_encode([
            'phone' => '09xxxxxxxxx',
            'brand' => 'MyApp'
        ])
    ]
]));

// Verify OTP
$response = file_get_contents($baseUrl . '/api/otp/verify', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Authorization: Bearer $token\r\nContent-Type: application/json",
        'content' => json_encode([
            'phone' => '09xxxxxxxxx',
            'code' => '123456'
        ])
    ]
]));
```

### Python

```python
import requests

TOKEN = 'YOUR_TOKEN'
BASE_URL = 'https://selfhost.smpp.asia'
headers = {'Authorization': f'Bearer {TOKEN}'}

# Request OTP
response = requests.post(f'{BASE_URL}/api/otp/request', 
    headers=headers,
    json={'phone': '09xxxxxxxxx', 'brand': 'MyApp'}
)

# Verify OTP
response = requests.post(f'{BASE_URL}/api/otp/verify',
    headers=headers,
    json={'phone': '09xxxxxxxxx', 'code': '123456'}
)
```

### Node.js

```javascript
const TOKEN = 'YOUR_TOKEN';
const BASE_URL = 'https://selfhost.smpp.asia';

// Request OTP
const requestOtp = await fetch(`${BASE_URL}/api/otp/request`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ phone: '09xxxxxxxxx', brand: 'MyApp' })
});

// Verify OTP
const verifyOtp = await fetch(`${BASE_URL}/api/otp/verify`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ phone: '09xxxxxxxxx', code: '123456' })
});
```

## Best Practices

1. **Rate limit** OTP requests (1 per minute per phone)
2. **Don't expose** OTP in logs or responses
3. **Validate phone** format before requesting
4. **Show countdown** timer to users
5. **Allow resend** after expiry

## Support

- API Docs: [selfhost.smpp.asia/api-docs.html](https://selfhost.smpp.asia/api-docs.html)
- Dashboard: [selfhost.smpp.asia/portal.html](https://selfhost.smpp.asia/portal.html)
