"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workExperience, leadershipRoles, education, courses, awards } from "@/data/experience";
import { useTranslation } from "@/hooks/useTranslation";
import SectionWrapper from "./SectionWrapper";

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const { t, localize } = useTranslation();

  return (
    <SectionWrapper id="experience">
      <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-4 text-center">
        {localize(t.experience.title)}
      </h2>
      <p className="text-white/58 text-lg text-center mb-12">
        {localize(t.experience.intro)}
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Work Experience - Accordion */}
        <div>
          <h3 className="font-heading text-xl font-bold text-white mb-6">
            {localize(t.experience.professional)}
          </h3>
          <div className="flex flex-col gap-3">
            {workExperience.map((job, i) => (
              <div
                key={job.company}
                onMouseEnter={() => {
                  if (window.matchMedia?.("(hover: hover)").matches) {
                    setExpandedIndex(i);
                  }
                }}
                className="glass-card neon-hover-pink rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === i ? null : i)
                  }
                  className="w-full p-4 text-left flex items-start justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan"
                >
                  <div>
                    <div className="font-semibold text-white">
                      {localize(job.role)}
                    </div>
                    <div className="text-sm text-neon-pink font-medium">
                      {job.company}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-white/50">{localize(job.dates)}</div>
                    <div className="text-xs text-white/40">
                      {localize(job.location)}
                    </div>
                  </div>
                </button>
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="px-4 pb-4 space-y-2">
                        {job.bullets.map((b) => (
                          <li
                            key={b.en}
                            className="text-sm text-white/68 flex gap-2"
                          >
                            <span className="text-neon-cyan mt-1 shrink-0">
                              {"\u25B8"}
                            </span>
                            {localize(b)}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Grid */}
        <div>
          <h3 className="font-heading text-xl font-bold text-white mb-6">
            {localize(t.experience.leadership)}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {leadershipRoles.map((role, i) => (
              <motion.div
                key={role.org}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl glass-card neon-hover-cyan"
              >
                <div className="text-xs text-neon-cyan font-semibold uppercase tracking-wider">
                  {localize(role.title)}
                </div>
                <div className="font-semibold text-sm text-white mt-1">
                  {role.org}
                </div>
                <div className="text-xs text-white/40 mt-1">
                  {localize(role.dates)}
                </div>
                <p className="text-xs text-white/62 mt-2">
                  {localize(role.description)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Education, Courses & Awards */}
      <div className="mt-12 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-heading text-xl font-bold text-white mb-6">
            {localize(t.experience.education)}
          </h3>
          <div className="flex flex-col gap-3">
            {education.map((edu) =>
              edu.majors.map((major) => (
                <div
                  key={localize(major)}
                  className="glass-card rounded-xl p-4 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold text-white">{localize(major)}</div>
                    <div className="text-sm text-neon-pink font-medium">{edu.degree}</div>
                    <div className="text-xs text-white/50 mt-1">{edu.school}</div>
                  </div>
                  <div className="text-xs text-white/40 shrink-0 text-right">
                    {localize(edu.dates)}
                  </div>
                </div>
              ))
            )}
          </div>

          <h3 className="font-heading text-xl font-bold text-white mt-8 mb-6">
            {localize(t.experience.courses)}
          </h3>
          <div className="flex flex-col gap-3">
            {courses.map((course) => (
              <div key={course.name} className="p-4 rounded-xl glass-card">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold text-white">{course.name}</div>
                  <div className="text-xs text-white/40 shrink-0 text-right">{localize(course.dates)}</div>
                </div>
                <div className="text-sm text-neon-cyan font-medium">{course.org}</div>
                <p className="text-xs text-white/62 mt-2">{localize(course.description)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl font-bold text-white mb-6">
            {localize(t.experience.awards)}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {awards.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-4 rounded-xl glass-card neon-hover-cyan flex items-center gap-4"
              >
                <span className="text-2xl shrink-0">{"\u{1F3C6}"}</span>
                <div>
                  <div className="font-semibold text-sm text-white">{award.title}</div>
                  <div className="text-xs text-white/55 mt-1">{localize(award.detail)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
