import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);

    // Add scroll listener to make the glass effect dynamic (stronger glass touch when scrolled)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
            // Optional: Implement redirect or fetch
        }
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-500 border-b ${
                scrolled
                    ? "bg-zinc-950/80 backdrop-blur-xl border-zinc-800/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                    : "bg-zinc-950/40 backdrop-blur-md border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between gap-4">
                    
                    {/* Brand / Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group shrink-0">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-red-600 via-pink-600 to-amber-500 p-[1.5px] shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-transform duration-300 group-hover:scale-105">
                            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950/90 transition duration-300 group-hover:bg-zinc-950/80">
                                <svg
                                    className="h-5 w-5 text-red-500 animate-pulse"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-xl font-black tracking-wider text-transparent">
                                MVF
                            </span>
                            <span className="-mt-1 hidden text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 sm:inline-block">
                                MovieForecasts
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Menu (Desktop) */}
                    <nav className="hidden md:flex items-center gap-1.5 rounded-full bg-white/5 p-1 border border-white/5 shadow-inner">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                                    isActive
                                        ? "bg-white/10 text-white shadow-[0_2px_10px_rgba(255,255,255,0.05)] border border-white/10"
                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/trending"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                                    isActive
                                        ? "bg-white/10 text-white shadow-[0_2px_10px_rgba(255,255,255,0.05)] border border-white/10"
                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
                                }`
                            }
                        >
                            Trending
                        </NavLink>
                    </nav>

                    {/* Right Side: Search and Authentication */}
                    <div className="flex items-center gap-4">
                        
                        {/* Search Bar (Desktop) */}
                        <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
                            <input
                                type="text"
                                placeholder="Search forecasts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-56 rounded-full border border-white/10 bg-black/35 px-4 py-2 pl-10 text-sm text-white placeholder-zinc-500 transition-all duration-300 focus:w-72 focus:border-red-500/50 focus:bg-black/60 focus:outline-none focus:ring-1 focus:ring-red-500/35"
                            />
                            <div className="absolute left-3.5 top-2.5 text-zinc-500">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </form>

                        {/* Auth Buttons / Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            {isLoggedIn ? (
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pr-3 transition hover:bg-white/10 hover:border-white/20 focus:outline-none"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-red-500 to-amber-500 text-sm font-bold text-white shadow-md">
                                        S
                                    </div>
                                    <span className="hidden text-xs font-semibold text-zinc-300 md:inline-block">
                                        Shaurya
                                    </span>
                                    <svg
                                        className={`h-3 w-3 text-zinc-400 transition-transform duration-300 ${
                                            isProfileDropdownOpen ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setIsLoggedIn(true)}
                                        className="hidden px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 transition hover:text-white sm:inline-block"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => setIsLoggedIn(true)}
                                        className="relative overflow-hidden rounded-full bg-linear-to-r from-red-600 to-amber-500 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_15px_rgba(239,68,68,0.25)] transition duration-300 hover:scale-105 hover:shadow-[0_4px_25px_rgba(239,68,68,0.4)]"
                                    >
                                        Join Free
                                    </button>
                                </div>
                            )}

                            {/* Dropdown Menu (Liquid Glass Effect) */}
                            {isLoggedIn && isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-48 origin-top-right rounded-2xl border border-white/10 bg-zinc-950/85 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300">
                                    <div className="border-b border-white/5 px-3 py-2 text-xs text-zinc-400">
                                        Signed in as <strong className="text-zinc-200">Shaurya</strong>
                                    </div>
                                    <Link
                                        to="/"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition duration-250"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                    >
                                        Watchlist
                                    </Link>
                                    <Link
                                        to="/"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition duration-250"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                    >
                                        Preferences
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsLoggedIn(false);
                                            setIsProfileDropdownOpen(false);
                                        }}
                                        className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition duration-250"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Hamburger Button (Mobile) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white md:hidden"
                        >
                            {isMobileMenuOpen ? (
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile Drawer Menu (Liquid Glass Effect) */}
            {isMobileMenuOpen && (
                <div className="border-t border-white/5 bg-zinc-950/90 py-4 px-6 backdrop-blur-2xl md:hidden">
                    <form onSubmit={handleSearchSubmit} className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search forecasts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2.5 pl-10 text-sm text-white placeholder-zinc-500 focus:border-red-500/50 focus:outline-none"
                        />
                        <div className="absolute left-3.5 top-3 text-zinc-500">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </form>

                    <div className="flex flex-col gap-2">
                        <NavLink
                            to="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `block w-full px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider ${
                                    isActive
                                        ? "bg-white/10 text-white border border-white/10"
                                        : "text-zinc-400 hover:text-white"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/trending"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `block w-full px-4 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider ${
                                    isActive
                                        ? "bg-white/10 text-white border border-white/10"
                                        : "text-zinc-400 hover:text-white"
                                }`
                            }
                        >
                            Trending
                        </NavLink>

                        {!isLoggedIn && (
                            <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4">
                                <button
                                    onClick={() => {
                                        setIsLoggedIn(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-bold uppercase tracking-wider text-white"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => {
                                        setIsLoggedIn(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full rounded-xl bg-linear-to-r from-red-600 to-amber-500 py-2.5 text-sm font-black uppercase tracking-wider text-white shadow-md"
                                >
                                    Join Free
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;