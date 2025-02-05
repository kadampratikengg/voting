// src/components/ui/ForgotPassword.js
import { useState } from "react";
import { Card, CardContent } from "../ui/card"; // Import from the UI components
import { Input } from "../ui/input"; // Import Input component
import { Button } from "../ui/button"; // Import Button component
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './ForgotPassword.css'; // Import the CSS specific to ForgotPassword

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // Initialize navigate

  const handleRequestOtp = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate OTP sending (replace with actual API call)
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      alert(`OTP sent to ${email}`);
    }, 2000); // Simulate network delay
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    alert(`OTP ${otp} verified successfully!`);
  };

  // Navigate to the login page
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="forgot-password-container">
      <Card className="forgot-password-card">
        <CardContent>
          <h2 className="forgot-password-header">Forgot Password</h2>
          {error && <p className="forgot-password-error">{error}</p>}

          {/* Step 1: Enter email */}
          {!otpSent ? (
            <div className="input-container">
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>

              <Button
                onClick={handleRequestOtp}
                className="forgot-password-button"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            // Step 2: Enter OTP after email submission
            <div className="input-container">
              <div className="input-wrapper">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input-field"
                />
              </div>
              <Button
                onClick={handleVerifyOtp}
                className="forgot-password-button"
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </Button>
            </div>
          )}

          {/* Link to login */}
          <div className="auth-links">
            <Button className="auth-link-button" onClick={goToLogin}>
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
