import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

function UpcomingMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const fetchUpcoming = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upcoming`, {
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.data?.results?.length > 0) {
                    setMovies(data.data.results);
                    setLoading(false);
                    return;
                }
            }
            setError(true);
            setMovies([]);
        } catch {
            setError(true);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpcoming();
    }, []);

    if (loading) {
        return <LoadingScreen message="Loading Upcoming Box Office Premieres..." subtext="Syncing upcoming theatrical calendars" />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0b0e] text-[#e5e2e1] flex items-center justify-center p-6">
                <div className="w-full max-w-lg p-8 rounded-3xl bg-[#121319]/90 border border-rose-500/20 backdrop-blur-xl shadow-2xl text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-3xl text-rose-400">cloud_off</span>
                    </div>
                    <div className="space-y-2">
                        <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                            Unable to Fetch Upcoming Premieres
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                            Could not retrieve the theatrical release calendar from the server. Please verify your connection or try again.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                            onClick={fetchUpcoming}
                            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-white/90 transition-all cursor-pointer active:scale-95 shadow-lg shadow-white/10"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-2.5 rounded-full bg-white/6 border border-white/12 text-white font-semibold text-xs sm:text-sm hover:bg-white/12 transition-all cursor-pointer active:scale-95"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0b0e] text-[#e5e2e1] px-4 sm:px-8 md:px-12 py-28 max-w-360 mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/8 pb-6 gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
                        MVF Theatrical Release Calendar
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 tracking-tight">
                        Upcoming Drops
                    </h1>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md">
                    First-look trailers, premiere calendars, and theatrical countdowns.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {movies.map((movie) => {
                    const posterUrl = movie.poster_path
                        ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                        : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";

                    return (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="group cursor-pointer bg-[#111218] rounded-2xl p-4 border border-white/7 hover:border-violet-500/30 transition-all card-hover-lift"
                        >
                            <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-4 bg-[#14151c]">
                                <img
                                    src={posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                                    loading="lazy"
                                />
                                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10 uppercase tracking-wider">
                                    {movie.release_date ? movie.release_date.split("-")[0] : "Coming Soon"}
                                </div>
                                {movie.status_tag && (
                                    <div className="absolute bottom-2.5 right-2.5 bg-violet-600/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                                        {movie.status_tag}
                                    </div>
                                )}
                            </div>

                            <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">
                                {movie.genre_name || "Premiere"}
                            </span>
                            <h3 className="font-display font-semibold text-base text-white group-hover:text-violet-300 transition-colors truncate mt-1">
                                {movie.title}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                                {movie.overview || "Upcoming theatrical premiere details coming soon."}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UpcomingMovies;