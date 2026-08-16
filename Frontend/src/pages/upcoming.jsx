import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen";

const FALLBACK_UPCOMING = [
    {
        id: 201,
        title: "Chronos Protocol",
        overview: "A temporal archivist travels to 1920s Paris to prevent the unraveling of quantum history.",
        poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        release_date: "Oct 15, 2026",
        status_tag: "Dropping Soon",
        genre_name: "Sci-Fi Thriller"
    },
    {
        id: 202,
        title: "Whispers in the Mist",
        overview: "An isolated lighthouse keeper discovers ancient maritime symbols etched into deep coastal ice.",
        poster_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
        release_date: "Nov 04, 2026",
        status_tag: "In Production",
        genre_name: "Gothic Mystery"
    },
    {
        id: 203,
        title: "Symphony of Shadows",
        overview: "In 18th century Vienna, an avant-garde composer accidentally invokes forgotten spectral forces.",
        poster_path: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
        release_date: "Dec 01, 2026",
        status_tag: "Festival Debut",
        genre_name: "Period Drama"
    },
    {
        id: 204,
        title: "Hyperion Station",
        overview: "Humanity's first orbital colony faces catastrophic atmospheric collapse during solar maximum.",
        poster_path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
        release_date: "Jan 20, 2027",
        status_tag: "Teaser Released",
        genre_name: "Sci-Fi Epic"
    }
];

function UpcomingMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUpcoming = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upcoming`);
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.data?.results?.length > 0) {
                    setMovies(data.data.results);
                    setLoading(false);
                    return;
                }
            }
            setMovies(FALLBACK_UPCOMING);
        } catch {
            setMovies(FALLBACK_UPCOMING);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpcoming();
    }, []);

    if (loading) {
        return <LoadingScreen message="Loading Upcoming Box Office Premieres..." />;
    }

    return (
        <div className="min-h-screen bg-background text-on-background px-6 sm:px-12 py-28 max-w-360 mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4">
                <div>
                    <span className="font-body text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                        MVF Release Calendar
                    </span>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary mt-1">
                        Upcoming Drops
                    </h1>
                </div>
                <p className="font-body text-sm text-on-surface-variant max-w-md">
                    First-look trailers, release date calendars, and theatrical premiere countdowns.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {movies.map((movie) => {
                    const posterUrl = movie.poster_path
                        ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
                        : FALLBACK_UPCOMING[0].poster_path;

                    return (
                        <div
                            key={movie.id}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                            className="group cursor-pointer bg-surface-container/40 rounded-xl p-4 border border-white/5 hover:border-white/20 card-hover-lift"
                        >
                            <div className="relative aspect-2/3 rounded-lg overflow-hidden cinematic-glow mb-4">
                                <img
                                    src={posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-white border border-white/10 uppercase tracking-wider">
                                    {movie.release_date || "2026"}
                                </div>
                                {movie.status_tag && (
                                    <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/30">
                                        {movie.status_tag}
                                    </div>
                                )}
                            </div>

                            <span className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant">
                                {movie.genre_name || "Premiere"}
                            </span>
                            <h3 className="font-display font-semibold text-lg text-primary group-hover:text-white transition-colors truncate mt-1">
                                {movie.title}
                            </h3>
                            <p className="font-body text-xs text-on-surface-variant line-clamp-2 mt-2 leading-relaxed">
                                {movie.overview}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UpcomingMovies;