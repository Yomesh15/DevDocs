import React from "react";
import { motion } from "motion/react";
import {
  SiReact,
  SiMongodb,
  SiFirebase,
  SiGithub,
  SiNodedotjs,
  SiJavascript,
  SiDocker,
  SiTypescript,
} from "react-icons/si";

const techs = [
  { icon: SiReact, name: "React" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiFirebase, name: "Firebase" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiGithub, name: "GitHub" },
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiDocker, name: "Docker" },
];

const Companies = () => {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-24">
    
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
 
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
        className="mx-auto max-w-7xl px-6"
      >
        <p className="text-center text-sm font-semibold uppercase tracking-[0.35em] text-gray-400">
          Built With Modern Technologies
        </p>

        <h2 className="mt-5 text-center text-4xl font-black text-white">
          Everything You Need
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            In One Workspace
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-center text-gray-400">
          DevDocs combines the latest technologies to deliver a lightning-fast,
          secure and collaborative document editing experience.
        </p>
 
        <div className="relative mt-16 overflow-hidden">
      
          <div className="absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#030712] to-transparent" />
          <div className="absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#030712] to-transparent" />

          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
            className="flex w-max gap-6"
          >
            {[...techs, ...techs].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  key={index}
                  className="flex mt-2 min-w-[220px] items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-7 py-6 backdrop-blur-xl"
                >
                  <Icon
                    size={34}
                    className="text-indigo-400"
                  />

                  <span className="text-lg font-semibold text-white">
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
 
        <div className="mt-20 grid gap-6 md:grid-cols-4">

          {[
            {
              number: "99.9%",
              text: "Realtime Sync"
            },
            {
              number: "AI",
              text: "Document Assistant"
            },
            {
              number: "∞",
              text: "Version History"
            },
            {
              number: "24/7",
              text: "Cloud Access"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * .15,
                duration: .6
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03
              }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
            >
              <h3 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-4xl font-black text-transparent">
                {item.number}
              </h3>

              <p className="mt-3 text-gray-400">
                {item.text}
              </p>
            </motion.div>
          ))}

        </div>
      </motion.div>
    </section>
  );
};

export default Companies;