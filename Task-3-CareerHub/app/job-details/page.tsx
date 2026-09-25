"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string | number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  mode: string;
  description?: string;
  skills?: string;
};

const defaultJobs: Job[] = [
  {
    id: "default-1",
    title: "Frontend Developer",
    company: "Tech Solutions Pvt. Ltd.",
    location: "Pune, Maharashtra",
    salary: "₹4 - ₹6 LPA",
    type: "Full Time",
    experience: "Fresher",
    mode: "On-site",
    description:
      "Build modern and responsive web applications.",
    skills:
      "HTML, CSS, JavaScript, React.js",
  },
  {
    id: "default-2",
    title: "Python Developer",
    company: "Innovate Technologies",
    location: "Bangalore, Karnataka",
    salary: "₹5 - ₹8 LPA",
    type: "Full Time",
    experience: "1-2 Years",
    mode: "Hybrid",
    description:
      "Develop and maintain Python-based applications.",
    skills:
      "Python, Django, SQL",
  },
  {
    id: "default-3",
    title: "Web Developer Intern",
    company: "Digital Works",
    location: "Mumbai, Maharashtra",
    salary: "₹15,000 / month",
    type: "Internship",
    experience: "Fresher",
    mode: "Remote",
    description:
      "Work with the development team to build responsive websites.",
    skills:
      "HTML, CSS, JavaScript",
  },
];

export default function JobDetails() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const loginStatus =
      localStorage.getItem("isLoggedIn");

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }

    const params = new URLSearchParams(
      window.location.search
    );

    const jobId = params.get("id");

    if (!jobId) {
      return;
    }

    const savedJobs =
      localStorage.getItem("careerHubJobs");

    const recruiterJobs: Job[] = savedJobs
      ? JSON.parse(savedJobs)
      : [];

    const allJobs = [
      ...defaultJobs,
      ...recruiterJobs,
    ];

    const selectedJob = allJobs.find(
      (item) =>
        String(item.id) === String(jobId)
    );

    if (selectedJob) {
      setJob(selectedJob);

      localStorage.setItem(
        "selectedCareerHubJob",
        JSON.stringify(selectedJob)
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  const handleApply = () => {
    if (!job) {
      return;
    }

    localStorage.setItem(
      "selectedCareerHubJob",
      JSON.stringify(job)
    );

    const loginStatus =
      localStorage.getItem("isLoggedIn");

    if (loginStatus !== "true") {
      localStorage.setItem(
        "applyAfterLogin",
        "true"
      );

      window.location.href = "/login";
      return;
    }

    window.location.href = "/apply";
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

              <button
                onClick={handleLogout}
              >
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

      {!job ? (
        <section className="job-details">
          <div className="job-details-card">
            <h1>Job Not Found</h1>

            <p>
              Please go back to the Jobs page
              and select a job.
            </p>

            <a href="/jobs">
              <button>
                Browse Jobs
              </button>
            </a>
          </div>
        </section>
      ) : (
        <section className="job-details">
          <div className="job-details-card">

            <h1>
              {job.title}
            </h1>

            <p className="company-name">
              {job.company}
            </p>

            <div className="job-info">

              <span>
                📍 {job.location}
              </span>

              <span>
                💰 {job.salary}
              </span>

              <span>
                💼 {job.type}
              </span>

              <span>
                🎓 {job.experience}
              </span>

              <span>
                🏠 {job.mode}
              </span>

            </div>

            <hr />

            <h2>
              Job Description
            </h2>

            <p>
              {job.description ||
                "No job description provided."}
            </p>

            <h2>
              Required Skills
            </h2>

            {job.skills ? (
              <ul>
                {job.skills
                  .split(",")
                  .map(
                    (skill, index) => (
                      <li key={index}>
                        {skill.trim()}
                      </li>
                    )
                  )}
              </ul>
            ) : (
              <p>
                No specific skills listed.
              </p>
            )}

            <button
              className="apply-button"
              onClick={handleApply}
            >
              Apply Now
            </button>

          </div>
        </section>
      )}
    </main>
  );
}