import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Sparkles, Cpu } from "lucide-react";

const CINEMA_TIPS = [
    "Analyzing opening weekend theatrical velocity...",
    "Synchronizing TMDB real-time metadata & cast archives...",
    "Computing box office multipliers and worldwide projections...",
    "Calibrating MVF proprietary Hype Index scores...",
    "Gathering 4K cinematic backdrops & official trailer streams..."
];

// Ultra-premium Cinema Aperture & Optical Lens Loader
function CinematicLensLoader() {
    return (
        <div className="relative my-5 flex items-center justify-center w-28 h-28">
            {/* Background Holographic Pulse */}
            <div className="absolute inset-0 rounded-full bg-violet-600/15 blur-xl animate-pulse" />

            {/* Horizontal Anamorphic Lens Flare Streak */}
            <div className="absolute w-36 h-[1.5px] bg-linear-to-r from-transparent via-violet-400 to-transparent opacity-60 shadow-[0_0_12px_rgba(167,139,250,0.8)] pointer-events-none" />

            {/* Outer Precision Reticle Ring with Degree Marks */}
            <svg className="absolute w-28 h-28 animate-spin" style={{ animationDuration: '14s' }} viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.5"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="url(#violetGradient)"
                    strokeWidth="2"
                    strokeDasharray="25 65"
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient id="violetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#d946ef" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Counter-Spinning Segmented Shutter Ring */}
            <svg className="absolute w-22 h-22 animate-spin-reverse" style={{ animationDuration: '8s' }} viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(168, 85, 247, 0.35)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                />
            </svg>

            {/* Fast Orbiting Photonic Particle */}
            <div className="absolute w-24 h-24 animate-spin" style={{ animationDuration: '3s' }}>
                <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fde047] -translate-x-1/2" />
            </div>

            {/* Inner Precision Aperture Core */}
            <div className="relative w-14 h-14 rounded-full bg-[#0d0e14]/90 border border-white/20 shadow-[0_0_25px_rgba(139,92,246,0.35)] backdrop-blur-md flex items-center justify-center overflow-hidden">
                {/* Internal Glass Reflection Sweep */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                
                {/* Center Optical Sensor / Camera Focal Point */}
                <div className="relative flex items-center justify-center">
                    {/* Pulsing Core Diamond / Focus Ring */}
                    <div className="w-6 h-6 rounded-full border border-violet-400/60 flex items-center justify-center animate-ping opacity-40" style={{ animationDuration: '2s' }} />
                    <div className="absolute w-4 h-4 rounded-full bg-linear-to-tr from-violet-500 via-fuchsia-500 to-amber-400 shadow-[0_0_14px_rgba(217,70,239,0.9)] animate-pulse" />
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                </div>
            </div>
        </div>
    );
}

function LoadingScreen({ 
    message = "Loading Box Office Forecasts...",
    subtext = "Calibrating real-time theatrical data",
    showSkeleton = true 
}) {
    const [progress, setProgress] = useState(15);
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        // Smooth progressive simulation until data resolves
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 92) return prev;
                const increment = Math.random() * 14 + 6;
                return Math.min(prev + increment, 92);
            });
        }, 350);

        const tipInterval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % CINEMA_TIPS.length);
        }, 2200);

        return () => {
            clearInterval(progressInterval);
            clearInterval(tipInterval);
        };
    }, []);

    return (
        <div className="min-h-[82vh] w-full bg-[#0a0b0e] text-[#e5e2e1] flex flex-col justify-center items-center relative overflow-hidden select-none px-4 py-12">
            
            {/* Ambient Multi-Layer Cinematic Glows */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[140px] pointer-events-none animate-glow-pulse" />
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-fuchsia-600/8 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-amber-500/8 blur-[100px] pointer-events-none" />

            {/* Main Center Stage Card */}
            <div className="relative z-10 w-full max-w-md mx-auto">
                <Card className="border border-white/10 bg-[#121319]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                    
                    {/* Top Status Header */}
                    <div className="px-6 pt-6 pb-2 flex items-center justify-between border-b border-white/6">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                            </span>
                            <span className="text-[11px] font-mono tracking-wider uppercase text-gray-400">
                                MVF Engine Live
                            </span>
                        </div>

                        <Badge variant="brand" className="gap-1 px-2.5 py-0.5">
                            <Cpu className="w-3 h-3 text-violet-400 animate-spin" style={{ animationDuration: '4s' }} />
                            <span>Processing</span>
                        </Badge>
                    </div>

                    <CardContent className="p-6 flex flex-col items-center text-center">
                        
                        {/* High-End Anamorphic Optical Loader */}
                        <CinematicLensLoader />

                        {/* Title & Brand */}
                        <div className="space-y-1 mb-5">
                            <h2 className="font-display font-black text-2xl tracking-tight text-white flex items-center justify-center gap-1.5">
                                <span className="bg-linear-to-r from-violet-400 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
                                    MVF
                                </span>
                                <span>Cinema</span>
                            </h2>
                            <p className="text-xs font-semibold text-gray-200">
                                {message}
                            </p>
                        </div>

                        {/* Progress Bar & Status */}
                        <div className="w-full space-y-2 mb-4">
                            <Progress value={progress} className="h-1.5 bg-white/10" />
                            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                                <span>{subtext}</span>
                                <span className="text-violet-300 font-bold">{Math.round(progress)}%</span>
                            </div>
                        </div>

                        {/* Rotating Dynamic Film Tips */}
                        <div className="w-full min-h-10 px-3 py-2 rounded-xl bg-white/3 border border-white/6 flex items-center justify-center gap-2 text-center">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-bounce" style={{ animationDuration: '2s' }} />
                            <p className="text-[11px] text-gray-400 transition-opacity duration-300 animate-fadeIn">
                                {CINEMA_TIPS[tipIndex]}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Subtle Content Skeleton Preview */}
                {showSkeleton && (
                    <div className="mt-6 grid grid-cols-3 gap-3 opacity-30">
                        <Skeleton className="h-28 rounded-xl bg-white/5 border border-white/5" />
                        <Skeleton className="h-28 rounded-xl bg-white/5 border border-white/5" />
                        <Skeleton className="h-28 rounded-xl bg-white/5 border border-white/5" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoadingScreen;
