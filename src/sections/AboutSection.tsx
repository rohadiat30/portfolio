/* eslint-disable prefer-const */
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { skillsData } from "../../public/icons/index";
import Image from "next/image";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const skills = skillsData;

  // Running/scrolling logic
  const showScroll = skillsData.length > 7;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!showScroll || !scrollRef.current) return;
    let animId: number;
    const scrollContainer = scrollRef.current;
    let scrollWidth = 0;
    let scrollPosition = 0;
    const speed = 0.5; // pixels per frame

    function animate() {
      if (!isHovered && scrollRef.current) {
        // Recalculate scroll width on each frame to handle dynamic content
        scrollWidth = scrollRef.current.scrollWidth / 2;
        
        scrollPosition += speed;
        if (scrollPosition >= scrollWidth) {
          scrollPosition = 0;
        }
        // Use smooth scrolling with fractional values
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'auto'
        });
      }
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [showScroll, isHovered, skillsData.length]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="items-center p-6 pt-24"
      style={{ y, opacity, scale }}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Modern Profile Card */}
          <motion.div
            className="relative  bg-gradient-to-br from-gray-800/20 via-gray-700/15 to-gray-900/25 rounded-3xl p-8 shadow-2xl border border-white/10 max-w-sm w-full"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Profile Image */}
            <div className="relative mb-6 flex justify-center">
              <div className="relative">
                <Image
                  src="/img/profil.png"
                  alt="Ramdan Rohadiat"
                  width={120}
                  height={120}
                  className="w-28 h-28 rounded-2xl object-cover shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Name & Verification */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">Ramdan Rohadiat</h3>
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">
                Frontend Developer & UI/UX Enthusiast
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-6 py-4 border-t border-white/10">
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-300">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-xs">500+</span>
                </div>
                <p className="text-xs text-gray-500">Connections</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-300">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2M7 7h10"
                    />
                  </svg>
                  <span className="text-xs">5+</span>
                </div>
                <p className="text-xs text-gray-500">Projects</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.a
                href="https://drive.google.com/file/d/1LZqKJ1beK1m62dO3XYJVgt8N9Z8Mgyfc/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white hover:bg-gray-100 text-gray-900 px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                download
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8l-8 8-8-8"
                  />
                </svg>
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-gradient-to-br from-gray-800/20 via-gray-700/15 to-gray-900/25 border border-white/10 shadow-2xl rounded-3xl p-8 h-full flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              About Me
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold">
              ✅ Open to work
            </span>
          </div>
          <p className="text-base md:text-lg text-gray-100/90 leading-relaxed">
            I am a dedicated Frontend Developer with expertise in Next.js, TypeScript, and Tailwind CSS. I enjoy transforming ideas into responsive, user-friendly, and visually engaging web applications. With a background in UI/UX design, I focus on delivering clean interfaces and seamless user experiences that balance functionality and aesthetics.
          </p>
        </motion.div>
      </div>
      <div className="flex flex-wrap gap-6 justify-center py-8">
        {!showScroll ? (
          // Normal grid if <= 7 skills
          skillsData.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center gap-2  bg-gradient-to-br from-gray-800/20 via-gray-700/15 to-gray-900/25 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-4 w-28"
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                width={40}
                height={40}
                className="w-10 h-10 filter brightness-0 invert"
              />
              <span className="text-white text-sm">{skill.name}</span>
            </motion.div>
          ))
        ) : (
          // Running/scrolling skills if > 7
          <div
            ref={scrollRef}
            className="w-full max-w-3xl overflow-x-hidden whitespace-nowrap relative group scrollbar-hide h-32 flex items-center"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 10%, black 90%, transparent 100%)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: 'auto',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex gap-6 min-w-max will-change-transform">
              {[...skills, ...skills].map((skill, idx) => (
                <div
                  key={skill.id + "-" + idx}
                  className="flex flex-col items-center gap-2 bg-gradient-to-br from-gray-800/20 via-gray-700/15 to-gray-900/25 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-4 w-28 will-change-transform"
                  style={{ flex: "0 0 auto" }}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 filter brightness-0 invert"
                  />
                  <span className="text-white text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
            <style jsx>{`
              .group::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default AboutSection;