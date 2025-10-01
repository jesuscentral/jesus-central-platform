"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Kerk",
    items: [
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
      { label: "Dienen", href: "/dienen" },
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
        onClick={handleToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="group relative z-50 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-freedom/10 backdrop-blur-md border border-freedom/20 transition-all duration-500 hover:bg-freedom/20 hover:scale-110 hover:rotate-180 hover:border-brand-orange hover:shadow-[0_0_30px_rgba(235,55,0,0.5)] cursor-pointer"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(235,55,0,0.1),transparent_50%)]" />

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
                    transitionDelay: `${sectionIndex * 100 + 200}ms`,
                  }}
                >
                  <h3 className="text-sm font-semibold text-brand-orange mb-6 uppercase tracking-wider">
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
                          className="group inline-block text-3xl md:text-4xl lg:text-5xl font-bold text-freedom hover:text-brand-orange transition-all duration-300"
                          onClick={handleToggle}
                        >
                          <span className="inline-block transition-all duration-300 group-hover:translate-x-2 group-hover:scale-105 group-hover:[text-shadow:0_0_30px_rgba(235,55,0,0.5)] font-heading uppercase">
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
                  <div className="flex gap-6">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-freedom hover:text-brand-orange transition-colors duration-300 text-lg font-medium"
                        onClick={handleToggle}
                      >
                        {link.label}
                      </a>
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
