import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

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

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
                scrolled
                    ? "bg-surface/90 backdrop-blur-xl border-b border-white/5 shadow-lg py-3"
                    : "bg-surface/80 backdrop-blur-md py-4"
            }`}
        >
            <div className="flex justify-between items-center px-6 sm:px-12 w-full max-w-[1920px] mx-auto">
                
                {/* Brand */}
                <Link
                    to="/"
                    className="font-black tracking-tighter text-primary hover:opacity-90 transition-opacity flex items-center gap-2"
                    style={{ fontSize: "28px", lineHeight: "1" }}
                >
                    MVF
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-sans pt-1 hidden sm:inline">
                        MovieForecasts
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex gap-8 items-center">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary border-b-2 border-primary pb-1 font-bold text-sm uppercase tracking-wider transition-all duration-300"
                                : "text-on-surface-variant hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/trending"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary border-b-2 border-primary pb-1 font-bold text-sm uppercase tracking-wider transition-all duration-300"
                                : "text-on-surface-variant hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
                        }
                    >
                        Trending
                    </NavLink>
                    <NavLink
                        to="/upcoming"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary border-b-2 border-primary pb-1 font-bold text-sm uppercase tracking-wider transition-all duration-300"
                                : "text-on-surface-variant hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
                        }
                    >
                        Upcoming
                    </NavLink>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4 text-primary">
                    {isSearchOpen ? (
                        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search movies, actors..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-48 sm:w-64 bg-surface-container text-white text-sm rounded-full py-1.5 pl-4 pr-9 border border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(false)}
                                className="absolute right-2 text-on-surface-variant hover:text-white"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </form>
                    ) : (
                        <span
                            onClick={() => setIsSearchOpen(true)}
                            className="material-symbols-outlined cursor-pointer hover:text-white transition-all duration-300 text-2xl"
                            title="Search"
                        >
                            search
                        </span>
                    )}

                    <span
                        onClick={() => navigate("/trending")}
                        className="material-symbols-outlined cursor-pointer hover:text-white transition-all duration-300 text-2xl"
                        title="Account"
                    >
                        account_circle
                    </span>

                    {/* Mobile Hamburger Menu */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-primary focus:outline-none ml-2"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-surface-container-low border-b border-white/10 px-6 py-4 flex flex-col gap-4">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-surface-container text-white text-sm rounded-full py-2 pl-4 pr-10 border border-white/10 focus:border-primary focus:outline-none"
                        />
                        <button type="submit" className="absolute right-3 top-2 text-primary">
                            <span className="material-symbols-outlined text-xl">search</span>
                        </button>
                    </form>

                    <div className="flex flex-col gap-3 font-semibold text-sm">
                        <NavLink
                            to="/"
                            end
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                isActive ? "text-primary" : "text-on-surface-variant hover:text-white"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/trending"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                isActive ? "text-primary" : "text-on-surface-variant hover:text-white"
                            }
                        >
                            Trending
                        </NavLink>
                        <NavLink
                            to="/upcoming"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                isActive ? "text-primary" : "text-on-surface-variant hover:text-white"
                            }
                        >
                            Upcoming
                        </NavLink>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;