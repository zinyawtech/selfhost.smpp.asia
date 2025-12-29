# Selfhost SMS Gateway - Client SDK

Official SDK and integration examples for [Selfhost SMS Gateway](https://selfhost.smpp.asia).

## 🚀 Quick Start

1. **Register** at [selfhost.smpp.asia](https://selfhost.smpp.asia)
2. **Get API Key** from your dashboard
3. **Download Android App** or use API/SMPP

## 📦 Integration Options

| Method | Best For |
|--------|----------|
| [Android Gateway](#android-gateway) | Direct SMS sending via your phone |
| [REST API](#rest-api) | Web/Mobile app integration |
| [SMPP](#smpp) | High-volume enterprise systems |

---

## 📱 Android Gateway

Download and install the gateway app on your Android phone to send SMS directly.

**Download:** [MSG95Gateway.apk](https://selfhost.smpp.asia/download/MSG95Gateway.apk)

### Setup Steps:
1. Download APK from link above
2. Install on Android phone (enable "Unknown sources")
3. Open app and login with your account
4. Grant SMS permissions
5. Keep app running in background

📖 [Detailed Android Setup Guide](docs/ANDROID_SETUP.md)

---

## 🔌 REST API

### Send SMS
```bash
curl -X POST https://selfhost.smpp.asia/api/sms/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"phone": "09xxxxxxxxx", "message": "Hello!"}'
```

### Code Examples
- [PHP Example](examples/php/)
- [Python Example](examples/python/)
- [Node.js Example](examples/nodejs/)
- [Java Example](examples/java/)

📖 [Full API Reference](docs/API_REFERENCE.md)

---

## 📡 SMPP

For high-volume SMS sending via SMPP protocol.

| Setting | Value |
|---------|-------|
| Host | `selfhost.smpp.asia` |
| Port | `2558` |
| System ID | (from dashboard) |
| Password | (from dashboard) |

### Code Examples
- [Python SMPP Client](smpp/python/)
- [Node.js SMPP Client](smpp/nodejs/)

📖 [SMPP Integration Guide](docs/SMPP_GUIDE.md)

---

## 📖 Documentation

- [API Reference](docs/API_REFERENCE.md)
- [Android Setup Guide](docs/ANDROID_SETUP.md)
- [SMPP Guide](docs/SMPP_GUIDE.md)
- [OTP Integration](docs/OTP_GUIDE.md)

---

## 🌐 Supported Languages

- English
- Myanmar (မြန်မာ)
- Chinese (中文)

---

## 📞 Support

- Website: [selfhost.smpp.asia](https://selfhost.smpp.asia)
- Documentation: [Getting Started](https://selfhost.smpp.asia/getting-started.html)
- API Docs: [API Documentation](https://selfhost.smpp.asia/api-docs.html)

---

## 📄 License

MIT License - feel free to use these examples in your projects.
