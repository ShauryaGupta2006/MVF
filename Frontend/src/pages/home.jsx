import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import LoadingScreen from "../components/loadingScreen";

const genres = [
    {
        id: 28,
        name: "Action",
        icon: (
            <svg className="w-8 h-8 text-red-400 group-hover:text-red-300 transition-colors duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        gradient: "from-red-600 to-orange-500"
    },
    {
        id: 35,
        name: "Comedy",
        icon: (
            <svg className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        gradient: "from-yellow-500 to-amber-500"
    },
    {
        id: 18,
        name: "Drama",
        icon: (
            <svg className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        gradient: "from-purple-600 to-indigo-500"
    },
    {
        id: 878,
        name: "Sci-Fi",
        icon: (
            <svg className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="6" />
                <path strokeLinecap="round" d="M3 12h18M6.5 6.5l11 11" />
            </svg>
        ),
        gradient: "from-blue-600 to-cyan-500"
    },
    {
        id: 27,
        name: "Horror",
        icon: (
            <svg className="w-8 h-8 text-red-500/70 group-hover:text-red-500 transition-colors duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        ),
        gradient: "from-neutral-700 to-zinc-900"
    },
    {
        id: 10749,
        name: "Romance",
        icon: (
            <svg className="w-8 h-8 text-pink-400 group-hover:text-pink-300 transition-colors duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        gradient: "from-rose-500 to-pink-500"
    },
    {
        id: 53,
        name: "Thriller",
        icon: (
            <svg className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
        gradient: "from-slate-700 to-emerald-950"
    },
    {
        id: 16,
        name: "Animation",
        icon: (
            <svg className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
        gradient: "from-violet-500 to-fuchsia-500"
    },
];

function Home() {
    const [Loaded, setLoaded] = useState("Loading");
    const [movies, setMovies] = useState([]);
    const [upmovies, setUpmovies] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const fetchAllData = async () => {
        setLoaded("Loading");
        setError(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 10000); // 10 seconds timeout

        try {
            const [moviesRes, upmoviesRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_BACKEND_URL}/trending`, { signal: controller.signal }),
                fetch(`${import.meta.env.VITE_BACKEND_URL}/upcoming`, { signal: controller.signal })
            ]);

            clearTimeout(timeoutId);

            if (!moviesRes.ok || !upmoviesRes.ok) {
                throw new Error("MVF servers are currently returning an error. Please try again later.");
            }

            const moviesData = await moviesRes.json();
            const upmoviesData = await upmoviesRes.json();

            if (moviesData.success && upmoviesData.success) {
                setMovies(moviesData.data.results);
                setUpmovies(upmoviesData.data.results);
                setLoaded("Passed");
            } else {
                throw new Error(moviesData.error || upmoviesData.error || "Failed to retrieve complete forecast data.");
            }
        } catch (err) {
            clearTimeout(timeoutId);
            console.error("Fetch error:", err);
            
            let displayError = "An unexpected error occurred while communicating with the server.";
            if (err.name === "AbortError") {
                displayError = "Connection timed out. The server took too long to revert back with the data.";
            } else if (err.message) {
                displayError = err.message;
            }
            
            setError(displayError);
            setLoaded("Failed");
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const featuredMovie = movies && movies.length > 0 ? movies[0] : null;
    const releaseYear = featuredMovie && featuredMovie.release_date ? featuredMovie.release_date.split("-")[0] : "";

    if (Loaded === "Loading") {
        return <LoadingScreen message="Fetching Box Office Forecasts..." />;
    }

    if (Loaded === "Failed" || error) {
        return (
            <div className="min-h-[80vh] bg-zinc-950 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-red-800/10 blur-[80px] pointer-events-none"></div>
                <div className="absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-orange-800/10 blur-[80px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center px-6 py-8 rounded-3xl border border-red-500/15 bg-zinc-900/40 backdrop-blur-xl shadow-2xl">
                    <div className="relative w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-red-950/50 border border-red-500/30 text-red-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="absolute -inset-1 rounded-2xl border border-red-500/20 animate-ping" style={{ animationDuration: '3s' }}></span>
                    </div>

                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                        Connection Failed
                    </h3>
                    <p className="text-sm text-zinc-400 font-medium mb-6 leading-relaxed">
                        {error}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <button
                            onClick={fetchAllData}
                            className="flex-1 px-5 py-3 rounded-xl bg-linear-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(239,68,68,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                        >
                            Retry Connection
                        </button>
                        <button
                            onClick={() => navigate("/trending")}
                            className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            Explore Trends
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

                            {/* Dynamic Cinematic Hero Section */}
                            {featuredMovie ? (
                                <div className="relative w-full h-[65vh] min-h-120 md:h-[75vh] flex items-center overflow-hidden border-b border-white/5">
                                    {/* Backdrop Image with Multi-directional Fade */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
                                            alt={featuredMovie.title}
                                            className="w-full h-full object-cover object-top scale-102 transition duration-700 ease-in-out filter brightness-90"
                                        />
                                        {/* Vignette Overlay (Top, Bottom, Sides) */}
                                        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/80"></div>
                                        <div className="absolute inset-y-0 left-0.5 w-1/4 bg-linear-to-r from-zinc-950 to-transparent"></div>
                                        <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-zinc-950 to-transparent"></div>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                                        {/* Center/Left Content */}
                                        <section>
                                            <div id="Trending" className="max-w-2xl flex flex-col gap-6 md:pb-8">
                                                <div className="flex w-fit items-center gap-1.5 rounded-full border border-red-500/20 bg-red-950/40 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-red-400 backdrop-blur-md">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                                                    Top Forecasted Movie Today
                                                </div>
                                                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
                                                    Track box office. <br />
                                                    <span className="bg-linear-to-r from-red-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">Forecast hits.</span> <br />
                                                    Share what's hot.
                                                </h1>
                                                <p className="text-xs sm:text-sm text-zinc-400 font-medium line-clamp-3 leading-relaxed max-w-lg border-l-2 border-zinc-700 pl-4 bg-zinc-950/20 py-1 rounded-r-md backdrop-blur-xs">
                                                    {featuredMovie.overview}
                                                </p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <button onClick={() => scrollToSection("Trend")} className="px-6 py-3 rounded-full bg-linear-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.3)] hover:scale-105 cursor-pointer">
                                                        Start Forecasting — it's free
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/trending`)}
                                                        className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-extrabold uppercase text-xs tracking-wider transition-all duration-300 backdrop-blur-md hover:scale-105 cursor-pointer"
                                                    >
                                                        Explore Trends
                                                    </button>
                                                </div>
                                            </div>

                                        </section>


                                        {/* Right Vertical Title Label (Inspired by Letterboxd design) */}
                                        <div className="hidden md:flex flex-col items-end gap-1 pb-10">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">Currently Streaming</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-right font-black uppercase tracking-wider text-white text-sm">
                                                    {featuredMovie.title}
                                                </span>
                                                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-[10px] font-bold text-zinc-400">
                                                    {releaseYear}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Cinematic Shimmer Loading Skeleton */
                                <div className="relative w-full h-[65vh] min-h-120 bg-zinc-900/40 animate-pulse flex items-center">
                                    <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 md:px-12 flex flex-col gap-6">
                                        <div className="h-6 w-36 bg-zinc-800 rounded-full"></div>
                                        <div className="h-16 w-3/4 bg-zinc-800 rounded-lg"></div>
                                        <div className="h-20 w-1/2 bg-zinc-800 rounded-lg"></div>
                                        <div className="h-10 w-48 bg-zinc-800 rounded-full"></div>
                                    </div>
                                </div>
                            )}

                            {/* Padded Content Block */}
                            <div className="max-w-7xl mx-auto w-full px-4 py-12 sm:px-8 flex flex-col">
                                {/* Modernized Heading Section */}
                                <div id='Trend' className="relative mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-l-4 border-red-500 pl-4">
                                    <div>
                                        <h2 onClick={() => navigate('/trending')} className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl cursor-pointer hover:opacity-80 transition duration-300">
                                            Trending <span className="bg-linear-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Movies</span>
                                        </h2>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
                                            Real-time popularity forecasts on what's hot right now
                                        </p>
                                    </div>
                                    {/* Visual Status Pill */}
                                    <div className="flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-950/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400 backdrop-blur-sm animate-pulse">
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                                        Live Tracked
                                    </div>
                                </div>

                                <div className="relative group/swiper">
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: ".swiper-button-prev-trending",
                                            nextEl: ".swiper-button-next-trending",
                                        }}
                                        spaceBetween={24}
                                        className="pb-12"
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 2,
                                            },
                                            640: {
                                                slidesPerView: 3,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                            },
                                            1440: {
                                                slidesPerView: 6,
                                            },
                                        }}
                                    >
                                        {movies.map((movie) => (
                                            <SwiperSlide key={movie.id}>
                                                <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/1 p-2 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-white/4 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
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

                                                        <button
                                                            onClick={() => navigate(`/movie/${movie.id}`)}
                                                            className="mt-3 w-full rounded-xl bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                                                        >
                                                            Know More
                                                        </button>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Glass Controls */}
                                    <button className="swiper-button-prev-trending absolute left-2 top-[40%] -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950/70 text-zinc-300 opacity-0 group-hover/swiper:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-zinc-900 hover:text-white hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md cursor-pointer">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button className="swiper-button-next-trending absolute right-2 top-[40%] -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950/70 text-zinc-300 opacity-0 group-hover/swiper:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-zinc-900 hover:text-white hover:border-red-500/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] backdrop-blur-md cursor-pointer">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Genres Section with Liquid Glass Background Blobs */}
                                <div className="relative mb-8 mt-16 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-l-4 border-purple-500 pl-4">
                                    <div>
                                        <h2 onClick={() => navigate("/genres")} className="text-2xl font-black uppercase cursor-pointer hover:opacity-80 transition tracking-tight text-white sm:text-3xl">
                                            Explore <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Genres</span>
                                        </h2>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
                                            Filter by your favorite categories and discover top-rated films
                                        </p>
                                    </div>
                                    <div className="flex w-fit items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-950/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-400 backdrop-blur-sm">
                                        🎬 Custom Curation
                                    </div>
                                </div>

                                <div className="relative mb-12">
                                    {/* Liquid Glass Background Blobs */}
                                    <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[80px] pointer-events-none"></div>
                                    <div className="absolute -right-10 -bottom-10 h-72 w-72 rounded-full bg-pink-600/10 blur-[80px] pointer-events-none"></div>
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none"></div>

                                    <div className="relative z-10 grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
                                        {genres.map((genre) => (
                                            <div
                                                key={genre.id}
                                                onClick={() => navigate(`/genre/${genre.id}?name=${genre.name}`)}
                                                className="group relative overflow-hidden rounded-2xl p-4 cursor-pointer border border-white/10 bg-white/3 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between aspect-square"
                                            >
                                                {/* Liquid Color Highlight (revealed on hover) */}
                                                <div className={`absolute -right-1/4 -bottom-1/4 h-2/3 w-2/3 rounded-full bg-linear-to-br ${genre.gradient} blur-[20px] opacity-20 group-hover:opacity-75 group-hover:scale-125 transition-all duration-500`}></div>

                                                {/* Card Inner Glow border */}
                                                <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none group-hover:border-white/15 transition-colors duration-500"></div>

                                                {/* Soft white overlay for inner shine */}
                                                <div className="absolute inset-0 bg-white/1 group-hover:bg-white/3 transition-colors duration-300"></div>

                                                <div className="self-start transform group-hover:scale-110 group-hover:-translate-y-0.5 transition duration-500 relative z-10">
                                                    {genre.icon}
                                                </div>

                                                <div className="z-10 mt-auto">
                                                    <h3 className="text-xs font-black uppercase tracking-wider text-white drop-shadow-md">
                                                        {genre.name}
                                                    </h3>
                                                    <p className="text-[10px] font-bold text-white/50 group-hover:text-white transition duration-300 mt-0.5 flex items-center gap-1">
                                                        Browse <span className="transform group-hover:translate-x-1 transition-transform duration-300">➔</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modernized Heading Section */}
                                <div className="relative mb-8 mt-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-l-4 border-amber-500 pl-4">
                                    <div>
                                        <h2 onClick={() => navigate('/upcoming')} className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl cursor-pointer hover:opacity-80 transition duration-300">
                                            Upcoming <span className="bg-linear-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">Releases</span>
                                        </h2>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-1">
                                            Highly anticipated box office drop calendars
                                        </p>
                                    </div>
                                    {/* Status Pill */}
                                    <div className="flex w-fit items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-950/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
                                        ⚡ Calendar Drops
                                    </div>
                                </div>

                                <div className="relative group/swiper">
                                    <Swiper
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: ".swiper-button-prev-upcoming",
                                            nextEl: ".swiper-button-next-upcoming",
                                        }}
                                        spaceBetween={24}
                                        className="pb-12"
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 2,
                                            },
                                            640: {
                                                slidesPerView: 3,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                            },
                                            1440: {
                                                slidesPerView: 6,
                                            },
                                        }}
                                    >
                                        {upmovies.map((upmovie) => (
                                            <SwiperSlide key={upmovie.id}>
                                                <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/1 p-2 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-white/4 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                                                    <div className="relative overflow-hidden rounded-xl aspect-2/3 bg-zinc-900">
                                                        <img
                                                            src={`${import.meta.env.VITE_IMG_BASE_PATH}${upmovie.poster_path}`}
                                                            alt={upmovie.title}
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
                                                            {upmovie.title}
                                                        </h2>
                                                        <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-500 font-medium">
                                                            <span>{upmovie.release_date || "N/A"}</span>
                                                            <span className="flex items-center gap-0.5 text-amber-500">
                                                                ★ <span className="text-zinc-400">{upmovie.vote_average ? upmovie.vote_average.toFixed(1) : "N/A"}</span>
                                                            </span>
                                                        </div>

                                                        <button
                                                            onClick={() => navigate(`/movie/${upmovie.id}`)}
                                                            className="mt-3 w-full rounded-xl bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                                                        >
                                                            Know More
                                                        </button>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Custom Glass Controls */}
                                    <button className="swiper-button-prev-upcoming absolute left-2 top-[40%] -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950/70 text-zinc-300 opacity-0 group-hover/swiper:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-zinc-900 hover:text-white hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-md cursor-pointer">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button className="swiper-button-next-upcoming absolute right-2 top-[40%] -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950/70 text-zinc-300 opacity-0 group-hover/swiper:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-zinc-900 hover:text-white hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-md cursor-pointer">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
    );
}

export default Home;