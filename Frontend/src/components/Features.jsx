import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Users,
  ShieldCheck,
  History,
  MessageSquare,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    desc: "Generate, improve and summarize documents instantly with AI.",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    desc: "Edit documents together with live cursors and instant updates.",
  },
  {
    icon: MessageSquare,
    title: "Document Comments",
    desc: "Discuss ideas directly inside documents with threaded comments.",
  },
  {
    icon: History,
    title: "Version History",
    desc: "Restore any previous version without losing your work.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Workspace",
    desc: "JWT authentication and encrypted document storage keep data safe.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Built with modern technologies for blazing fast performance.",
  },
];

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-28">
   
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-[150px]" />
        <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
            Why Choose DevDocs
          </span>

          <h2 className="mt-8 text-5xl font-black text-white">
            Everything You Need To
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Build Faster
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            A modern collaborative workspace designed for developers,
            students and teams with AI-powered productivity.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: .7,
                  delay: index * .1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              > 

                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30">
                    <Icon className="text-white" size={30} />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-8 text-gray-400">
                    {feature.desc}
                  </p>

                  <button className="mt-8 text-indigo-400 transition group-hover:text-cyan-300">
                    Learn More →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;