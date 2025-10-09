"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check } from "lucide-react";
import Button, { ButtonType } from "@/components/ui/atoms/Button";
import { cn } from "@/utils/cn";

interface ShareButtonProps {
  title: string;
  text?: string;
  url: string;
  className?: string;
  buttonType?: ButtonType;
  buttonVariant?: "primary" | "outline";
  buttonSize?: "small" | "medium" | "large";
}

export default function ShareButton({
  title,
  text = "",
  url,
  className,
  buttonType = "strategy-red",
  buttonVariant = "primary",
  buttonSize = "large",
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if Web Share API is available
  const canShare = typeof navigator !== "undefined" && navigator.share;

  const handleNativeShare = async () => {
    if (!canShare) return;

    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (error) {
      // User cancelled or error occurred
      console.log("Share cancelled or failed:", error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: "text-[#25D366]",
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
        window.open(whatsappUrl, "_blank");
        setIsOpen(false);
      },
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: "text-[#1877F2]",
      action: () => {
        const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(fbUrl, "_blank");
        setIsOpen(false);
      },
    },
    {
      name: "Twitter / X",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      color: "text-black",
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, "_blank");
        setIsOpen(false);
      },
    },
    {
      name: "Email",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      color: "text-gray-600",
      action: () => {
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
        window.location.href = mailtoUrl;
        setIsOpen(false);
      },
    },
    {
      name: copied ? "Link gekopieerd!" : "Kopieer link",
      icon: copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />,
      color: copied ? "text-green-600" : "text-gray-600",
      action: handleCopyLink,
    },
  ];

  const handleClick = () => {
    // Use native share if available (mobile devices)
    if (canShare) {
      handleNativeShare();
    } else {
      // Show custom share menu on desktop
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Share Button */}
      <Button
        onClick={handleClick}
        type={buttonType}
        variant={buttonVariant}
        size={buttonSize}
        className="relative"
      >
        <Share2 className="w-5 h-5" />
        <span>Delen</span>
      </Button>

      {/* Custom Share Menu (Desktop fallback) */}
      <AnimatePresence>
        {isOpen && !canShare && (
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
                {shareOptions.map((option, index) => (
                  <motion.button
                    key={option.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={option.action}
                    disabled={copied && option.name.includes("gekopieerd")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-left group disabled:opacity-100"
                  >
                    <div className={cn("flex-shrink-0 w-5 h-5 flex items-center justify-center", option.color)}>
                      {option.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900">
                      {option.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Info footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  Deel dit evenement met anderen
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
