/* eslint-disable @typescript-eslint/no-explicit-any */
// components/WorkSection.tsx
"use client";

import React, { useEffect, useRef } from "react";

type Item = {
  year: string;
  title: string;
  company: string;
  description?: string;
  location?: string;
  bullets?: string[];
  link?: string;
};

const defaultItems: Item[] = [
  {
    year: "2023 - NOW",
    title: "Frontend Web Developer",
    company: "Ordent",
    location: "Bandung, ID",
    bullets: [
      "My role in this company is as a Frontend Developer, utilizing Next.js, TypeScript, TailwindCSS, Micro Frontend (Module Federation), Bitbucket, and Swagger. I am responsible for developing Qlola by BRI, a web cash management system. Key features I contributed to include:"
    ],
    link: "https://example.com/project-a",
  },
  {
    year: "2022 - 2023",
    title: "Frontend Developer & UI/UX Design",
    company: "PT. Keberlanjutan Strategis Indonesia",
    location: "Bandung, ID",
    bullets: [
      "Built reusable UI with React.js & Tailwind CSS.",
      "Collaborated with designers using Figma.",
      "Integrated frontend with backend & applied responsive design.",
      "Optimized performance and supported feature improvements."
    ],
    link: "https://example.com/project-b",
  },
  {
    year: "2020-2022",
    title: "Machine Operator",
    company: "PT. Kimia Farma",
    location: "Bandung, ID",
    bullets: ["Operated Sifter, PMA, Wetmill, FBD, Drymill, PLB, and Mixer machines for granulation processes.",
      "Prepared and applied binder solutions during production.",
      "Monitored granulation to ensure compliance with procedures and prevent errors.",
      "Performed machine cleaning and maintained area hygiene."],
    link: "https://example.com/project-c",
  },
];

type Props = {
  items?: Item[];
  enableOnMobile?: boolean;
};

const WorkSection: React.FC<Props> = ({
  items = defaultItems,
  enableOnMobile = false,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    if (isSmall && !enableOnMobile) return;

    let gsap: any;
    let ScrollTrigger: any;

    Promise.resolve().then(async () => {
      const mod = await import("gsap");
      gsap = mod.default || mod;
      const st = await import("gsap/ScrollTrigger");
      ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!rootRef.current || !cardsRef.current) return;

      const container = rootRef.current;
      const cards = Array.from(
        cardsRef.current.querySelectorAll(".cv-card")
      ) as HTMLElement[];

      ScrollTrigger.getAll().forEach((t: any) => t.kill());

      cards.forEach((cardEl, i) => {
        if (i === 0) {
          gsap.set(cardEl, { y: 0, opacity: 1, scale: 1, zIndex: items.length });
        } else {
          gsap.set(cardEl, {
            y: 100,
            opacity: 0,
            scale: 0.95,
            zIndex: items.length - i,
          });
        }
      });

      // After setting initial card states, create the timeline used below
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          // further reduce scroll length for contact to overlap sooner
          end: () => `+=${window.innerHeight * items.length * 1.2}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Build timeline: keep first and second cards fixed (anchors), subsequent cards overlay.
      cards.forEach((cardEl, i) => {
        if (i === 0) return; // kartu pertama tetap sebagai anchor

        const prevCard = cards[i - 1];
        const currCard = cardEl;
        const base = i * 4;

        if (i === 1 || i === 2) {
          // Untuk kartu 1 dan 2: jangan keluarkan prev, cukup bawa curr masuk dan overlay
          // Animate current card in and fade previous card to 0
          tl.to(
            prevCard,
            {
              opacity: 0,
              ease: "power2.inOut",
              duration: 2,
            },
            base
          ).fromTo(
            currCard,
            { y: 120, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              zIndex: items.length + i,
              ease: "power2.out",
              duration: 3,
            },
            base + 0.5
          );
        } else {
          // Untuk kartu > 2: prev keluar (naik + fade), curr masuk dari bawah
          tl.to(
            prevCard,
            {
              y: -120,
              opacity: 0,
              scale: 0.97,
              ease: "power2.inOut",
              duration: 3,
            },
            base
          ).fromTo(
            currCard,
            { y: 120, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              zIndex: items.length + i,
              ease: "power2.out",
              duration: 3,
            },
            base + 1
          );
        }
      });
    });

    return () => {
      try {
        const stMod = (window as any).gsap?.ScrollTrigger;
        if (stMod?.getAll) stMod.getAll().forEach((t: any) => t.kill());
      } catch {
        //
      }
    };
  }, [items.length, enableOnMobile]);

  // further reduce spacer so contact overlaps the work section
  const spacerHeight = `${Math.max(20, items.length * 40)}vh`;

  return (
    <section ref={rootRef} className="relative z-10">
      <div style={{ height: spacerHeight }} className="pointer-events-none" />
      <div className="absolute inset-0 top-0">
        <div className="sticky top-0 h-screen flex items-end justify-center">
          <div className="w-full max-w-6xl px-6">
            {/* Title centered above the pinned stack */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Work
              </h2>
            </div>

            {/* Pinned card stack below the title */}
            <div className="mt-4">
              <div
                ref={cardsRef}
                className="relative w-full h-[75vh] flex items-end mx-auto max-w-4xl"
                aria-hidden="false"
              >
                {items.map((it, idx) => (
                  <article
                    key={idx}
                    className="cv-card absolute left-0 right-0 bottom-0 mx-auto w-[98%] max-w-6xl rounded-3xl p-12 shadow-xl bg-gradient-to-br from-gray-800/20 via-gray-700/15 to-gray-900/25 backdrop-blur-lg border border-white/10 min-h-[70vh] flex flex-col justify-center"
                    style={{ transformOrigin: "center" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-10">
                      <div className="flex-shrink-0 w-full md:w-40">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/40 via-gray-700/30 to-gray-900/50 border border-white/10 backdrop-blur-sm">
                          <span className="text-white font-semibold text-sm md:text-base tracking-wide">
                            {it.year}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                          {it.title}
                        </h3>
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
                          <p className="text-lg md:text-xl text-white/90">{it.company}</p>
                          {it.location && (
                            <span className="text-sm text-white/70">• {it.location}</span>
                          )}
                        </div>
                        {it.description && (
                          <p className="text-base md:text-lg text-white/80 mt-4 max-w-prose">
                            {it.description}
                          </p>
                        )}

                        {/* bullets / highlights */}
                        {it.bullets && it.bullets.length > 0 && (
                          <div className="mt-4">
                            {it.bullets.length === 1 ? (
                              <p className="text-sm md:text-base text-white/85">
                                {it.bullets[0]}
                              </p>
                            ) : (
                              <ul className="list-disc pl-5 space-y-2 text-white/85">
                                {it.bullets.map((b, i) => (
                                  <li key={i} className="text-sm md:text-base">
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;