import React, { useState } from "react";
// import "./auth-form.css";

export function PasswordResetPage(props) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("request");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setStep("sent");
    setMessage('For demo only: a reset code has been "sent" to your email.');
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    if (resetCode === "123456") {
      setStep("reset");
      setMessage("Code verified successfully. You can now set a new password.");
    } else {
      setMessage("Invalid code. Please try again.");
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setMessage("Password reset successful! (demo only)");
    if (props.onNavigateToLogin) {
      props.onNavigateToLogin();
    }
  };

  const handleBackToLogin = () => {
    if (props.onNavigateToLogin) {
      props.onNavigateToLogin();
    } else {
      setMessage("Back to login navigation not implemented in this demo.");
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
            We've “sent” a 6-digit verification code to <strong>{email}</strong>
            .
            <br />
            For this demo, use code 123456.
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
            <p className="text-xs">For demo purposes, use code: 123456</p>
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
