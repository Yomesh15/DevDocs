import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#030712] py-28">
 
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[180px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-cyan-600/20 p-12 backdrop-blur-2xl lg:p-20"
        >
 

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

          <div className="relative z-10 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-xl shadow-indigo-500/40">
              <Sparkles className="text-white" size={34} />
            </div>

            <h2 className="mt-8 text-5xl font-black text-white leading-tight">
              Ready To Build
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                {" "}
                Amazing Documents?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Join thousands of developers collaborating in real time,
              writing better documentation and shipping projects faster.
            </p>

            <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -4,
                }}
                whileTap={{ scale: .95 }}
                onClick={() => navigate("/register")}
                className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-xl shadow-indigo-600/30"
              >
                Get Started Free
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -4,
                }}
                whileTap={{ scale: .95 }}
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl"
              >
                Live Demo
                <ArrowRight size={18} />
              </motion.button>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default CTA;