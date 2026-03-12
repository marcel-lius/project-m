'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useRef } from 'react';

import 'swiper/css';
import 'swiper/css/scrollbar';
import './styles.css';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";

/**
 * Carousel component that provides an interactive carousel/slider with custom animated navigation buttons.
 * 
 * The component uses Swiper for carousel functionality and GSAP for smooth button animations.
 * Navigation buttons follow the mouse cursor within their respective wrapper elements,
 * creating an interactive hover effect.
 * 
 * Features:
 * - Looped carousel with 9 slides
 * - Custom previous/next navigation buttons with mouse-tracking animations
 * - Smooth GSAP animations with power3 easing
 * - Scrollbar support for manual navigation
 * - Proper event listener cleanup on unmount
 * 
 * @component
 * @returns {JSX.Element} A carousel component with animated navigation controls
 * 
 * @example
 * return <Carousel />
 */
const Carousel = () => {
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const prevWrapperRef = useRef<HTMLDivElement>(null);
  const nextWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!prevButtonRef.current || !nextButtonRef.current) return;

    // Center previous button
    // gsap.to(prevButtonRef.current, { xPercent: -50, yPercent: -50 });
    let prevXTo = gsap.quickTo(prevButtonRef.current, "x", { duration: 0.6, ease: "power3" });
    let prevYTo = gsap.quickTo(prevButtonRef.current, "y", { duration: 0.6, ease: "power3" });

    // Center next button
    // gsap.to(nextButtonRef.current, { xPercent: -50, yPercent: -50 });
    let nextXTo = gsap.quickTo(nextButtonRef.current, "x", { duration: 0.6, ease: "power3" });
    let nextYTo = gsap.quickTo(nextButtonRef.current, "y", { duration: 0.6, ease: "power3" });

    // Previous button handlers
    const handlePrevMouseMove = (e: MouseEvent) => {
      if (!prevButtonRef.current) return;
      const rect = prevButtonRef.current.getBoundingClientRect();
      prevXTo(e.clientX - rect.left - 15);
      prevYTo(e.clientY - rect.top - 15);
    };

    const handlePrevEnter = () => {
      prevWrapperRef.current?.addEventListener("mousemove", handlePrevMouseMove);
    };

    const handlePrevLeave = () => {
      prevWrapperRef.current?.removeEventListener("mousemove", handlePrevMouseMove);
      prevXTo(0);
      prevYTo(0);
    };

    // Next button handlers
    const handleNextMouseMove = (e: MouseEvent) => {
      if (!nextButtonRef.current) return;
      const rect = nextButtonRef.current.getBoundingClientRect();
      nextXTo(e.clientX - rect.left - 15);
      nextYTo(e.clientY - rect.top - 15);
    };

    const handleNextEnter = () => {
      nextWrapperRef.current?.addEventListener("mousemove", handleNextMouseMove);
    };

    const handleNextLeave = () => {
      nextWrapperRef.current?.removeEventListener("mousemove", handleNextMouseMove);
      nextXTo(0);
      nextYTo(0);
    };

    // Attach listeners
    prevWrapperRef.current?.addEventListener("mouseenter", handlePrevEnter);
    prevWrapperRef.current?.addEventListener("mouseleave", handlePrevLeave);
    nextWrapperRef.current?.addEventListener("mouseenter", handleNextEnter);
    nextWrapperRef.current?.addEventListener("mouseleave", handleNextLeave);

    // Cleanup
    return () => {
      prevWrapperRef.current?.removeEventListener("mouseenter", handlePrevEnter);
      prevWrapperRef.current?.removeEventListener("mouseleave", handlePrevLeave);
      prevWrapperRef.current?.removeEventListener("mousemove", handlePrevMouseMove);
      nextWrapperRef.current?.removeEventListener("mouseenter", handleNextEnter);
      nextWrapperRef.current?.removeEventListener("mouseleave", handleNextLeave);
      nextWrapperRef.current?.removeEventListener("mousemove", handleNextMouseMove);
    };
  });
  return (
    <div className="carousel w-full">
        <Swiper 
          modules={[Scrollbar, Navigation]}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          scrollbar={{ draggable: true, enabled: true }}>
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <div id="button-wrapper-prev" ref={prevWrapperRef}>
              <div className="swiper-button-prev" ref={prevButtonRef}></div>
            </div>
            <div id="button-wrapper-next" ref={nextWrapperRef}>
              <div className="swiper-button-next" ref={nextButtonRef}></div>
            </div>
        </Swiper>
    </div>
  );
}
export default Carousel;
