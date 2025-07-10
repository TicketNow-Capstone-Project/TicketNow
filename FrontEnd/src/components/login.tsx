// components/Login.tsx
import React from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import "./components-style/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
  const {
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    handleSubmit,
    loading, // ✅ bring in loading state
  } = useLogin();

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="container">
      <Link to="/home" className="back-btn">
        <img src="/left-arrow.png" alt="Back" />
        <b>Back</b>
      </Link>

      <h2 className="gradient-text">TicketNow LogIn</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="input"
        />

        <label htmlFor="password">Password</label>
        <div className="input-group">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="password-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="eye-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        {/* ✅ Loading-aware button */}
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Logging in..." : "LOG IN"}
        </button>

        <div className="register-prompt">
          Don’t have an account? <a href="/register">Register now</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
