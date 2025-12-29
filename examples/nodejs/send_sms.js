/**
 * Selfhost SMS Gateway - Node.js Example
 * https://selfhost.smpp.asia
 */

class SelfhostSMS {
  constructor(token) {
    this.baseUrl = 'https://selfhost.smpp.asia';
    this.token = token;
  }

  async sendSms(phone, message) {
    return this.request('POST', '/api/sms/send', { phone, message });
  }

  async requestOtp(phone, brand = 'App') {
    return this.request('POST', '/api/otp/request', { phone, brand });
  }

  async verifyOtp(phone, code) {
    return this.request('POST', '/api/otp/verify', { phone, code });
  }

  async getHistory(limit = 50) {
    return this.request('GET', `/api/sms/history?limit=${limit}`);
  }

  async getProfile() {
    return this.request('GET', '/api/client/profile');
  }

  async request(method, endpoint, data = null) {
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    };

    if (data && method === 'POST') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    return response.json();
  }
}

// ============================================
// USAGE EXAMPLE
// ============================================

const TOKEN = 'YOUR_TOKEN_HERE'; // Get from dashboard
const sms = new SelfhostSMS(TOKEN);

async function main() {
  // Send SMS
  let result = await sms.sendSms('09xxxxxxxxx', 'Hello from Node.js!');
  console.log('Send SMS:', result);

  // Request OTP
  result = await sms.requestOtp('09xxxxxxxxx', 'MyApp');
  console.log('Request OTP:', result);

  // Verify OTP
  result = await sms.verifyOtp('09xxxxxxxxx', '123456');
  console.log('Verify OTP:', result);

  // Get profile
  result = await sms.getProfile();
  console.log('Profile:', result);
}

main().catch(console.error);

module.exports = SelfhostSMS;
