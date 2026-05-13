import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, ArrowRight, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    if (pass.length < 4) return 1;
    if (pass.length < 6) return 2;
    if (pass.length < 10) return 3;
    return 4;
  };

  const strengthColors = ["", "#EF4444", "#F59E0B", "#00C6FF", "#22c55e"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strength = getPasswordStrength(formData.password);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      try {
        await signup({ fullName: formData.fullName, email: formData.email, password: formData.password });
      } catch (err) {
        console.error("❌ Signup failed:", err.response?.data || err.message);
      }
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    color: "#F0F4FF",
    fontFamily: "'DM Sans', sans-serif",
  };

  const features = [
    {
      icon: <MessageSquare className="w-4 h-4" style={{ color: "#00C6FF" }} />,
      iconBg: "rgba(0,198,255,0.1)",
      title: "Real-time Messaging",
      desc: "Send and receive messages instantly with zero lag.",
    },
    {
      icon: <Users className="w-4 h-4" style={{ color: "#8B5CF6" }} />,
      iconBg: "rgba(139,92,246,0.1)",
      title: "Group Conversations",
      desc: "Create rooms and collaborate with your team.",
    },
    {
      icon: <Shield className="w-4 h-4" style={{ color: "#00C6FF" }} />,
      iconBg: "rgba(0,198,255,0.08)",
      title: "End-to-End Encrypted",
      desc: "Your conversations are always private and secure.",
    },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: "#050A18" }}>

      {/* Stars */}
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
              opacity: Math.random() * 0.4 + 0.1,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ── Left Panel — Signup Form ── */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">

        {/* Ambient orbs */}
        <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "#00C6FF", filter: "blur(80px)", opacity: 0.1 }} />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "#8B5CF6", filter: "blur(80px)", opacity: 0.1 }} />

        <div className="w-full max-w-md space-y-4 relative">

          {/* Logo & Header */}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #00C6FF, #8B5CF6)" }}>
              <MessageSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Syne', sans-serif", color: "#F0F4FF" }}>
              Create Account
            </h1>
            <p className="text-sm mt-1" style={{ color: "#6B7A99" }}>
              Get started with your free account today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#6B7A99" }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#00C6FF", opacity: 0.7 }} />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(0,198,255,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#6B7A99" }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#00C6FF", opacity: 0.7 }} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(0,198,255,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#6B7A99" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#00C6FF", opacity: 0.7 }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(0,198,255,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-transform hover:scale-110">
                  {showPassword
                    ? <EyeOff className="w-4 h-4" style={{ color: "#6B7A99" }} />
                    : <Eye className="w-4 h-4" style={{ color: "#6B7A99" }} />}
                </button>
              </div>

              {/* Password strength bar */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div key={level} className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background: level <= strength ? strengthColors[strength] : "rgba(255,255,255,0.08)",
                        }} />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]} password
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98] mt-2"
              style={{ background: "linear-gradient(90deg, #00C6FF, #8B5CF6)", fontFamily: "'Syne', sans-serif" }}
            >
              {isSigningUp ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Creating account...</span></>
              ) : (
                <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs" style={{ color: "#3A4560" }}>Already have an account?</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          <p className="text-center text-sm" style={{ color: "#6B7A99" }}>
            Already a member?{" "}
            <Link to="/login" className="font-semibold transition-colors" style={{ color: "#00C6FF" }}>
              Sign in
            </Link>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 pt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs" style={{ color: "#3A4560" }}>Free Forever</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" style={{ color: "#3A4560" }} />
              <span className="text-xs" style={{ color: "#3A4560" }}>Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3" style={{ color: "#3A4560" }} />
              <span className="text-xs" style={{ color: "#3A4560" }}>Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Features ── */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 relative z-10"
        style={{ background: "linear-gradient(145deg, #0D1535, #0A0F25, #120820)" }}>

        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "#00C6FF", filter: "blur(80px)", opacity: 0.07 }} />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "#8B5CF6", filter: "blur(80px)", opacity: 0.07 }} />

        {/* Feature cards */}
        <div className="w-full max-w-xs flex flex-col gap-3 mb-6" style={{ position: "relative", zIndex: 2 }}>
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: f.iconBg }}>
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ fontFamily: "'Syne', sans-serif", color: "#E0E8FF" }}>
                  {f.title}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7A99" }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-3 w-full max-w-xs mb-6" style={{ position: "relative", zIndex: 2 }}>
          {[
            { num: "10K+", label: "Active Users" },
            { num: "99.9%", label: "Uptime" },
            { num: "Free", label: "Forever" },
          ].map((s, i) => (
            <div key={i} className="flex-1 text-center p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)" }}>
              <div className="text-lg font-bold" style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(90deg, #00C6FF, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>{s.num}</div>
              <div className="text-xs" style={{ color: "#6B7A99" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-center mb-2"
          style={{ fontFamily: "'Syne', sans-serif", color: "#F0F4FF", position: "relative", zIndex: 2 }}>
          Join our community
        </h2>
        <p className="text-xs text-center leading-relaxed max-w-xs"
          style={{ color: "#6B7A99", position: "relative", zIndex: 2 }}>
          Connect with friends, share moments, and stay in touch with your loved ones.
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes twinkle { from { opacity: 0.15; } to { opacity: 0.6; } }
      `}</style>
    </div>
  );
};

export default SignUpPage;