import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function BirthdayWish({ targetUrl = "https://birthday-magic-rr5v.vercel.app/" }) {
    const [wishCount, setWishCount] = useState(() => {
        const saved = localStorage.getItem('papa_birthday_wishes');
        return saved ? parseInt(saved, 10) : 1;
    });
    const [redirectLink, setRedirectLink] = useState(() => {
        const savedLink = localStorage.getItem('papa_birthday_redirect_url');
        if (savedLink && savedLink !== "https://www.youtube.com" && savedLink !== "https://birthday-magic-rr5v.vercel.app/papa") {
            return savedLink;
        }
        return targetUrl;
    });
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [customWish, setCustomWish] = useState('');
    const [userWishes, setUserWishes] = useState([
        "Happy Birthday Papa! You're my true hero! ❤️",
        "Wishing you health, joy, and many more movie nights together! 🍿🎉",
        "To the greatest father ever: May your year ahead be full of blessings! ✨"
    ]);

    const playCelebrationSound = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            
            const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63, 261.63, 261.63, 293.66, 261.63, 392.00, 349.23];
            const durations = [0.25, 0.25, 0.5, 0.5, 0.5, 0.9, 0.25, 0.25, 0.5, 0.5, 0.5, 0.9];
            
            let startTime = ctx.currentTime + 0.05;
            
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);
                
                gain.gain.setValueAtTime(0.15, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + durations[i] - 0.05);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(startTime);
                osc.stop(startTime + durations[i]);
                
                startTime += durations[i];
            });
        } catch (e) {
            console.log('Audio playback prevented or unsupported', e);
        }
    };

    const triggerConfettiCelebration = () => {
        setIsCelebrating(true);
        const newCount = wishCount + 1;
        setWishCount(newCount);
        localStorage.setItem('papa_birthday_wishes', newCount.toString());

        // Confetti Burst 1
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f43f5e']
        });

        // Confetti Burst 2 - Fireworks style delayed
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ffd700', '#ff69b4', '#00ffff']
            });
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ffd700', '#ff69b4', '#00ffff']
            });
        }, 250);

        playCelebrationSound();

        setTimeout(() => {
            setIsCelebrating(false);
        }, 1500);
    };

    const handleAddWish = (e) => {
        e.preventDefault();
        if (customWish.trim()) {
            setUserWishes([customWish.trim(), ...userWishes]);
            setCustomWish('');
        }
        if (redirectLink) {
            localStorage.setItem('papa_birthday_redirect_url', redirectLink);
        }
        triggerConfettiCelebration();
        setShowModal(false);
    };

    const handleRedirect = () => {
        let finalUrl = redirectLink.trim();
        if (!/^https?:\/\//i.test(finalUrl)) {
            finalUrl = 'https://' + finalUrl;
        }
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="max-w-360 mx-auto px-4 sm:px-8 md:px-12 my-12">
            {/* Main Birthday Wish Container */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/40 via-purple-950/40 to-slate-900/90 border border-amber-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
                
                {/* Background Glow Accents */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left: Birthday Card Image Banner */}
                    <div className="lg:col-span-5 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                        <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40">
                            <img
                                src="/papa_birthday_banner.png"
                                alt="Happy Birthday Papa Banner"
                                className="w-full h-64 sm:h-72 lg:h-80 object-cover transform group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md self-start">
                                    <span className="animate-pulse">🎂</span> Birthday Celebration
                                </div>
                                <p className="text-white font-bold text-lg mt-2 font-display">
                                    To Our Dearest Papa ❤️
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Messages and Wishes */}
                    <div className="lg:col-span-7 space-y-5 text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                            <span>🎉</span> Honoring The Best Papa Ever
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-tight">
                            Happy Birthday, <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">Papa!</span> 🎂✨
                        </h2>

                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                            Today is all about celebrating you! Thank you for being our pillar of strength, wisdom, endless warmth, and our favorite movie buddy. May your day be filled with boundless joy, warm smiles, laughter, and everything that brings happiness to your heart.
                        </p>

                        {/* Memory Badges */}
                        <div className="flex flex-wrap gap-2.5 pt-1">
                            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-amber-300 flex items-center gap-1.5">
                                🌟 Super Role Model
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-purple-300 flex items-center gap-1.5">
                                🍿 #1 Movie Critic
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-pink-300 flex items-center gap-1.5">
                                💪 Endless Inspiration
                            </span>
                            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-emerald-300 flex items-center gap-1.5">
                                ❤️ Always Loved
                            </span>
                        </div>

                        {/* Live Wishes Feed Preview */}
                        <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span className="font-semibold text-gray-300">Birthday Wish Wall</span>
                                <span>{wishCount} Celebrations Sent</span>
                            </div>
                            <p className="text-xs text-amber-200/90 italic">
                                &quot;{userWishes[0]}&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section of Component with Action Buttons */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <h4 className="text-sm font-semibold text-white">Join the celebration!</h4>
                        <p className="text-xs text-gray-400">Click below to wish Papa or visit his special gift page.</p>
                    </div>

                    {/* Bottom Component Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                        {/* Redirect Button */}
                        <button
                            onClick={handleRedirect}
                            className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-blue-500/25 active:scale-95"
                            title={`Redirect to ${redirectLink}`}
                        >
                            <span className="material-symbols-outlined text-base">open_in_new</span>
                            <span>Visit Special Link 🎁</span>
                        </button>

                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                            <span className="material-symbols-outlined text-base">edit_note</span>
                            Wish Settings
                        </button>

                        <button
                            onClick={triggerConfettiCelebration}
                            disabled={isCelebrating}
                            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                                isCelebrating
                                    ? 'bg-amber-600 scale-105 ring-4 ring-amber-400/50'
                                    : 'bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:via-pink-400 hover:to-purple-500 hover:shadow-amber-500/25 hover:shadow-xl'
                            }`}
                        >
                            <span className="text-base">🎉</span>
                            <span>{isCelebrating ? 'Sending Fireworks! 🎆' : 'Wish Papa Happy Birthday! ❤️'}</span>
                            <span className="px-2 py-0.5 rounded-full bg-black/30 text-[10px] font-bold text-amber-200">
                                {wishCount}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Wish & Redirect Settings Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
                    <div className="w-full max-w-md bg-[#161822] rounded-2xl border border-amber-500/40 p-6 shadow-2xl space-y-4 relative">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                🎂 Send Wish & Link Settings
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddWish} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                    Redirect URL (opens when clicking Special Link button):
                                </label>
                                <input
                                    type="text"
                                    value={redirectLink}
                                    onChange={(e) => setRedirectLink(e.target.value)}
                                    placeholder="https://example.com/special-gift"
                                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 transition mb-3"
                                />

                                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                                    Your Birthday Message for Papa:
                                </label>
                                <textarea
                                    value={customWish}
                                    onChange={(e) => setCustomWish(e.target.value)}
                                    placeholder="Write something heartwarming for Papa..."
                                    rows={3}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400 transition"
                                />
                            </div>

                            <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                                    Recent Wishes:
                                </span>
                                {userWishes.map((w, idx) => (
                                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                                        &quot;{w}&quot;
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-xs font-bold text-white hover:brightness-110 shadow-md"
                                >
                                    Save & Celebrate 🎉
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
