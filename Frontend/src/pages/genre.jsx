import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

const GENRE_NAME_MAP = {
    878: "Sci-Fi",
    28: "Action",
    53: "Thriller",
    18: "Drama",
    27: "Horror",
    80: "Crime",
    16: "Animation",
    99: "Documentary"
};

const GENRE_FALLBACKS = [
    {
        id: 101,
        title: "Neon Horizon",
        overview: "A rogue archivist uncovers a memory conspiracy in a dystopian neon metropolis.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZvaRR5wzv1dCyHZ88iWaSlJTFbPmoe804z-j7J5_Kn4-taIVaId4Y0wgjsua1BzPg0ZmcUBLRM_4FUx4EtayhkAEDmgVzEQCEeSC1GETWKwBpiwQAzf042BDdjyVe4CpMeNFCvhuDdgEeJGdD-FwWfPG17_1bUlXGUMm4Lm3LT2a-PdPU5M3IVWyC7GhrOzGUCdaA7-DoaDXUTj8D92NHQfpoaDfABb1xK_07SiTYMexcatRmjaT_",
        vote_average: 9.1,
        release_date: "2024-03-15",
        genre_ids: [878, 53],
        genre_name: "Sci-Fi"
    },
    {
        id: 102,
        title: "The Crimson Void",
        overview: "High-tension psychological thriller set aboard a deep space research outpost.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj3Dc3EGKUjecizNECPpcNxKrH-ruEKe8ZsNe6vU2fJV-5cWh4LlD0aBrJnOF96q-IsGd7tYf0UFE2o0vRbCVtzXO3rrEUeOkQXRfYpdVGiD7uikQwbhSdxa3Yb2M0yNDgL90B0HE46AD8eculRM7hwlYwjFgV3lLKPOx54WuG_HJJmsPmiy9_I41UL_Try642O5aLd6w0zzqgsh5rBAUSESMffuGJJoPo2P4Q-k1Pmd-KsWUtH8eY",
        vote_average: 8.9,
        release_date: "2024-05-20",
        genre_ids: [53, 27],
        genre_name: "Thriller"
    },
    {
        id: 103,
        title: "Midnight Broadcast",
        overview: "Film noir story of a radio host receiving mysterious caller predictions.",
        poster_path: "https://lh3.googleusercontent.com/aida-public/AB6AXuAunIZhNERCrd9QpK8BEPcaJNxwbmtXDHCJJUY_EFutqyJ7CSQis8BifosvaWff91lIGvdcTb2PcnlkHO-LBjofbA1UYTEQV60IwJAv3YWze8I-h61GAxWH3n6CHWK_G4e9_ZToc6DzGen_6rmRr12qXseENxsssM4BffJfkLMX37dqCL8EsjlQR_oMwB_APvL73DwEdS2uVIjoVMU54PdSaipa98HY60uwwreI12kJhNgPAA4_LoOJ",
        vote_average: 9.2,
        release_date: "2024-02-10",
        genre_ids: [18, 80],
        genre_name: "Drama"
    }
];

function Genre() {
    const { genreId } = useParams();
    const [searchParams] = useSearchParams();
    const rawGenreName = searchParams.get("name");
    const genreName = rawGenreName || GENRE_NAME_MAP[genreId] || "Curated Genre";
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchGenreMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/genre/${genreId}`, {
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
            setMovies(GENRE_FALLBACKS);
        } catch {
            setMovies(GENRE_FALLBACKS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenreMovies();
    }, [genreId]);

    if (loading) {
        return <LoadingScreen message={`Exploring ${genreName} Archive...`} />;
    }

    return (
        <div className="min-h-screen bg-[#0a0b0e] text-[#e5e2e1] px-4 sm:px-8 md:px-12 py-28 max-w-360 mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/8 pb-6 gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
                        Genre Category Showcase
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 tracking-tight">
                        {genreName} Cinema
                    </h1>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">
                    Showing {movies.length} curated {genreName} titles
                </p>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
                {movies.map((movie) => {
                    const posterUrl = movie.poster_path
                        ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                        : GENRE_FALLBACKS[0].poster_path;
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
                                {movie.release_date ? movie.release_date.split("-")[0] : "2024"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Genre;
