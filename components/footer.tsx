'use client'

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import Link from "./ui/link";
import { FaLinkedinIn, FaGithub, FaHackerrank } from "react-icons/fa";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { useContactDrawer } from "../context/contact-drawer-context";

const down = 'M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z';
const center = 'M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z';

const Footer = () => {
    const { open, setOpen } = useContactDrawer();

    const techStackText = (
        <>
            Built with <span className="text-broken-white font-bold">Next.js</span>,{" "}
            <span className="text-broken-white font-bold">Tailwind CSS</span>, and{" "}
            <span className="text-broken-white font-bold">GSAP</span>, deployed with{" "}
            <span className="text-broken-white font-bold">Vercel</span>.<br />
            Using <span className="text-broken-white font-bold">Github Copilot</span> and{" "}
            <span className="text-broken-white font-bold">Cursor</span> assisstance.
        </>
    );

    const socialLinks = (
        <div className="flex gap-4">
            <a
                href="https://www.linkedin.com/in/marcellius-lim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-onyx-900 hover:opacity-70 transition-opacity"
            >
                <FaLinkedinIn size={20} />
            </a>
            <a
                href="https://github.com/marcel-lius"
                target="_blank"
                rel="noopener noreferrer"
                className="text-onyx-900 hover:opacity-70 transition-opacity"
            >
                <FaGithub size={20} />
            </a>
            <a
                href="https://www.hackerrank.com/profile/marcellius_lim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-onyx-900 hover:opacity-70 transition-opacity"
            >
                <FaHackerrank size={20} />
            </a>
        </div>
    );

    const drawerTrigger = (
        <DrawerTrigger asChild>
            <Link className="text-broken-white">
                Get in touch
            </Link>
        </DrawerTrigger>
    );

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
        ScrollTrigger.create({
            trigger: '.footer',
            start: 'top bottom',
            toggleActions: 'play pause resume reverse',
            onEnter: self => {
                const velocity = self.getVelocity();
                const variation = velocity / 10000;

                gsap.fromTo('#bouncy-path', {
                    morphSVG: down
                }, {
                    duration: 2,
                    morphSVG: center,
                    ease: `elastic.out(${1 + variation}, ${1 - variation})`,
                    overwrite: true
                });
            }
        });
    });
    return (
        <footer className="footer absolute w-full bg-grainy px-4 py-6 md:p-0">
            <svg preserveAspectRatio="none" id="footer-img" className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2278 683">
                <defs>
                    <linearGradient id="grad-1" x1="0" y1="0" x2="2278" y2="683" gradientUnits="userSpaceOnUse">
                        <stop offset="0.2" stopColor="var(--color-onyx-700)"></stop>
                        <stop offset="0.8" stopColor="var(--foreground)"></stop>
                    </linearGradient>
                </defs>
                <path className="footer-svg" id="bouncy-path" fill="url(#grad-1)" d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z" />
            </svg>
            <div className="relative z-10 px-4 md:px-8 md:py-6">
                <Drawer open={open} onOpenChange={setOpen}>
                    {/* Mobile layout: text on top, link + icons in a row below */}
                    <div className="flex flex-col gap-4 md:hidden">
                        <p className="text-background text-sm font-semibold text-center mb-2">
                            {techStackText}
                        </p>
                        <div className="flex items-center justify-between gap-4">
                            {drawerTrigger}
                            {socialLinks}
                        </div>
                    </div>

                    {/* Desktop layout: original structure preserved */}
                    <div className="hidden md:flex items-center justify-between">
                        <div className="flex gap-6">
                            {drawerTrigger}
                        </div>
                        <p className="text-background text-md font-semibold text-center">
                            {techStackText}
                        </p>
                        {socialLinks}
                    </div>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </footer>
    );
}
export default Footer;
