'use client';

import { useRef } from 'react';
import React from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(SplitText, ScrollTrigger);
}

type SplitType = 'chars' | 'words' | 'lines';

interface SplitTextAnimProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    splitType?: SplitType;
    duration?: number;
    stagger?: number;
    from?: 'start' | 'end' | 'center' | 'edges' | 'random';
    triggerOnScroll?: boolean;
    animation?: 'fade-up' | 'fade-in' | 'reveal';
    play?: boolean;
}

const SplitTextAnim = ({
    children,
    as: Tag = 'div',
    className,
    splitType = 'chars',
    duration = 0.8,
    stagger = 0.03,
    from = 'start',
    triggerOnScroll = true,
    animation = 'fade-up',
    play,
    ...props
}: SplitTextAnimProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const split = SplitText.create(containerRef.current, {
            type: splitType,
        });

        const targets = split[splitType];

        const fromVars: gsap.TweenVars = {
            'fade-up': { y: 30, opacity: 0 },
            'fade-in': { opacity: 0 },
            'reveal': { y: '100%', opacity: 0 },
        }[animation];

        const toVars: gsap.TweenVars = {
            ...fromVars,
            y: 0,
            opacity: 1,
            duration,
            stagger: { each: stagger, from },
            ease: 'power3.out',
        };

        const isPaused = play !== undefined;

        if (triggerOnScroll && !isPaused) {
            gsap.fromTo(targets, fromVars, {
                ...toVars,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        } else {
            const tl = gsap.timeline({ paused: isPaused });
            tl.fromTo(targets, fromVars, toVars);
            tlRef.current = tl;
            if (!isPaused) tl.play();
        }

        return () => {
            split.revert();
        };
    }, { dependencies: [children, splitType, duration, stagger, from, triggerOnScroll, animation] });

    // Play/reverse based on the `play` prop
    React.useEffect(() => {
        if (play === undefined || !tlRef.current) return;
        if (play) {
            tlRef.current.play();
        } else {
            tlRef.current.reverse();
        }
    }, [play]);

    return (
        <Tag
            ref={containerRef as React.RefObject<never>}
            className={cn(animation === 'reveal' && 'overflow-hidden', className)}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default SplitTextAnim;
