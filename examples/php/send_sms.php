<?php
/**
 * Selfhost SMS Gateway - PHP Example
 * https://selfhost.smpp.asia
 */

class SelfhostSMS {
    private $baseUrl = 'https://selfhost.smpp.asia';
    private $token;

    public function __construct($token) {
        $this->token = $token;
    }

    /**
     * Send SMS
     */
    public function sendSms($phone, $message) {
        return $this->request('POST', '/api/sms/send', [
            'phone' => $phone,
            'message' => $message
        ]);
    }

    /**
     * Request OTP
     */
    public function requestOtp($phone, $brand = 'App') {
        return $this->request('POST', '/api/otp/request', [
            'phone' => $phone,
            'brand' => $brand
        ]);
    }

    /**
     * Verify OTP
     */
    public function verifyOtp($phone, $code) {
        return $this->request('POST', '/api/otp/verify', [
            'phone' => $phone,
            'code' => $code
        ]);
    }

    /**
     * Get SMS History
     */
    public function getHistory($limit = 50) {
        return $this->request('GET', "/api/sms/history?limit=$limit");
    }

    private function request($method, $endpoint, $data = null) {
        $url = $this->baseUrl . $endpoint;
        
        $options = [
            'http' => [
                'method' => $method,
                'header' => "Authorization: Bearer {$this->token}\r\n" .
                           "Content-Type: application/json\r\n",
                'ignore_errors' => true
            ]
        ];

        if ($data && $method === 'POST') {
            $options['http']['content'] = json_encode($data);
        }

        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);
        
        return json_decode($response, true);
    }
}

// ============================================
// USAGE EXAMPLE
// ============================================

$token = 'YOUR_TOKEN_HERE'; // Get from dashboard
$sms = new SelfhostSMS($token);

// Send SMS
$result = $sms->sendSms('09xxxxxxxxx', 'Hello from PHP!');
print_r($result);

// Request OTP
$result = $sms->requestOtp('09xxxxxxxxx', 'MyApp');
print_r($result);

// Verify OTP
$result = $sms->verifyOtp('09xxxxxxxxx', '123456');
print_r($result);
