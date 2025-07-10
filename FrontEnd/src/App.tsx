import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./pages/dashboard"; // ⚠️ Make sure this file exists

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
