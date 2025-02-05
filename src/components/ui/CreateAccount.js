import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User, Mail, Lock, Phone, Home, FileText, File, CheckCircle, MapPin } from "lucide-react"; // Add MapPin for pincode
import './CreateAccount.css'; // Import the CSS specific to Create Account


export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [orgIdProof, setOrgIdProof] = useState(null);
  const [gst, setGst] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  // Validation Functions
  const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
  const isValidPincode = (pincode) => /^[0-9]{6}$/.test(pincode);

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword || !mobile || !organizationName || !address || !pincode || !orgIdProof || !termsAccepted) {
      setError("All fields are required.");
      return;
    }

    if (!isValidMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!isValidPincode(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    alert(`Creating account for: ${name}`);
  };

  return (
    <div className="create-account-container">
      <Card className="create-account-card">
        <CardContent>
          <h2 className="create-account-header">Create Account</h2>
          {error && <p className="create-account-error">{error}</p>}
          
          {/* Name Field */}
          <div className="input-container">
            <label className="label-text">Name</label>
            <div className="flex items-center gap-2">
              <User className="input-icon" />
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Mobile Number Field */}
          <div className="input-container">
            <label className="label-text">Mobile Number</label>
            <div className="flex items-center gap-2">
              <Phone className="input-icon" />
              <Input
                type="text"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="input-container">
            <label className="label-text">Email</label>
            <div className="flex items-center gap-2">
              <Mail className="input-icon" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="input-container">
            <label className="label-text">Password</label>
            <div className="flex items-center gap-2">
              <Lock className="input-icon" />
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="input-container">
            <label className="label-text">Confirm Password</label>
            <div className="flex items-center gap-2">
              <Lock className="input-icon" />
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Organization Details */}
          <div className="input-container">
            <label className="label-text">Organization Name</label>
            <div className="flex items-center gap-2">
              <FileText className="input-icon" />
              <Input
                type="text"
                placeholder="Enter organization name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="input-container">
            <label className="label-text">Address</label>
            <div className="flex items-center gap-2">
              <Home className="input-icon" />
              <Input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Pincode Field with Icon */}
          <div className="input-container">
            <label className="label-text">Pincode</label>
            <div className="flex items-center gap-2">
              <MapPin className="input-icon" /> {/* Pincode icon */}
              <Input
                type="text"
                placeholder="Enter your pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Organization ID Proof Upload */}
          <div className="input-container">
            <label className="label-text">Upload Organization ID Proof</label>
            <div className="flex items-center gap-2">
              <File className="input-icon" />
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setOrgIdProof(e.target.files[0])}
                className="input-field"
              />
            </div>
          </div>

          {/* GST Field */}
          <div className="input-container">
            <label className="label-text">GST (Optional)</label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Enter GST number"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="input-container">
            <div className="flex items-center gap-2">
              <CheckCircle className="input-icon" />
              <label className="terms-label">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                I accept the{" "}
                <a href="/terms-and-conditions" target="_blank" className="terms-link">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          {/* Sign Up Button */}
          <Button onClick={handleSignUp} className="create-account-button">
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
