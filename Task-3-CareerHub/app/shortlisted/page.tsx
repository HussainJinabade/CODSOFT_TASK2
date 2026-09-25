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

export default function Shortlisted() {
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

      if (user.accountType !== "recruiter") {
        window.location.href = "/dashboard";
        return;
      }
    }

    const savedApplications =
      localStorage.getItem("careerHubApplications");

    if (savedApplications) {
      const allApplications: Application[] =
        JSON.parse(savedApplications);

      const shortlisted = allApplications.filter(
        (application) =>
          application.status === "Shortlisted"
      );

      setApplications(shortlisted);
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

        <h1>Shortlisted Candidates</h1>

        <p className="dashboard-welcome">
          Candidates selected for the next stage of recruitment.
        </p>

        <div className="applications-section">

          {applications.length === 0 ? (
            <div className="job-card">
              <h2>No Shortlisted Candidates</h2>

              <p>
                Candidates you shortlist will appear here.
              </p>

              <a href="/applicants">
                <button>
                  View Applicants
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
                  <h3>{application.candidateName}</h3>

                  <p>
                    💼 {application.jobTitle}
                  </p>

                  <p>
                    🏢 {application.company}
                  </p>

                  <p>
                    📧 {application.email}
                  </p>

                  <p>
                    📱 {application.phone}
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

                <span className="status shortlisted">
                  ⭐ Shortlisted
                </span>
              </div>
            ))
          )}

        </div>

      </section>
    </main>
  );
}