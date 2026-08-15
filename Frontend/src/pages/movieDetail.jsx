import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        return <LoadingScreen message="Fetching Movie Details..." />;
    }


    if (error) {
        return (
            <div className="min-h-[60vh] bg-zinc-950 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-red-800/10 blur-[80px] pointer-events-none"></div>
                <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center px-6 py-8 rounded-3xl border border-red-500/15 bg-zinc-900/40 backdrop-blur-xl shadow-2xl">
                    <div className="relative w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-red-950/50 border border-red-500/30 text-red-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">Movie Not Found</h3>
                    <p className="text-sm text-zinc-400 font-medium mb-6 leading-relaxed">{error}</p>
                    <div className="flex gap-3">
                        <button onClick={fetchMovie} className="px-5 py-3 rounded-xl bg-linear-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                            Retry
                        </button>
                        <button onClick={() => navigate(-1)} className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer">
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
    const director = movie.credits?.crew?.find(p => p.job === "Director");
    const topCast = movie.credits?.cast?.slice(0, 8) || [];
    const trailer = movie.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
    const similarMovies = movie.similar?.results?.slice(0, 6) || [];

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Cinematic Backdrop */}
            <div className="relative w-full h-[55vh] overflow-hidden">
                {movie.backdrop_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover object-top filter brightness-75"
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-900"></div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/30"></div>
                <div className="absolute inset-y-0 left-0 w-1/5 bg-linear-to-r from-zinc-950 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-1/5 bg-linear-to-l from-zinc-950 to-transparent"></div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-md text-sm font-bold text-zinc-300 hover:text-white hover:bg-zinc-950/80 transition-all duration-300 cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-40 relative z-10 pb-16">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="shrink-0 self-start">
                        <div className="w-48 md:w-64 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                            {movie.poster_path ? (
                                <img
                                    src={`${import.meta.env.VITE_IMG_BASE_PATH}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-auto object-cover"
                                />
                            ) : (
                                <div className="w-full aspect-2/3 bg-zinc-800 flex items-center justify-center text-zinc-500">
                                    No Poster
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col gap-5">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-sm text-zinc-400 italic mt-1">"{movie.tagline}"</p>
                            )}
                        </div>

                        {/* Meta Pills */}
                        <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-zinc-400">
                            {releaseYear && (
                                <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-white/5">
                                    📅 {releaseYear}
                                </span>
                            )}
                            {runtime && (
                                <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-white/5">
                                    ⏱ {runtime}
                                </span>
                            )}
                            {movie.vote_average > 0 && (
                                <span className="px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/20 text-amber-400">
                                    ★ {movie.vote_average.toFixed(1)} / 10
                                </span>
                            )}
                            {movie.original_language && (
                                <span className="px-3 py-1 rounded-full bg-zinc-800/80 border border-white/5 uppercase">
                                    🌐 {movie.original_language}
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
                                        className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                                    >
                                        {g.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        {movie.overview && (
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Synopsis</h3>
                                <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
                                    {movie.overview}
                                </p>
                            </div>
                        )}

                        {/* Director */}
                        {director && (
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Director</h3>
                                <p className="text-sm font-semibold text-white">{director.name}</p>
                            </div>
                        )}

                        {/* Trailer Button */}
                        {trailer && (
                            <a
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.3)] hover:scale-105"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Watch Trailer
                            </a>
                        )}
                    </div>
                </div>

                {/* Cast Section */}
                {topCast.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 border-l-4 border-pink-500 pl-3">
                            Top Cast
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                            {topCast.map((person) => (
                                <div key={person.id} className="group text-center">
                                    <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 mb-2 transition-all duration-300 group-hover:border-white/15 group-hover:shadow-lg">
                                        {person.profile_path ? (
                                            <img
                                                src={`${import.meta.env.VITE_IMG_BASE_PATH}${person.profile_path}`}
                                                alt={person.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-2xl font-bold">
                                                {person.name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs font-bold text-zinc-200 truncate">{person.name}</p>
                                    <p className="text-[10px] text-zinc-500 truncate">{person.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Movies */}
                {similarMovies.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 border-l-4 border-blue-500 pl-3">
                            Similar Movies
                        </h3>
                        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {similarMovies.map((sim) => (
                                <div
                                    key={sim.id}
                                    onClick={() => navigate(`/movie/${sim.id}`)}
                                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/1 p-2 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:bg-white/4 hover:shadow-[0_12px_40px_rgba(59,130,246,0.15)]"
                                >
                                    <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-zinc-900">
                                        {sim.poster_path ? (
                                            <img
                                                src={`${import.meta.env.VITE_IMG_BASE_PATH}${sim.poster_path}`}
                                                alt={sim.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <h2 className="truncate text-sm font-bold text-zinc-100 group-hover:text-white transition duration-300">
                                            {sim.title}
                                        </h2>
                                        <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-500 font-medium">
                                            <span>{sim.release_date ? sim.release_date.split("-")[0] : "N/A"}</span>
                                            <span className="flex items-center gap-0.5 text-amber-500">
                                                ★ <span className="text-zinc-400">{sim.vote_average ? sim.vote_average.toFixed(1) : "N/A"}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieDetail;
