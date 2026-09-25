"use client";

import { useEffect, useState } from "react";

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

export default function Applications() {
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUser = localStorage.getItem("careerHubUser");

    if (isLoggedIn !== "true") {
      window.location.href = "/login";
      return;
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);

      if (user.accountType !== "candidate") {
        window.location.href = "/recruiter-dashboard";
        return;
      }
    }

    const savedApplications =
      localStorage.getItem("careerHubApplications");

    if (savedApplications) {
      const allApplications = JSON.parse(savedApplications);

      setApplications(allApplications);
    }

    setCheckingLogin(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  const getStatusClass = (status: string) => {
    if (status === "Shortlisted") {
      return "status shortlisted";
    }

    if (status === "Accepted") {
      return "status accepted";
    }

    if (status === "Rejected") {
      return "status rejected";
    }

    return "status applied";
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
          <a href="/dashboard">Dashboard</a>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="dashboard-page">

        <h1>My Applications</h1>

        <p className="dashboard-welcome">
          Track the status of your job applications.
        </p>

        <div className="applications-section">

          {applications.length === 0 ? (
            <div className="job-card">
              <h2>No Applications Yet</h2>

              <p>
                Your job applications will appear here.
              </p>

              <a href="/jobs">
                <button>
                  Browse Jobs
                </button>
              </a>
            </div>
          ) : (
            applications.map((application) => (
              <div
                className="application-item"
                key={application.id}
              >

                <div>
                  <h3>{application.jobTitle}</h3>

                  <p>
                    🏢 {application.company}
                  </p>

                  <p>
                    📧 {application.email}
                  </p>

                  <p>
                    📅 Applied on: {application.appliedOn}
                  </p>

                  {application.coverMessage && (
                    <p>
                      💬 {application.coverMessage}
                    </p>
                  )}
                </div>

                <span
                  className={getStatusClass(
                    application.status
                  )}
                >
                  {application.status}
                </span>

              </div>
            ))
          )}

        </div>

      </section>
    </main>
  );
}