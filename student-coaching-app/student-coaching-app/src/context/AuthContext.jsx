
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ------------------ SIGNUP ------------------
  const signup = async (formData) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!response.ok) throw new Error(typeof data === "string" ? data : data.message);

    alert("✅ Registration successful!");
    navigate("/signin");
    return data;
  };

  // ------------------ SIGNIN ------------------
  const signin = async (formData) => {
    const response = await fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!response.ok) throw new Error(typeof data === "string" ? data : data.message);

    if (typeof data === "object") {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }

    alert("✅ Signin successful!");
    navigate("/dashboard");
    return data;
  };

  // ------------------ RESET PASSWORD ------------------
  const resetPassword = async (email, newPassword) => {
    const response = await fetch("http://localhost:8080/auth/resetpassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!response.ok) throw new Error(typeof data === "string" ? data : data.message);

    alert("✅ " + (typeof data === "string" ? data : data.message));
    navigate("/signin");
    return data;
  };

  // ------------------ LOGOUT ------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, resetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
