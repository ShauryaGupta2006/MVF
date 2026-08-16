function ReviewsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const reviews = [
    {
      id: 1,
      movieTitle: "Neon Horizon",
      reviewer: "Elena Rostova",
      role: "Senior Film Critic, Cinéaste",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwMu2TzzKtq5kC3CNOwyBXjBHAgVca-h083I_KeKizlPcaoJ2czLOt5Nhx7GXoVpyuXlMwQd_hKhzGBB1zCUF2av0dPzVdfOvj1ObZtIYwH9bL3qnv-MiH6lbtESDbII9b_52j8tznqJf4CaXu8ooADGPhubLs8WYJzv9VnHTWUnGXsY8a3XCvp6kK6HwsMtrHGzeNPTb-0mNJ0L5i72ZjAinTk0XIWRON7DnGRtkQ09P2ZNX_Jz-f",
      rating: 4.9,
      date: "August 14, 2026",
      quote: "A staggering masterpiece of modern sci-fi noir. The atmospheric world-building and rain-drenched lighting set a new benchmark for visual storytelling.",
    },
    {
      id: 2,
      movieTitle: "Midnight Broadcast",
      reviewer: "Marcus Vance",
      role: "Editorial Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 4.8,
      date: "August 10, 2026",
      quote: "Brilliant performance paired with immaculate black-and-white cinematography. The tension built through sound design alone is masterclass.",
    },
    {
      id: 3,
      movieTitle: "The Crimson Void",
      reviewer: "Sophia Chen",
      role: "Feature Contributor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      rating: 4.7,
      date: "August 02, 2026",
      quote: "Unforgiving, psychological horror that lingers long after the credits roll. Minimalist framing executed to absolute perfection.",
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-surface-container border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col max-h-[85vh] shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">rate_review</span>
            <div>
              <h2 className="font-display text-2xl font-bold text-primary">Cinéaste Reviews</h2>
              <p className="text-xs text-on-surface-variant">Editorial insights & critical acclaim</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* List of Reviews */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 hide-scrollbar">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-5 rounded-xl bg-surface-container-low border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.reviewer}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="font-body font-semibold text-white text-sm">{rev.reviewer}</h4>
                    <p className="text-[11px] text-on-surface-variant">{rev.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs font-semibold text-tertiary-fixed">
                  <span className="material-symbols-outlined text-[14px] filled">star</span>
                  {rev.rating} / 5.0
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-white/50">{rev.movieTitle}</span>
                <p className="font-display italic text-sm sm:text-base text-on-surface leading-relaxed mt-1">
                  "{rev.quote}"
                </p>
              </div>

              <div className="text-[11px] text-on-surface-variant text-right">
                {rev.date}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-white/10 mt-4 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-white/10 text-white font-medium text-xs hover:bg-white/20 transition-all active:scale-95 cursor-pointer"
          >
            Close Editorial Reviews
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewsModal;
