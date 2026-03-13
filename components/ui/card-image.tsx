'use client'

import * as React from "react"
import { useState } from "react"
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

        return (
            <div
                ref={ref}
                className={cn(
                    "group relative overflow-hidden w-95 h-137.5 cursor-pointer",
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
                    <div className="absolute inset-0 z-10 bg-black/30 transition-opacity duration-500 group-hover:bg-black/20" />

                    {/* Content Container */}
                    <div className="relative z-20 flex h-full flex-col justify-end p-6 text-white">
                        <div className="flex justify-center gap-1 flex-wrap">
                            {subtitle && subtitle.map((value, i)=> (
                                <Badge key={i}
                                    className={cn(
                                        "inline-flex items-center gap-1 rounded-full px-3 py-1 mb-3 text-sm text-onyx-900 text-foreground font-semibold bg-gold-40 tracking-wider transition-all duration-500 self-center text-center",
                                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
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
                            play={isHovered}
                            className="mb-2 text-3xl font-bold leading-tight"
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
                                play={isHovered}
                                className="text-base text-white/90 line-clamp-3"
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
