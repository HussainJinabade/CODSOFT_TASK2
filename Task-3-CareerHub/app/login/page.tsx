"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  password: string;
  accountType: string;
};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("candidate");

  const handleLogin = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const savedUsers = localStorage.getItem(
      "careerHubUsers"
    );

    if (!savedUsers) {
      alert(
        "No account found. Please register first."
      );
      return;
    }

    const users: User[] = JSON.parse(savedUsers);

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password &&
        item.accountType === accountType
    );

    if (!user) {
      alert(
        "Invalid email, password, or account type."
      );
      return;
    }

    // Save the currently logged-in user
    localStorage.setItem(
      "careerHubUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "userName",
      user.name
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    const applyAfterLogin =
      localStorage.getItem(
        "applyAfterLogin"
      );

    if (applyAfterLogin === "true") {
      localStorage.removeItem(
        "applyAfterLogin"
      );

      router.push("/apply");
      return;
    }

    if (
      user.accountType === "recruiter"
    ) {
      router.push(
        "/recruiter-dashboard"
      );
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-box">

        <h1>Welcome Back</h1>

        <p>
          Login to your CareerHub account
        </p>

        <form onSubmit={handleLogin}>

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

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <label>Login As</label>

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
            Login
          </button>

        </form>

        <p className="auth-link">
          Don't have an account?{" "}
          <a href="/register">
            Register
          </a>
        </p>

      </div>
    </main>
  );
}