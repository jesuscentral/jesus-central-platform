'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { linkResolver } from '@/features/storyblok/utils/linkResolver'
import { colors } from '@/lib/colors'
import { StoryblokMultilink } from '@storyblok/types/storyblok'

interface MenuItem {
  label: string
  href: string
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

interface SocialLink {
  label: string
  href: string
}

interface CinematicMenuProps {
  menu_data?: {
    title: string
    items: {
      label: string
      link: StoryblokMultilink
      open_in_new_tab?: boolean
    }[]
  }[]
  social_links?: {
    label: string
    url: string
  }[]
}

export default function CinematicMenu({
  menu_data,
  social_links,
}: CinematicMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const colorScheme = {
    name: colors.STRATEGY_RED,
    accentColor: '#eb3700',
    accentRgba: 'rgba(235, 55, 0, 0.1)',
    hoverShadow: 'rgba(235, 55, 0, 0.5)',
  }

  // Transform Storyblok data to menu format
  const menuSections: MenuSection[] = menu_data
    ? menu_data.map((section) => ({
        title: section.title || '',
        items:
          section.items?.map((item) => ({
            label: item.label || '',
            href: linkResolver(item.link) || '#',
          })) || [],
      }))
    : []

  const socialLinks: SocialLink[] = social_links
    ? social_links.map((link) => ({
        label: link.label || '',
        href: link.url || '#',
      }))
    : []

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <button
        key={colorScheme.name}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="group bg-freedom/10 border-freedom/20 relative z-[110] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colorScheme.accentColor
          e.currentTarget.style.boxShadow = `0 0 30px ${colorScheme.hoverShadow}`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = ''
          e.currentTarget.style.boxShadow = ''
        }}
      >
        <div className="relative h-5 w-5 sm:h-6 sm:w-6">
          <Menu
            className={`text-freedom absolute inset-0 h-5 w-5 transition-all duration-300 sm:h-6 sm:w-6 ${
              isOpen
                ? 'scale-0 rotate-90 opacity-0'
                : 'scale-100 rotate-0 opacity-100'
            }`}
          />
          <X
            className={`text-freedom absolute inset-0 h-5 w-5 transition-all duration-300 sm:h-6 sm:w-6 ${
              isOpen
                ? 'scale-100 rotate-0 opacity-100'
                : 'scale-0 -rotate-90 opacity-0'
            }`}
          />
        </div>
      </button>

      <div
        className={`bg-boldness fixed inset-0 z-[100] transition-all duration-700 ${
          isOpen
            ? 'scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colorScheme.accentRgba}, transparent 50%)`,
          }}
        />

        <div className="relative h-full w-full overflow-y-auto">
          <div className="container mx-auto px-6 pt-32 pb-20 md:pt-40">
            <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
              {menuSections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="menu-section transform transition-all duration-700 ease-out"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen
                      ? 'translateY(0) rotateX(0)'
                      : 'translateY(60px) rotateX(-20deg)',
                    transitionDelay: `${sectionIndex * 200 + 200}ms`,
                  }}
                >
                  <h3
                    className="mb-6 text-sm font-semibold tracking-wider uppercase"
                    style={{ color: colorScheme.accentColor }}
                  >
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href={item.href}
                          target={
                            item.href.includes('http') ? '_blank' : '_self'
                          }
                          className="group text-freedom inline-block text-3xl font-bold transition-all duration-300 md:text-4xl lg:text-5xl"
                          onClick={handleToggle}
                          onMouseEnter={(e) => {
                            const span = e.currentTarget.querySelector('span')
                            if (span) {
                              ;(span as HTMLElement).style.color =
                                colorScheme.accentColor
                              ;(span as HTMLElement).style.textShadow =
                                `0 0 30px ${colorScheme.hoverShadow}`
                            }
                          }}
                          onMouseLeave={(e) => {
                            const span = e.currentTarget.querySelector('span')
                            if (span) {
                              ;(span as HTMLElement).style.color = ''
                              ;(span as HTMLElement).style.textShadow = ''
                            }
                          }}
                        >
                          <span className="font-heading inline-block uppercase transition-all duration-300 group-hover:translate-x-2 group-hover:scale-105">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className="menu-footer border-freedom/10 transform border-t pt-12 transition-all duration-700 ease-out"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '500ms',
              }}
            >
              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div>
                  <p className="text-freedom/70 mb-4">Vind ons op</p>
                  <div className="flex flex-wrap gap-6 md:flex-nowrap">
                    {socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        target={link.href.includes('http') ? '_blank' : '_self'}
                        className="text-freedom text-lg font-medium transition-colors duration-300"
                        onClick={handleToggle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colorScheme.accentColor
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = ''
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="text-freedom/70 text-sm">
                  <p>© {new Date().getFullYear()} Jesus Central Church</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
