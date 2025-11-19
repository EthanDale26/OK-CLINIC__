import React, { useState } from "react";

export function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="admin-bg">
      {/* Admin Navigation */}
      <nav className="admin-navbar">
        <div className="admin-navbar-inner">
          <div className="admin-navbar-content">
            <div className="admin-navbar-brand">
              <h1 className="admin-navbar-title">Welcome OK Clinic Admin</h1>
            </div>
            <button className="admin-logout-btn" onClick={onLogout}>
              <span className="admin-logout-icon" style={{ marginRight: 8 }}>
                ⏻
              </span>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="admin-main">
        <div className="admin-tabs-list">
          <button
            className={
              activeTab === "dashboard" ? "admin-tab active" : "admin-tab"
            }
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={
              activeTab === "appointments" ? "admin-tab active" : "admin-tab"
            }
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </button>
          <button
            className={activeTab === "pets" ? "admin-tab active" : "admin-tab"}
            onClick={() => setActiveTab("pets")}
          >
            Pet Patients
          </button>
          <button
            className={
              activeTab === "clients" ? "admin-tab active" : "admin-tab"
            }
            onClick={() => setActiveTab("clients")}
          >
            Clients
          </button>
          <button
            className={
              activeTab === "invoices" ? "admin-tab active" : "admin-tab"
            }
            onClick={() => setActiveTab("invoices")}
          >
            Invoices
          </button>
          <button
            className={
              activeTab === "services" ? "admin-tab active" : "admin-tab"
            }
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
          <button
            className={
              activeTab === "feedback" ? "admin-tab active" : "admin-tab"
            }
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
        </div>
        {/* Add content below depending on activeTab */}
      </div>
    </div>
  );
}
