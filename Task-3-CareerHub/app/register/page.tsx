"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  password: string;
  accountType: string;
};

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("candidate");

  const handleRegister = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const savedUsers = localStorage.getItem(
      "careerHubUsers"
    );

    const users: User[] = savedUsers
      ? JSON.parse(savedUsers)
      : [];

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (emailExists) {
      alert(
        "An account with this email already exists. Please login."
      );

      router.push("/login");
      return;
    }

    const newUser: User = {
      name,
      email,
      password,
      accountType,
    };

    users.push(newUser);

    localStorage.setItem(
      "careerHubUsers",
      JSON.stringify(users)
    );

    // Keep the current user available for the dashboard
    localStorage.setItem(
      "careerHubUser",
      JSON.stringify(newUser)
    );

    localStorage.setItem("userName", name);
    localStorage.setItem("isLoggedIn", "true");

    alert("Account created successfully!");

    if (accountType === "recruiter") {
      router.push("/recruiter-dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-box">

        <h1>Create Account</h1>

        <p>
          Join CareerHub and start your career journey
        </p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <div className="password-box">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="eye-button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              👁️
            </button>

          </div>

          <label>Account Type</label>

          <select
            value={accountType}
            onChange={(e) =>
              setAccountType(e.target.value)
            }
          >
            <option value="candidate">
              Candidate
            </option>

            <option value="recruiter">
              Recruiter
            </option>
          </select>

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <a href="/login">
            Login
          </a>
        </p>

      </div>
    </main>
  );
}