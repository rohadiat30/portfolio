"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { socialData } from "../../public/icons";

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={sectionRef}
      className="max-w-2xl mx-auto py-24 px-4 text-center"
      style={{ y, opacity }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        Contact
      </h2>
      <motion.a
        href="mailto:rohadiat30@gmail.com"
        className="inline-block text-lg text-indigo-400 hover:text-indigo-300 font-semibold mb-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        rohadiat30@gmail.com
      </motion.a>
      <div className="flex justify-center gap-6 mt-8">
        {socialData.map((s) => (
          <motion.a
            key={s.id}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex items-center gap-2shadow-xl bg-gradient-to-br from-gray-800/20 via-gray-700/15 to-gray-900/25 backdrop-blur-lg border border-white/10 rounded-full px-5 py-2 text-white shadow-xl"
          >
            <img
              src={s.icon}
              alt={s.name}
              className="w-5 h-5 filter brightness-0 invert"
            />
            {s.name}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactSection;
