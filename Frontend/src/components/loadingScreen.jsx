import React from "react";

function LoadingScreen({ message = "Loading Box Office Forecasts..." }) {
    return (
        <div className="min-h-[85vh] w-full bg-surface text-white flex flex-col justify-center items-center relative overflow-hidden select-none px-6">
            
            {/* Ambient Hero Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>

            {/* Central Brand Loader */}
            <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
                
                <div className="mb-6">
                    <span className="text-4xl font-black tracking-tight text-white uppercase block">
                        <span className="text-primary">MVF</span> MovieForecasts
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface-variant block mt-1">
                        Cinematic Intelligence Engine
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-48 h-1 bg-surface-container-high rounded-full overflow-hidden relative mb-6">
                    <div className="h-full w-full bg-primary rounded-full animate-shimmer shadow-[0_0_15px_rgba(225,29,72,0.4)]"></div>
                </div>

                {/* Message */}
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    {message}
                </p>
            </div>
        </div>
    );
}

export default LoadingScreen;
