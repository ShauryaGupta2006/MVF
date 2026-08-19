import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const navigate = useNavigate();

    // Trigger smooth entrance animation on mount
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4400";
            const res = await fetch(`${backendUrl}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                    conpass: confirmPassword
                })
            });

            const data = await res.json();
            if ((res.ok || res.status === 201) && data.success) {
                setSuccess(data.message || "Account created successfully! Redirecting...");
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                setError(data.message || data.error || "Failed to create account. Please try again.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError("Unable to connect to authentication server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#131314] text-[#e5e2e3] flex flex-col justify-center items-center p-4 sm:p-8 relative overflow-hidden font-sans selection:bg-violet-500/30 selection:text-violet-200">
            {/* Ambient Background Orbs & Radial Grid */}
            <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-160 h-160 bg-violet-600/15 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-10%] w-130 h-130 bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none opacity-50" />

            <div 
                className={`w-full max-w-md relative z-10 space-y-6 transition-all duration-700 ease-out transform ${
                    mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
                }`}
            >
                {/* Centered Brand Header */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-violet-500/30 tracking-widest text-xl group-hover:scale-105 transition-transform">
                            MVF
                        </div>
                        <div className="text-left">
                            <span className="font-bold text-2xl tracking-tight text-white block">MovieForecasts</span>
                            <span className="text-[10px] uppercase font-semibold text-violet-400 tracking-widest block">AI Intelligence Platform</span>
                        </div>
                    </Link>
                </div>

                {/* Main Centered Signup Card */}
                <div className="relative bg-[#1c1b1c]/80 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 overflow-hidden">
                    
                    {/* Moving Accent Light Beam along top border */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-violet-400 to-transparent animate-shimmer opacity-80 pointer-events-none" />

                    {/* Active Loading Progress Bar transition when submitting */}
                    {loading && (
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-violet-600 via-indigo-400 to-emerald-400 animate-shimmer z-20" />
                    )}

                    {/* Header */}
                    <div className="space-y-1.5 text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Create your account</h1>
                        <p className="text-xs sm:text-sm text-gray-400">Join MovieForecasts to explore real-time predictions.</p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 animate-fadeIn">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Success Banner */}
                    {success && (
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5 animate-fadeIn">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{success}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="signup-name">
                                Full Name
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-[#131314] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="signup-username">
                                Username
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-username"
                                    type="text"
                                    placeholder="johndoe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full bg-[#131314] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="signup-email">
                                Email Address
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#131314] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="signup-password">
                                Password
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#131314] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="signup-confirm-password">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-confirm-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#131314] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Primary Submit CTA */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.99] text-white font-semibold text-xs uppercase tracking-[0.15em] transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-3 bg-[#1c1b1c] text-gray-500 uppercase tracking-widest text-[10px] font-semibold">Or register with</span>
                        </div>
                    </div>

                    {/* Social OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2.5 w-full bg-[#131314] border border-white/10 hover:border-white/20 text-gray-200 text-xs font-semibold py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span>Google</span>
                        </button>

                        <button
                            type="button"
                            className="flex items-center justify-center gap-2.5 w-full bg-[#131314] border border-white/10 hover:border-white/20 text-gray-200 text-xs font-semibold py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 384 512">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                            </svg>
                            <span>Apple</span>
                        </button>
                    </div>

                    {/* Bottom Navigation Link */}
                    <div className="text-center pt-2 border-t border-white/5">
                        <p className="text-xs sm:text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold hover:underline transition-all">
                                Log in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer copyright */}
                <div className="text-center text-xs text-gray-500 pt-2">
                    <span>© {new Date().getFullYear()} MovieForecasts Inc. All rights reserved.</span>
                </div>
            </div>
        </div>
    );
}