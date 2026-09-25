"use client";

import { useEffect, useState } from "react";

export default function PostJob() {
  const [checkingLogin, setCheckingLogin] = useState(true);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [experience, setExperience] = useState("Fresher");
  const [workMode, setWorkMode] = useState("On-site");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

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

    setCheckingLogin(false);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      title,
      company,
      location,
      salary,
      type: jobType,
      experience,
      mode: workMode,
      description,
      skills,
    };

    const existingJobs = localStorage.getItem("careerHubJobs");

    const jobs = existingJobs
      ? JSON.parse(existingJobs)
      : [];

    jobs.push(newJob);

    localStorage.setItem(
      "careerHubJobs",
      JSON.stringify(jobs)
    );

    alert("Job posted successfully!");

    window.location.href = "/recruiter-dashboard";
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

      <section className="apply-page">
        <div className="apply-box">

          <h1>Post a Job</h1>

          <p>
            Create a new job opening and find the right candidate.
          </p>

          <form onSubmit={handleSubmit}>

            <label>Job Title</label>

            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Company Name</label>

            <input
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />

            <label>Location</label>

            <input
              type="text"
              placeholder="e.g. Pune, Maharashtra"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <label>Salary</label>

            <input
              type="text"
              placeholder="e.g. ₹4 - ₹6 LPA"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />

            <label>Job Type</label>

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>

            <label>Experience</label>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option>Fresher</option>
              <option>1-2 Years</option>
              <option>3+ Years</option>
              <option>5+ Years</option>
            </select>

            <label>Work Mode</label>

            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>

            <label>Required Skills</label>

            <input
              type="text"
              placeholder="e.g. React, JavaScript, HTML, CSS"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />

            <label>Job Description</label>

            <textarea
              placeholder="Describe the job, responsibilities and requirements..."
              rows={7}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <button type="submit">
              Publish Job
            </button>

          </form>

        </div>
      </section>
    </main>
  );
}