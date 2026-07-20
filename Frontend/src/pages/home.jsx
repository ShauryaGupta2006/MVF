import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function Home() {
    const [movies, setMovies] = useState([]);
    const [upmovies, setUpmovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/trending`);
                const data = await res.json();
                if (data.success) {
                    setMovies(data.data.results);
                }
            } catch (err) {
                console.error(err);
            }
        };

        const fetchUpmovies = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test`);
                const data = await res.json();
                if (data.success) {
                    setUpmovies(data.data.results);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
        fetchUpmovies();
    }, []);



    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-12 sm:px-8">
            {/* Modernized Heading Section */}
            <div className="relative mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-l-4 border-red-500 pl-4">
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

                                    <button className="mt-3 w-full rounded-xl bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all duration-300 shadow-sm">
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

                                    <button className="mt-3 w-full rounded-xl bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 py-2 text-xs font-bold text-zinc-300 hover:text-white transition-all duration-300 shadow-sm">
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
    );
}

export default Home;