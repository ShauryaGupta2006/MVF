import { useState, useEffect } from "react";

function Trending() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test`);
                const data = await res.json();
                if (data.success) {
                    setMovies(data.data.results);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-12 sm:px-8">
            {/* Modernized Heading Section */}
            <div className="relative mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-l-4 border-red-500 pl-4">
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                        Trending <span className="bg-linear-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Forecasts</span>
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
                        Comprehensive rankings based on audience interest signals
                    </p>
                </div>
                {/* Live Status Pill */}
                <div className="flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-950/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400 backdrop-blur-sm animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                    Live Tracked
                </div>
            </div>

            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/1 p-2 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-white/4 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                    >
                        <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-zinc-900">
                            <img
                                src={`${import.meta.env.VITE_IMG_BASE_PATH}${movie.poster_path}`}
                                alt={movie.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Glass Overlay on hover */}
                            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                <span className="text-[10px] font-bold text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                                    Forecast: Hot 🔥
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

                            <button className="mt-3 w-full rounded-xl bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all duration-300 shadow-sm">
                                Know More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trending;