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
        vote_average: 4.8,
        hype_score: "92%",
        genre_name: "Sci-Fi Thriller",
        release_date: "2024-03-15",
        runtime: "2h 14m",
        trailer_key: "L61p2uyiMSo"
    },
    {
        id: 102,
        title: "The Crimson Void",
        overview: "A minimalist, high-tension psychological thriller set aboard a deep space research outpost trapped in the shadow of an uncharted cosmic singularity.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj3Dc3EGKUjecizNECPpcNxKrH-ruEKe8ZsNe6vU2fJV-5cWh4LlD0aBrJnOF96q-IsGd7tYf0UFE2o0vRbCVtzXO3rrEUeOkQXRfYpdVGiD7uikQwbhSdxa3Yb2M0yNDgL90B0HE46AD8eculRM7hwlYwjFgV3lLKPOx54WuG_HJJmsPmiy9_I41UL_Try642O5aLd6w0zzqgsh5rBAUSESMffuGJJoPo2P4Q-k1Pmd-KsWUtH8eY",
        vote_average: 8.9,
        hype_score: "96%",
        genre_name: "Psychological Thriller",
        release_date: "2024-05-20",
        runtime: "1h 58m",
        trailer_key: "8g18jFHCLXk"
    },
    {
        id: 103,
        title: "Midnight Broadcast",
        overview: "An elegant film noir drama capturing a lonely late-night radio host who begins receiving mysterious calls predicting events before they unfold.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuAunIZhNERCrd9QpK8BEPcaJNxwbmtXDHCJJUY_EFutqyJ7CSQis8BifosvaWff91lIGvdcTb2PcnlkHO-LBjofbA1UYTEQV60IwJAv3YWze8I-h61GAxWH3n6CHWK_G4e9_ZToc6DzGen_6rmRr12qXseENxsssM4BffJfkLMX37dqCL8EsjlQR_oMwB_APvL73DwEdS2uVIjoVMU54PdSaipa98HY60uwwreI12kJhNgPAA4_LoOJ",
        vote_average: 9.2,
        hype_score: "94%",
        genre_name: "Drama • Noir",
        release_date: "2024-02-10",
        runtime: "2h 05m",
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
        genre_name: "Sci-Fi"
    },
    {
        id: 202,
        title: "Whispers in the Mist",
        overview: "An isolated lighthouse keeper discovers ancient maritime symbols etched into deep coastal ice.",
        poster_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
        release_date: "Nov 04, 2026",
        genre_name: "Gothic Mystery"
    },
    {
        id: 203,
        title: "Symphony of Shadows",
        overview: "In 18th century Vienna, an avant-garde composer accidentally invokes forgotten spectral forces.",
        poster_path: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
        release_date: "Dec 01, 2026",
        genre_name: "Period Drama"
    }
];

const GENRE_CATEGORIES = [
    { id: "all", name: "All Genres" },
    { id: "878", name: "Sci-Fi" },
    { id: "28", name: "Action" },
    { id: "53", name: "Thriller" },
    { id: "18", name: "Drama" },
    { id: "27", name: "Horror" },
    { id: "80", name: "Crime" },
    { id: "16", name: "Animation" }
];

function Home() {
    const [movies, setMovies] = useState([]);
    const [status, setStatus] = useState("loading");
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [trendTab, setTrendTab] = useState("popular"); // "popular" | "recent"
    const [watchlist, setWatchlist] = useState([]);
    const [activeTrailerKey, setActiveTrailerKey] = useState(null);
    const [trailerMovieTitle, setTrailerMovieTitle] = useState("");

    const carouselRef = useRef(null);
    const navigate = useNavigate();

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === "left" ? -380 : 380;
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
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/trending`);
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

    const heroRating = heroMovie.vote_average ? heroMovie.vote_average.toFixed(1) : "4.8";
    const heroYear = heroMovie.release_date ? heroMovie.release_date.split("-")[0] : "2024";
    const heroGenre = heroMovie.genre_name || "Sci-Fi Thriller";
    const heroRuntime = heroMovie.runtime || "2h 14m";
    const heroHype = heroMovie.hype_score || "92%";

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

    // Sorting by trendTab (Popular vs Recently Added)
    const sortedMovies = [...movies].sort((a, b) => {
        if (trendTab === "recent") {
            return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        }
        return (b.vote_average || 0) - (a.vote_average || 0);
    });

    if (status === "loading") {
        return <LoadingScreen message="Initializing MovieForecasts Engine..." />;
    }

    return (
        <div className="min-h-screen bg-background text-on-background pt-20 pb-32">
            
            {/* 1. Cinematic Hero Section with 92% Hype Score */}
            <section className="max-w-360 mx-auto px-6 md:px-16 pt-4 pb-12">
                <div className="relative w-full h-[70vh] min-h-145 rounded-xl overflow-hidden cinematic-glow cursor-pointer group border border-white/10 shadow-2xl">
                    
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: `url('${heroBackdrop}')` }}
                    ></div>

                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 flex flex-col gap-5 z-10">
                        {/* Hype Score Pill */}
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-300 font-body text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                {heroHype} Hype Score
                            </span>

                            <span className="px-3 py-1 border border-white/20 rounded font-body text-xs font-semibold text-primary bg-black/50 backdrop-blur-md uppercase tracking-wider">
                                {heroGenre}
                            </span>
                            <span className="font-body text-sm font-semibold text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px] text-blue-400 filled">star</span>
                                {heroRating}
                            </span>
                            <span className="font-body text-sm font-medium text-on-surface-variant">
                                • {heroYear} • {heroRuntime}
                            </span>
                        </div>
                        

                        <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-primary leading-tight drop-shadow-xl">
                            {heroMovie.title}
                        </h1>

                        <p className="font-body text-base md:text-lg text-on-surface line-clamp-3 max-w-2xl leading-relaxed opacity-90 drop-shadow-md">
                            {heroMovie.overview}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-3">
                            <button
                                onClick={() => openTrailer(heroMovie)}
                                className="bg-primary text-on-primary font-body font-semibold text-sm px-7 py-3.5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                            >
                                <span className="material-symbols-outlined filled text-xl text-blue-600">play_arrow</span>
                                Watch Now
                            </button>

                            <button
                                onClick={() => navigate(`/movie/${heroMovie.id}`)}
                                className="bg-surface-container/80 border border-white/20 text-white font-body font-semibold text-sm px-7 py-3.5 rounded hover:bg-white/10 hover:border-white/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer glass-panel"
                            >
                                <span className="material-symbols-outlined text-lg text-blue-400">info</span>
                                Read More
                            </button>

                            <button
                                onClick={(e) => toggleWatchlist(heroMovie, e)}
                                className={`font-body font-semibold text-sm px-7 py-3.5 rounded transition-all flex items-center gap-2 cursor-pointer active:scale-95 glass-panel ${
                                    watchlist.includes(heroMovie.id)
                                        ? "bg-blue-600/30 border-blue-400/50 text-blue-200"
                                        : "border border-white/20 text-primary hover:bg-white/10"
                                }`}
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {watchlist.includes(heroMovie.id) ? "check" : "add"}
                                </span>
                                {watchlist.includes(heroMovie.id) ? "In Watchlist" : "Watchlist"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Dynamic Genre Filter Pills Bar */}
            

            {/* 3. Trending Now (Popular vs Recently Added Toggles + Carousel Navigator Tools) */}
            <section className="max-w-360 mx-auto px-6 md:px-16 space-y-8 mb-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary">
                            Trending Now
                        </h2>
                        <p className="font-body text-xs text-on-surface-variant mt-1">
                            Real-time box office momentum & hype discovery
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {/* Carousel Arrow Navigator Tools */}
                        <div className="flex items-center gap-1 bg-surface-container/80 p-1 rounded-lg border border-white/10">
                            <button
                                onClick={() => scrollCarousel("left")}
                                aria-label="Scroll Carousel Left"
                                className="w-8 h-8 rounded hover:bg-blue-600 hover:text-white text-on-surface-variant flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                                title="Scroll Left"
                            >
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                            <button
                                onClick={() => scrollCarousel("right")}
                                aria-label="Scroll Carousel Right"
                                className="w-8 h-8 rounded hover:bg-blue-600 hover:text-white text-on-surface-variant flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                                title="Scroll Right"
                            >
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>

                        {/* Dual View Tabs: Popular vs Recently Added */}
                        {/* <div className="flex items-center bg-surface-container/80 p-1 rounded-lg border border-white/10">
                            {/* <button
                                onClick={() => setTrendTab("popular")}
                                className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                    trendTab === "popular"
                                        ? "bg-blue-600 text-white font-bold shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                                        : "text-on-surface-variant hover:text-white"
                                }`}
                            >
                                Popular
                            </button> */}
                            {/* <button
                                onClick={() => setTrendTab("recent")}
                                className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                    trendTab === "recent"
                                        ? "bg-blue-600 text-white font-bold shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                                        : "text-on-surface-variant hover:text-white"
                                }`}
                            >
                                Recently Added
                            </button> */}
                        {/* </div> */}
                    </div>
                </div>

                {/* Poster Card Carousel with ref */}
                <div ref={carouselRef} className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                    {sortedMovies.map((movie) => {
                        const posterUrl = movie.poster_path
                            ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                            : MOCK_FEATURED_MOVIES[1].poster_path;
                        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "8.5";
                        const isSaved = watchlist.includes(movie.id);

                        return (
                            <div
                                key={movie.id}
                                className="flex-none w-48 md:w-64 group cursor-pointer"
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                                <div className="relative aspect-2/3 rounded-lg overflow-hidden cinematic-glow mb-4 card-hover-lift bg-surface-container border border-white/5">
                                    <img
                                        src={posterUrl}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    
                                    <div className="absolute top-3 right-3 glass-panel px-2.5 py-1 rounded flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px] text-tertiary-fixed filled">star</span>
                                        <span className="font-body text-xs font-semibold text-primary">{rating}</span>
                                    </div>

                                    <button
                                        onClick={(e) => toggleWatchlist(movie, e)}
                                        className={`absolute top-3 left-3 p-1.5 rounded-full glass-panel hover:scale-110 transition-transform ${
                                            isSaved ? "text-white bg-white/30" : "text-white/70 hover:text-white"
                                        }`}
                                        title={isSaved ? "Remove from watchlist" : "Add to watchlist"}
                                    >
                                        <span className="material-symbols-outlined text-sm">
                                            {isSaved ? "check" : "bookmark"}
                                        </span>
                                    </button>

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openTrailer(movie);
                                            }}
                                            className="material-symbols-outlined text-[48px] text-primary hover:scale-110 transition-transform cursor-pointer"
                                        >
                                            play_circle
                                        </span>
                                    </div>
                                </div>

                                <h3 className="font-body font-semibold text-sm md:text-base text-primary truncate group-hover:text-white transition-colors">
                                    {movie.title}
                                </h3>
                                <p className="font-body text-xs text-on-surface-variant mt-1">
                                    {movie.genre_name || (movie.release_date ? movie.release_date.split("-")[0] : "2024")}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 4. Upcoming Premieres Spotlight */}
            <section className="max-w-360 mx-auto px-6 md:px-16 space-y-8">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary">
                            Upcoming Drops
                        </h2>
                        <p className="font-body text-xs text-on-surface-variant mt-1">
                            Premiere calendar and release date previews
                        </p>
                    </div>
                    <Link
                        to="/upcoming"
                        className="font-body text-sm font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors"
                    >
                        View Calendar <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {MOCK_UPCOMING_PREMIERES.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/movie/${item.id}`)}
                            className="flex items-center gap-4 p-4 rounded-xl bg-surface-container/40 border border-white/5 hover:border-white/20 cursor-pointer card-hover-lift"
                        >
                            <img
                                src={item.poster_path}
                                alt={item.title}
                                className="w-20 h-28 object-cover rounded-lg shrink-0 border border-white/10"
                            />
                            <div>
                                <span className="px-2.5 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white uppercase tracking-wider inline-block mb-1">
                                    {item.release_date}
                                </span>
                                <h4 className="font-display font-semibold text-base text-primary truncate">
                                    {item.title}
                                </h4>
                                <p className="font-body text-xs text-on-surface-variant line-clamp-2 mt-1">
                                    {item.overview}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Trailer Video Modal */}
            {activeTrailerKey && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
                    <div className="w-full max-w-4xl bg-surface-container rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h3 className="font-display font-semibold text-lg text-primary">
                                {trailerMovieTitle} — Trailer
                            </h3>
                            <button
                                onClick={() => setActiveTrailerKey(null)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${activeTrailerKey}?autoplay=1`}
                                title={`${trailerMovieTitle} Trailer`}
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

export default Home;