import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Carousel from './index';

// Mock Swiper and GSAP
vi.mock('swiper/react', () => ({
    Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
    SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}));

vi.mock('swiper/modules', () => ({
    Navigation: {},
    Scrollbar: {},
}));

vi.mock('@gsap/react', () => ({
    useGSAP: (callback: (() => void | (() => void))) => {
        const cleanup = callback();
        return cleanup;
    },
}));

vi.mock('gsap', () => ({
    gsap: {
        to: vi.fn(),
        quickTo: vi.fn(() => vi.fn()),
    },
}));

describe('Carousel', () => {
    let container: HTMLElement;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        container?.remove?.();
    });

    it('should render the carousel component', () => {
        const { container: c } = render(<Carousel />);
        container = c;
        expect(screen.getByTestId('swiper')).toBeInTheDocument();
    });

    it('should render all slides', () => {
        const { container: c } = render(<Carousel />);
        container = c;
        const swiperContainer = screen.getByTestId('swiper');
        const slides = within(swiperContainer).getAllByTestId('swiper-slide');
        expect(slides).toHaveLength(9);
    });

    it('should render navigation button wrappers', () => {
        const { container: c } = render(<Carousel />);
        container = c;
        const prevWrapper = c.querySelector('#button-wrapper-prev');
        const nextWrapper = c.querySelector('#button-wrapper-next');
        expect(prevWrapper).toBeInTheDocument();
        expect(nextWrapper).toBeInTheDocument();
    });

    it('should have carousel container with correct class', () => {
        const { container: c } = render(<Carousel />);
        container = c;
        const carouselContainer = c.querySelector('.carousel');
        expect(carouselContainer).toBeInTheDocument();
        expect(carouselContainer).toHaveClass('carousel');
    });

    it('should have prev and next button elements', () => {
        const { container: c } = render(<Carousel />);
        container = c;
        const prevButton = c.querySelector('.swiper-button-prev');
        const nextButton = c.querySelector('.swiper-button-next');
        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });
});