"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const NAV = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // GSAP animation for navbar load: fade-in + slide-down
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  // Listen scroll to toggle glassmorphism background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth scroll to section and update active state
  const scrollToSection = (href: string, label: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActive(label);
      setIsMenuOpen(false);
    }
  };

  // Observer to detect which section is in view
  useEffect(() => {
    const sections = NAV.map((nav) => document.querySelector(nav.href)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const navItem = NAV.find((nav) => nav.href === `#${id}`);
            if (navItem) {
              setActive(navItem.label);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-80px 0px -80px 0px",
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Framer Motion variants for menu item
  const itemVariants = {
    initial: { scale: 1, color: "#374151" },
    hover: { scale: 1.08, color: "#111827" },
    tap: { scale: 0.96 },
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center py-4 px-4">
      <motion.nav
        ref={navRef}
        className={`
          pointer-events-auto w-auto
          ${scrolled
            ? "bg-gradient-to-br from-gray-900/40 via-black/30 to-gray-800/50 backdrop-blur-xl shadow-lg border border-white/10"
            : "bg-transparent shadow-none border border-transparent"}
          ${isMobile ? "rounded-2xl w-full max-w-sm" : "rounded-full"}
          transition-all duration-300
          px-4 md:px-12 py-3 md:py-4
        `}
        style={{
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {isMobile ? (
          // Mobile Navigation
          <div className="flex items-center justify-between w-full">
            <span className="text-lg font-semibold text-gray-100">Portfolio</span>
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-200 hover:text-white transition-colors p-2"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        ) : (
          // Desktop Navigation
          <div className="flex gap-2 md:gap-4 justify-center">
            {NAV.map((item) => {
              const isActive = active === item.label;
              return (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={() => scrollToSection(item.href, item.label)}
                  variants={itemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className={`relative font-medium text-base px-2 py-1 focus:outline-none transition
                    ${isActive ? "text-gray-100" : "text-gray-300"}
                    drop-shadow-[0_1px_4px_rgba(0,0,0,0.10)]`}
                  style={{ background: "none" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="absolute inset-0 z-0 bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-black/60 rounded-full px-4 py-2 backdrop-blur-sm border border-white/10"
                      style={{
                        pointerEvents: "none",
                        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.2)",
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 px-4 py-2 ${
                      isActive ? "font-semibold text-gray-100" : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : -20,
            pointerEvents: isMenuOpen ? "auto" : "none",
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-20 left-4 right-4 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="py-2">
            {NAV.map((item) => {
              const isActive = active === item.label;
              return (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href, item.label)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-6 py-3 transition-colors
                    ${isActive
                      ? "bg-gradient-to-r from-gray-800/60 to-gray-900/60 text-gray-100 font-semibold"
                      : "text-gray-300 hover:bg-gray-700/30 hover:text-gray-200"
                    }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
