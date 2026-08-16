import { useNavigate } from "react-router-dom";

function WatchlistModal({ isOpen, onClose, watchlistMovies, onRemoveFromWatchlist }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-md bg-surface-container-low border-l border-white/10 h-full p-6 flex flex-col shadow-2xl overflow-hidden">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">bookmark</span>
            <h2 className="font-display text-2xl font-semibold text-primary">Your Watchlist</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Watchlist Items */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 hide-scrollbar">
          {watchlistMovies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-3 text-white/20">bookmark_border</span>
              <p className="font-body text-base font-medium text-white/80">Your watchlist is empty.</p>
              <p className="text-xs text-on-surface-variant mt-1">Explore movies and click "+ Watchlist" to save them for later.</p>
            </div>
          ) : (
            watchlistMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate(`/movie/${movie.id}`);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 rounded-lg bg-surface-container/60 hover:bg-surface-container border border-white/5 hover:border-white/20 cursor-pointer transition-all duration-300 group"
              >
                <img
                  src={
                    movie.poster_path
                      ? (movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w200${movie.poster_path}`)
                      : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=80"
                  }
                  alt={movie.title}
                  className="w-16 h-22 object-cover rounded shadow group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-semibold text-primary text-sm truncate group-hover:text-white">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {movie.release_date ? movie.release_date.split("-")[0] : "2024"} • {movie.genre || "Cinema"}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-tertiary-fixed font-semibold">
                    <span className="material-symbols-outlined text-[14px] filled">star</span>
                    {movie.vote_average ? movie.vote_average.toFixed(1) : "8.5"}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWatchlist(movie.id);
                  }}
                  className="p-2 text-on-surface-variant hover:text-red-400 transition-colors"
                  title="Remove from Watchlist"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        {watchlistMovies.length > 0 && (
          <div className="border-t border-white/10 pt-4 mt-4 flex items-center justify-between text-xs text-on-surface-variant">
            <span>{watchlistMovies.length} Saved {watchlistMovies.length === 1 ? "Movie" : "Movies"}</span>
            <button
              onClick={() => {
                navigate("/trending");
                onClose();
              }}
              className="text-primary hover:underline font-semibold flex items-center gap-1"
            >
              Browse More <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchlistModal;
