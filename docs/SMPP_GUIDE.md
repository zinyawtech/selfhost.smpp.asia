# SMPP Integration Guide

SMPP (Short Message Peer-to-Peer) protocol for high-volume SMS sending.

## Connection Details

| Setting | Value |
|---------|-------|
| Host | `selfhost.smpp.asia` |
| Port | `2558` |
| Protocol | SMPP v3.4 |
| TLS | Not required |

## Credentials

Get your SMPP credentials from the dashboard:
1. Login at [selfhost.smpp.asia/portal.html](https://selfhost.smpp.asia/portal.html)
2. Go to **Credentials** tab
3. Copy **System ID** and **Password**

## Rate Limits

- **10 TPS** (Transactions Per Second) per user
- Daily/Monthly limits based on your package

## Bind Types

| Type | Description |
|------|-------------|
| Transmitter | Send SMS only |
| Receiver | Receive DLR only |
| Transceiver | Send SMS + Receive DLR |

Recommended: **Transceiver** for full functionality

## Message Parameters

| Parameter | Value |
|-----------|-------|
| source_addr | Your sender ID or phone |
| dest_addr | Recipient phone (09xxxxxxxxx) |
| short_message | Message content |
| data_coding | 0 (GSM) or 8 (UCS2 for Unicode) |

## Delivery Reports (DLR)

DLR status codes:

| Status | Description |
|--------|-------------|
| DELIVRD | Message delivered |
| UNDELIV | Delivery failed |
| EXPIRED | Message expired |
| UNKNOWN | Unknown status |

## Code Examples

### Python (smpplib)

```python
import smpplib.client
import smpplib.consts

# Connect
client = smpplib.client.Client('selfhost.smpp.asia', 2558)
client.connect()

# Bind
client.bind_transceiver(
    system_id='your_system_id',
    password='your_password'
)

# Send SMS
client.send_message(
    source_addr='MSG95',
    destination_addr='09xxxxxxxxx',
    short_message='Hello from SMPP!'
)

# Disconnect
client.unbind()
client.disconnect()
```

### Node.js (smpp)

```javascript
const smpp = require('smpp');

const session = smpp.connect({
  url: 'smpp://selfhost.smpp.asia:2558'
});

session.bind_transceiver({
  system_id: 'your_system_id',
  password: 'your_password'
}, (pdu) => {
  if (pdu.command_status === 0) {
    console.log('Connected!');
    
    session.submit_sm({
      source_addr: 'MSG95',
      destination_addr: '09xxxxxxxxx',
      short_message: 'Hello from SMPP!'
    }, (pdu) => {
      console.log('Message ID:', pdu.message_id);
    });
  }
});
```

## Error Codes

| Code | Description |
|------|-------------|
| 0x00 | Success |
| 0x01 | Invalid message length |
| 0x03 | Invalid command ID |
| 0x05 | Invalid bind status |
| 0x0D | Invalid source address |
| 0x0E | Invalid destination address |
| 0x58 | Throttling error (rate limit) |

## Best Practices

1. **Connection pooling** - Reuse connections
2. **Handle reconnects** - Auto-reconnect on disconnect
3. **Rate limiting** - Stay under 10 TPS
4. **Error handling** - Handle all error codes
5. **DLR tracking** - Track delivery status

## Support

- API Docs: [selfhost.smpp.asia/api-docs.html](https://selfhost.smpp.asia/api-docs.html)
- Dashboard: [selfhost.smpp.asia/portal.html](https://selfhost.smpp.asia/portal.html)
