
import React from "react";
import clsx from "clsx";

interface BackgroundCirclesProps {
    title?: string;
    description?: string;
    className?: string;
    variant?: keyof typeof COLOR_VARIANTS;
    children?: React.ReactNode;
}

const COLOR_VARIANTS = {
    primary: {
        border: [
            "border-emerald-500/60",
            "border-cyan-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-emerald-500/30",
    },
    secondary: {
        border: [
            "border-violet-500/60",
            "border-fuchsia-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-violet-500/30",
    },
    tertiary: {
        border: [
            "border-orange-500/60",
            "border-yellow-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-orange-500/30",
    },
    quaternary: {
        border: [
            "border-purple-500/60",
            "border-pink-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-purple-500/30",
    },
    quinary: {
        border: [
            "border-red-500/60",
            "border-rose-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-red-500/30",
    },
    senary: {
        border: [
            "border-blue-500/60",
            "border-sky-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-blue-500/30",
    },
    septenary: {
        border: [
            "border-gray-500/60",
            "border-gray-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-gray-500/30",
    },
    octonary: {
        border: [
            "border-red-500/60",
            "border-rose-400/50",
            "border-slate-600/30",
        ],
        gradient: "from-red-500/30",
    },
} as const;

export function BackgroundCircles({
    title,
    description,
    className,
    variant = "senary",
    children
}: BackgroundCirclesProps) {
    const variantStyles = COLOR_VARIANTS[variant];

    return (
        <div
            className={clsx(
                "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
                "bg-slate-50",
                className
            )}
        >
            <style>{`
                @keyframes grid-move {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 100% 100%; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse-scale {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                .animate-grid {
                    animation: grid-move 40s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                .animate-pulse-scale {
                    animation: pulse-scale 5s ease-in-out infinite;
                }
                .delay-1000 { animation-delay: 1s; }
                .delay-2000 { animation-delay: 2s; }
            `}</style>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] animate-grid">
                <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)] opacity-20" />
            </div>

            {/* Rotating Circles */}
            <div className="absolute h-[300px] w-[300px] md:h-[480px] md:w-[480px] pointer-events-none">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={clsx(
                            "absolute inset-0 rounded-full animate-spin-slow",
                            i === 1 && "delay-1000",
                            i === 2 && "delay-2000"
                        )}
                        style={{ animationDuration: `${10 + i * 5}s` }}
                    >
                        <div 
                            className={clsx(
                                "absolute inset-0 rounded-full border-2 bg-gradient-to-br to-transparent animate-pulse-scale",
                                variantStyles.border[i],
                                variantStyles.gradient
                            )}
                            style={{ animationDelay: `${i * 0.5}s` }}
                        >
                            <div
                                className={clsx(
                                    "absolute inset-0 rounded-full mix-blend-screen",
                                    `bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace(
                                        "from-",
                                        ""
                                    )}/10%,transparent_70%)]`
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Content */}
            <div className="relative z-10 w-full">
                {children || (
                     <div className="text-center animate-fade-in">
                        <h1
                            className={clsx(
                                "text-5xl font-bold tracking-tight md:text-7xl",
                                "bg-gradient-to-b from-slate-950 to-slate-700 bg-clip-text text-transparent",
                                "drop-shadow-[0_0_32px_rgba(94,234,212,0.4)]"
                            )}
                        >
                            {title}
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-slate-950">
                            {description}
                        </p>
                    </div>
                )}
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)] pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0F766E/10%,transparent_70%)] blur-[120px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2DD4BF/10%,transparent)] blur-[80px]" />
            </div>
        </div>
    );
}
