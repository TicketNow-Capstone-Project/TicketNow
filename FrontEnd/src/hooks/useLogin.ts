import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // 👈 loading state

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 👈 start loading

    const data = { phone_number: phoneNumber, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.detail || "Unknown error"}`);
        return;
      }

      const result = await response.json();
      localStorage.setItem("access", result.access);
      localStorage.setItem("refresh", result.refresh);
      console.log("Login response:", result);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setLoading(false); // 👈 stop loading
    }
  };

  return {
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    handleSubmit,
    loading, // 👈 expose loading state
  };
};
