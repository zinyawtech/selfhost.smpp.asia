"""
Selfhost SMS Gateway - Python SMPP Client
https://selfhost.smpp.asia

Install: pip install smpplib
"""

import smpplib.client
import smpplib.consts
import smpplib.gsm

# SMPP Connection Settings
SMPP_HOST = 'selfhost.smpp.asia'
SMPP_PORT = 2558
SYSTEM_ID = 'your_system_id'      # Get from dashboard
PASSWORD = 'your_password'         # Get from dashboard


def send_sms(phone, message):
    """Send SMS via SMPP"""
    client = smpplib.client.Client(SMPP_HOST, SMPP_PORT)
    
    try:
        # Connect and bind
        client.connect()
        client.bind_transceiver(system_id=SYSTEM_ID, password=PASSWORD)
        print(f'Connected to {SMPP_HOST}:{SMPP_PORT}')

        # Check if message needs UCS2 encoding (for Unicode/Myanmar)
        parts, encoding_flag, msg_type_flag = smpplib.gsm.make_parts(message)

        for part in parts:
            client.send_message(
                source_addr='MSG95',
                destination_addr=phone,
                short_message=part,
                data_coding=encoding_flag
            )
        
        print(f'SMS sent to {phone}')
        return True

    except Exception as e:
        print(f'Error: {e}')
        return False

    finally:
        # Disconnect
        try:
            client.unbind()
            client.disconnect()
        except:
            pass


def send_bulk_sms(recipients, message):
    """Send SMS to multiple recipients"""
    client = smpplib.client.Client(SMPP_HOST, SMPP_PORT)
    
    try:
        client.connect()
        client.bind_transceiver(system_id=SYSTEM_ID, password=PASSWORD)
        print(f'Connected. Sending to {len(recipients)} recipients...')

        parts, encoding_flag, msg_type_flag = smpplib.gsm.make_parts(message)
        
        for phone in recipients:
            for part in parts:
                client.send_message(
                    source_addr='MSG95',
                    destination_addr=phone,
                    short_message=part,
                    data_coding=encoding_flag
                )
            print(f'Sent to {phone}')

        print('Bulk SMS complete!')
        return True

    except Exception as e:
        print(f'Error: {e}')
        return False

    finally:
        try:
            client.unbind()
            client.disconnect()
        except:
            pass


# ============================================
# USAGE EXAMPLE
# ============================================

if __name__ == '__main__':
    # Single SMS
    send_sms('09xxxxxxxxx', 'Hello from SMPP!')

    # Bulk SMS
    # recipients = ['09111111111', '09222222222', '09333333333']
    # send_bulk_sms(recipients, 'Bulk message test')
