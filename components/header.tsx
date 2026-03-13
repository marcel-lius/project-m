'use client'

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import Link from "./ui/link";
import { useContactDrawer } from "../context/contact-drawer-context";

const Header = () => {
    const pathname = usePathname();
    const { openDrawer } = useContactDrawer();
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
        <header className='header h-20 bg-linear-[144.02deg,var(--color-background)_4.56%,var(--color-onyx-800)_72.98%] flex items-center fixed left-0 top-0 right-0 z-50 transition-all duration-400 ease-in-out px-8'>
            <div className="flex items-center">
                <p className="font-mono text-3xl text-onyx-500 flex items-center">
                    Marcellius;
                    <span
                        className="ml-[-4px]"
                        style={{
                            display: 'inline-block',
                            borderBottom: '3px solid var(--color-onyx-600)',
                            width: '16px',
                            height: '34px',
                            verticalAlign: 'bottom',
                            animation: 'blink 1s steps(1, end) infinite'
                        }}
                    ></span>
                </p>
            </div>

            <nav className="ml-auto flex items-center gap-4 md:gap-12">
                <Link href="/" className="text-broken-white">
                    Home
                </Link>
                <Link href="/about" className="text-broken-white">
                    About
                </Link>
                <Link href="/portfolio" className="text-broken-white">
                    Portfolio
                </Link>
                <Link className="text-broken-white" onClick={openDrawer}>
                    Get in touch
                </Link>
            </nav>
        </header>
    );
}
export default Header;
