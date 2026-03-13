'use client'

import * as React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import SplitTextAnim from "@/components/ui/split-text"
import { Badge } from "./badge"
import { BadgeCheck } from "lucide-react"

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
    backgroundImage: string;
    title: string;
    subtitle?: string[];
    description?: string;
    url?: string;
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
    ({ className, backgroundImage, title, subtitle, description, url, ...props }, ref) => {
        const [isHovered, setIsHovered] = useState(false);
        const [isMobile, setIsMobile] = useState(false);

        useEffect(() => {
            if (typeof window === "undefined") return;

            const mediaQuery = window.matchMedia("(max-width: 767px)");
            const handleChange = (event: MediaQueryListEvent) => {
                setIsMobile(event.matches);
            };

            // Set initial
            setIsMobile(mediaQuery.matches);

            // Listen for changes
            mediaQuery.addEventListener("change", handleChange);

            return () => {
                mediaQuery.removeEventListener("change", handleChange);
            };
        }, []);

        const showContent = isMobile || isHovered;

        return (
            <div
                ref={ref}
                className={cn(
                    // Mobile: full-width, fixed aspect ratio; Desktop (md+): original fixed size
                    "group relative overflow-hidden cursor-pointer w-full max-w-sm mx-auto aspect-[3/4] md:max-w-none md:w-95 md:h-137.5 md:aspect-auto",
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            >
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {/* Background Image Container */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500 ease-in-out group-hover:scale-120 group-hover:blur-xs"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />

                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 z-10 bg-black/40 md:bg-black/10 transition-opacity duration-500 group-hover:bg-black/40" />

                    {/* Content Container */}
                    <div className="relative z-20 flex h-full flex-col justify-end p-4 md:p-6 text-white">
                        <div className="flex justify-center gap-1 flex-wrap">
                            {subtitle && subtitle.map((value, i)=> (
                                <Badge
                                    key={i}
                                    className={cn(
                                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 md:px-3 md:py-1 mb-2 md:mb-3 text-xs md:text-sm text-onyx-900 text-foreground font-semibold bg-gold-40 tracking-wider transition-all duration-500 self-center text-center",
                                        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                                    )}
                                >
                                    <BadgeCheck data-icon="inline-start" />
                                    {value}
                                </Badge>
                            ))}
                        </div>
                        <SplitTextAnim
                            as="h3"
                            splitType="words"
                            animation="fade-up"
                            duration={0.6}
                            stagger={0.05}
                            triggerOnScroll={false}
                            play={showContent}
                            className="mb-2 text-2xl md:text-3xl font-bold leading-tight"
                        >
                            {title}
                        </SplitTextAnim>
                        {description && (
                            <SplitTextAnim
                                as="p"
                                splitType="words"
                                animation="fade-up"
                                duration={0.5}
                                stagger={0.02}
                                triggerOnScroll={false}
                                play={showContent}
                                className="text-sm md:text-base text-white/90 line-clamp-3"
                            >
                                {description}
                            </SplitTextAnim>
                        )}
                    </div>
                </a>
            </div>
        )
    }
);

export default CardImage;
