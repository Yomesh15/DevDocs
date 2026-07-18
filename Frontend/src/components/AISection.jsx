import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Wand2,
  Languages,
  FileText,
  Brain,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    icon: Wand2,
    title: "Generate Documentation",
    desc: "Create complete technical documentation with one prompt.",
  },
  {
    icon: Brain,
    title: "Explain Code",
    desc: "Understand complex code in simple language instantly.",
  },
  {
    icon: FileText,
    title: "Summarize Notes",
    desc: "Convert long documents into concise summaries.",
  },
  {
    icon: Languages,
    title: "Translate",
    desc: "Translate documentation into multiple languages.",
  },
];


const AISection = () => {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-28">
 
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-10 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[180px]" />
        <div className="absolute right-20 bottom-10 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[180px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
 

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >

          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm text-purple-300">
            AI Powered
          </span>

          <h2 className="mt-7 text-5xl font-black text-white leading-tight">
            Meet Your
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              AI Assistant
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Let AI handle repetitive work while you focus on building.
            Generate documentation, summarize notes, explain code,
            translate content and improve writing instantly.
          </p>

          <button
            className="mt-10 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-xl shadow-indigo-600/30 transition hover:scale-105"
          >
            Explore AI
            <ArrowRight size={18}/>
          </button>

        </motion.div>
 

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .9 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2"
        >

          {tools.map((tool, index) => {

            const Icon = tool.icon;

            return (

              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/30">

                  <Icon
                    size={30}
                    className="text-white"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {tool.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-400">
                  {tool.desc}
                </p>

              </motion.div>

            );

          })}

        </motion.div>

      </div>
 
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="mx-auto mt-20 max-w-3xl rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 p-8 backdrop-blur-xl"
      >

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-4">

            <Sparkles className="text-white"/>

          </div>

          <div>

            <h3 className="text-2xl font-bold text-white">
              AI Suggestion
            </h3>

            <p className="mt-2 text-gray-300">
              Your documentation is missing an installation section.
              Would you like me to generate one automatically?
            </p>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default AISection;