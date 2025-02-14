// src/components/ui/Login.js
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './Login.css'; // Import the CSS specific to Login

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // const handleLogin = () => {
  //   if (!email || !password) {
  //     setError("Both fields are required.");
  //     return;
  //   }
  //   setError("");
  //   alert(`Logging in with Email: ${email}`);
  // };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    navigate("/Dashboard/dashboard"); // Redirect to dashboard after login
  };
  



  // Navigate to Forgot Password page
  const goToForgotPassword = () => {
    navigate("/forgot-password");
  };

  // Navigate to Create Account page
  const goToCreateAccount = () => {
    navigate("/create-account");
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardContent>
          <h2 className="login-header">Login</h2>
          {error && <p className="login-error">{error}</p>}
          <div className="input-container">
            <div className="flex items-center gap-2">
              <Mail className="input-icon" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          <div className="input-container">
            <div className="flex items-center gap-2">
              <Lock className="input-icon" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
          <Button onClick={handleLogin} className="login-button">
            Login
          </Button>

          {/* Forgot Password Button */}
          <div className="auth-links">
            <Button className="auth-link-button" onClick={goToForgotPassword}>
              Forgot Password?
            </Button>
            <Button className="auth-link-button" onClick={goToCreateAccount}>
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
