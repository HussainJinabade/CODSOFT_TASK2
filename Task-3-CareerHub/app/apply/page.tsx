"use client";

import { useEffect, useState } from "react";

type Job = {
  id?: number;
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

export default function Apply() {
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [job, setJob] = useState<Job | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverMessage, setCoverMessage] = useState("");

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      window.location.href = "/login";
      return;
    }

    const savedUser =
      localStorage.getItem("careerHubUser");

    if (savedUser) {
      const user = JSON.parse(savedUser);

      setFullName(user.name || "");
      setEmail(user.email || "");
    }

    const savedJob =
      localStorage.getItem(
        "selectedCareerHubJob"
      );

    if (savedJob) {
      setJob(JSON.parse(savedJob));
    }

    setCheckingLogin(false);
  }, []);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!job) {
      alert(
        "Please select a job before applying."
      );
      return;
    }

    const newApplication: Application = {
      id: Date.now(),
      jobTitle: job.title,
      company: job.company,
      candidateName: fullName,
      email,
      phone,
      coverMessage,
      status: "Applied",
      appliedOn:
        new Date().toLocaleDateString(
          "en-IN"
        ),
    };

    const existingApplications =
      localStorage.getItem(
        "careerHubApplications"
      );

    const applications =
      existingApplications
        ? JSON.parse(existingApplications)
        : [];

    applications.push(newApplication);

    localStorage.setItem(
      "careerHubApplications",
      JSON.stringify(applications)
    );

    setSubmitted(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  if (checkingLogin) {
    return (
      <main className="auth-page">
        <h2>Checking login...</h2>
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
          <a href="/dashboard">
            Dashboard
          </a>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <section className="apply-page">
        <div className="apply-box">

          {submitted ? (
            <div className="success-message">

              <h1>
                Application Submitted! 🎉
              </h1>

              <p>
                Your application for{" "}
                <strong>
                  {job?.title}
                </strong>{" "}
                at{" "}
                <strong>
                  {job?.company}
                </strong>{" "}
                has been successfully submitted.
              </p>

              <a href="/applications">
                <button>
                  View My Applications
                </button>
              </a>

            </div>
          ) : (
            <>
              <h1>
                Apply for Job
              </h1>

              <p>
                {job
                  ? `${job.title} - ${job.company}`
                  : "Selected Job"}
              </p>

              <form onSubmit={handleSubmit}>

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  required
                />

                <label>
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your Gmail address"
                  pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                  title="Please enter a valid Gmail address ending with @gmail.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                />

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  inputMode="numeric"
                  title="Mobile number must be 10 digits and start with 6, 7, 8, or 9"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  required
                />

                <label>
                  Resume
                </label>

                <input
                  type="file"
                  accept=".pdf"
                  required
                />

                <label>
                  Cover Message
                </label>

                <textarea
                  placeholder="Write a short message to the recruiter..."
                  rows={5}
                  value={coverMessage}
                  onChange={(e) =>
                    setCoverMessage(
                      e.target.value
                    )
                  }
                ></textarea>

                <button type="submit">
                  Submit Application
                </button>

              </form>
            </>
          )}

        </div>
      </section>
    </main>
  );
}