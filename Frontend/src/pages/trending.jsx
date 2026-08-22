import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

const FALLBACK_TRENDING = [
    {
        id: 101,
        title: "Neon Horizon",
        overview: "A rogue archivist uncovers a memory conspiracy in a dystopian neon metropolis.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZvaRR5wzv1dCyHZ88iWaSlJTFbPmoe804z-j7J5_Kn4-taIVaId4Y0wgjsua1BzPg0ZmcUBLRM_4FUx4EtayhkAEDmgVzEQCEeSC1GETWKwBpiwQAzf042BDdjyVe4CpMeNFCvhuDdgEeJGdD-FwWfPG17_1bUlXGUMm4Lm3LT2a-PdPU5M3IVWyC7GhrOzGUCdaA7-DoaDXUTj8D92NHQfpoaDfABb1xK_07SiTYMexcatRmjaT_",
        vote_average: 9.1,
        hype_score: "96%",
        release_date: "2024-03-15",
        genre_name: "Sci-Fi"
    },
    {
        id: 102,
        title: "The Crimson Void",
        overview: "High-tension psychological thriller set aboard a deep space research outpost.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj3Dc3EGKUjecizNECPpcNxKrH-ruEKe8ZsNe6vU2fJV-5cWh4LlD0aBrJnOF96q-IsGd7tYf0UFE2o0vRbCVtzXO3rrEUeOkQXRfYpdVGiD7uikQwbhSdxa3Yb2M0yNDgL90B0HE46AD8eculRM7hwlYwjFgV3lLKPOx54WuG_HJJmsPmiy9_I41UL_Try642O5aLd6w0zzqgsh5rBAUSESMffuGJJoPo2P4Q-k1Pmd-KsWUtH8eY",
        vote_average: 8.9,
        hype_score: "94%",
        release_date: "2024-05-20",
        genre_name: "Thriller"
    },
    {
        id: 103,
        title: "Midnight Broadcast",
        overview: "Film noir story of a radio host receiving mysterious caller predictions.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuAunIZhNERCrd9QpK8BEPcaJNxwbmtXDHCJJUY_EFutqyJ7CSQis8BifosvaWff91lIGvdcTb2PcnlkHO-LBjofbA1UYTEQV60IwJAv3YWze8I-h61GAxWH3n6CHWK_G4e9_ZToc6DzGen_6rmRr12qXseENxsssM4BffJfkLMX37dqCL8EsjlQR_oMwB_APvL73DwEdS2uVIjoVMU54PdSaipa98HY60uwwreI12kJhNgPAA4_LoOJ",
        vote_average: 9.2,
        hype_score: "98%",
        release_date: "2024-02-10",
        genre_name: "Noir"
    },
    {
        id: 104,
        title: "Echoes of the Estate",
        overview: "A gothic manor mysteriously shifts its layout every midnight.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwndbP8iVi7KokY6-_ppy3kdmJwjOMHeNxbaicFwjlAu3pd9jFYC2QSYdVKNpoPGDYzOQ48vwWbckmipaDhqQmh-MnbStY_mDV5aT4buTQnULUa6xBwCDfMH04N5o5mWkxMrcVHMWAXVYuV9RKZ5xAXsOfkCwZBrsZ_9-Ac7UXYwf7BHfAUnIq6_-K7l38BGc_CXAJUabjkD4Vsp7hQlAidOv9xM0HV12pN_0-AQdkNOnJdvnLfBh",
        vote_average: 7.8,
        hype_score: "88%",
        release_date: "2024-04-01",
        genre_name: "Mystery"
    },
    {
        id: 105,
        title: "Alleyway Saints",
        overview: "Detective battles against city corruption in a rainy metropolis.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkUWLqhiwTJDRiXyz8bVhq1tOePlHAHSMIfQVFN2b0FYoEw942UBwsiO58EDQiHHS5Y8IInr8GnZT_Jgz_fM9MZYLqBlmgOsd1da-l6GBRA0Cp_BsefkBHkXRyqTUDFR04_VNEV_B6WirIOZQw483Q0boooNn_o1HEnguCUdlfDfRaFWLPP1sJQVFZuIF6nh3zaONgh1VOwv5MEd0V9EmmVPiXc_m6goVEiS9fpnV1pZnzLTI19oPP",
        vote_average: 8.5,
        hype_score: "90%",
        release_date: "2024-01-28",
        genre_name: "Crime Action"
    }
];

function TrendingMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trendTab, setTrendTab] = useState("popular");
    const navigate = useNavigate();

    const fetchTrendingMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/trending`, {
                credentials: "include"
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.data?.results?.length > 0) {
                    setMovies(data.data.results);
                    setLoading(false);
                    return;
                }
            }
            setMovies(FALLBACK_TRENDING);
        } catch {
            setMovies(FALLBACK_TRENDING);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingMovies();
    }, []);

    const sortedMovies = [...movies].sort((a, b) => {
        if (trendTab === "recent") {
            return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        }
        return (b.vote_average || 0) - (a.vote_average || 0);
    });

    if (loading) {
        return <LoadingScreen message="Fetching Real-Time Box Office Trends..." />;
    }

    return (
        <div className="min-h-screen bg-[#0a0b0e] text-[#e5e2e1] px-4 sm:px-8 md:px-12 py-28 max-w-360 mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/8 pb-6 gap-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
                        Live Box Office Intelligence
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 tracking-tight">
                        Trending Cinema
                    </h1>
                </div>

                {/* Popular vs Recently Added Toggle */}
                <div className="flex items-center bg-white/4 p-1 rounded-full border border-white/8 shrink-0 self-start md:self-auto backdrop-blur-md">
                    <button
                        onClick={() => setTrendTab("popular")}
                        className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                            trendTab === "popular"
                                ? "bg-white text-black font-bold shadow-md shadow-white/10"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Most Popular
                    </button>
                    <button
                        onClick={() => setTrendTab("recent")}
                        className={`px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                            trendTab === "recent"
                                ? "bg-white text-black font-bold shadow-md shadow-white/10"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Recently Released
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
                {sortedMovies.map((movie, index) => {
                    const posterUrl = movie.poster_path
                        ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                        : FALLBACK_TRENDING[0].poster_path;
                    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "8.5";

                    return (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 card-hover-lift bg-[#13141a] border border-white/8">
                                <img
                                    src={posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                                    loading="lazy"
                                />
                                
                                {/* Rank Tag */}
                                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold text-white border border-white/10">
                                    #{index + 1}
                                </div>

                                {/* Rating Badge */}
                                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px] text-amber-400 filled">star</span>
                                    <span className="text-[11px] font-bold text-white">{rating}</span>
                                </div>

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-white">play_circle</span>
                                </div>
                            </div>

                            <h3 className="font-semibold text-sm text-white truncate group-hover:text-violet-300 transition-colors">
                                {movie.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {movie.release_date ? movie.release_date.split("-")[0] : "2024"} • {movie.genre_name || "Feature"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TrendingMovies;