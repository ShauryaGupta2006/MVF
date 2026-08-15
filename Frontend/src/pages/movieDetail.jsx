import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTrailerKey, setActiveTrailerKey] = useState(null);
    const navigate = useNavigate();

    const fetchMovie = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movie/${movieId}`);
            if (!res.ok) throw new Error("Failed to fetch movie details.");
            const data = await res.json();
            if (data.success) {
                setMovie(data.data);
            } else {
                throw new Error(data.error || "Movie not found.");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
        window.scrollTo(0, 0);
    }, [movieId]);

    if (loading) {
        return <LoadingScreen message="Fetching CINECAST Movie Details..." />;
    }

    if (error) {
        return (
            <div className="min-h-[60vh] bg-background text-on-surface flex flex-col items-center justify-center px-4">
                <div className="max-w-md text-center p-8 rounded-2xl bg-surface-container border border-primary-container/30 shadow-2xl">
                    <span className="material-symbols-outlined text-5xl text-primary-container mb-4">error</span>
                    <h3 className="text-xl font-bold uppercase mb-2">Movie Not Found</h3>
                    <p className="text-sm text-on-surface-variant mb-6">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={fetchMovie}
                            className="bg-primary-container text-white px-8 py-3 rounded-full font-semibold text-xs uppercase tracking-wider neon-glow cursor-pointer"
                        >
                            Retry
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="glass-panel text-white px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition duration-300 cursor-pointer"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!movie) return null;

    const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "";
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
    const director = movie.credits?.crew?.find((p) => p.job === "Director");
    const topCast = movie.credits?.cast?.slice(0, 8) || [];
    const trailer = movie.videos?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube") || movie.videos?.results?.[0];
    const similarMovies = movie.similar?.results?.slice(0, 6) || [];

    return (
        <div className="min-h-screen bg-background text-on-surface pt-20">
            {/* Cinematic Backdrop */}
            <div className="relative w-full h-[60vh] overflow-hidden">
                {movie.backdrop_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover filter brightness-75 scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-surface-container"></div>
                )}
                <div className="absolute inset-0 hero-gradient"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-bold text-white hover:bg-white/10 transition-all duration-300 cursor-pointer active:scale-95 shadow-lg"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back
                </button>
            </div>

            {/* Main Content Details */}
            <div className="max-w-6xl mx-auto px-4 sm:px-margin-desktop -mt-48 relative z-10 pb-20">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="shrink-0 self-start">
                        <div className="w-52 md:w-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface-container">
                            {movie.poster_path ? (
                                <img
                                    src={`${import.meta.env.VITE_IMG_BASE_PATH}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-2/3 flex items-center justify-center text-on-surface-variant text-sm font-semibold">
                                    No Poster
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Meta Details */}
                    <div className="flex-1 flex flex-col gap-6">
                        <div>
                            <span className="px-3 py-1 rounded-full bg-primary-container/20 border border-primary-container text-primary text-xs font-bold uppercase tracking-widest inline-block mb-3">
                                CINECAST Highlight
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-sm text-on-surface-variant italic mt-1 font-medium">"{movie.tagline}"</p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                            {releaseYear && (
                                <span className="px-3 py-1 rounded-full bg-surface-container border border-white/5">
                                    {releaseYear}
                                </span>
                            )}
                            {runtime && (
                                <span className="px-3 py-1 rounded-full bg-surface-container border border-white/5">
                                    {runtime}
                                </span>
                            )}
                            {movie.vote_average > 0 && (
                                <span className="px-3 py-1 rounded-full bg-surface-container border border-white/5 text-hype-gold flex items-center gap-1 font-bold">
                                    <span className="material-symbols-outlined text-sm filled">star</span>
                                    {movie.vote_average.toFixed(1)} / 10
                                </span>
                            )}
                        </div>

                        {/* Genres */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((g) => (
                                    <button
                                        key={g.id}
                                        onClick={() => navigate(`/genre/${g.id}?name=${g.name}`)}
                                        className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                                    >
                                        {g.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        {movie.overview && (
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Overview</h3>
                                <p className="text-sm sm:text-base text-on-surface leading-relaxed max-w-2xl">
                                    {movie.overview}
                                </p>
                            </div>
                        )}

                        {/* Director */}
                        {director && (
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Director</h3>
                                <p className="text-base font-semibold text-white">{director.name}</p>
                            </div>
                        )}

                        {/* Watch Trailer Button */}
                        {trailer && (
                            <button
                                onClick={() => setActiveTrailerKey(trailer.key)}
                                className="inline-flex w-fit items-center gap-2 px-8 py-3 rounded-full bg-primary-container text-white font-semibold uppercase text-xs tracking-wider neon-glow hover:bg-opacity-90 transition-all cursor-pointer active:scale-95"
                            >
                                <span className="material-symbols-outlined filled text-xl">play_arrow</span>
                                Watch Trailer
                            </button>
                        )}
                    </div>
                </div>

                {/* Top Cast */}
                {topCast.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                            <span className="material-symbols-outlined text-primary">group</span>
                            Top Cast
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                            {topCast.map((person) => (
                                <div key={person.id} className="text-center group">
                                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-surface-container border border-white/5 mb-2 transition-transform duration-300 group-hover:scale-105">
                                        {person.profile_path ? (
                                            <img
                                                src={`${import.meta.env.VITE_IMG_BASE_PATH}${person.profile_path}`}
                                                alt={person.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-xl font-bold">
                                                {person.name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs font-semibold text-white truncate">{person.name}</p>
                                    <p className="text-[10px] text-on-surface-variant truncate">{person.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Movies */}
                {similarMovies.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                            <span className="material-symbols-outlined text-primary">movie</span>
                            Similar Movies
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {similarMovies.map((sim) => (
                                <div
                                    key={sim.id}
                                    onClick={() => navigate(`/movie/${sim.id}`)}
                                    className="group relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.02] bg-surface-container shadow-lg"
                                >
                                    <div className="aspect-2/3 w-full relative">
                                        {sim.poster_path ? (
                                            <img
                                                src={`${import.meta.env.VITE_IMG_BASE_PATH}${sim.poster_path}`}
                                                alt={sim.title}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-on-surface-variant">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 bg-surface-container">
                                        <h4 className="font-semibold text-white text-sm truncate mb-1 group-hover:text-primary transition-colors">
                                            {sim.title}
                                        </h4>
                                        <div className="flex items-center justify-between text-xs text-on-surface-variant">
                                            <span>{sim.release_date ? sim.release_date.split("-")[0] : "N/A"}</span>
                                            <span className="flex items-center gap-1 text-hype-gold font-bold">
                                                <span className="material-symbols-outlined text-[14px] filled">star</span>
                                                {sim.vote_average ? sim.vote_average.toFixed(1) : "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Trailer Modal */}
            {activeTrailerKey && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
                    <div className="relative w-full max-w-4xl bg-surface-container-low border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-surface-container">
                            <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                                {movie.title} — Official Trailer
                            </h3>
                            <button
                                onClick={() => setActiveTrailerKey(null)}
                                className="text-white/60 hover:text-white transition p-1 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>
                        </div>
                        <div className="relative w-full aspect-video bg-black">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${activeTrailerKey}?autoplay=1`}
                                title={movie.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetail;
