import React from "react";
import { motion } from "motion/react";
import {
  UserPlus,
  FileText,
  Users,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Workspace",
    desc: "Sign up in seconds and create your personal or team workspace.",
  },
  {
    icon: FileText,
    title: "Create Documents",
    desc: "Write notes, technical docs, APIs and project documentation easily.",
  },
  {
    icon: Users,
    title: "Collaborate Live",
    desc: "Invite teammates and edit together with live cursors and comments.",
  },
  {
    icon: Rocket,
    title: "Publish & Share",
    desc: "Share your documentation securely with your team or the world.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-28">
 
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-[170px]" />
        <div className="absolute right-0 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[170px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
            Simple Workflow
          </span>

          <h2 className="mt-7 text-5xl font-black text-white">
            Start Collaborating
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              In Minutes
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            DevDocs keeps everything simple. Create, collaborate and publish
            documents with an intuitive workflow.
          </p>

        </motion.div>

        <div className="relative mt-24">
 
          <div className="absolute left-0 top-10 hidden h-1 w-full bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-purple-500/20 lg:block" />

          <div className="grid gap-10 lg:grid-cols-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: .7,
                    delay: index * .15,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                  }}
                  className="relative"
                > 
                
                  <div className="absolute -top-5 right-4 text-7xl font-black text-white/5">
                    0{index + 1}
                  </div>

                  <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/30">
                      <Icon size={30} className="text-white" />
                    </div>

                    <h3 className="mt-8 text-2xl font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-8 text-gray-400">
                      {step.desc}
                    </p>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;