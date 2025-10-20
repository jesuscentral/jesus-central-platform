'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ChevronDown } from 'lucide-react'
import { SbEvent } from '@storyblok/types/287435740670216/storyblok-components'
import { generateAllCalendarLinks } from '@/lib/calendar'
import { cn } from '@/utils/cn'
import Button, { ButtonType } from '@/components/ui/atoms/Button'
import AppleIcon from '@/components/ui/icons/apple'
import OutlookIcon from '@/components/ui/icons/outlook'
import GoogleIcon from '@/components/ui/icons/google'
interface AddToCalendarProps {
  event: SbEvent
  baseUrl?: string
  className?: string
  buttonType?: ButtonType
  buttonVariant?: 'primary' | 'outline'
  buttonSize?: 'small' | 'medium' | 'large'
}

export default function AddToCalendar({
  event,
  baseUrl,
  className,
  buttonType = 'strategy-red',
  buttonVariant = 'primary',
  buttonSize = 'large',
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const calendarLinks = generateAllCalendarLinks(event, baseUrl)

  const calendars = [
    {
      name: 'Google Calendar',
      icon: <GoogleIcon />,
      action: () => window.open(calendarLinks.google, '_blank'),
    },
    {
      name: 'Outlook',
      icon: <OutlookIcon />,
      action: () => window.open(calendarLinks.outlook, '_blank'),
    },
    {
      name: 'Apple Calendar / iCal',
      icon: <AppleIcon />,
      action: () => calendarLinks.ics(),
    },
  ]

  return (
    <div className={cn('relative', className)}>
      {/* Main Button using UI Button component */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        type={buttonType}
        variant={buttonVariant}
        size={buttonSize}
        className="relative"
      >
        <Calendar className="h-5 w-5" />
        <span>Toevoegen aan Agenda</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-300',
            isOpen && 'rotate-180',
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
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute bottom-full left-1/2 z-50 mb-4 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            >
              <div className="p-2">
                {calendars.map((calendar, index) => (
                  <motion.button
                    key={calendar.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      calendar.action()
                      setIsOpen(false)
                    }}
                    className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-200 hover:bg-gray-100"
                  >
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      {calendar.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                      {calendar.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Info footer */}
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-center text-xs text-gray-600">
                  Kies je favoriete agenda-app
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
