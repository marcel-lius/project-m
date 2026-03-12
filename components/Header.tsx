'use client'

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

const Header = () => {
    const pathname = usePathname();
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const showAnim = gsap.from('.header', {
            yPercent: -100,
            paused: true,
            duration: 0.2,
        }).progress(1);
        ScrollTrigger.create({
            start: 'top top',
            end: 'max',
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });
    }, { dependencies: [pathname] });

    return (
        <header className='header flex items-center justify-center gap-4 md:gap-12'>
            <a href="/" className="">
                Home
            </a>
            <a href="/about" className="">
                About
            </a>
            <h1 className="logo">
                M
            </h1>
            <a href="/portfolio" className="">
                Portfolio
            </a>
            <a href="/contact" className="">
                Contact
            </a>
        </header>
    );
}
export default Header;
