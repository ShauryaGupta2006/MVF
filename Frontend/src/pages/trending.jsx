import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

function TrendingMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [trendTab, setTrendTab] = useState("popular");
    const navigate = useNavigate();

    const fetchTrendingMovies = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/trending`, {
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
        fetchTrendingMovies();
    }, []);

    const sortedMovies = [...movies].sort((a, b) => {
        if (trendTab === "recent") {
            return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        }
        return (b.vote_average || 0) - (a.vote_average || 0);
    });

    if (loading) {
        return <LoadingScreen message="Fetching Real-Time Box Office Trends..." subtext="Analyzing global theatrical momentum" />;
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
                            Unable to Fetch Trending Movies
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                            Could not load the latest trending cinema feed from the server. Please verify your connection or check back momentarily.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                            onClick={fetchTrendingMovies}
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/8 pb-6 gap-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
                        Live Box Office Intelligence
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 tracking-tight">
                        Trending Cinema
                    </h1>
                </div>

                {/* Popular vs Recently Added Toggle */}
                <div className="flex items-center bg-white/4 p-1 rounded-full border border-white/8 shrink-0 self-start md:self-auto backdrop-blur-md">
                    <button
                        onClick={() => setTrendTab("popular")}
                        className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                            trendTab === "popular"
                                ? "bg-white text-black font-bold shadow-md shadow-white/10"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Most Popular
                    </button>
                    <button
                        onClick={() => setTrendTab("recent")}
                        className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                            trendTab === "recent"
                                ? "bg-white text-black font-bold shadow-md shadow-white/10"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Recently Released
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
                {sortedMovies.map((movie, index) => {
                    const posterUrl = movie.poster_path
                        ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                        : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";
                    const rating = typeof movie.vote_average === "number" && movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "—";

                    return (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 card-hover-lift bg-[#13141a] border border-white/8">
                                <img
                                    src={posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                                    loading="lazy"
                                />
                                
                                {/* Rank Tag */}
                                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold text-white border border-white/10">
                                    #{index + 1}
                                </div>

                                {/* Rating Badge */}
                                {rating !== "—" && (
                                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px] text-amber-400 filled">star</span>
                                        <span className="text-[11px] font-bold text-white">{rating}</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-white">play_circle</span>
                                </div>
                            </div>

                            <h3 className="font-semibold text-sm text-white truncate group-hover:text-violet-300 transition-colors">
                                {movie.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {movie.release_date ? movie.release_date.split("-")[0] : "—"} • {movie.genre_name || "Feature"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TrendingMovies;