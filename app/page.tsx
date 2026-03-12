'use client';

import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import Carousel from "@/components/Carousel";
import Teaser from "@/components/Teaser";
import { FaBeer } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between dark:bg-black sm:items-start">
        <Teaser 
          backgroundImage="/hero.jpg"
          subtitle="New Launch"
          title="Revolutionary Design"
          description="Experience the future today"
          variant="full-width"
        />
        <Carousel />
        <Teaser 
          backgroundImage="/product.jpg"
          title="Featured Product"
          description="Check out our latest offering"
        />
        <br />
        <ButtonIcon onClick={() => alert('Icon Button Clicked!')}>
          <FaBeer size={20} />
        </ButtonIcon>
        <br />
        <Button name="Visit Site" href="https://example.com" />
        <Button name="Click Me" onClick={() => alert('Clicked!')} />
      </main>
    </div>
  );
}
