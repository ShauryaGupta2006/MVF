import React from "react";
import { Link } from "react-router-dom";

/**
 * Professional MVF Brand Logo
 * - Blue Background container
 * - 'M' in Sky Blue (#38bdf8 / text-sky-300)
 * - 'V' in Solid Jet Black (#000000 / text-black)
 * - 'F' in Sky Blue (#38bdf8 / text-sky-300)
 */
export function LogoIcon({ className = "w-9 h-9 sm:w-10 sm:h-10", rounded = "rounded-xl" }) {
    return (
        <div
            className={`relative flex items-center justify-center select-none overflow-hidden shrink-0 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-900 border border-blue-400/35 shadow-md shadow-blue-600/25 group-hover:scale-105 group-hover:shadow-blue-500/35 group-hover:border-blue-400/60 transition-all duration-300 ${rounded} ${className}`}
        >
            {/* Ambient specular highlight */}
            <div className="absolute inset-0 bg-linear-to-t from-transparent via-transparent to-white/15 pointer-events-none" />

            {/* MVF Typography */}
            <div className="flex items-center font-display font-black tracking-tighter text-sm sm:text-base leading-none drop-shadow-sm">
                <span className="text-sky-300">M</span>
                <span className="text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] mx-[0.5px]">V</span>
                <span className="text-sky-300">F</span>
            </div>
        </div>
    );
}

export default function Logo({
    to = "/",
    showText = true,
    subtitle = "",
    size = "md", // 'sm' | 'md' | 'lg' | 'xl'
    className = "",
    asLink = true,
}) {
    const sizeClasses = {
        sm: {
            icon: "w-8 h-8",
            rounded: "rounded-lg",
            title: "text-base",
            sub: "text-[8px]",
        },
        md: {
            icon: "w-9 h-9 sm:w-10 sm:h-10",
            rounded: "rounded-xl",
            title: "text-lg sm:text-xl",
            sub: "text-[9px]",
        },
        lg: {
            icon: "w-12 h-12",
            rounded: "rounded-2xl",
            title: "text-xl sm:text-2xl",
            sub: "text-[10px]",
        },
        xl: {
            icon: "w-16 h-16",
            rounded: "rounded-2xl",
            title: "text-2xl sm:text-3xl",
            sub: "text-xs",
        },
    };

    const currentSize = sizeClasses[size] || sizeClasses.md;

    const content = (
        <div className={`flex items-center gap-3 group shrink-0 ${className}`}>
            <LogoIcon className={currentSize.icon} rounded={currentSize.rounded} />
            {showText && (
                <div className="flex flex-col text-left">
                    <span
                        className={`font-display font-bold ${currentSize.title} tracking-tight text-white group-hover:text-blue-300 transition-colors`}
                    >
                        MovieForecasts
                    </span>
                    {subtitle && (
                        <span
                            className={`font-semibold uppercase tracking-widest text-blue-400 -mt-1 ${currentSize.sub}`}
                        >
                            {subtitle}
                        </span>
                    )}
                </div>
            )}
        </div>
    );

    if (!asLink) {
        return content;
    }

    return (
        <Link to={to} className="inline-flex items-center">
            {content}
        </Link>
    );
}
