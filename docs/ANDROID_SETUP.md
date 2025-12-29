# Android Gateway Setup Guide

The Android Gateway app turns your phone into an SMS gateway, sending messages directly through your SIM card.

## Requirements

- Android 6.0 or higher
- Active SIM card with SMS capability
- Internet connection (WiFi or Mobile Data)
- SMS permissions granted

## Installation

### Step 1: Download APK

Download from: [MSG95Gateway.apk](https://selfhost.smpp.asia/download/MSG95Gateway.apk)

Or scan QR code on [selfhost.smpp.asia](https://selfhost.smpp.asia)

### Step 2: Enable Unknown Sources

1. Go to **Settings** > **Security**
2. Enable **Unknown sources** or **Install unknown apps**
3. Some phones: Settings > Apps > Special access > Install unknown apps

### Step 3: Install APK

1. Open downloaded APK file
2. Tap **Install**
3. Wait for installation to complete
4. Tap **Open**

### Step 4: Login

1. Enter your **Email** and **Password**
2. Tap **Login**
3. If you don't have an account, register at [selfhost.smpp.asia](https://selfhost.smpp.asia)

### Step 5: Grant Permissions

The app will request these permissions:
- **SMS** - Required to send messages
- **Phone** - Required to detect SIM info
- **Background** - Required to run continuously

**Important:** Grant ALL permissions for the app to work properly.

### Step 6: Start Gateway

1. Tap **Start Gateway** button
2. Status should show **Online**
3. Keep the app running in background

## Tips for Best Performance

### Battery Optimization

Disable battery optimization for the app:
1. Settings > Apps > MSG95 Gateway
2. Battery > Don't optimize

### Auto-Start

Enable auto-start (for Xiaomi, Oppo, Vivo, etc.):
1. Settings > Apps > MSG95 Gateway
2. Auto-start > Enable

### Keep Running

- Don't force close the app
- Keep phone charged
- Maintain internet connection

## Troubleshooting

### App Shows Offline

1. Check internet connection
2. Re-login to the app
3. Restart the app

### SMS Not Sending

1. Check SIM card balance
2. Check SMS permissions
3. Check daily/monthly limits in dashboard

### App Keeps Stopping

1. Disable battery optimization
2. Enable auto-start
3. Clear app cache and re-login

## Multiple Devices

Your package determines how many devices you can use:

| Package | Max Devices |
|---------|-------------|
| Starter Pro | 1 |
| Business Elite | 2 |
| Enterprise Pro | 3 |
| Enterprise Max | 4 |
| Ultimate | 12 |

## Support

- Dashboard: [selfhost.smpp.asia/portal.html](https://selfhost.smpp.asia/portal.html)
- User Guide: [selfhost.smpp.asia/user-guide.html](https://selfhost.smpp.asia/user-guide.html)
