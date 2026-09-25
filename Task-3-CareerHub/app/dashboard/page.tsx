"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      window.location.href = "/login";
      return;
    }

    const name = localStorage.getItem("userName");

    if (name) {
      setUserName(name);
    }

    setCheckingLogin(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  if (checkingLogin) {
    return (
      <main className="auth-page">
        <h2>Checking login...</h2>
      </main>
    );
  }

  return (
    <main>
      <nav className="navbar">
        <h2>CareerHub</h2>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/jobs">Jobs</a>
          <a href="/dashboard">Dashboard</a>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="dashboard-page">
        <h1>Welcome, {userName}! 👋</h1>

        <p className="dashboard-welcome">
          Manage your job search from here.
        </p>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h2>👤 My Profile</h2>

            <p>
              View and update your personal information.
            </p>

            <a href="/profile">
              <button>View Profile</button>
            </a>
          </div>

          <div className="dashboard-card">
            <h2>📄 My Applications</h2>

            <p>
              Track the jobs you have applied for.
            </p>

            <a href="/applications">
              <button>View Applications</button>
            </a>
          </div>

          <div className="dashboard-card">
            <h2>❤️ Saved Jobs</h2>

            <p>
              View jobs you have saved for later.
            </p>

            <a href="/saved-jobs">
              <button>View Saved Jobs</button>
            </a>
          </div>

          <div className="dashboard-card">
            <h2>📑 My Resume</h2>

            <p>
              Manage your uploaded resume.
            </p>

            <a href="/resume">
              <button>View Resume</button>
            </a>
          </div>

        </div>

        <section className="applications-section">
          <h2>Recent Applications</h2>

          <div className="application-item">
            <div>
              <h3>Frontend Developer</h3>
              <p>Tech Solutions Pvt. Ltd.</p>
            </div>

            <span className="status applied">
              Applied
            </span>
          </div>

          <div className="application-item">
            <div>
              <h3>Python Developer</h3>
              <p>Innovate Technologies</p>
            </div>

            <span className="status shortlisted">
              Shortlisted
            </span>
          </div>
        </section>

      </section>
    </main>
  );
}