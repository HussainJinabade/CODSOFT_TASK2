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

export default function ManageJobs() {
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);

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

    const savedJobs = localStorage.getItem("careerHubJobs");

    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }

    setCheckingLogin(false);
  }, []);

  const handleDelete = (id: number) => {
    const updatedJobs = jobs.filter(
      (job) => job.id !== id
    );

    setJobs(updatedJobs);

    localStorage.setItem(
      "careerHubJobs",
      JSON.stringify(updatedJobs)
    );

    alert("Job deleted successfully.");
  };

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

        <h1>Manage Jobs</h1>

        <p className="dashboard-welcome">
          View and manage your posted job listings.
        </p>

        <div className="applications-section">

          {jobs.length === 0 ? (
            <div className="job-card">
              <h2>No Jobs Posted Yet</h2>

              <p>
                You have not posted any jobs yet.
              </p>

              <a href="/post-job">
                <button>Post Your First Job</button>
              </a>
            </div>
          ) : (
            jobs.map((job) => (
              <div className="application-item" key={job.id}>

                <div>
                  <h3>{job.title}</h3>

                  <p>
                    🏢 {job.company}
                  </p>

                  <p>
                    📍 {job.location}
                  </p>

                  <p>
                    💰 {job.salary}
                  </p>

                  <p>
                    💼 {job.type} • {job.mode}
                  </p>

                  <p>
                    🎓 {job.experience}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}

        </div>

      </section>
    </main>
  );
}