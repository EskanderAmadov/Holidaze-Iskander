import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth/register";
import { loginUser } from "../api/auth/login";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser({
        name,
        email,
        password,
        venueManager,
      });

      const data = await loginUser({ email, password });

      login(data);

      if (data.venueManager) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Only stud.noroff.no email addresses are allowed, or the username is already in use.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Sign up</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="yourusername"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="din@stud.noroff.no"
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
            placeholder="Enter you password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="venueManager"
            checked={venueManager}
            onChange={(e) => setVenueManager(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="venueManager">
            I want to register as a venue manager
          </label>
        </div>

        <button type="submit" className="btn btn-success w-100">Sign up</button>

        <p className="mt-4 text-center">
         Already a member?{" "}
          <Link to="/login" className="text-decoration-underline">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
