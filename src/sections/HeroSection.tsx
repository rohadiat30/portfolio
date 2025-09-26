"use client";
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

const textStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const textFade = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};
const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

const HeroSection: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  // Parallax effects
  useEffect(() => {
    if (!heroRef.current || !textRef.current || !image1Ref.current || !image2Ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Text parallax - moves slower and fades
    tl.to(textRef.current, {
      y: -100,
      opacity: 0.3,
      scale: 0.95,
      ease: "power2.out",
    }, 0);

    // First image parallax - moves up and rotates
    tl.to(image1Ref.current, {
      y: -150,
      rotation: 12,
      scale: 1.1,
      ease: "power2.out",
    }, 0);

    // Second image parallax - moves up faster and rotates opposite
    tl.to(image2Ref.current, {
      y: -200,
      rotation: -12,
      scale: 0.9,
      opacity: 0.7,
      ease: "power2.out",
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 select-none overflow-hidden mb-10"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0-z-10" />

      <motion.div
        variants={textStagger}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-7xl mx-auto flex items-center justify-center"
      >
        {/* Main content container */}
        <div className="relative flex items-center justify-center">
          {/* Red highlight box behind text */}
          <motion.div
            ref={image1Ref}
            variants={scaleIn}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
            className="absolute w-[200px] h-[300px] md:w-[300px] md:h-[400px] overflow-hidden rounded-2xl right-1 -z-10 shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.6), 0 0 80px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/img/profil.png"
                alt="Portrait"
                fill
                className="object-cover rounded-2xl"
              />
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-2xl shadow-inner" style={{
                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3)'
              }} />
            </div>
          </motion.div>
          {/* Portrait image with red overlay */}
          <motion.div
            ref={image2Ref}
            variants={scaleIn}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 1.0 }}
            className="absolute w-[200px] h-[300px] md:w-[300px] md:h-[400px] overflow-hidden rounded-2xl opacity-70 transform rotate-6 shadow-2xl right-1"
            style={{ 
              zIndex: -5,
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.7), 0 0 100px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/img/profil.png"
                alt="Portrait"
                fill
                className="object-cover rounded-2xl"
              />
              {/* Red overlay with glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 to-orange-500/40 mix-blend-multiply rounded-2xl" />
              <div className="absolute inset-0 bg-black/10 rounded-2xl" />
              {/* Outer glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl blur-sm -z-10" />
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-2xl shadow-inner" style={{
                boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.4)'
              }} />
            </div>
          </motion.div>

          {/* Main typography */}
          <div ref={textRef} className="text-start relative z-10">
            <motion.h1
              variants={textFade}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-normal leading-[0.9] tracking-tight text-white mb-0"
              style={{ letterSpacing: "-0.05em" }}
            >
              HELLO
            </motion.h1>
            <motion.h1
              variants={textFade}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-normal leading-[0.9] tracking-tight text-white mb-0"
              style={{ letterSpacing: "-0.05em" }}
            >
              I&apos;M RAMDAN
            </motion.h1>
            <motion.h1
              variants={textFade}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-normal leading-[0.9] tracking-tight text-white"
              style={{ letterSpacing: "-0.05em" }}
            >
              ROHADIAT
            </motion.h1>
          </div>
        </div>

      </motion.div>

      {/* Bottom layout */}
      <div className="absolute bottom-4 left-0 right-0 px-4 md:px-8">
        <motion.div
          variants={textFade}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
          className="flex justify-between items-center text-center"
        >
          <p className="text-xs text-gray-500 font-mono">
            {new Date().toLocaleTimeString('en-US', {
              hour12: false,
              timeZone: 'Asia/Jakarta',
              hour: '2-digit',
              minute: '2-digit'
            })} WIB
          </p>

            <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-wider mb-1">
              A FRONTEND DEVELOPER BASED IN<br />
              INDONESIA
            </p>
            <p className="text-xs text-gray-500">©2024</p>
        </motion.div>
      </div> 
    </section>
  );
};

export default HeroSection;
