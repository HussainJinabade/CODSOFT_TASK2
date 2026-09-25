"use client";

import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  mode: string;
  description: string;
  skills: string;
};

type Application = {
  id: number;
  jobTitle: string;
  company: string;
  candidateName: string;
  email: string;
  phone: string;
  coverMessage: string;
  status: string;
  appliedOn: string;
};

export default function RecruiterDashboard() {
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [userName, setUserName] = useState("Recruiter");

  const [jobCount, setJobCount] = useState(0);
  const [applicantCount, setApplicantCount] = useState(0);
  const [shortlistedCount, setShortlistedCount] = useState(0);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUser = localStorage.getItem("careerHubUser");

    if (isLoggedIn !== "true") {
      window.location.href = "/login";
      return;
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);

      if (user.accountType !== "recruiter") {
        window.location.href = "/dashboard";
        return;
      }

      setUserName(user.name);
    }

    const savedJobs = localStorage.getItem("careerHubJobs");

    if (savedJobs) {
      const jobs: Job[] = JSON.parse(savedJobs);
      setJobCount(jobs.length);
    }

    const savedApplications =
      localStorage.getItem("careerHubApplications");

    if (savedApplications) {
      const applications: Application[] =
        JSON.parse(savedApplications);

      setApplicantCount(applications.length);

      const shortlisted = applications.filter(
        (application) =>
          application.status === "Shortlisted"
      );

      setShortlistedCount(shortlisted.length);
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
        <h2>Checking account...</h2>
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

          <a href="/recruiter-dashboard">
            Recruiter Dashboard
          </a>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="dashboard-page">

        <h1>Welcome, {userName}! 👋</h1>

        <p className="dashboard-welcome">
          Manage your recruitment activities from here.
        </p>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h2>📢 Post a Job</h2>

            <p>
              Create and publish a new job opening.
            </p>

            <a href="/post-job">
              <button>Post Job</button>
            </a>
          </div>

          <div className="dashboard-card">
            <h2>💼 Manage Jobs</h2>

            <p>
              View and manage your posted job listings.
            </p>

            <a href="/manage-jobs">
              <button>Manage Jobs</button>
            </a>
          </div>

          <div className="dashboard-card">
            <h2>👥 Applicants</h2>

            <p>
              Review candidates who applied for your jobs.
            </p>

            <a href="/applicants">
              <button>View Applicants</button>
            </a>
          </div>

          <div className="dashboard-card">
            <h2>⭐ Shortlisted</h2>

            <p>
              View candidates selected for the next stage.
            </p>

            <a href="/shortlisted">
              <button>View Shortlisted</button>
            </a>
          </div>

        </div>

        <section className="applications-section">

          <h2>Recruitment Overview</h2>

          <div className="application-item">
            <div>
              <h3>Active Job Listings</h3>

              <p>
                Manage your currently published jobs.
              </p>
            </div>

            <strong>{jobCount}</strong>
          </div>

          <div className="application-item">
            <div>
              <h3>Total Applicants</h3>

              <p>
                Candidates who have applied to your jobs.
              </p>
            </div>

            <strong>{applicantCount}</strong>
          </div>

          <div className="application-item">
            <div>
              <h3>Shortlisted Candidates</h3>

              <p>
                Candidates selected for further consideration.
              </p>
            </div>

            <strong>{shortlistedCount}</strong>
          </div>

        </section>

      </section>
    </main>
  );
}