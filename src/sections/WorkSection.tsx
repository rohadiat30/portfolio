/* eslint-disable @typescript-eslint/no-explicit-any */
// components/WorkSection.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  name: string;
  link?: string;
};

type Item = {
  year: string;
  title: string;
  company: string;
  description?: string;
  location?: string;
  bullets?: string[];
  link?: string;
  projects?: Project[];
};

const defaultItems: Item[] = [
  {
    year: "2023 - NOW",
    title: "Frontend Web Developer",
    company: "Ordent",
    location: "Bandung, ID",
    bullets: [
      "My role in this company is as a Frontend Developer, utilizing Next.js, TypeScript, TailwindCSS, Micro Frontend (Module Federation), Bitbucket, and Swagger.",
      "Responsible for developing Qlola by BRI, a web cash management system.",
      "Key features I contributed to include user authentication, dashboard analytics, and real-time transaction monitoring."
    ],
    link: "https://bricams.bri.co.id/login",
  },
  {
    year: "2022 - 2023",
    title: "Frontend Developer & UI/UX Design",
    company: "PT. KSI",
    location: "Bandung, ID",
    bullets: [
      "Developed and designed multiple landing pages for various clients.",
      "Collaborated with design teams to create user-friendly interfaces.",
      "Implemented responsive designs and optimized web performance."
    ],
    projects: [
      {
        name: "Landing Page Catra Research Institute UI Design",
        link: "https://www.figma.com/proto/5J7ALXoeoHWc0fvAYQSiJH/Untitled?node-id=64-1227&starting-point-node-id=64%3A1227&scaling=scale-down-width&content-scaling=fixed"
      },
      {
        name: "Landing Page PT KSI UI Design",
        link: "https://www.figma.com/proto/nFLwpTGi9Z0dBnLIKh21qV/Startegis-Jadul?node-id=1-29&starting-point-node-id=1%3A29"
      },
      {
        name: "Landing Page Noside UI Design",
        link: "https://www.figma.com/proto/1laQqeYU12w7BfTuH4Qtky/Untitled?node-id=1-2&starting-point-node-id=1%3A2&scaling=scale-down-width&content-scaling=fixed"
      },
      {
        name: "Landing Page Maharati UI Design",
        link: "https://www.figma.com/proto/dcLJLwqOSrHvyIdk5cayXA/Maharati-research-Institute?node-id=1-706&scaling=scale-down-width&content-scaling=fixed"
      },
      {
        name: "Slicing Admin Dashboard Website",
        link: "https://admin-dashboard-11236kcw4-ramdan-rohadiats-projects.vercel.app/"
      }
    ],
  },
];

type Props = {
  items?: Item[];
};

const WorkSection: React.FC<Props> = ({
  items = defaultItems,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Gesture handlers untuk swipe
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setEndX(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setEndX(e.clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50; // Minimum swipe distance in pixels
    const diffX = startX - endX;

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
    }
  };

  return (
    <section className="relative z-10 py-16 md:py-20 bg-gradient-to-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Work Experience
          </motion.h2>
          <motion.div
            className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ originX: 0.5 }}
          ></motion.div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel Content dengan Gesture Support */}
          <div 
            className="relative overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="w-full select-none"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 100) {
                    prevSlide();
                  } else if (info.offset.x < -100) {
                    nextSlide();
                  }
                }}
              >
                <div className="bg-gradient-to-br from-gray-800/60 via-gray-700/40 to-gray-900/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 border border-white/10 backdrop-blur-sm mb-4">
                        <span className="text-white font-semibold text-sm md:text-base tracking-wide">
                          {items[currentIndex].year}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                        {items[currentIndex].title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <p className="text-lg md:text-xl text-white/90 font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {items[currentIndex].company}
                        </p>
                        {items[currentIndex].location && (
                          <span className="text-sm text-white/60 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {items[currentIndex].location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    {/* Description & Bullets */}
                    {items[currentIndex].description && (
                      <p className="text-white/80 leading-relaxed text-base md:text-lg">
                        {items[currentIndex].description}
                      </p>
                    )}
                    
                    {items[currentIndex].bullets && items[currentIndex].bullets!.length > 0 && (
                      <div className="space-y-3">
                        {items[currentIndex].bullets!.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-purple-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white/85 leading-relaxed text-base md:text-lg">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Projects List */}
                    {items[currentIndex].projects && items[currentIndex].projects!.length > 0 && (
                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-white font-semibold mb-4 text-lg flex items-center">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Projects:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {items[currentIndex].projects!.map((project, pIdx) => (
                            <div key={pIdx} className="flex items-start p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                              <svg className="w-4 h-4 text-green-400 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <div className="flex-1">
                                {project.link ? (
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm md:text-base font-medium hover:underline"
                                  >
                                    {project.name}
                                  </a>
                                ) : (
                                  <span className="text-white/90 text-sm md:text-base">{project.name}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Project Link */}
                    {items[currentIndex].link && (
                      <div className="pt-6 border-t border-white/10">
                        <a
                          href={items[currentIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                        >
                          View Project
                          <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Swipe Instruction Hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <motion.div
                className="flex items-center space-x-2 text-white/50 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span>Swipe to navigate</span>
                <motion.div
                  className="flex space-x-1"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to experience ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-white/70 text-sm">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 border border-white/10 backdrop-blur-lg">
            <span className="text-white/80 text-sm md:text-base font-medium">
              {items.length} experiences and counting...
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;