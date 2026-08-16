import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

const MOCK_DETAILS = {
    101: {
        id: 101,
        title: "Neon Horizon",
        tagline: "Memories are currency. Silence is fatal.",
        overview: "In a sprawling megalopolis where memories are currency, a rogue archivist uncovers a conspiracy that threatens to erase the city's past entirely. A visually stunning journey through the neon-drenched underbelly of tomorrow.",
        backdrop_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZvaRR5wzv1dCyHZ88iWaSlJTFbPmoe804z-j7J5_Kn4-taIVaId4Y0wgjsua1BzPg0ZmcUBLRM_4FUx4EtayhkAEDmgVzEQCEeSC1GETWKwBpiwQAzf042BDdjyVe4CpMeNFCvhuDdgEeJGdD-FwWfPG17_1bUlXGUMm4Lm3LT2a-PdPU5M3IVWyC7GhrOzGUCdaA7-DoaDXUTj8D92NHQfpoaDfABb1xK_07SiTYMexcatRmjaT_",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZvaRR5wzv1dCyHZ88iWaSlJTFbPmoe804z-j7J5_Kn4-taIVaId4Y0wgjsua1BzPg0ZmcUBLRM_4FUx4EtayhkAEDmgVzEQCEeSC1GETWKwBpiwQAzf042BDdjyVe4CpMeNFCvhuDdgEeJGdD-FwWfPG17_1bUlXGUMm4Lm3LT2a-PdPU5M3IVWyC7GhrOzGUCdaA7-DoaDXUTj8D92NHQfpoaDfABb1xK_07SiTYMexcatRmjaT_",
        vote_average: 4.8,
        release_date: "2024-03-15",
        runtime: 134,
        genres: [{ id: 1, name: "Sci-Fi" }, { id: 2, name: "Thriller" }],
        director: "Denis Villeneuve",
        cast: [
            { name: "Timothée Chalamet", character: "Paul Atreides / Archivist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
            { name: "Zendaya", character: "Chani / Rebel Navigator", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
            { name: "Florence Pugh", character: "Princess Irulan", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" },
            { name: "Austin Butler", character: "Feyd-Rautha", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
            { name: "Javier Bardem", character: "Stilgar", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
            { name: "Rebecca Ferguson", character: "Lady Jessica", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" }
        ],
        trailer_key: "L61p2uyiMSo"
    },
    102: {
        id: 102,
        title: "The Crimson Void",
        tagline: "Into the shadow of the abyss.",
        overview: "A minimalist, high-tension psychological thriller set aboard a deep space research outpost trapped in the shadow of an uncharted cosmic singularity.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj3Dc3EGKUjecizNECPpcNxKrH-ruEKe8ZsNe6vU2fJV-5cWh4LlD0aBrJnOF96q-IsGd7tYf0UFE2o0vRbCVtzXO3rrEUeOkQXRfYpdVGiD7uikQwbhSdxa3Yb2M0yNDgL90B0HE46AD8eculRM7hwlYwjFgV3lLKPOx54WuG_HJJmsPmiy9_I41UL_Try642O5aLd6w0zzqgsh5rBAUSESMffuGJJoPo2P4Q-k1Pmd-KsWUtH8eY",
        backdrop_path: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
        vote_average: 8.9,
        release_date: "2024-05-20",
        runtime: 118,
        genres: [{ id: 2, name: "Thriller" }, { id: 3, name: "Horror" }],
        director: "Alex Garland",
        cast: [
            { name: "Natalie Portman", character: "Dr. Lena Vance", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" },
            { name: "Oscar Isaac", character: "Commander Kane", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
            { name: "Tessa Thompson", character: "Physicist Josie Radek", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
            { name: "Benedict Wong", character: "Lomax", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" }
        ],
        trailer_key: "8g18jFHCLXk"
    },
    103: {
        id: 103,
        title: "Midnight Broadcast",
        tagline: "The static knows your secret.",
        overview: "An elegant film noir drama capturing a lonely late-night radio host who begins receiving mysterious calls predicting events before they unfold.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuAunIZhNERCrd9QpK8BEPcaJNxwbmtXDHCJJUY_EFutqyJ7CSQis8BifosvaWff91lIGvdcTb2PcnlkHO-LBjofbA1UYTEQV60IwJAv3YWze8I-h61GAxWH3n6CHWK_G4e9_ZToc6DzGen_6rmRr12qXseENxsssM4BffJfkLMX37dqCL8EsjlQR_oMwB_APvL73DwEdS2uVIjoVMU54PdSaipa98HY60uwwreI12kJhNgPAA4_LoOJ",
        backdrop_path: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        vote_average: 9.2,
        release_date: "2024-02-10",
        runtime: 125,
        genres: [{ id: 4, name: "Drama" }, { id: 5, name: "Noir" }],
        director: "David Fincher",
        cast: [
            { name: "Willem Dafoe", character: "Arthur Pendelton / Radio Host", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
            { name: "Rooney Mara", character: "Clara Vance", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
            { name: "Michael Fassbender", character: "Inspector Thorne", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" }
        ],
        trailer_key: "Way9Dexny3w"
    }
};

function MovieDetail() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);

    const castRef = useRef(null);
    const navigate = useNavigate();

    const scrollCast = (direction) => {
        if (castRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            castRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const checkWatchlist = (mId) => {
        try {
            const list = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            setIsSaved(list.some((item) => String(item.id) === String(mId)));
        } catch {
            setIsSaved(false);
        }
    };

    const toggleWatchlist = () => {
        if (!movie) return;
        try {
            const list = JSON.parse(localStorage.getItem("cineaste_watchlist") || "[]");
            const exists = list.some((item) => String(item.id) === String(movie.id));
            let updated;
            if (exists) {
                updated = list.filter((item) => String(item.id) !== String(movie.id));
            } else {
                updated = [
                    ...list,
                    {
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        vote_average: movie.vote_average,
                        release_date: movie.release_date,
                        genre: movie.genres ? movie.genres.map(g => g.name).join(" • ") : "Cinema"
                    }
                ];
            }
            localStorage.setItem("cineaste_watchlist", JSON.stringify(updated));
            setIsSaved(!exists);
            window.dispatchEvent(new Event("watchlist_updated"));
        } catch (err) {
            console.error("Watchlist error", err);
        }
    };

    const fetchMovie = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movie/${movieId}`);
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.data) {
                    setMovie(data.data);
                    checkWatchlist(data.data.id);
                    setLoading(false);
                    return;
                }
            }
            const mock = MOCK_DETAILS[movieId] || MOCK_DETAILS[101];
            setMovie(mock);
            checkWatchlist(mock.id);
        } catch {
            const mock = MOCK_DETAILS[movieId] || MOCK_DETAILS[101];
            setMovie(mock);
            checkWatchlist(mock.id);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
        window.scrollTo(0, 0);
    }, [movieId]);

    if (loading) {
        return <LoadingScreen message="Fetching Cinéaste Film File..." />;
    }

    if (!movie) return null;

    const backdropUrl = movie.backdrop_path
        ? (movie.backdrop_path.startsWith("http") ? movie.backdrop_path : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`)
        : MOCK_DETAILS[101].backdrop_path;

    const posterUrl = movie.poster_path
        ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
        : MOCK_DETAILS[101].poster_path;

    const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "2024";
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "8.8";
    const runtimeStr = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "2h 14m";
    const genresList = movie.genres ? movie.genres.map(g => g.name).join(" • ") : "Sci-Fi Thriller";
    const trailerKey = movie.trailer_key || "L61p2uyiMSo";

    // Format Cast List
    let castList = [];
    if (movie.credits?.cast?.length > 0) {
        castList = movie.credits.cast.slice(0, 10).map((c) => ({
            name: c.name,
            character: c.character,
            profile_path: c.profile_path
        }));
    } else if (Array.isArray(movie.cast)) {
        castList = movie.cast.map(c => typeof c === 'string' ? { name: c, character: "Lead Cast" } : c);
    } else {
        castList = MOCK_DETAILS[101].cast;
    }

    return (
        <div className="min-h-screen bg-background text-on-background pt-16 pb-28">
            
            {/* Backdrop Banner */}
            <div className="relative w-full h-[55vh] min-h-105 overflow-hidden">
                <img
                    src={backdropUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover filter brightness-75 scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"></div>

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back
                </button>
            </div>

            {/* Main Content Details */}
            <div className="max-w-360 mx-auto px-6 md:px-16 -mt-40 relative z-10 space-y-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Poster */}
                    <div className="w-56 md:w-72 rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-surface-container card-hover-lift">
                        <img src={posterUrl} alt={movie.title} className="w-full h-auto object-cover" />
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 space-y-5 pt-2 md:pt-16">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded bg-white/10 border border-white/20 font-body text-xs font-semibold uppercase tracking-wider text-primary">
                                {genresList}
                            </span>
                            <span className="flex items-center gap-1 text-sm font-semibold text-blue-400">
                                <span className="material-symbols-outlined text-[16px] filled">star</span>
                                {rating}
                            </span>
                            <span className="text-xs text-on-surface-variant">• {releaseYear} • {runtimeStr}</span>
                        </div>

                        <h1 className="font-display font-bold text-4xl sm:text-6xl text-primary leading-tight">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="font-display italic text-base sm:text-lg text-on-surface-variant">
                                "{movie.tagline}"
                            </p>
                        )}

                        <p className="font-body text-base text-on-surface leading-relaxed max-w-3xl opacity-90">
                            {movie.overview}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="bg-primary text-on-primary font-body font-semibold text-sm px-8 py-3.5 rounded hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                            >
                                <span className="material-symbols-outlined filled text-xl text-blue-600">play_arrow</span>
                                Play Trailer
                            </button>

                            <button
                                onClick={toggleWatchlist}
                                className={`font-body font-semibold text-sm px-8 py-3.5 rounded transition-all flex items-center gap-2 cursor-pointer active:scale-95 glass-panel ${
                                    isSaved ? "bg-blue-600/30 border-blue-400/50 text-blue-200" : "border border-white/20 text-primary hover:bg-white/10"
                                }`}
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {isSaved ? "check" : "add"}
                                </span>
                                {isSaved ? "Saved in Watchlist" : "Add to Watchlist"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Director Highlight Card */}
                <div className="p-6 rounded-xl bg-surface-container/60 border border-white/5 flex items-center justify-between">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Director</h4>
                        <p className="font-display text-xl font-bold text-primary mt-1">{movie.director || "Denis Villeneuve"}</p>
                    </div>
                    <span className="px-3 py-1 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                        Filmmaker Spotlight
                    </span>
                </div>

                {/* Dedicated Featured Cast Section */}
                <div className="pt-6 border-t border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-400">
                                Performance Ensemble
                            </span>
                            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mt-0.5">
                                Featured Cast & Characters
                            </h2>
                        </div>

                        {/* Cast Carousel Navigator */}
                        <div className="flex items-center gap-1 bg-surface-container/80 p-1 rounded-lg border border-white/10">
                            <button
                                onClick={() => scrollCast("left")}
                                aria-label="Scroll Cast Left"
                                className="w-8 h-8 rounded hover:bg-blue-600 hover:text-white text-on-surface-variant flex items-center justify-center transition-all cursor-pointer"
                                title="Scroll Left"
                            >
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                            <button
                                onClick={() => scrollCast("right")}
                                aria-label="Scroll Cast Right"
                                className="w-8 h-8 rounded hover:bg-blue-600 hover:text-white text-on-surface-variant flex items-center justify-center transition-all cursor-pointer"
                                title="Scroll Right"
                            >
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    {/* Cast Cards Horizontal Carousel */}
                    <div ref={castRef} className="flex overflow-x-auto gap-5 pb-4 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                        {castList.map((actor, idx) => {
                            const profileImg = actor.profile_path
                                ? (actor.profile_path.startsWith("http") ? actor.profile_path : `https://image.tmdb.org/t/p/w300${actor.profile_path}`)
                                : (actor.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80");

                            return (
                                <div
                                    key={idx}
                                    className="flex-none w-40 sm:w-48 p-3 rounded-xl bg-surface-container/60 border border-white/5 hover:border-blue-500/30 card-hover-lift transition-all group cursor-pointer"
                                >
                                    <div className="aspect-4/5 w-full rounded-lg overflow-hidden mb-3 bg-surface-container border border-white/10">
                                        <img
                                            src={profileImg}
                                            alt={actor.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h4 className="font-body font-semibold text-sm text-primary truncate group-hover:text-blue-400 transition-colors">
                                        {actor.name}
                                    </h4>
                                    <p className="font-body text-xs text-on-surface-variant truncate mt-0.5">
                                        {actor.character || actor.role || "Lead Cast"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Trailer Modal */}
            {showTrailer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
                    <div className="w-full max-w-4xl bg-surface-container rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h3 className="font-display font-semibold text-lg text-primary">
                                {movie.title} — Trailer
                            </h3>
                            <button
                                onClick={() => setShowTrailer(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                                title={`${movie.title} Trailer`}
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
