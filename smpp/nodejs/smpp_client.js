/**
 * Selfhost SMS Gateway - Node.js SMPP Client
 * https://selfhost.smpp.asia
 * 
 * Install: npm install smpp
 */

const smpp = require('smpp');

// SMPP Connection Settings
const SMPP_HOST = 'selfhost.smpp.asia';
const SMPP_PORT = 2558;
const SYSTEM_ID = 'your_system_id';  // Get from dashboard
const PASSWORD = 'your_password';     // Get from dashboard

/**
 * Create SMPP session
 */
function createSession() {
  return new Promise((resolve, reject) => {
    const session = smpp.connect({
      url: `smpp://${SMPP_HOST}:${SMPP_PORT}`,
      auto_enquire_link_period: 30000
    });

    session.on('connect', () => {
      session.bind_transceiver({
        system_id: SYSTEM_ID,
        password: PASSWORD
      }, (pdu) => {
        if (pdu.command_status === 0) {
          console.log(`Connected to ${SMPP_HOST}:${SMPP_PORT}`);
          resolve(session);
        } else {
          reject(new Error(`Bind failed: ${pdu.command_status}`));
        }
      });
    });

    session.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Send SMS via SMPP
 */
async function sendSms(phone, message) {
  const session = await createSession();

  return new Promise((resolve, reject) => {
    session.submit_sm({
      source_addr: 'MSG95',
      destination_addr: phone,
      short_message: message,
      registered_delivery: 1  // Request DLR
    }, (pdu) => {
      if (pdu.command_status === 0) {
        console.log(`SMS sent to ${phone}, Message ID: ${pdu.message_id}`);
        resolve(pdu.message_id);
      } else {
        reject(new Error(`Send failed: ${pdu.command_status}`));
      }

      // Disconnect
      session.unbind();
      session.close();
    });
  });
}

/**
 * Send bulk SMS
 */
async function sendBulkSms(recipients, message) {
  const session = await createSession();
  const results = [];

  for (const phone of recipients) {
    await new Promise((resolve) => {
      session.submit_sm({
        source_addr: 'MSG95',
        destination_addr: phone,
        short_message: message
      }, (pdu) => {
        if (pdu.command_status === 0) {
          console.log(`Sent to ${phone}`);
          results.push({ phone, success: true, messageId: pdu.message_id });
        } else {
          console.log(`Failed: ${phone}`);
          results.push({ phone, success: false, error: pdu.command_status });
        }
        resolve();
      });
    });
  }

  session.unbind();
  session.close();
  return results;
}

// ============================================
// USAGE EXAMPLE
// ============================================

async function main() {
  try {
    // Single SMS
    await sendSms('09xxxxxxxxx', 'Hello from SMPP!');

    // Bulk SMS
    // const recipients = ['09111111111', '09222222222'];
    // const results = await sendBulkSms(recipients, 'Bulk test');
    // console.log('Results:', results);

  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();

module.exports = { createSession, sendSms, sendBulkSms };
