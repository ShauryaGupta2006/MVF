import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import WatchlistModal from "./watchlistModal";
import ReviewsModal from "./reviewsModal";
import AuthModal from "./authModal";

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
    const [isReviewsOpen, setIsReviewsOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [savedWatchlist, setSavedWatchlist] = useState([]);
    
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    const syncWatchlist = () => {
        try {
            const list = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            setSavedWatchlist(list);
        } catch {
            setSavedWatchlist([]);
        }
    };

    useEffect(() => {
        syncWatchlist();
        window.addEventListener("storage", syncWatchlist);
        window.addEventListener("watchlist_updated", syncWatchlist);
        return () => {
            window.removeEventListener("storage", syncWatchlist);
            window.removeEventListener("watchlist_updated", syncWatchlist);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setIsSearchOpen(false);
            setIsMobileMenuOpen(false);
        }
    };

    const handleRemoveFromWatchlist = (id) => {
        const updated = savedWatchlist.filter((item) => item.id !== id);
        setSavedWatchlist(updated);
        localStorage.setItem("cineaste_watchlist", JSON.stringify(updated));
        window.dispatchEvent(new Event("watchlist_updated"));
    };

    return (
        <>
            <header
                className={`fixed top-0 w-full z-40 transition-all duration-300 ${
                    scrolled
                        ? "bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-xl py-3"
                        : "bg-background/80 backdrop-blur-md py-4 border-b border-white/5"
                }`}
            >
                <div className="flex justify-between items-center px-6 sm:px-12 w-full max-w-360 mx-auto">
                    
                    {/* Unified Brand Logo: MVF | MovieForecasts */}
                    <Link
                        to="/"
                        className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-primary hover:opacity-90 transition-opacity flex items-center gap-2 group"
                    >
                        <span className="font-extrabold tracking-tighter text-white group-hover:text-blue-400 transition-colors">MVF</span>
                        <span className="text-blue-500/50 font-normal font-sans text-xl">|</span>
                        <span className="font-display text-white">MovieForecasts</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8 items-center">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1 transition-all duration-200"
                                    : "text-on-surface-variant font-medium hover:text-white transition-colors duration-200 hover:scale-[1.03]"
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/trending"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1 transition-all duration-200"
                                    : "text-on-surface-variant font-medium hover:text-white transition-colors duration-200 hover:scale-[1.03]"
                            }
                        >
                            Trending
                        </NavLink>

                        <NavLink
                            to="/upcoming"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-1 transition-all duration-200"
                                    : "text-on-surface-variant font-medium hover:text-white transition-colors duration-200 hover:scale-[1.03]"
                            }
                        >
                            Upcoming
                        </NavLink>

                        <button
                            onClick={() => setIsWatchlistOpen(true)}
                            className="relative text-on-surface-variant font-medium hover:text-white transition-colors duration-200 hover:scale-[1.03] cursor-pointer flex items-center gap-1.5"
                        >
                            <span>Watchlist</span>
                            {savedWatchlist.length > 0 && (
                                <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    {savedWatchlist.length}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setIsReviewsOpen(true)}
                            className="text-on-surface-variant font-medium hover:text-white transition-colors duration-200 hover:scale-[1.03] cursor-pointer"
                        >
                            Reviews
                        </button>
                    </nav>

                    {/* Action Tools */}
                    <div className="flex items-center gap-5 text-primary">
                        {isSearchOpen ? (
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search library, hype ratings..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-48 sm:w-64 bg-surface-container text-white text-xs sm:text-sm rounded-full py-1.5 pl-4 pr-8 border border-white/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="absolute right-2.5 text-on-surface-variant hover:text-white"
                                >
                                    <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                            </form>
                        ) : (
                            <button
                                aria-label="Search"
                                onClick={() => setIsSearchOpen(true)}
                                className="hover:scale-105 transition-transform duration-200 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-2xl">search</span>
                            </button>
                        )}

                        <button
                            aria-label="Watchlist Drawer"
                            onClick={() => setIsWatchlistOpen(true)}
                            className="hover:scale-105 transition-transform duration-200 cursor-pointer relative"
                        >
                            <span className="material-symbols-outlined text-2xl">notifications</span>
                            {savedWatchlist.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-pulse"></span>
                            )}
                        </button>

                        <button
                            aria-label="User Account"
                            onClick={() => setIsAuthOpen(true)}
                            className="hover:scale-105 transition-transform duration-200 w-9 h-9 rounded-full overflow-hidden border border-white/20 cursor-pointer shrink-0"
                            title="Account & Auth"
                        >
                            <img
                                alt="User profile avatar"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwMu2TzzKtq5kC3CNOwyBXjBHAgVca-h083I_KeKizlPcaoJ2czLOt5Nhx7GXoVpyuXlMwQd_hKhzGBB1zCUF2av0dPzVdfOvj1ObZtIYwH9bL3qnv-MiH6lbtESDbII9b_52j8tznqJf4CaXu8ooADGPhubLs8WYJzv9VnHTWUnGXsY8a3XCvp6kK6HwsMtrHGzeNPTb-0mNJ0L5i72ZjAinTk0XIWRON7DnGRtkQ09P2ZNX_Jz-f"
                            />
                        </button>

                        {/* Mobile Hamburger Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-primary focus:outline-none ml-1"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {isMobileMenuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-surface-container-low border-b border-white/10 px-6 py-4 flex flex-col gap-4">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Search movies & forecasts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-surface-container text-white text-sm rounded-full py-2 pl-4 pr-10 border border-white/10 focus:border-white focus:outline-none"
                            />
                            <button type="submit" className="absolute right-3 top-2 text-primary">
                                <span className="material-symbols-outlined text-xl">search</span>
                            </button>
                        </form>

                        <div className="flex flex-col gap-3 font-medium text-sm">
                            <NavLink
                                to="/"
                                end
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/trending"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}
                            >
                                Trending
                            </NavLink>
                            <NavLink
                                to="/upcoming"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}
                            >
                                Upcoming
                            </NavLink>
                            <button
                                onClick={() => {
                                    setIsWatchlistOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="text-left text-on-surface-variant hover:text-white"
                            >
                                Watchlist ({savedWatchlist.length})
                            </button>
                            <button
                                onClick={() => {
                                    setIsReviewsOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="text-left text-on-surface-variant hover:text-white"
                            >
                                Editorial Reviews
                            </button>
                            <button
                                onClick={() => {
                                    setIsAuthOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="text-left text-primary font-bold"
                            >
                                Sign In / Account
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Modals & Drawers */}
            <WatchlistModal
                isOpen={isWatchlistOpen}
                onClose={() => setIsWatchlistOpen(false)}
                watchlistMovies={savedWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
            />

            <ReviewsModal
                isOpen={isReviewsOpen}
                onClose={() => setIsReviewsOpen(false)}
            />

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </>
    );
}

export default Header;