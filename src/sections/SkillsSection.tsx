"use client";
import { motion } from "framer-motion";

const skills = [
  { id: "1", name: "Next.js", icon: "/icons/nextjs.svg" },
  { id: "2", name: "TypeScript", icon: "/icons/typescript.svg" },
  { id: "3", name: "Tailwind", icon: "/icons/tailwind.svg" },
  { id: "4", name: "GSAP", icon: "/icons/gsap.svg" },
  { id: "5", name: "Framer Motion", icon: "/icons/framer.svg" },
];

const SkillsSection = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Skills & Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            className="bg-[#1e1e2e] p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={skill.icon} alt={skill.name} className="w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;