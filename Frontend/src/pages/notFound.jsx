import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
            <h1 className="font-display text-7xl sm:text-9xl font-extrabold text-blue-500 tracking-tight mb-4 drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Page Not Found
            </h2>
            <p className="text-on-surface-variant max-w-md mb-8 text-sm sm:text-base">
                The cinematic page or forecast path you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_22px_rgba(37,99,235,0.6)]"
            >
                Back to Home
            </Link>
        </div>
    );
}

export default NotFound;