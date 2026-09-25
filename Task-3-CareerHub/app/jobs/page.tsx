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
    skills: "HTML, CSS, JavaScript, React.js",
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
    skills: "Python, Django, SQL",
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
    skills: "HTML, CSS, JavaScript",
  },
];

export default function Jobs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allJobs, setAllJobs] = useState<Job[]>(defaultJobs);
  const [filteredJobs, setFilteredJobs] =
    useState<Job[]>(defaultJobs);

  const [jobType, setJobType] = useState("All");
  const [experience, setExperience] =
    useState("Any Experience");
  const [workMode, setWorkMode] = useState("All");

  const [searchText, setSearchText] = useState("");
  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    const loginStatus =
      localStorage.getItem("isLoggedIn");

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }

    const savedJobs =
      localStorage.getItem("careerHubJobs");

    if (savedJobs) {
      const recruiterJobs: Job[] =
        JSON.parse(savedJobs);

      const combinedJobs = [
        ...defaultJobs,
        ...recruiterJobs,
      ];

      setAllJobs(combinedJobs);
      setFilteredJobs(combinedJobs);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  const applyFilters = () => {
    const result = allJobs.filter((job) => {
      const typeMatch =
        jobType === "All" ||
        job.type === jobType;

      const experienceMatch =
        experience === "Any Experience" ||
        job.experience === experience;

      const modeMatch =
        workMode === "All" ||
        job.mode === workMode;

      const searchMatch =
        job.title
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        job.company
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const locationMatch =
        job.location
          .toLowerCase()
          .includes(
            locationText.toLowerCase()
          );

      return (
        typeMatch &&
        experienceMatch &&
        modeMatch &&
        searchMatch &&
        locationMatch
      );
    });

    setFilteredJobs(result);
  };

  const openJobDetails = (job: Job) => {
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

      <section className="jobs-page">

        <h1>Find Your Next Job</h1>

        <p>
          Explore opportunities and take the next
          step in your career.
        </p>

        <div className="job-search">

          <input
            type="text"
            placeholder="Job title, skills or company"
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={locationText}
            onChange={(e) =>
              setLocationText(e.target.value)
            }
          />

          <button
            onClick={applyFilters}
          >
            Search
          </button>

        </div>

        <div className="job-layout">

          <aside className="filters">

            <h3>Filter Jobs</h3>

            <label>Job Type</label>

            <select
              value={jobType}
              onChange={(e) =>
                setJobType(e.target.value)
              }
            >
              <option>All</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>

            <label>Experience</label>

            <select
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
            >
              <option>
                Any Experience
              </option>
              <option>Fresher</option>
              <option>1-2 Years</option>
              <option>3+ Years</option>
              <option>5+ Years</option>
            </select>

            <label>Work Mode</label>

            <select
              value={workMode}
              onChange={(e) =>
                setWorkMode(e.target.value)
              }
            >
              <option>All</option>
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>

            <button
              className="filter-button"
              onClick={applyFilters}
            >
              Apply Filters
            </button>

          </aside>

          <section className="job-list">

            {filteredJobs.length === 0 ? (
              <div className="job-card">

                <h2>
                  No jobs found
                </h2>

                <p>
                  Try changing your filters
                  to find more jobs.
                </p>

              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  className="job-card"
                  key={job.id}
                >

                  <h2>
                    {job.title}
                  </h2>

                  <p>
                    {job.company}
                  </p>

                  <p>
                    📍 {job.location}
                  </p>

                  <p>
                    💰 {job.salary}
                  </p>

                  <p>
                    💼 {job.type} •{" "}
                    {job.mode}
                  </p>

                  <p>
                    🎓 {job.experience}
                  </p>

                  <span>
                    {job.type}
                  </span>

                  <br />

                  <button
                    onClick={() =>
                      openJobDetails(job)
                    }
                  >
                    View Details
                  </button>

                </div>
              ))
            )}

          </section>

        </div>

      </section>
    </main>
  );
}