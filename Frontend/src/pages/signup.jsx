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
    const [activeCard, setActiveCard] = useState(0);

    const navigate = useNavigate();

    // Live forecasting tickers for the left side MVF live element
    const liveForecasts = [
        {
            title: "Neon Horizon",
            genre: "Sci-Fi / Thriller",
            predictedRating: "9.2 / 10",
            boxOffice: "$148M Est. Opening",
            confidence: "96% AI Accuracy",
            trend: "+34% Virality",
            image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "The Crimson Void",
            genre: "Psychological / Sci-Fi",
            predictedRating: "8.9 / 10",
            boxOffice: "$92M Est. Opening",
            confidence: "94% AI Accuracy",
            trend: "+48% Buzz Spike",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Midnight Broadcast",
            genre: "Film Noir / Drama",
            predictedRating: "9.4 / 10",
            boxOffice: "$65M Est. Opening",
            confidence: "98% AI Accuracy",
            trend: "+28% Critical Acclaim",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
        }
    ];

    // Cycle through live forecast cards automatically
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % liveForecasts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [liveForecasts.length]);

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
        <div className="min-h-screen bg-[#131314] text-[#e5e2e3] flex flex-col lg:flex-row font-sans selection:bg-violet-500/30 selection:text-violet-200">
            {/* Left Side: MVF Live Interactive Dashboard & Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#0e0e0f] flex-col justify-between p-12 overflow-hidden border-r border-white/5">
                {/* Dynamic Ambient Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-violet-600/20 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
                
                {/* Background Subtle Grid Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none opacity-60" />

                {/* Top Branding & Live Pulse Indicator */}
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-violet-500/30 tracking-widest text-lg">
                            MVF
                        </div>
                        <div>
                            <span className="font-bold text-xl tracking-tight text-white block">MovieForecasts</span>
                            <span className="text-[10px] uppercase font-semibold text-violet-400 tracking-widest block">AI Intelligence Platform</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-surface-container/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Live AI Engine</span>
                    </div>
                </div>

                {/* Middle Interactive MVF Forecast Card */}
                <div className="relative z-10 my-auto py-8">
                    <div className="max-w-lg space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider">
                            <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Real-Time Predictive Analytics
                        </div>

                        <h2 className="text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight">
                            Predicting Box Office Trends <br />
                            <span className="bg-linear-to-r from-violet-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
                                Before They Premiere
                            </span>
                        </h2>
                        
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Join thousands of film enthusiasts using neural algorithms to forecast box office revenue, audience engagement, and critical acclaim.
                        </p>

                        {/* Live Forecast Preview Card */}
                        <div className="relative group rounded-2xl p-5 bg-[#1c1b1c]/80 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-violet-500/40">
                            <div className="flex items-start gap-4">
                                <img 
                                    src={liveForecasts[activeCard].image} 
                                    alt={liveForecasts[activeCard].title} 
                                    className="w-20 h-28 object-cover rounded-xl shadow-md border border-white/10 shrink-0 transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-bold text-white text-base truncate">{liveForecasts[activeCard].title}</h4>
                                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                                            {liveForecasts[activeCard].confidence}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400">{liveForecasts[activeCard].genre}</p>

                                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                                        <div>
                                            <span className="text-gray-500 text-[10px] block uppercase font-medium">Predicted Score</span>
                                            <span className="font-bold text-violet-300">{liveForecasts[activeCard].predictedRating}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-[10px] block uppercase font-medium">Box Office</span>
                                            <span className="font-bold text-emerald-400">{liveForecasts[activeCard].boxOffice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Dots Indicator */}
                            <div className="flex justify-center gap-1.5 mt-4 pt-2">
                                {liveForecasts.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveCard(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${activeCard === idx ? "w-6 bg-violet-400" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                                        aria-label={`View forecast ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Quote / Fine print */}
                <div className="relative z-10 flex items-center justify-between text-xs text-gray-500 pt-6 border-t border-white/5">
                    <span>© {new Date().getFullYear()} MovieForecasts Inc.</span>
                    <div className="flex items-center gap-4">
                        <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy</span>
                        <span>•</span>
                        <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms</span>
                        <span>•</span>
                        <span className="hover:text-gray-300 cursor-pointer transition-colors">API</span>
                    </div>
                </div>
            </div>

            {/* Right Side: Sign Up Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 min-h-screen relative z-10 bg-[#131314]">
                {/* Mobile Branding (Visible only on smaller screens) */}
                <div className="lg:hidden w-full max-w-md mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                            MVF
                        </div>
                        <span className="font-bold text-lg text-white tracking-tight">MovieForecasts</span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Live Engine
                    </span>
                </div>

                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="space-y-2 text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Create your account</h1>
                        <p className="text-sm text-gray-400">Join MovieForecasts to explore real-time film predictions.</p>
                    </div>

                    {/* Alerts */}
                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-fadeIn">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
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
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="name">
                                Full Name
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="username">
                                Username
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="johndoe"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="password">
                                Password
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-300" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500 group-focus-within:text-violet-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </span>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Primary Submit CTA */}
                        <div className="pt-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 active:scale-[0.99] text-white font-semibold text-xs uppercase tracking-[0.15em] transition-all duration-200 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-[#131314] text-gray-500 uppercase tracking-widest text-[10px] font-semibold">Or register with</span>
                        </div>
                    </div>

                    {/* Social OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2.5 w-full bg-[#1c1b1c] border border-white/10 hover:border-white/20 text-gray-200 text-xs font-semibold py-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
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
                            className="flex items-center justify-center gap-2.5 w-full bg-[#1c1b1c] border border-white/10 hover:border-white/20 text-gray-200 text-xs font-semibold py-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 384 512">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                            </svg>
                            <span>Apple</span>
                        </button>
                    </div>

                    {/* Bottom Navigation Link */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold hover:underline transition-all">
                                Log in here
                            </Link>
                        </p>
                    </div>

                    {/* Fine print */}
                    <div className="text-center pt-4">
                        <p className="text-[11px] text-gray-600 leading-relaxed">
                            By creating an account, you agree to MovieForecasts&apos;{" "}
                            <a href="#" className="underline hover:text-gray-400">Terms of Service</a> and{" "}
                            <a href="#" className="underline hover:text-gray-400">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}