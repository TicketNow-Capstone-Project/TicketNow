import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCSRFToken = () => {
    const name = "csrftoken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length);
    }
    return "";
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const login = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/api/login/",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
          },
        }
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
    } catch (err) {
      const errorData = err.response?.data || {};
      return {
        success: false,
        message:
          errorData.message ||
          errorData.error ||
          (err.response?.status === 401 ? "Invalid credentials" : "Login failed"),
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/auth/api/logout/");
    } catch (err) {
      console.error("Logout API failed, clearing client state anyway.", err);
    }
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
