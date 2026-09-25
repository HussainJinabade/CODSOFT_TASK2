"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string | number;
  title: string;
  company: string;
  location: string;
  salary: string;
};

const savedJobs: Job[] = [
  {
    id: "default-1",
    title: "Frontend Developer",
    company: "Tech Solutions Pvt. Ltd.",
    location: "Pune, Maharashtra",
    salary: "₹4 - ₹6 LPA",
  },
  {
    id: "default-2",
    title: "Python Developer",
    company: "Innovate Technologies",
    location: "Bangalore, Karnataka",
    salary: "₹5 - ₹8 LPA",
  },
  {
    id: "default-3",
    title: "Web Developer Intern",
    company: "Digital Works",
    location: "Mumbai, Maharashtra",
    salary: "₹15,000 / month",
  },
];

export default function SavedJobs() {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {
    const loginStatus =
      localStorage.getItem("isLoggedIn");

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  const openJob = (job: Job) => {
    localStorage.setItem(
      "selectedCareerHubJob",
      JSON.stringify(job)
    );

    window.location.href =
      `/job-details?id=${encodeURIComponent(
        String(job.id)
      )}`;
  };

  return (
    <main>
      <nav className="navbar">
        <h2>CareerHub</h2>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/jobs">Jobs</a>

          {isLoggedIn ? (
            <>
              <a href="/dashboard">
                Dashboard
              </a>

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login">
                Login
              </a>

              <a href="/register">
                Register
              </a>
            </>
          )}
        </div>
      </nav>

      <section className="dashboard-page">

        <h1>Saved Jobs</h1>

        <p className="dashboard-welcome">
          Jobs you have saved for later.
        </p>

        <div className="applications-section">

          {savedJobs.map((job) => (
            <div
              className="application-item"
              key={job.id}
            >
              <div>
                <h3>
                  {job.title}
                </h3>

                <p>
                  {job.company}
                </p>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  💰 {job.salary}
                </p>
              </div>

              <button
                onClick={() =>
                  openJob(job)
                }
              >
                View Job
              </button>
            </div>
          ))}

        </div>

      </section>
    </main>
  );
}