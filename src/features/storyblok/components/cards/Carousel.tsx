'use client'

import { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SbCarousel } from '@storyblok/types/287435740670216/storyblok-components'
import {
  SbBlokData,
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc'
import { cn } from '@/utils/cn'
// Removed unused imports

interface CarouselProps {
  blok: SbCarousel
}

export default function Carousel({ blok }: CarouselProps) {
  const sliderRef = useRef<Slider>(null)

  if (!blok.bloks || blok.bloks.length === 0) {
    return null
  }

  // Slick settings
  const settings: Settings = {
    dots: blok.dots ?? true,
    infinite: blok.infinite ?? true,
    speed: blok.speed ? parseInt(blok.speed) : 500,
    slidesToShow: blok.slidesToShow ? parseInt(blok.slidesToShow) : 1,
    slidesToScroll: blok.slidesToScroll ? parseInt(blok.slidesToScroll) : 1,
    centerMode: blok.centerMode ?? true,
    centerPadding: '10%',
    autoplay: blok.autplay ?? true,
    autoplaySpeed: blok.autoplayInterval
      ? parseInt(blok.autoplayInterval)
      : 5000,
    swipeToSlide: blok.swipeToSlide ?? true,
    draggable: blok.draggable ?? true,
    arrows: blok.arrows ?? false,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '8%',
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '5%',
        },
      },
      {
        breakpoint: 640,
        settings: {
          centerPadding: '3%',
        },
      },
    ],
    beforeChange: () => {
      // Optional: Add any logic before slide change
    },
    afterChange: () => {
      // Optional: Add any logic after slide change
    },
  }

  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className={cn('w-full')}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Carousel */}
        <div className="carousel-wrapper">
          <Slider ref={sliderRef} {...settings}>
            {blok.bloks?.map((blok) => (
              <StoryblokServerComponent key={blok._uid} blok={blok} />
            ))}
          </Slider>
        </div>
      </div>

      {/* Custom Styles for Slick Carousel */}
      <style jsx global>{`
        /* Slick Carousel Custom Styles */
        .carousel-wrapper .slick-slider {
          position: relative;
        }

        .carousel-wrapper .slick-list {
          overflow: visible;
        }

        .carousel-wrapper .slick-track {
          display: flex;
          align-items: center;
        }

        .carousel-wrapper .slick-slide {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.85);
          opacity: 0.5;
        }

        .carousel-wrapper .slick-slide.slick-center {
          transform: scale(1);
          opacity: 1;
          z-index: 10;
        }

        /* Dots styling */
        .carousel-wrapper .slick-dots {
          position: relative;
          bottom: auto;
          margin-top: 2rem;
          display: flex !important;
          justify-content: center;
          gap: 0.5rem;
          list-style: none;
          padding: 0;
        }

        .carousel-wrapper .slick-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }

        .carousel-wrapper .slick-dots li button {
          width: 0.5rem;
          height: 0.5rem;
          padding: 0;
          border: none;
          border-radius: 9999px;
          background-color: rgba(22, 22, 21, 0.3);
          transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0;
          cursor: pointer;
        }

        .carousel-wrapper .slick-dots li button:hover {
          background-color: rgba(22, 22, 21, 0.5);
        }

        .carousel-wrapper .slick-dots li.slick-active button {
          width: 2rem;
          background-color: #eb3700;
        }

        .carousel-wrapper .slick-dots li button:before {
          display: none;
        }

        /* Prevent draggable ghost image */
        .carousel-wrapper img {
          pointer-events: none;
          user-select: none;
        }
      `}</style>
    </section>
  )
}
