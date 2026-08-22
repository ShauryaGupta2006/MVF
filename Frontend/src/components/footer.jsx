import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-[#07080b] w-full py-16 border-t border-white/6 text-[#e5e2e1] px-4 sm:px-8 md:px-12 mt-auto">
            <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                {/* Brand Column */}
                <div className="space-y-3 md:col-span-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-extrabold text-white text-xs shadow-md shadow-violet-500/25">
                            MVF
                        </div>
                        <span className="font-display text-xl font-bold tracking-tight text-white">
                            MovieForecasts
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-md leading-relaxed">
                        The next-generation film intelligence and box office discovery platform. Real-time predictions, curated reviews, and theatrical tracking powered by algorithmic analysis.
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                            Systems Operational • Live Sync
                        </span>
                    </div>
                </div>

                {/* Explore Links */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400">
                        Explore
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                        <li>
                            <Link to="/" className="hover:text-white transition-colors">
                                Home Spotlight
                            </Link>
                        </li>
                        <li>
                            <Link to="/trending" className="hover:text-white transition-colors">
                                Trending Box Office
                            </Link>
                        </li>
                        <li>
                            <Link to="/upcoming" className="hover:text-white transition-colors">
                                Premiere Calendar
                            </Link>
                        </li>
                        <li>
                            <Link to="/genre/878?name=Sci-Fi" className="hover:text-white transition-colors">
                                Sci-Fi & Speculative
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Platform & Legal */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400">
                        Platform
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                        <li>
                            <a href="#about" className="hover:text-white transition-colors">
                                About Intelligence Engine
                            </a>
                        </li>
                        <li>
                            <a href="#privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <Link to="/auth/signup" className="hover:text-white transition-colors">
                                Join MVF Membership
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-360 mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <p>© {new Date().getFullYear()} MovieForecasts (MVF). All rights reserved.</p>
                <p className="text-[11px]">Designed with precision for film connoisseurs.</p>
            </div>
        </footer>
    );
}

export default Footer;
