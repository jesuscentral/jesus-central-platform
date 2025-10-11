"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { SbWebsiteConfig } from "@storyblok/types/287435740670216/storyblok-components";
import { linkResolver } from "../../utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function Footer({ config }: { config: SbWebsiteConfig }) {
  const socialLinks: SocialLink[] = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/jesuscentral.church",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/jesuscentralchurchgouda",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@jesuscentral.churchgouda",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/4GFRq8BLKCa4hGWkhpaGTR?si=52cdbfa353c5407b",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-boldness text-freedom overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-strategy-red/20 via-transparent to-strategy-gold/20"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Top accent line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-strategy-red/50 to-transparent" />

        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Logo & Tagline Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-16"
          >
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-md mx-auto lg:mx-0">
              <Link href="/" className="block mb-4">
                <Image
                  src={config.footer_logo?.filename || "/logo.svg"}
                  alt={config.footer_logo?.alt || "Jesus Central Church"}
                  width={200}
                  height={60}
                  className="h-12 sm:h-14 md:h-16 w-auto"
                />
              </Link>
              <p className="text-freedom/70 text-sm sm:text-base leading-relaxed">
                {config.footer_description}
              </p>
            </div>
          </motion.div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 mb-12 lg:mb-16">
            {config.footer_menu?.map((section, sectionIndex) => (
              <motion.div
                key={section._uid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-strategy-red mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((link) => (
                    <li key={link._uid}>
                      <Link
                        href={linkResolver(link.link)}
                        className="text-sm text-freedom/70 hover:text-strategy-red transition-colors duration-300 inline-block group"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-strategy-red group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom Section: Social & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center space-y-6 pt-8 border-t border-freedom/10"
          >
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-freedom/50 mr-2">
                Volg Ons
              </span>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    "bg-freedom/5 text-freedom/70 hover:bg-strategy-red hover:text-freedom",
                    "transition-all duration-300 hover:scale-110",
                    "border border-freedom/10 hover:border-strategy-red"
                  )}
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-freedom/50">
              <p>
                © {new Date().getFullYear()} Stichting Gods Original Design
                Gouda
              </p>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-strategy-red transition-colors duration-300"
                >
                  Privacy
                </Link>
                <span>•</span>
                <Link
                  href="/anbi"
                  className="hover:text-strategy-red transition-colors duration-300"
                >
                  ANBI
                </Link>
              </div>
            </div>

            {/* Subtle tagline */}
            <p className="text-xs text-freedom/40 italic">
              {config.footer_tagline ||
                "Ontdek Gods Original Design voor jouw leven"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line with animation */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-transparent via-strategy-red to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </footer>
  );
}
