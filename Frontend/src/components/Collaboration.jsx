import React from "react";
import { motion } from "motion/react";
import {
  Users,
  MessageCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const Collaboration = () => {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-28">
    
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-10 h-80 w-80 rounded-full bg-purple-600/10 blur-[170px]" />
        <div className="absolute right-20 bottom-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
            Live Collaboration
          </span>

          <h2 className="mt-7 text-5xl font-black text-white leading-tight">
            Work Together
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              In Real-Time
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Edit documents simultaneously with teammates, see live cursors,
            leave comments, and receive AI suggestions instantly.
          </p>

          <div className="mt-10 space-y-5">

            {[
              "Real-time editing",
              "Live cursors",
              "Threaded comments",
              "Automatic sync",
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4"
              >
                <CheckCircle2
                  size={22}
                  className="text-cyan-400"
                />

                <span className="text-gray-300 text-lg">
                  {item}
                </span>
              </motion.div>
            ))}

          </div>
        </motion.div>
 
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .9 }}
          viewport={{ once: true }}
          className="relative"
        >
 
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl">
 
            <div className="flex items-center justify-between">

              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              <div className="flex -space-x-3">
                {["A", "J", "R"].map((u, i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#030712] bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm font-bold text-white"
                  >
                    {u}
                  </div>
                ))}
              </div>
            </div>
 
            <div className="mt-8 space-y-5">

              <div className="h-5 w-60 rounded bg-gradient-to-r from-indigo-500 to-cyan-500" />

              <div className="space-y-3">
                <div className="h-3 rounded bg-white/10" />
                <div className="h-3 w-5/6 rounded bg-white/10" />
                <div className="h-3 w-4/6 rounded bg-white/10" />
                <div className="h-3 w-full rounded bg-white/10" />
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-indigo-400" />
                  <span className="font-semibold text-indigo-300">
                    AI Suggestion
                  </span>
                </div>

                <p className="mt-3 text-gray-300">
                  Consider adding API examples and installation steps to improve
                  developer experience.
                </p>
              </div>

            </div>

          </div>
 
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="absolute -left-8 top-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
          >
            <Users className="text-cyan-400" />

            <p className="mt-3 text-sm text-gray-400">
              6 Active Editors
            </p>
          </motion.div>
 
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute -bottom-6 right-0 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="text-indigo-400" />

              <span className="text-white font-semibold">
                New Comment
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              Let's deploy this documentation 🚀
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default Collaboration;