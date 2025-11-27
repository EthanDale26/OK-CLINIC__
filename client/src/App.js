import React, { useState } from "react";
import { Navigation } from "./components/Navigation";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { PasswordResetPage } from "./components/PasswordResetPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { ProfilePage } from './components/ProfilePage';
import { BookingPage } from "./components/BookingPage";
import { InvoicesPage } from "./components/InvoicesPage";
import { FeedbackPage } from "./components/FeedbackPage";
import { CheckoutPage } from "./components/CheckoutPage";
import "./App.css";
import './customer.css';


const PAGES = {
  LOGIN: "login",
  SIGNUP: "signup",
  RESET: "reset",
  ADMIN: "admin",
  PROFILE: "profile",
  BOOKING: "booking",
  INVOICES: "invoices",
  FEEDBACK: "feedback",
  CHECKOUT: "checkout"
};

function App() {
  const [page, setPage] = useState(PAGES.LOGIN);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Example state for pets & appointments, update/fetch as needed
  const [pets, setPets] = useState([
    { id: "p1", name: "Bella", species: "Dog", breed: "Labrador", age: 5 }
  ]);
  const [appointments, setAppointments] = useState([]);
  const [pendingAppointment, setPendingAppointment] = useState(null);

  // Navigation handler - robust to missing/invalid page keys
  const handleNavigate = (nextPage) => {
    const p = (nextPage || "").toLowerCase();
    setPage(PAGES[p.toUpperCase()] || PAGES.PROFILE);
  };

  // Login handler
  const handleLogin = (userData) => {
    if (userData && userData.email && userData.email.toLowerCase() === "admin@okclinic.com") {
      setIsAdmin(true);
      setUser(userData);
      setPage(PAGES.ADMIN);
    } else {
      setIsAdmin(false);
      setUser(userData);
      setPage(PAGES.PROFILE);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setPage(PAGES.LOGIN);
  };

  // Appointment booking handler
  const handleBookingComplete = (details) => {
    setPendingAppointment(details);
    setPage(PAGES.CHECKOUT);
  };

  // Payment complete handler
  const handlePaymentComplete = () => {
    if (pendingAppointment) {
      setAppointments((prev) => [
        ...prev,
        { ...pendingAppointment, id: Date.now().toString(), status: "upcoming" }
      ]);
      setPendingAppointment(null);
    }
    setPage(PAGES.PROFILE);
  };

  const showNav = ![PAGES.LOGIN, PAGES.SIGNUP, PAGES.RESET].includes(page);

  return (
    <div className="App">
      {showNav && (
        <Navigation
          currentPage={page}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}
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
      {page === PAGES.PROFILE && (
        <ProfilePage
          user={user}
          pets={pets}
          appointments={appointments}
          onNavigate={handleNavigate}
        />
      )}
      {page === PAGES.BOOKING && (
        <BookingPage
          user={user}
          pets={pets}
          appointments={appointments}
          onBookingComplete={handleBookingComplete}
          onNavigate={handleNavigate}
        />
      )}
      {page === PAGES.CHECKOUT && (
        <CheckoutPage
          appointment={pendingAppointment}
          user={user}
          onPaymentComplete={handlePaymentComplete}
          onNavigate={handleNavigate}
        />
      )}
      {page === PAGES.INVOICES && (
        <InvoicesPage
          user={user}
          onNavigate={handleNavigate}
        />
      )}
      {page === PAGES.FEEDBACK && (
        <FeedbackPage user={user} onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
