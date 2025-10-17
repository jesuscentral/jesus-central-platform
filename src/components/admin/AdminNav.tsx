"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ArrowLeft, Calendar, Heart, Home, MessageCircle } from "lucide-react";

const baseNavItems = [
  {
    href: "/mijn-jesus-central",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/mijn-jesus-central/geven",
    label: "Geven",
    icon: Heart,
  },
];

export function AdminNav({
  showAgenda = false,
  showAnnouncements = false,
}: {
  showAgenda: boolean;
  showAnnouncements: boolean;
}) {
  const pathname = usePathname();

  const navItems = [
    ...baseNavItems,
    ...(showAgenda
      ? [
          {
            href: "/mijn-jesus-central/agenda",
            label: "Agenda",
            icon: Calendar,
          },
        ]
      : []),
    ...(showAnnouncements
      ? [
          {
            href: "/mijn-jesus-central/aanvraag",
            label: "Mededelingen",
            icon: MessageCircle,
          },
        ]
      : []),
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-brand-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Terug naar website</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-orange/10 text-brand-orange"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Button */}
          <div className="flex items-center">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex items-center gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-brand-orange/10 text-brand-orange"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
