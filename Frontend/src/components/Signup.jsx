import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Backend URL from .env OR fallback localhost:3000
const BACKEND_URL = import.meta.env.VITE_BACKEND || "https://skyverse-ai-chatbot.onrender.com";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ success message
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password)
      return setError("Please fill all fields.");
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("JSON parse error:", jsonErr);
      }

      console.log("Signup API Response:", data);

      if (!res.ok) {
        setError(data.message || "Signup failed.");
      } else {
        setSuccess("Registered Successfully ✅ Redirecting to Login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="w-full px-[10px] sm:px-0 flex justify-center">
        <div className="w-full max-w-md p-8 bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center mb-6">
            Sign Up
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 shadow-xl"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 shadow-xl"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 shadow-xl"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>} {/* ✅ show success */}

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold rounded-2xl shadow-xl text-white duration-300 shadow-xl shadow-indigo-600/40 transition-all active:scale-95 cursor-pointer hover:scale-105 disabled:cursor-not-allowed"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-white/50 mt-4 text-sm">
            Already have an account?{" "}
            <span
              className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold cursor-pointer hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
