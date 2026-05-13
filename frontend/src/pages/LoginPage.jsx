import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthimagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: "#050A18" }}>

      {/* ── Stars Background ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ── Left Panel — Login Form ── */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">

        {/* Ambient orbs */}
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "#00C6FF", filter: "blur(80px)", opacity: 0.12 }} />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "#8B5CF6", filter: "blur(80px)", opacity: 0.12 }} />

        <div className="w-full max-w-md space-y-6 relative">

          {/* Logo */}
          <div className="flex flex-col items-start gap-1 mb-8">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #00C6FF, #8B5CF6)" }}>
              <MessageSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "#F0F4FF" }}>
              Welcome Back
            </h1>
            <p className="text-sm" style={{ color: "#6B7A99" }}>
              Sign in to continue your conversations
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#6B7A99" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#00C6FF", opacity: 0.7 }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(255,255,255,0.12)",
                    color: "#F0F4FF",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(0,198,255,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#6B7A99" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#00C6FF", opacity: 0.7 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(255,255,255,0.12)",
                    color: "#F0F4FF",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(0,198,255,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" style={{ color: "#6B7A99" }} />
                    : <Eye className="w-4 h-4" style={{ color: "#6B7A99" }} />}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs font-medium transition-colors"
                style={{ color: "#00C6FF" }}>
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "linear-gradient(90deg, #00C6FF, #8B5CF6)",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              {isLoggingIn ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Signing in...</span></>
              ) : (
                <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs" style={{ color: "#3A4560" }}>New to our platform?</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm" style={{ color: "#6B7A99" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold transition-colors" style={{ color: "#00C6FF" }}>
              Create account
            </Link>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs" style={{ color: "#3A4560" }}>Secure Login</span>
            </div>
            <div className="w-1 h-1 rounded-full" style={{ background: "#1A2540" }} />
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" style={{ color: "#3A4560" }} />
              <span className="text-xs" style={{ color: "#3A4560" }}>Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Chat Preview ── */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 relative z-10"
        style={{ background: "linear-gradient(145deg, #0D1535, #0A0F25, #120820)" }}>

        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "#00C6FF", filter: "blur(80px)", opacity: 0.07 }} />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "#8B5CF6", filter: "blur(80px)", opacity: 0.07 }} />

        {/* Chat bubbles preview */}
        <div className="w-full max-w-xs flex flex-col gap-3 mb-8">
          {[
            { from: "Alex", text: "Hey! Are you joining the call? 🚀", sent: false },
            { text: "Yes! Give me 5 mins.", sent: true },
            { from: "Alex", text: "Cool, I'll set up the room.", sent: false },
            { text: "Perfect, see you there! ✨", sent: true },
          ].map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.sent ? "items-end" : "items-start"}`}>
              {msg.from && (
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #00C6FF, #8B5CF6)" }}>
                    {msg.from[0]}
                  </div>
                  <span className="text-xs" style={{ color: "#6B7A99" }}>{msg.from}</span>
                </div>
              )}
              <div className="px-3.5 py-2.5 rounded-2xl text-sm max-w-[85%]"
                style={msg.sent ? {
                  background: "linear-gradient(135deg, rgba(0,198,255,0.15), rgba(139,92,246,0.15))",
                  border: "0.5px solid rgba(0,198,255,0.2)",
                  color: "#E0E8FF",
                  borderRadius: "16px 4px 16px 16px",
                } : {
                  background: "rgba(255,255,255,0.05)",
                  border: "0.5px solid rgba(139,92,246,0.2)",
                  color: "#C4CADD",
                  borderRadius: "4px 16px 16px 16px",
                }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center mb-2"
          style={{ fontFamily: "'Syne', sans-serif", color: "#F0F4FF" }}>
          Connect with friends instantly
        </h2>
        <p className="text-sm text-center leading-relaxed max-w-xs" style={{ color: "#6B7A99" }}>
          Join thousands of users enjoying seamless conversations. Secure, fast, and always available.
        </p>
      </div>

      {/* Twinkle keyframe */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes twinkle {
          from { opacity: 0.15; }
          to { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;