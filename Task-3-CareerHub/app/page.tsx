"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  return (
    <main>
      {/* NAVBAR */}
      <nav className="navbar">
        <h2>CareerHub</h2>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/jobs">Jobs</a>

          {isLoggedIn ? (
            <>
              <a href="/dashboard">Dashboard</a>

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Find Your Dream Job</h1>

        <p>
          Discover opportunities and take the next step in your career.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Job title, skills or company"
          />

          <input
            type="text"
            placeholder="Location"
          />

          <a href="/jobs">
            <button>Search Jobs</button>
          </a>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="jobs-section">
        <h2>Featured Jobs</h2>

        <div className="job-container">

          <div className="job-card">
            <h3>Frontend Developer</h3>

            <p>Tech Solutions Pvt. Ltd.</p>

            <p>📍 Pune, Maharashtra</p>

            <p>💰 ₹4 - ₹6 LPA</p>

            <p>💼 Full Time</p>

            <a href="/job-details">
              <button>View Job</button>
            </a>
          </div>

          <div className="job-card">
            <h3>Python Developer</h3>

            <p>Innovate Technologies</p>

            <p>📍 Bangalore, Karnataka</p>

            <p>💰 ₹5 - ₹8 LPA</p>

            <p>💼 Full Time</p>

            <a href="/job-details">
              <button>View Job</button>
            </a>
          </div>

          <div className="job-card">
            <h3>Web Developer Intern</h3>

            <p>Digital Works</p>

            <p>📍 Mumbai, Maharashtra</p>

            <p>💰 ₹15,000 / month</p>

            <p>💼 Internship</p>

            <a href="/job-details">
              <button>View Job</button>
            </a>
          </div>

        </div>
      </section>

      {/* WHY CAREERHUB */}
      <section className="why-section">
        <h2>Why CareerHub?</h2>

        <div className="features">

          <div>
            <h3>🔎 Easy Job Search</h3>

            <p>
              Search and discover jobs based on your skills,
              experience and location.
            </p>
          </div>

          <div>
            <h3>📄 Easy Applications</h3>

            <p>
              Apply for jobs and keep track of your applications
              from your dashboard.
            </p>
          </div>

          <div>
            <h3>🚀 Career Growth</h3>

            <p>
              Find opportunities that help you move forward
              in your career.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 CareerHub. All rights reserved.</p>
      </footer>
    </main>
  );
}