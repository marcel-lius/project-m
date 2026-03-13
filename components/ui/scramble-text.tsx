'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);
}

interface ScrambleTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    text: string;
    chars?: string;
    duration?: number;
    revealDelay?: number;
    triggerOnScroll?: boolean;
}

const ScrambleText = ({
    text,
    className,
    chars = "upperAndLowerCase",
    duration = 1.5,
    revealDelay = 0.2,
    triggerOnScroll = true,
    ...props
}: ScrambleTextProps) => {
    const textRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        const animConfig = {
            duration: duration,
            scrambleText: {
                text: text,
                chars: chars,
                revealDelay: revealDelay,
                speed: 0.5
            }
        };

        if (triggerOnScroll) {
            gsap.to(textRef.current, {
                ...animConfig,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        } else {
            gsap.to(textRef.current, animConfig);
        }
    }, { dependencies: [text, chars, duration, revealDelay, triggerOnScroll] });

    return (
        <span ref={textRef} className={cn("inline-block whitespace-pre-wrap", className)} {...props}>
            {/* Initial empty state or fallback can be placed here, GSAP will overwrite it */}
        </span>
    );
};

export default ScrambleText;
