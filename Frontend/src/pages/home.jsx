import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

const GENRE_CATEGORIES = [
    { id: "all", name: "All Genres" },
    { id: 28, name: "Action" },
    { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" }
];

function Home() {
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [trendTab, setTrendTab] = useState("popular"); // popular, recent
    const [sortBy, setSortBy] = useState("popularity"); // popularity, title, year
    const [watchlist, setWatchlist] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [trailerModalMovie, setTrailerModalMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    const navigate = useNavigate();

    const fetchTrending = async () => {
        setStatus("loading");
        setErrorMsg(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/trending`);
            if (!res.ok) throw new Error("MVF backend service unreachable.");
            const data = await res.json();
            if (data.success && data.data?.results) {
                setMovies(data.data.results);
                setStatus("success");
            } else {
                throw new Error("Failed to load trending movies.");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setErrorMsg(err.message || "An unexpected error occurred.");
            setStatus("error");
        }
    };

    useEffect(() => {
        fetchTrending();
    }, []);

    // Top Featured Hero Movie
    const featuredMovie = movies.length > 0 ? movies[0] : null;
    const heroTitle = featuredMovie ? featuredMovie.title : "Arrakis Rising";
    const heroBackdrop = featuredMovie && featuredMovie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
        : "https://lh3.googleusercontent.com/aida-public/AB6AXuAfqfAIXR73Z2OG-Vtm0IrPCieWnzZPlmKk0RskLPDIkRnKBazKpQ8o9mkeSFh4kSgOD_m7WE9piL13PTcuukiIL1d-yRgRAkG_rzszll2wiiGOTyl31AYLOV9Gz2FwCDB_3ekiZyEy5lmjiiXn_IQ9TqzMnz-xDHYkzq-WM9BhZSQ7wVL7wX9qGTGrmO7ZKya4N3XFqIwm0kgVxJ-PALiyh3Xd8nYU50itbT0zWvbRJTsRBRb0q7aI";

    const heroRating = featuredMovie ? (featuredMovie.vote_average ? featuredMovie.vote_average.toFixed(1) : "9.2") : "9.2";
    const heroYear = featuredMovie && featuredMovie.release_date ? featuredMovie.release_date.split("-")[0] : "2024";
    const heroOverview = featuredMovie ? featuredMovie.overview : "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.";

    // Play Trailer Handler
    const handleWatchTrailer = async (movieObj) => {
        const targetMovie = movieObj || featuredMovie;
        if (!targetMovie) return;

        setTrailerModalMovie(targetMovie);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movie/${targetMovie.id}`);
            const data = await res.json();
            if (data.success && data.data?.videos?.results) {
                const trailer = data.data.videos.results.find(
                    (v) => v.type === "Trailer" && v.site === "YouTube"
                ) || data.data.videos.results[0];
                if (trailer) {
                    setTrailerKey(trailer.key);
                } else {
                    setTrailerKey(null);
                }
            } else {
                setTrailerKey(null);
            }
        } catch (err) {
            console.error("Trailer fetch error:", err);
            setTrailerKey(null);
        }
    };

    const toggleWatchlist = (movieObj, e) => {
        if (e) e.stopPropagation();
        if (watchlist.includes(movieObj.id)) {
            setWatchlist(watchlist.filter((id) => id !== movieObj.id));
        } else {
            setWatchlist([...watchlist, movieObj.id]);
        }
    };

    // Genre Filtering & Sorting
    const filteredMovies = movies.filter((m) => {
        if (selectedGenre === "all") return true;
        return m.genre_ids && m.genre_ids.includes(Number(selectedGenre));
    });

    const sortedMovies = [...filteredMovies].sort((a, b) => {
        if (sortBy === "title") {
            return (a.title || "").localeCompare(b.title || "");
        } else if (sortBy === "year") {
            return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        } else {
            return (b.popularity || 0) - (a.popularity || 0);
        }
    });

    if (status === "loading") {
        return <LoadingScreen message="Loading Box Office Forecasts..." />;
    }

    if (status === "error") {
        return (
            <div className="min-h-[70vh] bg-surface text-white flex flex-col items-center justify-center px-4">
                <div className="max-w-md text-center p-8 rounded-2xl bg-surface-container border border-primary/30 shadow-2xl">
                    <span className="material-symbols-outlined text-5xl text-primary mb-4">error</span>
                    <h2 className="text-xl font-bold uppercase mb-2">Connection Error</h2>
                    <p className="text-sm text-on-surface-variant mb-6">{errorMsg}</p>
                    <button
                        onClick={fetchTrending}
                        className="px-6 py-3 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/80 transition duration-300 shadow-[0_0_15px_rgba(225,29,72,0.4)] cursor-pointer"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface text-white pt-16">
            
            {/* Cinematic Hero Section */}
            <section className="relative h-[80vh] min-h-137.5 w-full flex items-end pb-12 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${heroBackdrop}')` }}
                ></div>
                <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-transparent z-10"></div>
                <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-surface to-transparent z-10"></div>

                <div className="relative z-20 w-full max-w-[1920px] mx-auto px-6 sm:px-12 flex flex-col justify-end">
                    <div className="max-w-3xl">
                        {/* Hype Score Pill */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            92% Hype Score
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white mb-3 drop-shadow-lg leading-none">
                            {heroTitle}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-4">
                            <span className="flex items-center text-yellow-500 font-bold">
                                <span className="material-symbols-outlined text-[16px] mr-1 filled">star</span>
                                {heroRating}
                            </span>
                            <span>{heroYear}</span>
                            <span>2h 45m</span>
                            <span className="text-white/80">Sci-Fi | Adventure</span>
                        </div>

                        <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mb-8 line-clamp-3 leading-relaxed">
                            {heroOverview}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => handleWatchTrailer(featuredMovie)}
                                className="px-8 py-3.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-primary/80 transition duration-300 shadow-[0_0_20px_rgba(225,29,72,0.4)] cursor-pointer active:scale-95"
                            >
                                <span className="material-symbols-outlined filled text-lg">play_arrow</span>
                                Watch Trailer
                            </button>
                            {featuredMovie && (
                                <button
                                    onClick={(e) => toggleWatchlist(featuredMovie, e)}
                                    className="px-6 py-3.5 rounded-full bg-surface-container/80 border border-white/10 hover:bg-surface-container text-white text-xs font-bold uppercase tracking-wider transition duration-300 backdrop-blur-md cursor-pointer active:scale-95"
                                >
                                    {watchlist.includes(featuredMovie.id) ? "✓ Added to List" : "+ Add to List"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Pills Bar */}
            <section className="py-6 px-6 sm:px-12 border-y border-white/10 max-w-[1920px] mx-auto">
                <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar py-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant shrink-0 mr-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-base">category</span>
                        Genres:
                    </span>
                    {GENRE_CATEGORIES.map((cat) => {
                        const isSelected = selectedGenre === String(cat.id);
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedGenre(String(cat.id))}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                                    isSelected
                                        ? "bg-primary text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]"
                                        : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-white border border-white/5"
                                }`}
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Trends Now Section (Horizontal Poster Scroll) */}
            <section className="py-12 px-6 sm:px-12 max-w-[1920px] mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl text-primary">local_fire_department</span>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">
                            Trends Now
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 bg-surface-container p-1 rounded-full border border-white/5 text-xs font-bold uppercase tracking-wider">
                        <button
                            onClick={() => setTrendTab("popular")}
                            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                                trendTab === "popular" ? "bg-primary text-white" : "text-on-surface-variant hover:text-white"
                            }`}
                        >
                            Popular
                        </button>
                        <button
                            onClick={() => setTrendTab("recent")}
                            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                                trendTab === "recent" ? "bg-primary text-white" : "text-on-surface-variant hover:text-white"
                            }`}
                        >
                            Recently Added
                        </button>
                    </div>
                </div>

                <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 pt-2">
                    {movies.slice(0, 10).map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="group cursor-pointer shrink-0 w-44 sm:w-52 transition-all duration-300 card-hover-lift"
                        >
                            <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-surface-container mb-3 shadow-lg border border-white/5">
                                {movie.poster_path ? (
                                    <img
                                        src={`${import.meta.env.VITE_IMG_BASE_PATH}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <h3 className="font-semibold text-white text-sm truncate group-hover:text-primary transition-colors">
                                {movie.title}
                            </h3>
                            <div className="flex justify-between items-center text-xs text-on-surface-variant mt-0.5 font-medium">
                                <span>{movie.release_date ? movie.release_date.split("-")[0] : "2024"}</span>
                                <span className="flex items-center text-yellow-500 font-bold">
                                    <span className="material-symbols-outlined text-[14px] mr-0.5 filled">star</span>
                                    {movie.vote_average ? movie.vote_average.toFixed(1) : "8.0"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Video Spotlight */}
            {featuredMovie && (
                <section className="py-12 px-6 sm:px-12 max-w-[1920px] mx-auto">
                    <div className="bg-surface-container-low border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8 shadow-2xl">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold uppercase tracking-widest">
                                    Featured Video
                                </span>
                                <span className="text-xs text-on-surface-variant font-semibold">#Trending</span>
                            </div>

                            <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-3">
                                {featuredMovie.title}
                            </h3>

                            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xl mb-6 line-clamp-3">
                                {featuredMovie.overview}
                            </p>

                            <button
                                onClick={() => handleWatchTrailer(featuredMovie)}
                                className="px-6 py-3 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:bg-primary/80 transition duration-300 shadow-[0_0_15px_rgba(225,29,72,0.4)] cursor-pointer"
                            >
                                <span className="material-symbols-outlined filled text-base">play_arrow</span>
                                Play Spotlight Trailer
                            </button>
                        </div>

                        <div
                            onClick={() => handleWatchTrailer(featuredMovie)}
                            className="w-full lg:w-120 aspect-video rounded-2xl overflow-hidden relative cursor-pointer group border border-white/10 shadow-xl"
                        >
                            {featuredMovie.backdrop_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w780${featuredMovie.backdrop_path}`}
                                    alt={featuredMovie.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full bg-surface-container"></div>
                            )}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_25px_rgba(225,29,72,0.6)] group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl filled ml-1">play_arrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Movies Grid Section */}
            <section className="py-12 px-6 sm:px-12 max-w-[1920px] mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white">
                            Explore Movies
                        </h2>
                        <p className="text-xs text-on-surface-variant uppercase tracking-wider mt-0.5 font-semibold">
                            Full forecasting catalog & real-time ratings
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full border border-white/5 text-xs font-bold uppercase tracking-wider">
                        <span className="text-on-surface-variant">Sort By:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent text-primary focus:outline-none cursor-pointer font-bold uppercase"
                        >
                            <option value="popularity" className="bg-surface-container text-white">Popularity</option>
                            <option value="title" className="bg-surface-container text-white">Title (A-Z)</option>
                            <option value="year" className="bg-surface-container text-white">Release Year</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {sortedMovies.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="group cursor-pointer transition-all duration-300 card-hover-lift"
                        >
                            <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-surface-container mb-3 shadow-lg border border-white/5">
                                {movie.poster_path ? (
                                    <img
                                        src={`${import.meta.env.VITE_IMG_BASE_PATH}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-white text-base truncate w-28 sm:w-36 group-hover:text-primary transition-colors">
                                        {movie.title}
                                    </h3>
                                    <p className="text-xs text-on-surface-variant mt-0.5">
                                        {movie.release_date ? movie.release_date.split("-")[0] : "2024"}
                                    </p>
                                </div>
                                <span className="flex items-center text-yellow-500 text-xs font-bold shrink-0">
                                    <span className="material-symbols-outlined text-[14px] mr-0.5 filled">star</span>
                                    {movie.vote_average ? movie.vote_average.toFixed(1) : "8.0"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trailer Modal */}
            {trailerModalMovie && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
                    <div className="relative w-full max-w-4xl bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-surface-container">
                            <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                                {trailerModalMovie.title} — Official Trailer
                            </h3>
                            <button
                                onClick={() => {
                                    setTrailerModalMovie(null);
                                    setTrailerKey(null);
                                }}
                                className="text-white/60 hover:text-white transition p-1 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>

                        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                            {trailerKey ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                    title={trailerModalMovie.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="text-center p-8">
                                    <span className="material-symbols-outlined text-4xl text-primary mb-2">videocam_off</span>
                                    <p className="text-sm text-white/70">Trailer video not available for this movie.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;