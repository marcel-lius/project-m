'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import './styles.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: number;
  className?: string;
}

const ButtonIcon: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = 40,
  className = '',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!buttonRef.current) return;

    let xTo = gsap.quickTo(buttonRef.current, "x", { duration: 0.6, ease: "power3" });
    let yTo = gsap.quickTo(buttonRef.current, "y", { duration: 0.6, ease: "power3" });

    // Previous button handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      xTo(e.clientX - rect.left - 15);
      yTo(e.clientY - rect.top - 15);
    };

    const handleMouseEnter = () => {
      buttonWrapperRef.current?.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      buttonWrapperRef.current?.removeEventListener("mousemove", handleMouseMove);
      xTo(0);
      yTo(0);
    };

    // Attach listeners
    buttonWrapperRef.current?.addEventListener("mouseenter", handleMouseEnter);
    buttonWrapperRef.current?.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      buttonWrapperRef.current?.removeEventListener("mouseenter", handleMouseEnter);
      buttonWrapperRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      buttonWrapperRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <div ref={buttonWrapperRef} className={`cmp-btn-icon btn-wrapper w-[${size*2}px] h-[${size*2}px]`}>
        <button
            onClick={onClick}
            className={`btn-icon w-[${size}px] h-[${size}px] ${className}`}
            ref={buttonRef}
        >
            {children}
        </button>
    </div>
  )
};

export default ButtonIcon;
