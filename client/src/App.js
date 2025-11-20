import React, { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { PasswordResetPage } from "./components/PasswordResetPage";
import { AdminDashboard } from "./components/AdminDashboard";
import "./App.css";

const PAGES = {
  LOGIN: "login",
  SIGNUP: "signup",
  RESET: "reset",
  ADMIN: "admin",
  // add other page keys here when you need them
};

function App() {
  const [page, setPage] = useState(PAGES.LOGIN);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handler when login is successful
  const handleLogin = (userData) => {
    // TODO: Replace with backend logic later

    // Check for admin email
    if (
      userData &&
      userData.email &&
      userData.email.toLowerCase() === "admin@okclinic.com"
    ) {
      setIsAdmin(true);
      setUser(userData);
      setPage(PAGES.ADMIN);
    } else {
      setIsAdmin(false);
      setUser(userData);
      // For non-admin, you can navigate to another page, e.g. a ProfilePage or HomePage
      // For now, we'll just stay on the login page after "login" as a placeholder:
      setPage(PAGES.LOGIN);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setPage(PAGES.LOGIN);
  };

  return (
    <div className="App">
      {page === PAGES.LOGIN && (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToSignup={() => setPage(PAGES.SIGNUP)}
          onNavigateToPasswordReset={() => setPage(PAGES.RESET)}
        />
      )}
      {page === PAGES.SIGNUP && (
        <SignupPage
          onSignup={handleLogin}
          onNavigateToLogin={() => setPage(PAGES.LOGIN)}
        />
      )}
      {page === PAGES.RESET && (
        <PasswordResetPage onNavigateToLogin={() => setPage(PAGES.LOGIN)} />
      )}
      {page === PAGES.ADMIN && (
        <AdminDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
