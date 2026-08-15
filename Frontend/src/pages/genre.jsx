import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

function Genre() {
    const { genreId } = useParams();
    const [searchParams] = useSearchParams();
    const genreName = searchParams.get("name") || "Genre";
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchGenreMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/genre/${genreId}`);
            if (!res.ok) throw new Error("Server returned an error. Please try again.");
            const data = await res.json();
            if (data.success) {
                setMovies(data.data.results);
            } else {
                throw new Error(data.error || "Failed to fetch genre movies.");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenreMovies();
    }, [genreId]);

    if (loading) {
        return <LoadingScreen message={`Fetching ${genreName} Movies...`} />;
    }


    if (error) {
        return (
            <div className="min-h-[60vh] bg-zinc-950 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-purple-800/10 blur-[80px] pointer-events-none"></div>
                <div className="absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-pink-800/10 blur-[80px] pointer-events-none"></div>
                <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center px-6 py-8 rounded-3xl border border-purple-500/15 bg-zinc-900/40 backdrop-blur-xl shadow-2xl">
                    <div className="relative w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-purple-950/50 border border-purple-500/30 text-purple-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">Something Went Wrong</h3>
                    <p className="text-sm text-zinc-400 font-medium mb-6 leading-relaxed">{error}</p>
                    <button onClick={fetchGenreMovies} className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(168,85,247,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-12 sm:px-8">
            {/* Heading */}
            <div className="relative mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-l-4 border-purple-500 pl-4">
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                        {genreName} <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Collection</span>
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
                        Handpicked top curation for {genreName} enthusiasts
                    </p>
                </div>
                <div className="flex w-fit items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-950/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400 backdrop-blur-sm animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping"></span>
                    ⚡ Curated Drops
                </div>
            </div>

            {movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                    <svg className="w-16 h-16 mb-4 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <p className="text-lg font-semibold">No movies found in this genre.</p>
                    <p className="text-sm text-zinc-600 mt-1">Try exploring a different category.</p>
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/1 p-2 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-white/4 hover:shadow-[0_12px_40px_rgba(168,85,247,0.2)]"
                        >
                            <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-zinc-900">
                                {movie.poster_path ? (
                                    <img
                                        src={`${import.meta.env.VITE_IMG_BASE_PATH}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                    <span className="text-[10px] font-bold text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                                        Match: High ✨
                                    </span>
                                </div>
                            </div>

                            <div className="p-3">
                                <h2 className="truncate text-sm font-bold text-zinc-100 group-hover:text-white transition duration-300">
                                    {movie.title}
                                </h2>
                                <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-500 font-medium">
                                    <span>{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</span>
                                    <span className="flex items-center gap-0.5 text-amber-500">
                                        ★ <span className="text-zinc-400">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                                    </span>
                                </div>

                                <button
                                    onClick={() => navigate(`/movie/${movie.id}`)}
                                    className="mt-3 w-full rounded-xl bg-white/5 hover:bg-purple-600 border border-white/10 hover:border-purple-600 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                                >
                                    Know More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Genre;
