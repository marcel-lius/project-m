'use client';

import projects from "@/contents/projects.json";
import Carousel from "@/components/ui/carousel";
import CardImage from "@/components/ui/card-image";
import ScrambleText from "@/components/ui/scramble-text";
import SplitTextAnim from "@/components/ui/split-text";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center justify-start">
        <div className="container min-h-100 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-center">
          <div className="flex flex-col items-center sm:items-start justify-center">
            <p className="text-lg font-semibold mb-6 text-gold-40">
              <ScrambleText text="a Fullstack, Web Specialist, and Problem Solver" duration={3} />
            </p>
            <h1 className="text-6xl font-bold mb-6">
              <ScrambleText text="Building Scalable Digital Experiences." duration={3.5} revealDelay={1} />
            </h1>
          </div>
          <div className="flex flex-col items-center sm:items-start justify-center max-w-4/5">
            <SplitTextAnim
                as="h2"
                splitType="words"
                animation="fade-up"
                className="mb-2 text-2xl leading-tight"
            >
              I'm Marcel, a Technology Leader specializing in enterprise web platforms, cloud architecture, and modern application development.
              I design and deliver scalable solutions using technologies like AEM, Java, React, Next.js, Vue.js, Node.js, etc.
            </SplitTextAnim>
          </div>
        </div>
        <div className="w-full bg-onyx-300 py-8 bg-grainy">
          <SplitTextAnim
            as="h2"
            splitType="chars"
            animation="reveal"
            className="mb-12 text-6xl text-center font-bold leading-tight text-background"
          >
            Projects
          </SplitTextAnim>
          <Carousel>
            {projects.map((project, i) => (
              <CardImage
                key={i}
                backgroundImage={project.backgroundImage}
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                url={project.url}
              />
            ))}
          </Carousel>
        </div>
      </main >
    </div >
  );
}
