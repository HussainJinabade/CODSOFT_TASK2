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

export default function Applicants() {
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
      setApplications(JSON.parse(savedApplications));
    }

    setCheckingLogin(false);
  }, []);

  const updateStatus = (
    applicationId: number,
    newStatus: string
  ) => {
    const updatedApplications = applications.map(
      (application) => {
        if (application.id === applicationId) {
          return {
            ...application,
            status: newStatus,
          };
        }

        return application;
      }
    );

    setApplications(updatedApplications);

    localStorage.setItem(
      "careerHubApplications",
      JSON.stringify(updatedApplications)
    );
  };

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

          <a href="/recruiter-dashboard">
            Recruiter Dashboard
          </a>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="dashboard-page">

        <h1>Applicants</h1>

        <p className="dashboard-welcome">
          Review and manage candidates who applied for your jobs.
        </p>

        <div className="applications-section">

          {applications.length === 0 ? (
            <div className="job-card">
              <h2>No Applicants Yet</h2>

              <p>
                Candidates who apply for your jobs will appear here.
              </p>
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

                  <div className="applicant-actions">

                    <button
                      onClick={() =>
                        updateStatus(
                          application.id,
                          "Shortlisted"
                        )
                      }
                    >
                      ⭐ Shortlist
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          application.id,
                          "Accepted"
                        )
                      }
                    >
                      ✅ Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          application.id,
                          "Rejected"
                        )
                      }
                    >
                      ❌ Reject
                    </button>

                  </div>
                </div>

                <span className={getStatusClass(application.status)}>
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