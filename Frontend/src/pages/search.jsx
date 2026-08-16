import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SEARCH_SAMPLE_DATABASE = [
    {
        id: 101,
        title: "Neon Horizon",
        overview: "A rogue archivist uncovers a memory conspiracy in a dystopian neon metropolis.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZvaRR5wzv1dCyHZ88iWaSlJTFbPmoe804z-j7J5_Kn4-taIVaId4Y0wgjsua1BzPg0ZmcUBLRM_4FUx4EtayhkAEDmgVzEQCEeSC1GETWKwBpiwQAzf042BDdjyVe4CpMeNFCvhuDdgEeJGdD-FwWfPG17_1bUlXGUMm4Lm3LT2a-PdPU5M3IVWyC7GhrOzGUCdaA7-DoaDXUTj8D92NHQfpoaDfABb1xK_07SiTYMexcatRmjaT_",
        vote_average: 9.1,
        release_date: "2024-03-15",
        genre_name: "Sci-Fi Thriller"
    },
    {
        id: 102,
        title: "The Crimson Void",
        overview: "High-tension psychological thriller set aboard a deep space research outpost.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj3Dc3EGKUjecizNECPpcNxKrH-ruEKe8ZsNe6vU2fJV-5cWh4LlD0aBrJnOF96q-IsGd7tYf0UFE2o0vRbCVtzXO3rrEUeOkQXRfYpdVGiD7uikQwbhSdxa3Yb2M0yNDgL90B0HE46AD8eculRM7hwlYwjFgV3lLKPOx54WuG_HJJmsPmiy9_I41UL_Try642O5aLd6w0zzqgsh5rBAUSESMffuGJJoPo2P4Q-k1Pmd-KsWUtH8eY",
        vote_average: 8.9,
        release_date: "2024-05-20",
        genre_name: "Psychological Thriller"
    },
    {
        id: 103,
        title: "Midnight Broadcast",
        overview: "Film noir story of a radio host receiving mysterious caller predictions.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuAunIZhNERCrd9QpK8BEPcaJNxwbmtXDHCJJUY_EFutqyJ7CSQis8BifosvaWff91lIGvdcTb2PcnlkHO-LBjofbA1UYTEQV60IwJAv3YWze8I-h61GAxWH3n6CHWK_G4e9_ZToc6DzGen_6rmRr12qXseENxsssM4BffJfkLMX37dqCL8EsjlQR_oMwB_APvL73DwEdS2uVIjoVMU54PdSaipa98HY60uwwreI12kJhNgPAA4_LoOJ",
        vote_average: 9.2,
        release_date: "2024-02-10",
        genre_name: "Drama • Noir"
    },
    {
        id: 104,
        title: "Echoes of the Estate",
        overview: "A gothic manor mysteriously shifts its layout every midnight.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwndbP8iVi7KokY6-_ppy3kdmJwjOMHeNxbaicFwjlAu3pd9jFYC2QSYdVKNpoPGDYzOQ48vwWbckmipaDhqQmh-MnbStY_mDV5aT4buTQnULUa6xBwCDfMH04N5o5mWkxMrcVHMWAXVYuV9RKZ5xAXsOfkCwZBrsZ_9-Ac7UXYwf7BHfAUnIq6_-K7l38BGc_CXAJUabjkD4Vsp7hQlAidOv9xM0HV12pN_0-AQdkNOnJdvnLfBh",
        vote_average: 7.8,
        release_date: "2024-04-01",
        genre_name: "Mystery • Fantasy"
    },
    {
        id: 105,
        title: "Alleyway Saints",
        overview: "Detective battles against city corruption in a rainy metropolis.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkUWLqhiwTJDRiXyz8bVhq1tOePlHAHSMIfQVFN2b0FYoEw942UBwsiO58EDQiHHS5Y8IInr8GnZT_Jgz_fM9MZYLqBlmgOsd1da-l6GBRA0Cp_BsefkBHkXRyqTUDFR04_VNEV_B6WirIOZQw483Q0boooNn_o1HEnguCUdlfDfRaFWLPP1sJQVFZuIF6nh3zaONgh1VOwv5MEd0V9EmmVPiXc_m6goVEiS9fpnV1pZnzLTI19oPP",
        vote_average: 8.5,
        release_date: "2024-01-28",
        genre_name: "Crime Action"
    }
];

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchSearchResults = async () => {
        if (!query.trim()) {
            setMovies([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search?query=${encodeURIComponent(query)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.data?.results?.length > 0) {
                    setMovies(data.data.results);
                    setLoading(false);
                    return;
                }
            }
            // Fallback match
            const matched = SEARCH_SAMPLE_DATABASE.filter(m => 
                m.title.toLowerCase().includes(query.toLowerCase()) || 
                m.genre_name.toLowerCase().includes(query.toLowerCase()) ||
                m.overview.toLowerCase().includes(query.toLowerCase())
            );
            setMovies(matched.length > 0 ? matched : SEARCH_SAMPLE_DATABASE);
        } catch {
            const matched = SEARCH_SAMPLE_DATABASE.filter(m => 
                m.title.toLowerCase().includes(query.toLowerCase()) || 
                m.genre_name.toLowerCase().includes(query.toLowerCase())
            );
            setMovies(matched.length > 0 ? matched : SEARCH_SAMPLE_DATABASE);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, [query]);

    return (
        <div className="min-h-screen bg-background text-on-background px-6 sm:px-12 py-28 max-w-360 mx-auto">
            {/* Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4">
                <div>
                    <span className="font-body text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                        Library Search
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary mt-1">
                        {query ? `Results for "${query}"` : "Search Library"}
                    </h1>
                </div>
                {movies.length > 0 && (
                    <span className="bg-white/10 text-white border border-white/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                        {movies.length} {movies.length === 1 ? "Result" : "Results"}
                    </span>
                )}
            </div>

            {!query.trim() ? (
                <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
                    <span className="material-symbols-outlined text-6xl text-white/20 mb-4">search</span>
                    <p className="font-display text-xl font-bold text-white">Search Cinéaste Archives</p>
                    <p className="font-body text-sm text-on-surface-variant mt-1">Enter a film title, genre, or director to explore.</p>
                </div>
            ) : loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-surface-container rounded-lg aspect-2/3"></div>
                    ))}
                </div>
            ) : movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
                    <span className="material-symbols-outlined text-6xl text-white/20 mb-4">movie_off</span>
                    <p className="font-display text-xl font-bold text-white">No results found for "{query}"</p>
                    <p className="font-body text-sm text-on-surface-variant mt-1">Try another search term or check spelling.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                    {movies.map((movie) => {
                        const posterUrl = movie.poster_path
                            ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                            : SEARCH_SAMPLE_DATABASE[0].poster_path;

                        return (
                            <div
                                key={movie.id}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                                className="group cursor-pointer"
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
                                        <span className="font-body text-xs font-semibold text-primary">
                                            {movie.vote_average ? movie.vote_average.toFixed(1) : "8.5"}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="font-body font-semibold text-base text-primary truncate group-hover:text-white transition-colors">
                                    {movie.title}
                                </h3>
                                <p className="font-body text-xs text-on-surface-variant mt-1">
                                    {movie.release_date ? movie.release_date.split("-")[0] : "2024"} • {movie.genre_name || "Film"}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Search;
