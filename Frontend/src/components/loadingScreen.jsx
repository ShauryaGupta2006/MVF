import React from "react";

function LoadingScreen({ message = "Loading Box Office Forecasts..." }) {
    return (
        <div className="min-h-[85vh] w-full bg-zinc-950 text-white flex flex-col items-center justify-center relative overflow-hidden select-none px-4">
            {/* Ambient Animated Glow Blobs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-600/15 blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '5s' }}></div>

            {/* Depth-of-field Floating Background Cards Preview */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-90 sm:scale-100">
                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl px-8">
                    <div className="h-64 rounded-2xl bg-gradient-to-b from-zinc-700 to-zinc-900 animate-float" style={{ animationDelay: '0s' }}></div>
                    <div className="h-80 rounded-2xl bg-gradient-to-b from-zinc-700 to-zinc-900 animate-float" style={{ animationDelay: '0.8s' }}></div>
                    <div className="h-64 rounded-2xl bg-gradient-to-b from-zinc-700 to-zinc-900 animate-float" style={{ animationDelay: '1.6s' }}></div>
                </div>
            </div>

            {/* Main Central Loader Unit */}
            <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">

                {/* Animated Film Reel & Camera Lens Spinner */}
                <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                    
                    {/* Outer Rotating Gradient Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 border-r-amber-500 border-b-purple-500 border-l-transparent animate-spin" style={{ animationDuration: '2s' }}></div>
                    
                    {/* Counter Rotating Inner Ring */}
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-500 border-l-red-500 animate-spin-reverse" style={{ animationDuration: '3s' }}></div>
                    
                    {/* Glowing Pulse Ring */}
                    <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping" style={{ animationDuration: '2.5s' }}></div>

                    {/* Central Glowing Icon Badge */}
                    <div className="relative w-16 h-16 rounded-2xl bg-zinc-900/90 border border-white/15 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)] group">
                        <svg className="w-8 h-8 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        
                        {/* Film Clapboard Detail overlay */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shadow-lg animate-bounce">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>
                        </div>
                    </div>
                </div>

                {/* Animated Headline Text */}
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-red-500 via-pink-500 to-amber-400 bg-clip-text text-transparent">
                        MVF CINEMATICS
                    </span>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-semibold tracking-wide uppercase mb-6 flex items-center gap-2">
                    <span>{message}</span>
                    <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                </p>

                {/* Sleek Progress Bar Indicator */}
                <div className="w-64 h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-white/5 relative">
                    <div className="h-full w-full bg-gradient-to-r from-red-600 via-pink-500 to-amber-400 rounded-full animate-shimmer"></div>
                </div>

                {/* Real-time Ticker Tag */}
                <div className="mt-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    FETCHING REAL-TIME BOX OFFICE DATA
                </div>

            </div>
        </div>
    );
}

export default LoadingScreen;
