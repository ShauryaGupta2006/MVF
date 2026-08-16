import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-surface-container-lowest w-full py-16 border-t border-white/5 flex flex-col items-center justify-center space-y-8 px-6 sm:px-12 mt-auto">
            <div className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-primary">
                MovieForecasts
            </div>
            
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-on-surface-variant font-medium">
                <Link to="/" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                    Browse
                </Link>
                <Link to="/trending" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                    Trending
                </Link>
                <Link to="/upcoming" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                    Upcoming
                </Link>
                <a href="#about" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                    About
                </a>
                <a href="#privacy" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                    Privacy Policy
                </a>
                <a href="#terms" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                    Terms of Service
                </a>
                <a href="#contact" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                    Contact
                </a>
                <a href="#press" className="hover:text-primary transition-colors opacity-80 hover:opacity-100">
                    Press Kit
                </a>
            </nav>

            <p className="font-body text-xs text-on-surface-variant opacity-70">
                © {new Date().getFullYear()} Cinéaste. Editorial Excellence in Film.
            </p>
        </footer>
    );
}

export default Footer;
