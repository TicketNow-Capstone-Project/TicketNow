import React, { useState } from "react";
import type { FormEvent } from "react";
import "./components-style/login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "123456") {
      alert("Login successful!");
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className="container">
      <a href="/home" className="back-btn">
        <img src="/left-arrow.png" alt="Back" />
        <b>Back</b>
      </a>

      <h2>TicketNow LogIn</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Phone Number</label>
        <input
          type="number"
          placeholder="Enter your phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default Login;
