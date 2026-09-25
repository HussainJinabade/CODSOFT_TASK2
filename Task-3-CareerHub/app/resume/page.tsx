"use client";

import { useEffect, useState } from "react";

export default function Resume() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
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

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setResumeUploaded(true);
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

      <section className="dashboard-page">
        <h1>My Resume</h1>

        <p className="dashboard-welcome">
          Upload and manage your resume for job applications.
        </p>

        <div className="resume-card">

          <div className="resume-icon">
            📄
          </div>

          <h2>
            {resumeUploaded
              ? "Resume Uploaded Successfully"
              : "Upload Your Resume"}
          </h2>

          <p>
            Upload your latest resume in PDF format.
          </p>

          <label className="resume-upload">
            Choose Resume

            <input
              type="file"
              accept=".pdf"
              onChange={handleUpload}
            />
          </label>

          {resumeUploaded && (
            <div className="resume-success">
              <p>
                ✅ Your resume is ready to use for job applications.
              </p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}