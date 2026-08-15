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
        return <LoadingScreen message={`Fetching ${genreName} Collection...`} />;
    }

    if (error) {
        return (
            <div className="min-h-[60vh] bg-background text-on-surface flex flex-col items-center justify-center px-4">
                <div className="max-w-md text-center p-8 rounded-2xl bg-surface-container border border-primary-container/30 shadow-2xl">
                    <span className="material-symbols-outlined text-5xl text-primary-container mb-4">error</span>
                    <h3 className="text-xl font-bold uppercase mb-2">Something Went Wrong</h3>
                    <p className="text-sm text-on-surface-variant mb-6">{error}</p>
                    <button
                        onClick={fetchGenreMovies}
                        className="bg-primary-container text-white px-8 py-3 rounded-full font-semibold text-xs uppercase tracking-wider neon-glow cursor-pointer"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background px-4 sm:px-margin-desktop py-24 max-w-screen-2xl mx-auto">
            {/* Heading */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-primary-container">category</span>
                    <div>
                        <h1 className="text-3xl font-extrabold uppercase text-white tracking-tight">
                            {genreName} Collection
                        </h1>
                        <p className="text-xs text-on-surface-variant uppercase tracking-wider mt-0.5 font-semibold">
                            Top curated movies for {genreName} enthusiasts
                        </p>
                    </div>
                </div>
                <span className="bg-primary-container/20 text-primary-container border border-primary-container/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {movies.length} Movies
                </span>
            </div>

            {movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
                    <span className="material-symbols-outlined text-6xl text-white/20 mb-4">movie_off</span>
                    <p className="text-lg font-bold text-white">No movies found in this genre.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="group relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.02] bg-surface-container shadow-lg"
                        >
                            <div className="aspect-2/3 w-full relative">
                                {movie.poster_path ? (
                                    <img
                                        src={`${import.meta.env.VITE_IMG_BASE_PATH}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-on-surface-variant">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="p-3 bg-surface-container">
                                <h3 className="font-semibold text-white text-sm truncate mb-1 group-hover:text-primary transition-colors">
                                    {movie.title}
                                </h3>
                                <div className="flex justify-between items-center text-xs text-on-surface-variant">
                                    <span>{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</span>
                                    <span className="flex items-center gap-1 text-hype-gold font-bold">
                                        <span className="material-symbols-outlined text-[14px] filled">star</span>
                                        {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Genre;
