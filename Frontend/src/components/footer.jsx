import { Link } from "react-router-dom";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-[#0a0a0a] text-white border-t border-white/5 pt-16 pb-12 px-6 sm:px-12 mt-20">
            <div className="max-w-[1920px] mx-auto flex flex-col gap-12">
                {/* Top Row: Brand & Scroll to Top */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/10 pb-8">
                    <div>
                        <Link to="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                            <span className="text-primary">MVF</span> MovieForecasts
                        </Link>
                        <p className="text-xs text-on-surface-variant mt-1">
                            Cinematic Intelligence Engine & Box Office Analytics
                        </p>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container hover:bg-primary text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition duration-300 cursor-pointer shadow-md"
                    >
                        <span>Back to top</span>
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                    </button>
                </div>

                {/* Middle Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 text-primary">
                            Explore
                        </h4>
                        <ul className="flex flex-col gap-2 text-on-surface-variant text-xs">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/trending" className="hover:text-white transition">Trending Movies</Link></li>
                            <li><Link to="/upcoming" className="hover:text-white transition">Upcoming Drops</Link></li>
                            <li><Link to="/search" className="hover:text-white transition">Search Library</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 text-primary">
                            Top Genres
                        </h4>
                        <ul className="flex flex-col gap-2 text-on-surface-variant text-xs">
                            <li><Link to="/genre/878?name=Sci-Fi" className="hover:text-white transition">Sci-Fi</Link></li>
                            <li><Link to="/genre/28?name=Action" className="hover:text-white transition">Action</Link></li>
                            <li><Link to="/genre/53?name=Thriller" className="hover:text-white transition">Thriller</Link></li>
                            <li><Link to="/genre/18?name=Drama" className="hover:text-white transition">Drama</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 text-primary">
                            Contact Support
                        </h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-2">
                            Questions or box office feedback? Reach our cinematic intelligence team.
                        </p>
                        <a href="mailto:support@movieforecasts.com" className="text-xs text-white font-medium hover:text-primary transition block">
                            support@movieforecasts.com
                        </a>
                        <span className="text-xs text-on-surface-variant block mt-1">+1-800-MVF-CAST</span>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 text-primary">
                            Connect
                        </h4>
                        <div className="flex gap-3 text-on-surface-variant">
                            <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-full bg-surface-container border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition">
                                <span className="material-symbols-outlined text-sm">photo_camera</span>
                            </a>
                            <a href="#twitter" aria-label="Twitter" className="w-9 h-9 rounded-full bg-surface-container border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition">
                                <span className="material-symbols-outlined text-sm">link</span>
                            </a>
                            <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-full bg-surface-container border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition">
                                <span className="material-symbols-outlined text-sm">facebook</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-on-surface-variant border-t border-white/5 pt-8">
                    <p>© {new Date().getFullYear()} MovieForecasts (MVF). All rights reserved.</p>
                    <div className="flex gap-6 mt-4 sm:mt-0">
                        <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#terms" className="hover:text-white transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
