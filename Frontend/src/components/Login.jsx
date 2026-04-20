import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const BACKEND_URL = import.meta.env.VITE_BACKEND || "http://localhost:3000";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return setError("Please fill all fields.");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
      } else {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);

        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id);

        navigate("/");
      } else {
        setError(data.message || "Google login failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong with Google login.");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="w-full px-[10px] sm:px-0 flex justify-center">
        <div className="w-full max-w-md p-8 bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10">

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center mb-6">
            Login
          </h1>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleLogin()}
              disabled={loading}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 shadow-xl disabled:opacity-50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleLogin()}
              disabled={loading}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 shadow-xl disabled:opacity-50"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold rounded-2xl shadow-xl text-white duration-300 shadow-xl shadow-indigo-600/40 transition-all active:scale-95 cursor-pointer hover:scale-105 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Google Login Button */}
            <div className="flex justify-center mt-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed.")}
              />
            </div>
          </div>

          <p className="text-center text-white/50 mt-4 text-sm">
            Don't have an account?{" "}
            <span
              className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold cursor-pointer hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
