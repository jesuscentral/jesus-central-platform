"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { linkResolver } from "@/features/storyblok/api";
import { colors } from "@/lib/colors";
import { StoryblokMultilink } from "@storyblok/types/storyblok";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface SocialLink {
  label: string;
  href: string;
}

interface CinematicMenuProps {
  menu_data?: {
    title: string;
    items: {
      label: string;
      link: StoryblokMultilink;
      open_in_new_tab?: boolean;
    }[];
  }[];
  social_links?: {
    label: string;
    url: string;
  }[];
}

export default function CinematicMenu({
  menu_data,
  social_links,
}: CinematicMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = {
    name: colors.STRATEGY_RED,
    accentColor: "#eb3700",
    accentRgba: "rgba(235, 55, 0, 0.1)",
    hoverShadow: "rgba(235, 55, 0, 0.5)",
  };

  // Transform Storyblok data to menu format
  const menuSections: MenuSection[] = menu_data
    ? menu_data.map((section) => ({
        title: section.title || "",
        items:
          section.items?.map((item) => ({
            label: item.label || "",
            href: linkResolver(item.link as StoryblokMultilink) || "#",
          })) || [],
      }))
    : [];

  const socialLinks: SocialLink[] = social_links
    ? social_links.map((link) => ({
        label: link.label || "",
        href: link.url || "#",
      }))
    : [];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        key={colorScheme.name}
        onClick={handleToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="group relative z-[100] flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-freedom/10 backdrop-blur-md border border-freedom/20 transition-all duration-500  hover:scale-110 cursor-pointer"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colorScheme.accentColor;
          e.currentTarget.style.boxShadow = `0 0 30px ${colorScheme.hoverShadow}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        <div className="relative w-5 h-5 sm:w-6 sm:h-6">
          <Menu
            className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-freedom transition-all duration-300 ${
              isOpen
                ? "opacity-0 rotate-90 scale-0"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-freedom transition-all duration-300 ${
              isOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-0"
            }`}
          />
        </div>
      </button>

      <div
        className={`fixed inset-0 z-[90] bg-gradient-to-br from-boldness via-boldness to-boldness transition-all duration-700 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colorScheme.accentRgba}, transparent 50%)`,
          }}
        />

        <div className="relative h-full w-full overflow-y-auto">
          <div className="container mx-auto px-6 pt-32 md:pt-40 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-20">
              {menuSections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="menu-section transform transition-all duration-700 ease-out"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen
                      ? "translateY(0) rotateX(0)"
                      : "translateY(60px) rotateX(-20deg)",
                    transitionDelay: `${sectionIndex * 200 + 200}ms`,
                  }}
                >
                  <h3
                    className="text-sm font-semibold mb-6 uppercase tracking-wider"
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
                            item.href.includes("http") ? "_blank" : "_self"
                          }
                          className="group inline-block text-3xl md:text-4xl lg:text-5xl font-bold text-freedom transition-all duration-300"
                          onClick={handleToggle}
                          onMouseEnter={(e) => {
                            const span = e.currentTarget.querySelector("span");
                            if (span) {
                              (span as HTMLElement).style.color =
                                colorScheme.accentColor;
                              (span as HTMLElement).style.textShadow =
                                `0 0 30px ${colorScheme.hoverShadow}`;
                            }
                          }}
                          onMouseLeave={(e) => {
                            const span = e.currentTarget.querySelector("span");
                            if (span) {
                              (span as HTMLElement).style.color = "";
                              (span as HTMLElement).style.textShadow = "";
                            }
                          }}
                        >
                          <span className="inline-block transition-all duration-300 group-hover:translate-x-2 group-hover:scale-105 font-heading uppercase">
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
              className="menu-footer border-t border-freedom/10 pt-12 transform transition-all duration-700 ease-out"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "500ms",
              }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                  <p className="text-freedom/70 mb-4">Vind ons op</p>
                  <div className="flex flex-wrap md:flex-nowrap gap-6">
                    {socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        target={link.href.includes("http") ? "_blank" : "_self"}
                        className="text-freedom transition-colors duration-300 text-lg font-medium"
                        onClick={handleToggle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colorScheme.accentColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "";
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
  );
}
