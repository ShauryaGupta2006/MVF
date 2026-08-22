import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

const MOCK_FEATURED_MOVIES = [
    {
        id: 101,
        title: "Neon Horizon",
        overview: "In a sprawling megalopolis where memories are currency, a rogue archivist uncovers a conspiracy that threatens to erase the city's past entirely. A visually stunning journey through the neon-drenched underbelly of tomorrow.",
        backdrop_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZvaRR5wzv1dCyHZ88iWaSlJTFbPmoe804z-j7J5_Kn4-taIVaId4Y0wgjsua1BzPg0ZmcUBLRM_4FUx4EtayhkAEDmgVzEQCEeSC1GETWKwBpiwQAzf042BDdjyVe4CpMeNFCvhuDdgEeJGdD-FwWfPG17_1bUlXGUMm4Lm3LT2a-PdPU5M3IVWyC7GhrOzGUCdaA7-DoaDXUTj8D92NHQfpoaDfABb1xK_07SiTYMexcatRmjaT_",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZvaRR5wzv1dCyHZ88iWaSlJTFbPmoe804z-j7J5_Kn4-taIVaId4Y0wgjsua1BzPg0ZmcUBLRM_4FUx4EtayhkAEDmgVzEQCEeSC1GETWKwBpiwQAzf042BDdjyVe4CpMeNFCvhuDdgEeJGdD-FwWfPG17_1bUlXGUMm4Lm3LT2a-PdPU5M3IVWyC7GhrOzGUCdaA7-DoaDXUTj8D92NHQfpoaDfABb1xK_07SiTYMexcatRmjaT_",
        vote_average: 9.2,
        hype_score: "96%",
        genre_name: "Sci-Fi Thriller",
        release_date: "2024-03-15",
        runtime: "2h 14m",
        forecast_box_office: "$185M+",
        sentiment: "94% Positive",
        trailer_key: "L61p2uyiMSo"
    },
    {
        id: 102,
        title: "The Crimson Void",
        overview: "A minimalist, high-tension psychological thriller set aboard a deep space research outpost trapped in the shadow of an uncharted cosmic singularity.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj3Dc3EGKUjecizNECPpcNxKrH-ruEKe8ZsNe6vU2fJV-5cWh4LlD0aBrJnOF96q-IsGd7tYf0UFE2o0vRbCVtzXO3rrEUeOkQXRfYpdVGiD7uikQwbhSdxa3Yb2M0yNDgL90B0HE46AD8eculRM7hwlYwjFgV3lLKPOx54WuG_HJJmsPmiy9_I41UL_Try642O5aLd6w0zzqgsh5rBAUSESMffuGJJoPo2P4Q-k1Pmd-KsWUtH8eY",
        vote_average: 8.9,
        hype_score: "94%",
        genre_name: "Psychological Thriller",
        release_date: "2024-05-20",
        runtime: "1h 58m",
        forecast_box_office: "$120M+",
        sentiment: "91% Positive",
        trailer_key: "8g18jFHCLXk"
    },
    {
        id: 103,
        title: "Midnight Broadcast",
        overview: "An elegant film noir drama capturing a lonely late-night radio host who begins receiving mysterious calls predicting events before they unfold.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuAunIZhNERCrd9QpK8BEPcaJNxwbmtXDHCJJUY_EFutqyJ7CSQis8BifosvaWff91lIGvdcTb2PcnlkHO-LBjofbA1UYTEQV60IwJAv3YWze8I-h61GAxWH3n6CHWK_G4e9_ZToc6DzGen_6rmRr12qXseENxsssM4BffJfkLMX37dqCL8EsjlQR_oMwB_APvL73DwEdS2uVIjoVMU54PdSaipa98HY60uwwreI12kJhNgPAA4_LoOJ",
        vote_average: 9.4,
        hype_score: "98%",
        genre_name: "Drama • Noir",
        release_date: "2024-02-10",
        runtime: "2h 05m",
        forecast_box_office: "$95M+",
        sentiment: "96% Positive",
        trailer_key: "Way9Dexny3w"
    },
    {
        id: 104,
        title: "Echoes of the Estate",
        overview: "A surreal gothic fantasy following an architect tasked with restoring a grand European manor that mysteriously shifts layout every midnight.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwndbP8iVi7KokY6-_ppy3kdmJwjOMHeNxbaicFwjlAu3pd9jFYC2QSYdVKNpoPGDYzOQ48vwWbckmipaDhqQmh-MnbStY_mDV5aT4buTQnULUa6xBwCDfMH04N5o5mWkxMrcVHMWAXVYuV9RKZ5xAXsOfkCwZBrsZ_9-Ac7UXYwf7BHfAUnIq6_-K7l38BGc_CXAJUabjkD4Vsp7hQlAidOv9xM0HV12pN_0-AQdkNOnJdvnLfBh",
        vote_average: 7.8,
        hype_score: "88%",
        genre_name: "Mystery • Fantasy",
        release_date: "2024-04-01",
        runtime: "1h 50m",
        forecast_box_office: "$65M+",
        sentiment: "87% Positive",
        trailer_key: "YoHD9XEInc0"
    },
    {
        id: 105,
        title: "Alleyway Saints",
        overview: "A gritty action thriller focusing on a seasoned detective battling against corrupt city officials in a neon-drenched metropolis.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkUWLqhiwTJDRiXyz8bVhq1tOePlHAHSMIfQVFN2b0FYoEw942UBwsiO58EDQiHHS5Y8IInr8GnZT_Jgz_fM9MZYLqBlmgOsd1da-l6GBRA0Cp_BsefkBHkXRyqTUDFR04_VNEV_B6WirIOZQw483Q0boooNn_o1HEnguCUdlfDfRaFWLPP1sJQVFZuIF6nh3zaONgh1VOwv5MEd0V9EmmVPiXc_m6goVEiS9fpnV1pZnzLTI19oPP",
        vote_average: 8.5,
        hype_score: "90%",
        genre_name: "Crime Action",
        release_date: "2024-01-28",
        runtime: "2h 10m",
        forecast_box_office: "$140M+",
        sentiment: "89% Positive",
        trailer_key: "d9MyW72ELq0"
    }
];

const MOCK_UPCOMING_PREMIERES = [
    {
        id: 201,
        title: "Chronos Protocol",
        overview: "A temporal archivist travels to 1920s Paris to prevent the unraveling of quantum history.",
        poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        release_date: "Oct 15, 2026",
        genre_name: "Sci-Fi",
        hype: "95%"
    },
    {
        id: 202,
        title: "Whispers in the Mist",
        overview: "An isolated lighthouse keeper discovers ancient maritime symbols etched into deep coastal ice.",
        poster_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
        release_date: "Nov 04, 2026",
        genre_name: "Gothic Mystery",
        hype: "91%"
    },
    {
        id: 203,
        title: "Symphony of Shadows",
        overview: "In 18th century Vienna, an avant-garde composer invokes forgotten spectral forces.",
        poster_path: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
        release_date: "Dec 01, 2026",
        genre_name: "Period Drama",
        hype: "89%"
    }
];

const GENRE_CATEGORIES = [
    { id: "all", name: "All Genres", icon: "movie" },
    { id: "878", name: "Sci-Fi", icon: "rocket_launch" },
    { id: "28", name: "Action", icon: "local_fire_department" },
    { id: "53", name: "Thriller", icon: "bolt" },
    { id: "18", name: "Drama", icon: "theater_comedy" },
    { id: "27", name: "Horror", icon: "psychology" },
    { id: "80", name: "Crime", icon: "fingerprint" },
    { id: "16", name: "Animation", icon: "auto_awesome" }
];

function Home() {
    const [movies, setMovies] = useState([]);
    const [status, setStatus] = useState("loading");
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [watchlist, setWatchlist] = useState([]);
    const [activeTrailerKey, setActiveTrailerKey] = useState(null);
    const [trailerMovieTitle, setTrailerMovieTitle] = useState("");

    const carouselRef = useRef(null);
    const navigate = useNavigate();

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === "left" ? -340 : 340;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const syncWatchlist = () => {
        try {
            const list = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            setWatchlist(list.map((m) => m.id));
        } catch {
            setWatchlist([]);
        }
    };

    useEffect(() => {
        syncWatchlist();
        window.addEventListener("watchlist_updated", syncWatchlist);
        return () => window.removeEventListener("watchlist_updated", syncWatchlist);
    }, []);

    const fetchMovies = async () => {
        setStatus("loading");
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/trending`, {
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.data?.results?.length > 0) {
                    setMovies(data.data.results);
                    setStatus("success");
                    return;
                }
            }
            setMovies(MOCK_FEATURED_MOVIES);
            setStatus("success");
        } catch {
            setMovies(MOCK_FEATURED_MOVIES);
            setStatus("success");
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const heroMovie = movies.length > 0 ? movies[0] : MOCK_FEATURED_MOVIES[0];
    const heroBackdrop = heroMovie.backdrop_path
        ? (heroMovie.backdrop_path.startsWith("http") ? heroMovie.backdrop_path : `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`)
        : MOCK_FEATURED_MOVIES[0].backdrop_path;

    const heroRating = heroMovie.vote_average ? heroMovie.vote_average.toFixed(1) : "9.2";
    const heroYear = heroMovie.release_date ? heroMovie.release_date.split("-")[0] : "2024";
    const heroGenre = heroMovie.genre_name || "Sci-Fi Thriller";
    const heroRuntime = heroMovie.runtime || "2h 14m";
    const heroHype = heroMovie.hype_score || "96%";

    const toggleWatchlist = (movieObj, e) => {
        if (e) e.stopPropagation();
        try {
            const currentList = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            const exists = currentList.some((item) => item.id === movieObj.id);
            let updated;
            if (exists) {
                updated = currentList.filter((item) => item.id !== movieObj.id);
            } else {
                updated = [
                    ...currentList,
                    {
                        id: movieObj.id,
                        title: movieObj.title,
                        poster_path: movieObj.poster_path,
                        vote_average: movieObj.vote_average,
                        release_date: movieObj.release_date,
                        genre: movieObj.genre_name || "Cinema"
                    }
                ];
            }
            localStorage.setItem("cineaste_watchlist", JSON.stringify(updated));
            setWatchlist(updated.map((m) => m.id));
            window.dispatchEvent(new Event("watchlist_updated"));
        } catch (err) {
            console.error("Watchlist error", err);
        }
    };

    const openTrailer = (movieObj) => {
        const key = movieObj.trailer_key || "L61p2uyiMSo";
        setActiveTrailerKey(key);
        setTrailerMovieTitle(movieObj.title);
    };

    if (status === "loading") {
        return <LoadingScreen message="Initializing MovieForecasts Engine..." />;
    }

    return (
        <div className="min-h-screen bg-[#0a0b0e] text-[#e5e2e1] pt-20 pb-32">
            
            {/* 1. Cinematic Hero Spotlight */}
            <section className="max-w-360 mx-auto px-4 sm:px-8 md:px-12 pt-4 pb-10">
                <div className="relative w-full h-[72vh] min-h-150 rounded-2xl overflow-hidden group border border-white/8 shadow-2xl bg-[#111218]">
                    
                    {/* Background Backdrop with Parallax Scale */}
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-103"
                        style={{ backgroundImage: `url('${heroBackdrop}')` }}
                    />

                    {/* Gradient & Vignette Overlays */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0b0e] via-[#0a0b0e]/70 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-[#0a0b0e] via-[#0a0b0e]/60 to-transparent w-full md:w-3/4" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 p-6 sm:p-10 md:p-14 w-full md:w-3/4 flex flex-col gap-4 z-10">
                        
                        {/* Meta Badges */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            {/* AI Hype Score Badge */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold tracking-wide backdrop-blur-md shadow-xs shadow-violet-500/20">
                                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                                {heroHype} Hype Index
                            </span>

                            {/* Genre Pill */}
                            <span className="px-3 py-1 rounded-full bg-white/8 border border-white/12 text-xs font-semibold text-gray-200 backdrop-blur-md">
                                {heroGenre}
                            </span>

                            {/* Quality Tag */}
                            <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                4K UHD • HDR
                            </span>

                            {/* Rating */}
                            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                                <span className="material-symbols-outlined text-sm filled text-amber-400">star</span>
                                {heroRating}
                            </span>

                            <span className="text-xs font-medium text-gray-400">
                                {heroYear} • {heroRuntime}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] drop-shadow-xl">
                            {heroMovie.title}
                        </h1>

                        {/* Overview */}
                        <p className="text-sm sm:text-base text-gray-300 line-clamp-3 max-w-2xl leading-relaxed opacity-90 drop-shadow-md">
                            {heroMovie.overview}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                onClick={() => openTrailer(heroMovie)}
                                className="bg-white text-black hover:bg-white/90 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-lg shadow-white/10 hover:shadow-white/20 active:scale-95 flex items-center gap-2 cursor-pointer font-sans"
                            >
                                <span className="material-symbols-outlined filled text-lg text-black">play_arrow</span>
                                Watch Trailer
                            </button>

                            <button
                                onClick={() => navigate(`/movie/${heroMovie.id}`)}
                                className="bg-white/8 hover:bg-white/14 border border-white/15 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-all active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-md"
                            >
                                <span className="material-symbols-outlined text-base text-violet-400">info</span>
                                View Details
                            </button>

                            <button
                                onClick={(e) => toggleWatchlist(heroMovie, e)}
                                className={`font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-all active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-md ${
                                    watchlist.includes(heroMovie.id)
                                        ? "bg-violet-600/30 border border-violet-400/50 text-violet-200"
                                        : "bg-white/4 border border-white/15 text-gray-200 hover:bg-white/8"
                                }`}
                            >
                                <span className="material-symbols-outlined text-base">
                                    {watchlist.includes(heroMovie.id) ? "check" : "bookmark_add"}
                                </span>
                                {watchlist.includes(heroMovie.id) ? "Saved in Watchlist" : "Watchlist"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Genre Categories Bar */}
            <section className="max-w-360 mx-auto px-4 sm:px-8 md:px-12 mb-10">
                <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
                    {GENRE_CATEGORIES.map((genre) => {
                        const isActive = selectedGenre === genre.id;
                        return (
                            <button
                                key={genre.id}
                                onClick={() => {
                                    setSelectedGenre(genre.id);
                                    if (genre.id !== "all") {
                                        navigate(`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`);
                                    }
                                }}
                                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                                    isActive
                                        ? "bg-white text-black shadow-md shadow-white/10 scale-100"
                                        : "bg-white/3 text-gray-400 hover:text-white hover:bg-white/7 border border-white/6"
                                }`}
                            >
                                <span className="material-symbols-outlined text-sm">{genre.icon}</span>
                                <span>{genre.name}</span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* 3. Trending Now Carousel */}
            <section className="max-w-360 mx-auto px-4 sm:px-8 md:px-12 space-y-6 mb-16">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Trending Cinema
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Real-time box office velocity, ratings & audience excitement
                        </p>
                    </div>

                    {/* Carousel Nav Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scrollCarousel("left")}
                            aria-label="Scroll left"
                            className="w-8 h-8 rounded-full bg-white/4 border border-white/8 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                        >
                            <span className="material-symbols-outlined text-base">chevron_left</span>
                        </button>
                        <button
                            onClick={() => scrollCarousel("right")}
                            aria-label="Scroll right"
                            className="w-8 h-8 rounded-full bg-white/4 border border-white/8 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                        >
                            <span className="material-symbols-outlined text-base">chevron_right</span>
                        </button>
                        <Link
                            to="/trending"
                            className="text-xs font-semibold text-violet-400 hover:text-violet-300 ml-2 hidden sm:flex items-center gap-1 transition-colors"
                        >
                            Explore All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* Poster Card Carousel */}
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto gap-5 pb-6 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
                >
                    {movies.map((movie) => {
                        const posterUrl = movie.poster_path
                            ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                            : MOCK_FEATURED_MOVIES[1].poster_path;
                        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "8.8";
                        const isSaved = watchlist.includes(movie.id);

                        return (
                            <div
                                key={movie.id}
                                className="flex-none w-44 sm:w-56 group cursor-pointer"
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                                <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 card-hover-lift bg-[#13141a] border border-white/8">
                                    <img
                                        src={posterUrl}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                                        loading="lazy"
                                    />

                                    {/* Star Rating Pill */}
                                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px] text-amber-400 filled">star</span>
                                        <span className="text-[11px] font-bold text-white">{rating}</span>
                                    </div>

                                    {/* Watchlist Quick Toggle */}
                                    <button
                                        onClick={(e) => toggleWatchlist(movie, e)}
                                        className={`absolute top-2.5 left-2.5 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${
                                            isSaved
                                                ? "bg-violet-600 text-white shadow-md shadow-violet-600/40"
                                                : "bg-black/50 text-gray-300 hover:text-white border border-white/10 hover:bg-black/70"
                                        }`}
                                        title={isSaved ? "Remove from watchlist" : "Add to watchlist"}
                                    >
                                        <span className="material-symbols-outlined text-xs">
                                            {isSaved ? "check" : "bookmark"}
                                        </span>
                                    </button>

                                    {/* Hover Trailer Play Trigger */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openTrailer(movie);
                                            }}
                                            className="w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-2xl filled text-black">play_arrow</span>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-semibold text-sm text-white truncate group-hover:text-violet-300 transition-colors">
                                    {movie.title}
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {movie.genre_name || (movie.release_date ? movie.release_date.split("-")[0] : "2024")}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 4. AI Movie Intelligence & Forecasting Cards */}
            <section className="max-w-360 mx-auto px-4 sm:px-8 md:px-12 space-y-6 mb-16">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        AI Box Office Forecasts & Analytics
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {MOCK_FEATURED_MOVIES.slice(0, 3).map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/movie/${item.id}`)}
                            className="p-5 rounded-2xl bg-[#111218] border border-white/7 hover:border-violet-500/30 transition-all card-hover-lift cursor-pointer space-y-4 relative overflow-hidden group"
                        >
                            {/* Subtle Ambient Backlight */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-violet-600/20 transition-all" />

                            <div className="flex items-center justify-between">
                                <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-bold">
                                    {item.genre_name}
                                </span>
                                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    {item.sentiment}
                                </span>
                            </div>

                            <div>
                                <h3 className="font-display font-bold text-lg text-white group-hover:text-violet-300 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                                    {item.overview}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-white/6 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Opening Forecast</span>
                                    <span className="text-base font-bold text-white tracking-tight">{item.forecast_box_office}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">Hype Confidence</span>
                                    <span className="text-base font-bold text-violet-400">{item.hype_score}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Upcoming Premieres Spotlight */}
            <section className="max-w-360 mx-auto px-4 sm:px-8 md:px-12 space-y-6">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Premiere Calendar
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Anticipated film releases and festival debut dates
                        </p>
                    </div>
                    <Link
                        to="/upcoming"
                        className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                    >
                        View Full Calendar <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {MOCK_UPCOMING_PREMIERES.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/movie/${item.id}`)}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-[#111218] border border-white/6 hover:border-white/20 transition-all cursor-pointer card-hover-lift"
                        >
                            <img
                                src={item.poster_path}
                                alt={item.title}
                                className="w-18 h-24 object-cover rounded-xl shrink-0 border border-white/10"
                            />
                            <div className="space-y-1">
                                <span className="px-2.5 py-0.5 rounded-full bg-white/8 text-[10px] font-bold text-gray-300 uppercase tracking-wider inline-block">
                                    {item.release_date}
                                </span>
                                <h4 className="font-display font-semibold text-sm text-white truncate">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-gray-400 line-clamp-2">
                                    {item.overview}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. Trailer Video Modal */}
            {activeTrailerKey && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 animate-fadeIn">
                    <div className="w-full max-w-4xl bg-[#14151c] rounded-2xl border border-white/15 overflow-hidden shadow-2xl relative">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <h3 className="font-display font-bold text-base text-white">
                                {trailerMovieTitle} — Official Trailer
                            </h3>
                            <button
                                onClick={() => setActiveTrailerKey(null)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${activeTrailerKey}?autoplay=1`}
                                title={`${trailerMovieTitle} Trailer`}
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