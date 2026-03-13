'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import ButtonIcon from './button-icon';

import { ReactNode, Children } from 'react';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2';

interface CarouselProps {
  children?: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const buttonWrapper =
    'absolute z-10 top-1/2 -translate-y-1/2 hover:scale-[1.2] hover:transition-[scale] hover:duration-300 hover:ease-in-out';

  // Convert children to an array so we can map over them
  const childArray = Children.toArray(children);

  return (
    <div className="carousel w-full relative px-4 sm:px-6 md:px-0">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={30}
        slidesPerView="auto"
      >
        {childArray.map((child, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }}>
            {child}
          </SwiperSlide>
        ))}

        <div className={`${buttonWrapper} left-2 sm:left-4 md:left-[5%] hidden md:block`}>
          <ButtonIcon className="swiper-button-prev" size={80}>
            <span className="cursor-pointer flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full">
              <HiArrowLongLeft size={40} className="text-white" />
            </span>
          </ButtonIcon>
        </div>
        <div className={`${buttonWrapper} right-2 sm:right-4 md:right-[5%] hidden md:block`}>
          <ButtonIcon className="swiper-button-next" size={80}>
            <span className="cursor-pointer flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full">
              <HiArrowLongRight size={40} className="text-white" />
            </span>
          </ButtonIcon>
        </div>
      </Swiper>
    </div>
  );
}
export default Carousel;
