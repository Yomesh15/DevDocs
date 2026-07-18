import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Frontend Developer",
    review:
      "DevDocs completely changed how our team writes documentation. Real-time collaboration is incredibly smooth.",
  },
  {
    name: "Sarah Williams",
    role: "Software Engineer",
    review:
      "The AI assistant saves us hours every week. It feels like having another teammate.",
  },
  {
    name: "Michael Chen",
    role: "Tech Lead",
    review:
      "Beautiful UI, fast performance and version history make DevDocs our favorite documentation platform.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-28">
 
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-purple-500/10 blur-[180px]" />
        <div className="absolute right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[180px]" />
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
            Testimonials
          </span>

          <h2 className="mt-7 text-5xl font-black text-white">
            Loved By
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Developers
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Thousands of developers and teams trust DevDocs every day.
          </p>

        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (

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
                y: -12,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >

              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
              </div>

              <div className="relative z-10">

                <div className="flex gap-1">

                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="#facc15"
                      className="text-yellow-400"
                    />
                  ))}

                </div>

                <p className="mt-6 leading-8 text-gray-300">
                  "{item.review}"
                </p>

                <div className="mt-8 flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold text-white">
                    {item.name.charAt(0)}
                  </div>

                  <div>

                    <h4 className="font-bold text-white">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-400">
                      {item.role}
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;