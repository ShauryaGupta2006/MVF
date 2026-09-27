import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);

    const castRef = useRef(null);
    const navigate = useNavigate();

    const scrollCast = (direction) => {
        if (castRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            castRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const checkWatchlist = (mId) => {
        try {
            const list = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            setIsSaved(list.some((item) => String(item.id) === String(mId)));
        } catch {
            setIsSaved(false);
        }
    };

    const toggleWatchlist = () => {
        if (!movie) return;
        try {
            const list = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            const exists = list.some((item) => String(item.id) === String(movie.id));
            let updated;
            if (exists) {
                updated = list.filter((item) => String(item.id) !== String(movie.id));
            } else {
                updated = [
                    ...list,
                    {
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average,
                        release_date: movie.release_date,
                        genre: movie.genres ? movie.genres.map(g => g.name).join(" • ") : "Cinema"
                    }
                ];
            }
            localStorage.setItem("cineaste_watchlist", JSON.stringify(updated));
            setIsSaved(!exists);
            window.dispatchEvent(new Event("watchlist_updated"));
        } catch (err) {
            console.error("Watchlist error", err);
        }
    };

    const fetchMovie = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movie/${movieId}`, {
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.data && data.data.id) {
                    setMovie(data.data);
                    checkWatchlist(data.data.id);
                    setLoading(false);
                    return;
                }
            }
            setError(true);
            setMovie(null);
        } catch {
            setError(true);
            setMovie(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
        window.scrollTo(0, 0);
    }, [movieId]);

    if (loading) {
        return <LoadingScreen message="Fetching MVF Cinema File..." subtext="Accessing TMDB verified archival record" />;
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-[#0a0b0e] text-[#e5e2e1] flex items-center justify-center p-6">
                <div className="w-full max-w-lg p-8 rounded-3xl bg-[#121319]/90 border border-rose-500/20 backdrop-blur-xl shadow-2xl text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-3xl text-rose-400">cloud_off</span>
                    </div>
                    <div className="space-y-2">
                        <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                            Unable to Fetch Movie
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                            Could not retrieve the movie profile from the server. The requested title ID may be unavailable or the connection failed.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                            onClick={fetchMovie}
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

    const backdropUrl = movie.backdrop_path
        ? (movie.backdrop_path.startsWith("http") ? movie.backdrop_path : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`)
        : null;

    const posterUrl = movie.poster_path
        ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
        : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80";

    const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "—";
    const rating = typeof movie.vote_average === "number" && movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "—";
    const runtimeStr = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "—";
    const genresList = movie.genres && movie.genres.length > 0 ? movie.genres.map(g => g.name).join(" • ") : "Cinema";

    const getTrailerKey = (movieData) => {
        if (!movieData) return null;
        if (movieData.trailer_key) return movieData.trailer_key;
        const videos = movieData.videos?.results || [];
        const officialTrailer = videos.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official);
        if (officialTrailer?.key) return officialTrailer.key;
        const anyTrailer = videos.find((v) => v.site === "YouTube" && v.type === "Trailer");
        if (anyTrailer?.key) return anyTrailer.key;
        const teaser = videos.find((v) => v.site === "YouTube" && (v.type === "Teaser" || v.type === "Clip"));
        if (teaser?.key) return teaser.key;
        const anyYoutube = videos.find((v) => v.site === "YouTube" && v.key);
        return anyYoutube?.key || null;
    };

    const trailerKey = getTrailerKey(movie);
    const director = movie.credits?.crew?.find((c) => c.job === "Director")?.name || "Not Available";
    const budgetStr = typeof movie.budget === "number" && movie.budget > 0 
        ? `$${movie.budget.toLocaleString()}` 
        : "Not Disclosed";
    const revenueStr = typeof movie.revenue === "number" && movie.revenue > 0 
        ? `$${movie.revenue.toLocaleString()}` 
        : "Not Disclosed";

    // Cast List
    let castList = [];
    if (movie.credits?.cast?.length > 0) {
        castList = movie.credits.cast.slice(0, 10).map((c) => ({
            name: c.name,
            character: c.character || "Lead Cast",
            profile_path: c.profile_path
        }));
    } else if (Array.isArray(movie.cast)) {
        castList = movie.cast.map(c => typeof c === 'string' ? { name: c, character: "Lead Cast" } : c);
    }

    return (
        <div className="min-h-screen bg-[#0a0b0e] text-[#e5e2e1] pt-16 pb-28">
            
            {/* Backdrop Banner */}
            <div className="relative w-full h-[58vh] min-h-110 overflow-hidden bg-[#111218]">
                {backdropUrl ? (
                    <img
                        src={backdropUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover filter brightness-[0.65] scale-103"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-b from-[#181922] to-[#0a0b0e] flex items-center justify-center opacity-40">
                        <span className="material-symbols-outlined text-8xl text-white/10">movie</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0b0e] via-[#0a0b0e]/60 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#0a0b0e]/80 via-transparent to-transparent" />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 hover:border-white/25 text-xs font-semibold text-white backdrop-blur-md transition-all cursor-pointer active:scale-95"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back
                </button>
            </div>

            {/* Main Content Details */}
            <div className="max-w-360 mx-auto px-4 sm:px-8 md:px-12 -mt-44 relative z-10 space-y-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Poster */}
                    <div className="w-52 md:w-68 rounded-2xl overflow-hidden shadow-2xl border border-white/15 shrink-0 bg-[#13141a] card-hover-lift">
                        <img src={posterUrl} alt={movie.title} className="w-full h-auto object-cover" />
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 space-y-4 pt-2 md:pt-14">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-3 py-1 rounded-full bg-white/8 border border-white/15 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                                {genresList}
                            </span>
                            {rating !== "—" && (
                                <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                    <span className="material-symbols-outlined text-[14px] filled">star</span>
                                    {rating} Score
                                </span>
                            )}
                            <span className="text-xs text-gray-400 font-medium">{releaseYear} • {runtimeStr}</span>
                        </div>

                        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="font-display italic text-sm sm:text-base text-violet-400/90 font-medium">
                                "{movie.tagline}"
                            </p>
                        )}

                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl opacity-90">
                            {movie.overview || "No synopsis available for this title."}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                onClick={() => setShowTrailer(true)}
                                className={`font-semibold text-xs sm:text-sm px-7 py-3 rounded-full transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer ${
                                    trailerKey 
                                        ? "bg-white text-black hover:bg-white/90 shadow-white/10" 
                                        : "bg-white/10 text-gray-400 hover:bg-white/15 border border-white/10"
                                }`}
                            >
                                <span className="material-symbols-outlined filled text-lg">
                                    {trailerKey ? "play_arrow" : "videocam_off"}
                                </span>
                                {trailerKey ? "Play Trailer" : "Trailer Unavailable"}
                            </button>

                            <button
                                onClick={toggleWatchlist}
                                className={`font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-md ${
                                    isSaved
                                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                                        : "bg-white/6 border border-white/15 text-white hover:bg-white/12"
                                }`}
                            >
                                <span className="material-symbols-outlined text-base">
                                    {isSaved ? "check" : "bookmark_add"}
                                </span>
                                {isSaved ? "Saved in Watchlist" : "Add to Watchlist"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Director & Cinema Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#111218] border border-white/7">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Director</h4>
                        <p className="font-semibold text-sm sm:text-base text-white truncate">{director}</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Runtime</h4>
                        <p className="font-semibold text-sm sm:text-base text-white">{runtimeStr}</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Production Budget</h4>
                        <p className="font-semibold text-sm sm:text-base text-white">{budgetStr}</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Box Office Revenue</h4>
                        <p className="font-bold text-sm sm:text-base text-emerald-400">{revenueStr}</p>
                    </div>
                </div>

                {/* Dedicated Featured Cast Section */}
                {castList.length > 0 && (
                    <div className="pt-4 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">
                                    Performance Ensemble
                                </span>
                                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                                    Featured Cast & Characters
                                </h2>
                            </div>

                            {/* Cast Carousel Controls */}
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => scrollCast("left")}
                                    aria-label="Scroll Cast Left"
                                    className="w-8 h-8 rounded-full bg-white/4 border border-white/8 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-base">chevron_left</span>
                                </button>
                                <button
                                    onClick={() => scrollCast("right")}
                                    aria-label="Scroll Cast Right"
                                    className="w-8 h-8 rounded-full bg-white/4 border border-white/8 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-base">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {/* Cast Cards Horizontal Carousel */}
                        <div ref={castRef} className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                            {castList.map((actor, idx) => {
                                const profileImg = actor.profile_path
                                    ? (actor.profile_path.startsWith("http") ? actor.profile_path : `https://image.tmdb.org/t/p/w300${actor.profile_path}`)
                                    : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

                                return (
                                    <div
                                        key={idx}
                                        className="flex-none w-36 sm:w-44 p-3 rounded-xl bg-[#111218] border border-white/6 hover:border-violet-500/30 card-hover-lift transition-all group cursor-pointer"
                                    >
                                        <div className="aspect-4/5 w-full rounded-lg overflow-hidden mb-2.5 bg-[#14151c] border border-white/10">
                                            <img
                                                src={profileImg}
                                                alt={actor.name}
                                                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <h4 className="font-semibold text-xs sm:text-sm text-white truncate group-hover:text-violet-300 transition-colors">
                                            {actor.name}
                                        </h4>
                                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                            {actor.character || "Lead Cast"}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Trailer Modal */}
            {showTrailer && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 animate-fadeIn"
                    onClick={() => setShowTrailer(false)}
                >
                    <div 
                        className="w-full max-w-4xl bg-[#14151c] rounded-2xl border border-white/15 overflow-hidden shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <h3 className="font-display font-bold text-base text-white">
                                {movie.title} — Official Trailer
                            </h3>
                            <button
                                onClick={() => setShowTrailer(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                        <div className="aspect-video w-full bg-black flex items-center justify-center">
                            {trailerKey ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                    title={`${movie.title} Trailer`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
                                    <span className="material-symbols-outlined text-4xl mb-2 text-gray-500">videocam_off</span>
                                    <p className="text-sm font-medium text-gray-300">No official trailer available for this movie.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetail;
