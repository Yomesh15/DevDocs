import React from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  History,
  Lock,
  Cloud,
  CheckCircle2,
} from "lucide-react";

const securityCards = [
  {
    icon: ShieldCheck,
    title: "JWT Authentication",
    desc: "Secure login with protected routes and encrypted sessions.",
  },
  {
    icon: Lock,
    title: "Encrypted Storage",
    desc: "Every document is securely stored and protected from unauthorized access.",
  },
  {
    icon: Cloud,
    title: "Cloud Backup",
    desc: "Never lose your work with automatic cloud synchronization.",
  },
  {
    icon: History,
    title: "Version History",
    desc: "Restore any previous version with one click anytime.",
  },
];

const Security = () => {
  return (
    <section className="relative overflow-hidden bg-[#030712] py-28">
 
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-[180px]" />
        <div className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[180px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
            Enterprise Security
          </span>

          <h2 className="mt-7 text-5xl font-black text-white">
            Your Documents Are
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Always Safe
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Built with modern security practices to keep your documents,
            collaboration and workspace protected.
          </p>

        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {securityCards.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: .7,
                  delay: index * .12,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >

                <div className="flex items-start gap-6">

                  <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-4 shadow-lg shadow-indigo-500/30">
                    <Icon size={30} className="text-white" />
                  </div>

                  <div>

                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-8 text-gray-400">
                      {item.desc}
                    </p>

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div> 

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="mt-20 rounded-[32px] border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 p-10 backdrop-blur-xl"
        >

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <h3 className="text-4xl font-black text-white">
                Trusted Security
              </h3>

              <p className="mt-5 text-lg leading-8 text-gray-300">
                Every change is automatically saved, securely synchronized,
                and can be restored instantly with version history.
              </p>

            </div>

            <div className="space-y-5">

              {[
                "End-to-end encrypted sessions",
                "Automatic cloud backups",
                "JWT based authentication",
                "Unlimited version history",
              ].map((item, i) => (

                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4"
                >

                  <CheckCircle2 className="text-cyan-400" />

                  <span className="text-lg text-gray-300">
                    {item}
                  </span>

                </motion.div>

              ))}

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Security;