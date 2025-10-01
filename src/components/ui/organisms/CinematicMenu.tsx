"use client";
import { Menu, X } from "lucide-react";
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
    title: "Products",
    items: [
      { label: "Platform", href: "#platform" },
      { label: "Solutions", href: "#solutions" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation", href: "#docs" },
      { label: "Blog", href: "#blog" },
      { label: "Support", href: "#support" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "#twitter" },
  { label: "LinkedIn", href: "#linkedin" },
  { label: "GitHub", href: "#github" },
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
        className="group relative z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-freedom/10 backdrop-blur-md border border-freedom/20 transition-all duration-500 hover:bg-freedom/20 hover:scale-110 hover:rotate-180 hover:border-brand-orange hover:shadow-[0_0_30px_rgba(235,55,0,0.5)]"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`absolute inset-0 w-6 h-6 text-freedom transition-all duration-300 ${
              isOpen
                ? "opacity-0 rotate-90 scale-0"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute inset-0 w-6 h-6 text-freedom transition-all duration-300 ${
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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNDMsMTg1LDk5LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-30" />

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
                  <h3 className="text-sm font-semibold text-purple-400 mb-6 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href={item.href}
                          className="group inline-block text-3xl md:text-4xl lg:text-5xl font-bold text-white hover:text-purple-400 transition-all duration-300"
                          onClick={handleToggle}
                        >
                          <span className="inline-block transition-all duration-300 group-hover:translate-x-2 group-hover:scale-105 group-hover:[text-shadow:0_0_30px_rgba(168,85,247,0.5)]">
                            {item.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className="menu-footer border-t border-white/10 pt-12 transform transition-all duration-700 ease-out"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "500ms",
              }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                  <p className="text-slate-400 mb-4">Connect with us</p>
                  <div className="flex gap-6">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-white hover:text-purple-400 transition-colors duration-300 text-lg font-medium"
                        onClick={handleToggle}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="text-slate-400 text-sm">
                  <p>© 2024 Cinematic. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
