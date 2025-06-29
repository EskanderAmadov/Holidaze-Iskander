import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/auth/login";
import { fetchUserProfile } from "../api/profile/fetchProfile";
import api from "../api/client"; 

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loginData = await loginUser({ email, password });

      api.defaults.headers.common["Authorization"] = `Bearer ${loginData.accessToken}`;

      const profileData = await fetchUserProfile(loginData.name);

      const fullUser = {
        ...loginData,
        ...profileData,
      };

      login(fullUser);

      if (fullUser.venueManager) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Log in</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="you@stud.noroff.no"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Log in</button>

        <p className="mt-4 text-center">
          Not registered yet?{" "}
          <Link to="/register" className="text-decoration-underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
