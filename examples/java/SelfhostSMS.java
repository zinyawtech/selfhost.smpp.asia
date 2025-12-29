/**
 * Selfhost SMS Gateway - Java Example
 * https://selfhost.smpp.asia
 * 
 * Requires: Java 11+ (for HttpClient)
 */

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class SelfhostSMS {
    private static final String BASE_URL = "https://selfhost.smpp.asia";
    private final String token;
    private final HttpClient client;

    public SelfhostSMS(String token) {
        this.token = token;
        this.client = HttpClient.newHttpClient();
    }

    public String sendSms(String phone, String message) throws Exception {
        String json = String.format("{\"phone\":\"%s\",\"message\":\"%s\"}", phone, message);
        return post("/api/sms/send", json);
    }

    public String requestOtp(String phone, String brand) throws Exception {
        String json = String.format("{\"phone\":\"%s\",\"brand\":\"%s\"}", phone, brand);
        return post("/api/otp/request", json);
    }

    public String verifyOtp(String phone, String code) throws Exception {
        String json = String.format("{\"phone\":\"%s\",\"code\":\"%s\"}", phone, code);
        return post("/api/otp/verify", json);
    }

    public String getProfile() throws Exception {
        return get("/api/client/profile");
    }

    private String post(String endpoint, String json) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + endpoint))
            .header("Authorization", "Bearer " + token)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    private String get(String endpoint) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + endpoint))
            .header("Authorization", "Bearer " + token)
            .GET()
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    // ============================================
    // USAGE EXAMPLE
    // ============================================
    public static void main(String[] args) {
        try {
            String token = "YOUR_TOKEN_HERE"; // Get from dashboard
            SelfhostSMS sms = new SelfhostSMS(token);

            // Send SMS
            String result = sms.sendSms("09xxxxxxxxx", "Hello from Java!");
            System.out.println("Send SMS: " + result);

            // Request OTP
            result = sms.requestOtp("09xxxxxxxxx", "MyApp");
            System.out.println("Request OTP: " + result);

            // Verify OTP
            result = sms.verifyOtp("09xxxxxxxxx", "123456");
            System.out.println("Verify OTP: " + result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
