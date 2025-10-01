"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button, { ButtonType } from "../atoms/Button";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface ColorScheme {
  name: string;
  accentColor: string;
  accentRgba: string;
  hoverShadow: string;
}

const colorSchemes: ColorScheme[] = [
  {
    name: "brand-orange",
    accentColor: "#eb3700",
    accentRgba: "rgba(235, 55, 0, 0.1)",
    hoverShadow: "rgba(235, 55, 0, 0.5)",
  },
  {
    name: "strategy-gold",
    accentColor: "#f3b963",
    accentRgba: "rgba(243, 185, 99, 0.1)",
    hoverShadow: "rgba(243, 185, 99, 0.5)",
  },
  {
    name: "strategy-green",
    accentColor: "#746e06",
    accentRgba: "rgba(116, 110, 6, 0.1)",
    hoverShadow: "rgba(116, 110, 6, 0.5)",
  },
];

const menuSections: MenuSection[] = [
  {
    title: "Kerk",
    items: [
      { label: "Home", href: "/" },
      { label: "Over ons", href: "/over-ons" },
      { label: "Agenda", href: "/agenda" },
      { label: "Leiderschap", href: "/leiderschap" },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Preken", href: "/preken" },
      { label: "Youtube", href: "/youtube" },
    ],
  },
  {
    title: "Overige",
    items: [
      { label: "Onze visie", href: "/onze-visie" },
      { label: "Wat wij geloven", href: "/wat-wij-geloven" },
      { label: "Nieuw begin", href: "/nieuw-begin" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "#instagram" },
  { label: "Facebook", href: "#facebook" },
  { label: "Tiktok", href: "#tiktok" },
  { label: "LinkedIn", href: "#linkedin" },
  { label: "Youtube", href: "#youtube" },
];

export default function CinematicMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>(
    colorSchemes[0]
  );

  const handleToggle = () => {
    if (isOpen) {
      const randomScheme =
        colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
      setCurrentScheme(randomScheme);
    }
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
        key={currentScheme.name}
        onClick={handleToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="group relative z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-freedom/10 backdrop-blur-md border border-freedom/20 transition-all duration-500  hover:scale-110 cursor-pointer"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = currentScheme.accentColor;
          e.currentTarget.style.boxShadow = `0 0 30px ${currentScheme.hoverShadow}`;
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
        className={`fixed inset-0 z-40 bg-gradient-to-br from-brand-black via-bold-dark to-strategy-charcoal transition-all duration-700 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${currentScheme.accentRgba}, transparent 50%)`,
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
                    style={{ color: currentScheme.accentColor }}
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
                                currentScheme.accentColor;
                              (span as HTMLElement).style.textShadow =
                                `0 0 30px ${currentScheme.hoverShadow}`;
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
              <div
                className="flex flex-row flex-wrap md:flex-nowrap  gap-4  transform transition-all duration-700 ease-out"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen
                    ? "translateY(0) rotateX(0)"
                    : "translateY(60px) rotateX(-20deg)",
                  transitionDelay: `200ms`,
                }}
              >
                <Button
                  href="/geven"
                  variant="outline"
                  size="large"
                  type={currentScheme.name as ButtonType}
                  showArrowIcon={true}
                  className={`group relative z-50 backdrop-blur-md transform transition-all duration-700 float-right ${
                    isOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  Geven
                </Button>
                <Button
                  href="/dienen"
                  variant="outline"
                  size="large"
                  type={currentScheme.name as ButtonType}
                  showArrowIcon={true}
                  className={`group relative z-50 backdrop-blur-md transform transition-all duration-700 float-right ${
                    isOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  Dienen
                </Button>
              </div>
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
                  <div className="flex gap-6">
                    {socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        target={link.href.includes("http") ? "_blank" : "_self"}
                        className="text-freedom transition-colors duration-300 text-lg font-medium"
                        onClick={handleToggle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color =
                            currentScheme.accentColor;
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
                  <p>
                    © {new Date().getFullYear()} Stichting Gods Original Design
                    Gouda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
