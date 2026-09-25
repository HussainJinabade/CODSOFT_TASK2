"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  const [userName, setUserName] = useState("User");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editName, setEditName] = useState("");

  useEffect(() => {
    const loginStatus =
      localStorage.getItem("isLoggedIn");

    const savedUser =
      localStorage.getItem("careerHubUser");

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }

    if (savedUser) {
      const user = JSON.parse(savedUser);

      setUserName(user.name || "User");
      setEmail(user.email || "");
      setEditName(user.name || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      alert("Please enter your name.");
      return;
    }

    const savedUser =
      localStorage.getItem("careerHubUser");

    if (!savedUser) {
      return;
    }

    const user = JSON.parse(savedUser);

    const updatedUser = {
      ...user,
      name: editName.trim(),
    };

    localStorage.setItem(
      "careerHubUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "userName",
      editName.trim()
    );

    setUserName(editName.trim());
    setEditing(false);

    alert("Profile updated successfully!");
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

              <button onClick={handleLogout}>
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

      <section className="dashboard-page">
        <h1>My Profile</h1>

        <div className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <h2>{userName}</h2>

          <p>CareerHub Candidate</p>

          <hr />

          {!editing ? (
            <>
              <div className="profile-info">

                <div>
                  <strong>
                    Full Name
                  </strong>

                  <p>
                    {userName}
                  </p>
                </div>

                <div>
                  <strong>
                    Email
                  </strong>

                  <p>
                    {email || "Not available"}
                  </p>
                </div>

                <div>
                  <strong>
                    Account Type
                  </strong>

                  <p>
                    Candidate
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className="edit-profile">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={editName}
                onChange={(e) =>
                  setEditName(e.target.value)
                }
                placeholder="Enter your name"
              />

              <label>
                Email
              </label>

              <input
                type="email"
                value={email}
                disabled
              />

              <div className="edit-buttons">

                <button
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditing(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </div>
          )}

        </div>
      </section>
    </main>
  );
}