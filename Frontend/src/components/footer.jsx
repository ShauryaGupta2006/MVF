import { Link } from "react-router-dom";

function Footer() {
    const handleSubscribe = (e) => {
        e.preventDefault();
        console.log("Subscribed successfully!");
    };

    return (
        <footer className="relative mt-auto border-t border-zinc-900 bg-zinc-950 text-zinc-400">
            {/* Ambient background glow for a modern touch */}
            <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-40 max-w-7xl bg-linear-to-b from-red-500/5 to-transparent blur-3xl pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
                    
                    {/* Left Column: Brand & Description */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-tr from-red-600 via-pink-600 to-amber-500 p-[1.5px] shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-transform duration-300 group-hover:scale-105">
                                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-zinc-950 transition duration-300 group-hover:bg-zinc-950/80">
                                    <svg
                                        className="h-4.5 w-4.5 text-red-500"
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
                                <span className="bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-lg font-black tracking-wider text-transparent">
                                    MVF
                                </span>
                                <span className="-mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-red-500">
                                    MovieForecasts
                                </span>
                            </div>
                        </Link>
                        
                        <p className="max-w-xs text-sm leading-6 text-zinc-500">
                            Predicting the next big hits. Real-time box office forecasting, community reviews, and tailored watchlists.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-red-500/30 hover:bg-white/10 hover:text-white"
                                aria-label="Twitter"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-red-500/30 hover:bg-white/10 hover:text-white"
                                aria-label="Instagram"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-red-500/30 hover:bg-white/10 hover:text-white"
                                aria-label="GitHub"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-white/5 text-zinc-400 transition-all duration-300 hover:border-red-500/30 hover:bg-white/10 hover:text-white"
                                aria-label="YouTube"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.665 22 12 22 12s0 3.334-.42 4.814a2.47 2.47 0 01-1.768 1.768C18.334 19 12 19 12 19s-6.334 0-7.812-.418a2.47 2.47 0 01-1.768-1.768C2 15.334 2 12 2 12s0-3.335.42-4.814a2.47 2.47 0 011.768-1.768C5.666 5 12 5 12 5s6.334 0 7.812.418zM9.75 15.022L15.5 12 9.75 8.978v6.044z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Middle Column 1: Links - Platform */}
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                            Platform
                        </span>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link to="/" className="transition hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/trending" className="transition hover:text-white">
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="transition hover:text-white">
                                    Box Office Forecasts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition hover:text-white">
                                    Top Reviews
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Middle Column 2: Links - Community */}
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                            Community
                        </span>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="transition hover:text-white">
                                    Forums & Discussions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition hover:text-white">
                                    Forecast Challenges
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition hover:text-white">
                                    Member Spotlights
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition hover:text-white">
                                    Affiliates
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Right Column: Newsletter Subscription */}
                    <div className="space-y-6">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                            Stay Updated
                        </span>
                        <p className="text-sm leading-6 text-zinc-500">
                            Get weekly forecasts, review roundups, and special box office predictions straight to your inbox.
                        </p>
                        
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-red-500/50 focus:bg-black/60 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition duration-300 hover:bg-zinc-200 hover:scale-[1.02] shrink-0"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t border-zinc-900 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-600">
                    <p>© 2026 MovieForecasts (MVF). All rights reserved.</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <a href="#" className="hover:text-zinc-400 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-zinc-400 transition">Terms of Service</a>
                        <a href="#" className="hover:text-zinc-400 transition">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
