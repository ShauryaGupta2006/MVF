import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";



// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";



const GENRE_CATEGORIES = [
    { id: "all", name: "All Featured", icon: "local_fire_department" },
    { id: "28", name: "Action", icon: "bolt" },
    { id: "878", name: "Sci-Fi", icon: "rocket_launch" },
    { id: "12", name: "Adventure", icon: "explore" },
    { id: "16", name: "Animation", icon: "animation" },
    { id: "18", name: "Drama", icon: "theater_comedy" },
    { id: "53", name: "Thriller", icon: "psychology" },
    { id: "80", name: "Crime", icon: "local_police" },
    { id: "9648", name: "Mystery", icon: "visibility" },
    { id: "35", name: "Comedy", icon: "mood" }
];

// Rich Explore Genre Showcase Cards
const EXPLORE_GENRES = [
    { id: 28, name: "Action", icon: "bolt", gradient: "from-orange-500 to-red-600", count: "120+ Films" },
    { id: 878, name: "Sci-Fi", icon: "rocket_launch", gradient: "from-cyan-500 to-blue-600", count: "95+ Films" },
    { id: 12, name: "Adventure", icon: "explore", gradient: "from-amber-400 to-orange-500", count: "80+ Films" },
    { id: 16, name: "Animation", icon: "animation", gradient: "from-pink-500 to-purple-600", count: "65+ Films" },
    { id: 18, name: "Drama", icon: "theater_comedy", gradient: "from-violet-500 to-indigo-600", count: "150+ Films" },
    { id: 53, name: "Thriller", icon: "psychology", gradient: "from-red-600 to-zinc-800", count: "110+ Films" },
    { id: 80, name: "Crime", icon: "local_police", gradient: "from-emerald-500 to-teal-700", count: "70+ Films" },
    { id: 35, name: "Comedy", icon: "mood", gradient: "from-yellow-400 to-amber-600", count: "85+ Films" }
];

function Home() {
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [state, setState] = useState("loading"); // loading, found, error
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [activeTrailerKey, setActiveTrailerKey] = useState(null);
    const [activeTrailerTitle, setActiveTrailerTitle] = useState("");

    // Swiper instance references for 100% deterministic, instant navigation control
    const heroSwiperRef = useRef(null);
    const genreNavSwiperRef = useRef(null);
    const featuredCardsSwiperRef = useRef(null);
    const upcomingCardsSwiperRef = useRef(null);
    const exploreCardsSwiperRef = useRef(null);

    const navigate = useNavigate();

    // Lazy initialization for watchlist to prevent setState cascading effect in useEffect
    const [watchlist, setWatchlist] = useState(() => {
        try {
            const list = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            return list.map((m) => m.id);
        } catch {
            return [];
        }
    });

    const getTrendingMovies = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4400";
            const res = await fetch(`${backendUrl}/trending`, {
                credentials: "include"
            });

            if (res.ok) {
                const resData = await res.json();
                if ((resData.success === true || resData.success === "success") && resData.data?.results?.length > 0) {
                    const results = resData.data.results;
                    setTrendingMovies(results);
                    setMovies(results.slice(0, 8));
                    setState("found");
                    return;
                }
            }
            else {
                setState("error")
                return;
            }
        } catch {
            setState("error")
            return;
        }
    };

    const getUpcomingMovies = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4400";
            const res = await fetch(`${backendUrl}/upcoming`, {
                credentials: "include"
            });

            if (res.ok) {
                const resData = await res.json();
                if ((resData.success === true || resData.success === "success") && resData.data?.results?.length > 0) {
                    setUpcomingMovies(resData.data.results);
                    return;
                }
            }
        } catch (err) {
            console.error("Failed to fetch upcoming movies:", err);
        }
    };



    const getImageUrl = (path, size = "original") => {
        if (!path) return "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80";
        if (path.startsWith("http")) return path;
        const base = size === "original" ? "https://image.tmdb.org/t/p/original" : "https://image.tmdb.org/t/p/w500";
        return `${base}${path}`;
    };

    const syncWatchlist = () => {
        try {
            const list = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            setWatchlist(list.map((m) => m.id));
        } catch {
            setWatchlist([]);
        }
    };

    const toggleWatchlist = (movie, e) => {
        if (e) e.stopPropagation();
        try {
            const currentList = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            const exists = currentList.some((item) => item.id === movie.id);
            let updated;
            if (exists) {
                updated = currentList.filter((item) => item.id !== movie.id);
            } else {
                updated = [
                    ...currentList,
                    {
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average,
                        release_date: movie.release_date,
                        genre: movie.genre_name || "Cinema"
                    }
                ];
            }
            localStorage.setItem("cineaste_watchlist", JSON.stringify(updated));
            setWatchlist(updated.map((m) => m.id));
            window.dispatchEvent(new Event("watchlist_updated"));
        } catch (err) {
            console.error("Failed to update watchlist:", err);
        }
    };

    useEffect(() => {
        
        getTrendingMovies();
        getUpcomingMovies();
        
    }, []);

    const openTrailer = async (movie, e) => {
        if (e) e.stopPropagation();
        if (movie.trailer_key) {
            setActiveTrailerKey(movie.trailer_key);
            setActiveTrailerTitle(movie.title);
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4400";
            const res = await fetch(`${backendUrl}/movie/${movie.id}`, { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                const videos = data.data?.videos?.results || [];
                const official = videos.find((v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
                if (official?.key) {
                    setActiveTrailerKey(official.key);
                    setActiveTrailerTitle(movie.title);
                    return;
                }
            }
        } catch (err) {
            console.error("Trailer fetch error:", err);
        }


        setActiveTrailerTitle(movie.title);
    };

    // Filter featured titles dynamically by selected genre category
    const filteredMovies = movies.filter((movie) => {
        if (selectedGenre === "all") return true;
        if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
            if (movie.genre_ids.includes(Number(selectedGenre))) return true;
        }
        const targetGenreObj = GENRE_CATEGORIES.find((g) => g.id === selectedGenre);
        if (targetGenreObj && movie.genre_name) {
            return movie.genre_name.toLowerCase().includes(targetGenreObj.name.toLowerCase());
        }
        return false;
    });

    const displayedMovies = filteredMovies.length > 0 ? filteredMovies : movies;
    const currentGenreObj = GENRE_CATEGORIES.find((g) => g.id === selectedGenre) || GENRE_CATEGORIES[0];



    if (state === "loading") {
        return (
            <div className="min-h-screen bg-[#0a0b0e] text-white flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-6xl space-y-6 animate-pulse">
                    <div className="w-full h-[65vh] rounded-3xl bg-white/5 border border-white/8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                    </div>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex-1 aspect-2/3 rounded-2xl bg-white/5" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (state === "error") {
        return (
            <div className="min-h-screen bg-[#0a0b0e] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/20 backdrop-blur-xl max-w-md">
                    <span className="material-symbols-outlined text-4xl text-red-400 mb-3">error</span>
                    <h2 className="text-xl font-bold mb-2">Unable to load movies</h2>
                    <p className="text-sm text-gray-400 mb-6">Could not retrieve cinema data. Please check your connection.</p>
                    <button
                        onClick={() => {
                            window.location.reload();
                        }}
                        className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all cursor-pointer"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0b0e] text-[#e5e2e1] pb-28 selection:bg-violet-500/40 selection:text-white">

            {/* 1. CINEMATIC HERO CAROUSEL SECTION */}
            <section className="relative w-full overflow-hidden group/hero">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    speed={800}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    pagination={{
                        clickable: true,
                        el: ".hero-swiper-pagination",
                        bulletClass: "hero-bullet inline-block w-2.5 h-2.5 rounded-full bg-white/30 cursor-pointer transition-all duration-300",
                        bulletActiveClass: "!w-8 !bg-white !rounded-full shadow-lg shadow-white/30"
                    }}
                    loop={movies.length > 1}
                    onSwiper={(swiper) => {
                        heroSwiperRef.current = swiper;
                    }}
                    className="w-full h-[78vh] min-h-150"
                >
                    {movies.map((movie) => {
                        const backdrop = getImageUrl(movie.backdrop_path, "original");
                        const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : "8.5";
                        const year = movie.release_date ? movie.release_date.split("-")[0] : "2024";
                        const genre = movie.genre_name || (GENRE_CATEGORIES.find((g) => g.id === String(movie.genre_ids?.[0]))?.name) || "Cinema";
                        const hype = movie.hype_score || `${Math.min(99, Math.round((movie.vote_average || 8) * 10 + 5))}%`;
                        const runtime = movie.runtime || "2h 15m";
                        const isSaved = watchlist.includes(movie.id);

                        return (
                            <SwiperSlide key={movie.id} className="relative w-full h-full bg-[#0e0f14]">
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out"
                                    style={{ backgroundImage: `url('${backdrop}')` }}
                                />

                                {/* Multi-layer gradient overlays for depth and legibility */}
                                <div className="absolute inset-0 bg-linear-to-t from-[#0a0b0e] via-[#0a0b0e]/60 to-black/30" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#0a0b0e] via-[#0a0b0e]/75 to-transparent w-full lg:w-3/4" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.18),transparent_60%)] pointer-events-none" />

                                {/* Slide Content Overlay */}
                                <div className="relative z-10 max-w-7xl mx-auto h-full px-6 sm:px-10 md:px-14 flex flex-col justify-end pb-16 md:pb-20">
                                    <div className="max-w-2xl space-y-4 animate-fadeIn">

                                        {/* Metadata Pills */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-bold backdrop-blur-md">
                                                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                                                {hype} Hype Index
                                            </span>

                                            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-gray-200 backdrop-blur-md">
                                                {genre}
                                            </span>

                                            <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                4K • HDR
                                            </span>

                                            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                                                <span className="material-symbols-outlined text-sm filled text-amber-400">star</span>
                                                {rating}
                                            </span>

                                            <span className="text-xs font-medium text-gray-400">
                                                {year} • {runtime}
                                            </span>
                                        </div>

                                        {/* Movie Title */}
                                        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight drop-shadow-xl">
                                            {movie.title}
                                        </h1>

                                        {/* Overview */}
                                        <p className="text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed max-w-xl drop-shadow-md">
                                            {movie.overview}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap items-center gap-3 pt-3">
                                            <button
                                                onClick={(e) => openTrailer(movie, e)}
                                                className="bg-white text-black hover:bg-white/90 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-lg shadow-white/10 hover:shadow-white/20 active:scale-95 flex items-center gap-2 cursor-pointer font-sans"
                                            >
                                                <span className="material-symbols-outlined filled text-lg text-black">play_arrow</span>
                                                Watch Trailer
                                            </button>

                                            <button
                                                onClick={() => navigate(`/movie/${movie.id}`)}
                                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-all active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-md"
                                            >
                                                <span className="material-symbols-outlined text-base text-violet-400">info</span>
                                                View Details
                                            </button>

                                            <button
                                                onClick={(e) => toggleWatchlist(movie, e)}
                                                className={`font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-all active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-md ${isSaved
                                                    ? "bg-violet-600/40 border border-violet-400/60 text-violet-200"
                                                    : "bg-white/5 border border-white/15 text-gray-200 hover:bg-white/10"
                                                    }`}
                                            >
                                                <span className="material-symbols-outlined text-base">
                                                    {isSaved ? "check" : "bookmark_add"}
                                                </span>
                                                {isSaved ? "Saved" : "Watchlist"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {/* Left / Right Hero Carousel Controls */}
                <button
                    onClick={() => heroSwiperRef.current?.slidePrev()}
                    aria-label="Previous Slide"
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/15 hover:border-white/30 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-xl opacity-0 group-hover/hero:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>

                <button
                    onClick={() => heroSwiperRef.current?.slideNext()}
                    aria-label="Next Slide"
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/15 hover:border-white/30 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-xl opacity-0 group-hover/hero:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>


                <div className="hero-swiper-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10" />
            </section>


          
            <section className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pt-14 space-y-7">


                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Trending Movies
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Showing {displayedMovies.length} curated {currentGenreObj.name} cinematic selections
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                        {selectedGenre !== "all" && (
                            <button
                                onClick={() => navigate(`/genre/${selectedGenre}?name=${encodeURIComponent(currentGenreObj.name)}`)}
                                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors cursor-pointer"
                            >
                                Full {currentGenreObj.name} Page
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        )}

                        {/* Featured Carousel Navigation Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => featuredCardsSwiperRef.current?.slidePrev()}
                                aria-label="Scroll left"
                                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
                            >
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                            <button
                                onClick={() => featuredCardsSwiperRef.current?.slideNext()}
                                aria-label="Scroll right"
                                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
                            >
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                <Swiper
                    onSwiper={(swiper) => {
                        featuredCardsSwiperRef.current = swiper;
                    }}
                    spaceBetween={20}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3, spaceBetween: 20 },
                        768: { slidesPerView: 4, spaceBetween: 20 },
                        1024: { slidesPerView: 5, spaceBetween: 24 },
                        1280: { slidesPerView: 5, spaceBetween: 24 }
                    }}
                    className="pb-4"
                >
                    {trendingMovies.map((movies) => {
                        const posterUrl = getImageUrl(movies.poster_path, "w500");
                        const rating = movies.vote_average ? Number(movies.vote_average).toFixed(1) : "8.5";
                        const isSaved = watchlist.includes(movies.id);
                        const year = movies.release_date ? movies.release_date.split("-")[0] : "2024";

                        return (
                            <SwiperSlide key={movies.id}>
                                <div
                                    onClick={() => navigate(`/movie/${movies.id}`)}
                                    className="group relative cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-white/2 border border-white/8 hover:border-white/20 p-2.5 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:-translate-y-1"
                                >
                                    {/* Poster Aspect Box */}
                                    <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-zinc-900">
                                        <img
                                            src={posterUrl}
                                            alt={movies.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />

                                        {/* Rating Pill */}
                                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs text-amber-400 filled">star</span>
                                            <span className="text-[11px] font-bold text-white">{rating}</span>
                                        </div>

                                        {/* Watchlist Toggle Button */}
                                        <button
                                            onClick={(e) => toggleWatchlist(movies, e)}
                                            className={`absolute top-2.5 left-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${isSaved
                                                ? "bg-violet-600 text-white shadow-md shadow-violet-600/40"
                                                : "bg-black/60 text-gray-300 hover:text-white border border-white/10 hover:bg-black/80"
                                                }`}
                                            title={isSaved ? "Remove from watchlist" : "Add to watchlist"}
                                        >
                                            <span className="material-symbols-outlined text-xs">
                                                {isSaved ? "check" : "bookmark"}
                                            </span>
                                        </button>

                                        {/* Hover Overlay with Play Button */}
                                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div
                                                onClick={(e) => openTrailer(movies, e)}
                                                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-2xl filled text-black">play_arrow</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="pt-3 px-1">
                                        <h3 className="font-semibold text-sm text-white truncate group-hover:text-violet-300 transition-colors">
                                            {movies.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                                            <span>{year}</span>
                                            <span className="text-[11px] text-gray-500 font-medium">
                                                {movies.genre_name || "Cinema"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </section>

            

            <section className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pt-14 space-y-7">


                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Upcoming Movies
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Showing {displayedMovies.length} curated {currentGenreObj.name} cinematic selections
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                        {selectedGenre !== "all" && (
                            <button
                                onClick={() => navigate(`/genre/${selectedGenre}?name=${encodeURIComponent(currentGenreObj.name)}`)}
                                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors cursor-pointer"
                            >
                                Full {currentGenreObj.name} Page
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        )}

                        {/* Upcoming Carousel Navigation Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => upcomingCardsSwiperRef.current?.slidePrev()}
                                aria-label="Scroll left"
                                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
                            >
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                            <button
                                onClick={() => upcomingCardsSwiperRef.current?.slideNext()}
                                aria-label="Scroll right"
                                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
                            >
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                <Swiper
                    onSwiper={(swiper) => {
                        upcomingCardsSwiperRef.current = swiper;
                    }}
                    spaceBetween={20}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3, spaceBetween: 20 },
                        768: { slidesPerView: 4, spaceBetween: 20 },
                        1024: { slidesPerView: 5, spaceBetween: 24 },
                        1280: { slidesPerView: 5, spaceBetween: 24 }
                    }}
                    className="pb-4"
                >
                    {upcomingMovies.map((movies) => {
                        const posterUrl = getImageUrl(movies.poster_path, "w500");
                        const rating = movies.vote_average ? Number(movies.vote_average).toFixed(1) : "8.5";
                        const isSaved = watchlist.includes(movies.id);
                        const year = movies.release_date ? movies.release_date.split("-")[0] : "Coming Soon";

                        return (
                            <SwiperSlide key={movies.id}>
                                <div
                                    onClick={() => navigate(`/movie/${movies.id}`)}
                                    className="group relative cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-white/2 border border-white/8 hover:border-white/20 p-2.5 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)] hover:-translate-y-1"
                                >
                                    {/* Poster Aspect Box */}
                                    <div className="relative aspect-2/3 rounded-xl overflow-hidden bg-zinc-900">
                                        <img
                                            src={posterUrl}
                                            alt={movies.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />

                                        {/* Rating Pill */}
                                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs text-amber-400 filled">star</span>
                                            <span className="text-[11px] font-bold text-white">{rating}</span>
                                        </div>

                                        {/* Watchlist Toggle Button */}
                                        <button
                                            onClick={(e) => toggleWatchlist(movies, e)}
                                            className={`absolute top-2.5 left-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${isSaved
                                                ? "bg-violet-600 text-white shadow-md shadow-violet-600/40"
                                                : "bg-black/60 text-gray-300 hover:text-white border border-white/10 hover:bg-black/80"
                                                }`}
                                            title={isSaved ? "Remove from watchlist" : "Add to watchlist"}
                                        >
                                            <span className="material-symbols-outlined text-xs">
                                                {isSaved ? "check" : "bookmark"}
                                            </span>
                                        </button>

                                        {/* Hover Overlay with Play Button */}
                                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div
                                                onClick={(e) => openTrailer(movies, e)}
                                                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-2xl filled text-black">play_arrow</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="pt-3 px-1">
                                        <h3 className="font-semibold text-sm text-white truncate group-hover:text-violet-300 transition-colors">
                                            {movies.title}
                                        </h3>
                                        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                                            <span>{year}</span>
                                            <span className="text-[11px] text-gray-500 font-medium">
                                                {movies.genre_name || "Cinema"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </section>


            





            {/* 3. DEDICATED EXPLORE GENRES SHOWCASE CAROUSEL */}
            {/* <section className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 pt-16 space-y-6">
                <div className="flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="h-2 w-2 rounded-full bg-violet-400" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-violet-400">
                                Categories & Universes
                            </span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Explore by Genre
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => exploreCardsSwiperRef.current?.slidePrev()}
                            aria-label="Previous genre"
                            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                        >
                            <span className="material-symbols-outlined text-lg">chevron_left</span>
                        </button>
                        <button
                            onClick={() => exploreCardsSwiperRef.current?.slideNext()}
                            aria-label="Next genre"
                            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                        >
                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                    </div>
                </div>

                <Swiper
                    onSwiper={(swiper) => {
                        exploreCardsSwiperRef.current = swiper;
                    }}
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3, spaceBetween: 16 },
                        768: { slidesPerView: 4, spaceBetween: 18 },
                        1024: { slidesPerView: 5, spaceBetween: 20 },
                        1280: { slidesPerView: 6, spaceBetween: 20 }
                    }}
                    className="pb-4"
                >
                    {EXPLORE_GENRES.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <div
                                onClick={() => navigate(`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`)}
                                className="group relative overflow-hidden rounded-2xl p-5 cursor-pointer border border-white/10 bg-white/3 backdrop-blur-xl transition-all duration-300 hover:scale-104 hover:border-white/25 hover:bg-white/6 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between aspect-square"
                            >
                                {/* Liquid Ambient Glow */}
                                {/* <div className={`absolute -right-1/4 -bottom-1/4 h-2/3 w-2/3 rounded-full bg-linear-to-br ${genre.gradient} blur-[30px] opacity-25 group-hover:opacity-75 group-hover:scale-125 transition-all duration-500`} />

                                <div className="self-start transform group-hover:scale-110 group-hover:-translate-y-1 transition duration-300 relative z-10 w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-xl">{genre.icon}</span>
                                </div>

                                <div className="z-10 mt-auto">
                                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-white drop-shadow-md">
                                        {genre.name}
                                    </h3>
                                    <p className="text-[11px] font-semibold text-gray-400 group-hover:text-violet-300 transition duration-300 mt-1 flex items-center gap-1">
                                        {genre.count}
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section> */}


            {/* 4. TRAILER VIDEO MODAL */}
            {activeTrailerKey && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 animate-fadeIn"
                    onClick={() => setActiveTrailerKey(null)}
                >
                    <div
                        className="w-full max-w-4xl bg-[#14151c] rounded-2xl border border-white/15 overflow-hidden shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <h3 className="font-display font-bold text-base text-white">
                                {activeTrailerTitle} — Official Trailer
                            </h3>
                            <button
                                onClick={() => setActiveTrailerKey(null)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${activeTrailerKey}?autoplay=1`}
                                title={`${activeTrailerTitle} Trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;