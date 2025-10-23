'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import { linkResolver } from '../../utils'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react'

interface Props {
  events: SbEvent[]
}

export default function StoryScrollList({ events }: Props) {
  const sliderRef = useRef<Slider>(null)

  if (!events || events.length === 0) {
    return null
  }

  // Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    pauseOnHover: true,
    pauseOnFocus: true,
  }

  // Navigation handlers
  const handlePrevious = () => {
    sliderRef.current?.slickPrev()
  }

  const handleNext = () => {
    sliderRef.current?.slickNext()
  }

  return (
    <div className="story-scroll-wrapper bg-boldness relative w-full overflow-hidden">
      {/* Full-Screen Slider */}
      <div className="relative h-screen">
        <Slider ref={sliderRef} {...settings}>
          {events.map((event, index) => (
            <div key={event._uid} className="relative h-screen outline-none">
              {/* Full-Screen Background Media */}
              <div className="absolute inset-0">
                {event.video?.filename ? (
                  <video
                    src={event.video.filename}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={event.thumbnail?.filename || '/og-image.png'}
                    alt={event.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                )}
              </div>

              {/* Cinematic Gradient Overlays */}
              <div className="from-boldness via-boldness/80 to-boldness/30 absolute inset-0 bg-gradient-to-t" />
              <div className="from-boldness/70 to-boldness/70 absolute inset-0 bg-gradient-to-r via-transparent" />

              {/* Hero Content Container */}
              <div className="relative flex h-full w-full flex-col">
                {/* Main Event Content */}
                <div className="flex max-w-6xl flex-1 flex-col justify-center px-6 pb-24 md:justify-end md:px-12 md:pb-32 lg:px-16">
                  {/* Type Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4 md:mb-6"
                  >
                    <span className="border-strategy-gold bg-strategy-gold/25 inline-flex items-center gap-3 rounded-full border-2 px-6 py-3 shadow-2xl backdrop-blur-lg md:px-8 md:py-4">
                      <span className="bg-strategy-gold shadow-strategy-gold/50 h-3 w-3 animate-pulse rounded-full shadow-lg md:h-4 md:w-4" />
                      <span className="font-heading text-strategy-gold text-lg tracking-widest uppercase md:text-xl">
                        {index === 0
                          ? 'Volgende activiteit'
                          : event.type || 'Event'}
                      </span>
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-heading text-freedom mb-6 text-6xl leading-[0.9] tracking-wide uppercase drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)] md:mb-8 md:text-7xl lg:text-8xl xl:text-9xl"
                  >
                    {event.title}
                  </motion.h2>

                  {/* Speaker */}
                  {event.speaker && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-body text-strategy-gold mb-8 text-2xl font-medium drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] md:mb-10 md:text-3xl lg:text-4xl"
                    >
                      Door {event.speaker}
                    </motion.p>
                  )}

                  {/* Event Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-10 flex flex-wrap gap-4 md:mb-12 md:gap-5"
                  >
                    <div className="border-strategy-green bg-strategy-green flex items-center gap-3 rounded-full border-2 px-5 py-3 shadow-xl backdrop-blur-lg md:px-6 md:py-4">
                      <Calendar className="text-boldness h-5 w-5 md:h-6 md:w-6" />
                      <span className="font-body text-boldness text-base font-medium md:text-lg lg:text-xl">
                        {new Date(event.date).toLocaleDateString('nl-NL', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })}
                      </span>
                    </div>
                    <div className="border-strategy-green bg-strategy-green flex items-center gap-3 rounded-full border-2 px-5 py-3 shadow-xl backdrop-blur-lg md:px-6 md:py-4">
                      <Clock className="text-boldness h-5 w-5 md:h-6 md:w-6" />
                      <span className="font-body text-boldness text-base font-medium md:text-lg lg:text-xl">
                        {new Date(event.date).toLocaleTimeString('nl-NL', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="border-strategy-green bg-strategy-green flex items-center gap-3 rounded-full border-2 px-5 py-3 shadow-xl backdrop-blur-lg md:px-6 md:py-4">
                        <MapPin className="text-boldness h-5 w-5 md:h-6 md:w-6" />
                        <span className="font-body text-boldness text-base font-medium md:text-lg lg:text-xl">
                          {event.location}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    href={linkResolver(event.slug as string)}
                    className="bg-strategy-red font-heading text-freedom hover:bg-strategy-red/90 inline-flex items-center justify-center gap-3 self-start rounded-full px-10 py-5 text-lg tracking-widest uppercase transition-all hover:scale-105 md:gap-4 md:px-12 md:py-6 md:text-xl"
                  >
                    <span>Meer informatie</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="md:h-7 md:w-7"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Navigation Buttons */}
        {events.length > 1 && (
          <div className="pointer-events-none absolute inset-0 z-30">
            <div className="relative flex h-full w-full items-center justify-between">
              {/* Left Button */}
              <div className="flex items-center pl-2 md:pl-8 lg:pl-12">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handlePrevious}
                  className="border-freedom/50 bg-freedom/15 hover:border-freedom/70 hover:bg-freedom/25 pointer-events-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 shadow-2xl backdrop-blur-xl transition-all active:scale-95 md:h-20 md:w-20 md:hover:scale-110"
                  aria-label="Vorige"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="text-freedom h-6 w-6 md:h-10 md:w-10" />
                </motion.button>
              </div>

              {/* Right Button */}
              <div className="flex items-center pr-2 md:pr-8 lg:pr-12">
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleNext}
                  className="border-freedom/50 bg-freedom/15 hover:border-freedom/70 hover:bg-freedom/25 pointer-events-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 shadow-2xl backdrop-blur-xl transition-all active:scale-95 md:h-20 md:w-20 md:hover:scale-110"
                  aria-label="Volgende"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="text-freedom h-6 w-6 md:h-10 md:w-10" />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to All Events CTA */}
      <Link href="#events-filtered">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="via-boldness/50 to-boldness group relative cursor-pointer bg-gradient-to-b from-transparent py-12 md:py-16"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Divider line */}
            <motion.div
              className="via-freedom/50 h-px w-32 bg-gradient-to-r from-transparent to-transparent"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Call to action text */}
            <div className="flex flex-col items-center gap-4">
              <p className="font-heading text-freedom/90 group-hover:text-freedom text-2xl tracking-widest uppercase transition-colors md:text-3xl">
                Alle Evenementen
              </p>
              <p className="font-body text-freedom/60 group-hover:text-freedom/80 text-base transition-colors md:text-lg">
                Ontdek ons volledige programma
              </p>
            </div>

            {/* Animated arrow */}
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-freedom/70 group-hover:text-freedom transition-colors"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </motion.svg>
          </div>
        </motion.div>
      </Link>

      {/* Custom Styles for Slick */}
      <style jsx global>{`
        .story-scroll-wrapper .slick-slider {
          height: 100vh;
        }

        .story-scroll-wrapper .slick-list,
        .story-scroll-wrapper .slick-track {
          height: 100%;
        }

        .story-scroll-wrapper .slick-slide > div {
          height: 100vh;
        }

        /* Dots styling */
        .story-scroll-wrapper .slick-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex !important;
          justify-content: center;
          gap: 0.75rem;
          list-style: none;
          padding: 0;
          z-index: 40;
        }

        .story-scroll-wrapper .slick-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }

        .story-scroll-wrapper .slick-dots li button {
          width: 0.75rem;
          height: 0.75rem;
          padding: 0;
          border: none;
          border-radius: 9999px;
          background-color: rgba(237, 242, 233, 0.5);
          transition: all 300ms ease;
          font-size: 0;
          cursor: pointer;
        }

        .story-scroll-wrapper .slick-dots li button:hover {
          background-color: rgba(237, 242, 233, 0.7);
          width: 1.5rem;
        }

        .story-scroll-wrapper .slick-dots li.slick-active button {
          width: 3rem;
          background-color: #eb3700;
        }

        .story-scroll-wrapper .slick-dots li button:before {
          display: none;
        }

        @media (min-width: 768px) {
          .story-scroll-wrapper .slick-dots {
            bottom: 2rem;
          }
        }
      `}</style>
    </div>
  )
}
