"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Download } from "lucide-react";
import { SbEvent } from "@storyblok/types/287435740670216/storyblok-components";
import { generateAllCalendarLinks } from "@/lib/calendar";
import { cn } from "@/utils/cn";
import Button, { ButtonType } from "@/components/ui/atoms/Button";

interface AddToCalendarProps {
  event: SbEvent;
  baseUrl?: string;
  className?: string;
  buttonType?: ButtonType;
  buttonVariant?: "primary" | "outline";
  buttonSize?: "small" | "medium" | "large";
}

// SVG Icons for calendar brands
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const OutlookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M24 7.387v9.226a3.387 3.387 0 01-3.387 3.387H7.387A3.387 3.387 0 014 16.613v-9.226A3.387 3.387 0 017.387 4h13.226A3.387 3.387 0 0124 7.387z" fill="#0072C6"/>
    <path d="M14 11.032c0-2.125-1.36-3.845-3.226-3.845S7.548 8.907 7.548 11.032s1.36 3.845 3.226 3.845S14 13.157 14 11.032zm-4.516 0c0-1.297.58-2.322 1.29-2.322.71 0 1.29 1.025 1.29 2.322s-.58 2.322-1.29 2.322c-.71 0-1.29-1.025-1.29-2.322z" fill="#fff"/>
    <path d="M17.806 4v7.742h3.387V4h-3.387z" fill="#0072C6"/>
    <path d="M21.193 12.258h-3.387v7.742h3.387v-7.742z" fill="#0072C6"/>
  </svg>
);

const YahooIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#5F01D1"/>
    <path d="M14.286 8.571L12 14.429 9.714 8.571H7.286l3.428 8v2.857h2.572v-2.857l3.428-8h-2.428z" fill="#fff"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="#000"/>
  </svg>
);

export default function AddToCalendar({
  event,
  baseUrl,
  className,
  buttonType = "strategy-red",
  buttonVariant = "primary",
  buttonSize = "large",
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const calendarLinks = generateAllCalendarLinks(event, baseUrl);

  const calendars = [
    {
      name: "Google Calendar",
      icon: <GoogleIcon />,
      action: () => window.open(calendarLinks.google, "_blank"),
    },
    {
      name: "Outlook",
      icon: <OutlookIcon />,
      action: () => window.open(calendarLinks.outlook, "_blank"),
    },
    {
      name: "Office 365",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M21 3H3v18h18V3z" fill="#EA3E23"/>
          <path d="M9.5 7h5l-2.5 10-2.5-10z" fill="#fff"/>
        </svg>
      ),
      action: () => window.open(calendarLinks.office365, "_blank"),
    },
    {
      name: "Yahoo Calendar",
      icon: <YahooIcon />,
      action: () => window.open(calendarLinks.yahoo, "_blank"),
    },
    {
      name: "Apple Calendar / iCal",
      icon: <AppleIcon />,
      action: () => calendarLinks.ics(),
    },
    {
      name: "Download .ics bestand",
      icon: <Download className="w-5 h-5 text-gray-600" />,
      action: () => calendarLinks.ics(),
    },
  ];

  return (
    <div className={cn("relative", className)}>
      {/* Main Button using UI Button component */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        type={buttonType}
        variant={buttonVariant}
        size={buttonSize}
        className="relative"
      >
        <Calendar className="w-5 h-5" />
        <span>Toevoegen aan Agenda</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu - Opens above button */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 w-72 rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-200"
            >
              <div className="p-2">
                {calendars.map((calendar, index) => (
                  <motion.button
                    key={calendar.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      calendar.action();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-left group"
                  >
                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      {calendar.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                      {calendar.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Info footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  Kies je favoriete agenda-app
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
