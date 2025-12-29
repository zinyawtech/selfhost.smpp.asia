"""
Selfhost SMS Gateway - Python Example
https://selfhost.smpp.asia

Install: pip install requests
"""

import requests

class SelfhostSMS:
    def __init__(self, token):
        self.base_url = 'https://selfhost.smpp.asia'
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

    def send_sms(self, phone, message):
        """Send SMS"""
        response = requests.post(
            f'{self.base_url}/api/sms/send',
            headers=self.headers,
            json={'phone': phone, 'message': message}
        )
        return response.json()

    def request_otp(self, phone, brand='App'):
        """Request OTP"""
        response = requests.post(
            f'{self.base_url}/api/otp/request',
            headers=self.headers,
            json={'phone': phone, 'brand': brand}
        )
        return response.json()

    def verify_otp(self, phone, code):
        """Verify OTP"""
        response = requests.post(
            f'{self.base_url}/api/otp/verify',
            headers=self.headers,
            json={'phone': phone, 'code': code}
        )
        return response.json()

    def get_history(self, limit=50):
        """Get SMS history"""
        response = requests.get(
            f'{self.base_url}/api/sms/history?limit={limit}',
            headers=self.headers
        )
        return response.json()

    def get_profile(self):
        """Get account profile"""
        response = requests.get(
            f'{self.base_url}/api/client/profile',
            headers=self.headers
        )
        return response.json()


# ============================================
# USAGE EXAMPLE
# ============================================

if __name__ == '__main__':
    TOKEN = 'YOUR_TOKEN_HERE'  # Get from dashboard
    sms = SelfhostSMS(TOKEN)

    # Send SMS
    result = sms.send_sms('09xxxxxxxxx', 'Hello from Python!')
    print('Send SMS:', result)

    # Request OTP
    result = sms.request_otp('09xxxxxxxxx', 'MyApp')
    print('Request OTP:', result)

    # Verify OTP
    result = sms.verify_otp('09xxxxxxxxx', '123456')
    print('Verify OTP:', result)

    # Get profile
    result = sms.get_profile()
    print('Profile:', result)
