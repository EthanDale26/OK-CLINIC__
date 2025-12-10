// src/pages/PasswordResetPage.jsx
import React, { useState } from "react";

export function PasswordResetPage(props) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("request"); // "request" | "sent" | "reset"
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE = "http://localhost:5000/api/auth";

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send reset code");
      setStep("sent");
      setMessage("A reset code has been sent to your email.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/verify-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid code");
      setStep("reset");
      setMessage("Code verified successfully. You can now set a new password.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetCode, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");
      setMessage("Password reset successful!");
      if (props.onNavigateToLogin) props.onNavigateToLogin();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    if (props.onNavigateToLogin) {
      props.onNavigateToLogin();
    } else {
      setMessage("Back to login navigation not implemented.");
    }
  };

  return (
    <div className="auth-form">
      <div className="icon-heart">&#9825;</div>
      <h2>Password Reset</h2>

      {step === "request" && (
        <>
          <p>Enter your email to receive a reset code</p>
          <form onSubmit={handleRequestReset}>
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
            {message && <div className="message">{message}</div>}
          </form>
        </>
      )}

      {step === "sent" && (
        <>
          <p>
            We've sent a 6-digit verification code to <strong>{email}</strong>.
          </p>
          <form onSubmit={handleVerifyCode}>
            <label>Verification Code</label>
            <input
              name="resetCode"
              placeholder="Enter 6-digit code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              maxLength={6}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </button>
            {message && <div className="message">{message}</div>}
          </form>
          <button
            type="button"
            className="link"
            onClick={() => setStep("request")}
          >
            Didn't receive the code? Try again
          </button>
        </>
      )}

      {step === "reset" && (
        <>
          <p>Code verified successfully! Now create your new password.</p>
          <form onSubmit={handlePasswordReset}>
            <label>New Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {message && <div className="message">{message}</div>}
          </form>
        </>
      )}

      <div className="links">
        <button type="button" onClick={handleBackToLogin} className="link">
          &larr; Back to Sign In
        </button>
      </div>
    </div>
  );
}
