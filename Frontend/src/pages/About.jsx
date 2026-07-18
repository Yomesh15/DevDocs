import React from "react";
import { motion } from "motion/react";
import { Users, Target, Sparkles, ShieldCheck, Rocket, Heart } from "lucide-react";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const values = [
    {
        icon: Rocket,
        title: "Move Fast",
        text: "We ship quickly and iterate based on real feedback from our community.",
    },
    {
        icon: ShieldCheck,
        title: "Stay Secure",
        text: "Your documents and data are protected with enterprise-grade security.",
    },
    {
        icon: Heart,
        title: "Care Deeply",
        text: "Every feature is built with our users' workflows and needs in mind.",
    },
    {
        icon: Sparkles,
        title: "Innovate Always",
        text: "We push the boundaries of what collaborative writing tools can do.",
    },
];

const stats = [
    { number: "10K+", text: "Developers" },
    { number: "50K+", text: "Documents" },
    { number: "40+", text: "Countries" },
    { number: "99.9%", text: "Uptime" },
];

const team = [
    { name: "Aarav Mehta", role: "Founder & CEO", img: "https://i.pravatar.cc/150?img=12" },
    { name: "Riya Sharma", role: "Head of Product", img: "https://i.pravatar.cc/150?img=32" },
    { name: "Kabir Singh", role: "Lead Engineer", img: "https://i.pravatar.cc/150?img=15" },
    { name: "Ananya Rao", role: "Design Lead", img: "https://i.pravatar.cc/150?img=45" },
];

const About = () => {
    return (
        <>
            <Navbar />
            <div className="relative min-h-screen overflow-hidden bg-[#030712] pt-28 pb-20 sm:pt-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-20 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[160px]" />
                    <div className="absolute left-4 top-40 h-40 w-40 rounded-full bg-cyan-500/10 blur-[100px] sm:left-10 sm:h-72 sm:w-72 sm:blur-[140px]" />
                    <div className="absolute right-4 bottom-10 h-40 w-40 rounded-full bg-purple-600/10 blur-[100px] sm:right-10 sm:h-72 sm:w-72 sm:blur-[140px]" />
                </div>

                <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:45px_45px]" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-300 backdrop-blur-lg sm:text-sm">
                            <Sparkles size={14} />
                            About DevDocs
                        </div>

                        <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
                            Building The Future Of
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                {" "}Collaborative Writing
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                            DevDocs was built to help teams write, edit and ship documentation together,
                            without friction. We believe great tools should feel invisible and let your ideas come first.
                        </p>
                    </motion.div>

                    <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-6 lg:grid-cols-4">
                        {stats.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6, scale: 1.03 }}
                                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl sm:rounded-3xl sm:p-8"
                            >
                                <h3 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-2xl font-black text-transparent sm:text-4xl">
                                    {item.number}
                                </h3>
                                <p className="mt-2 text-xs text-gray-400 sm:mt-3 sm:text-base">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-2 lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10"
                        >
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 sm:h-12 sm:w-12">
                                <Target className="text-white" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white sm:text-2xl">Our Mission</h3>
                            <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                                To remove every barrier between an idea and a polished document. We build tools that
                                let engineers, writers and teams collaborate in real time, powered by AI that
                                understands context, not just text.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-10"
                        >
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 sm:h-12 sm:w-12">
                                <Users className="text-white" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white sm:text-2xl">Our Team</h3>
                            <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                                A small, focused team of engineers and designers spread across the globe,
                                united by a shared obsession with craft, speed and building things people
                                genuinely enjoy using every day.
                            </p>
                        </motion.div>
                    </div>

                    <div className="mt-16 sm:mt-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-center text-2xl font-black text-white sm:text-4xl"
                        >
                            What We Stand For
                        </motion.h2>

                        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                            {values.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -8, scale: 1.03 }}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:rounded-3xl"
                                    >
                                        <Icon className="text-indigo-400" size={28} />
                                        <h4 className="mt-4 text-lg font-bold text-white">{item.title}</h4>
                                        <p className="mt-2 text-sm leading-6 text-gray-400">{item.text}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-16 sm:mt-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-center text-2xl font-black text-white sm:text-4xl"
                        >
                            Meet The Team
                        </motion.h2>

                        <div className="mt-10 grid grid-cols-2 gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-4">
                            {team.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8, scale: 1.03 }}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl sm:rounded-3xl sm:p-8"
                                >
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="mx-auto h-16 w-16 rounded-full border-2 border-white/10 object-cover sm:h-20 sm:w-20"
                                    />
                                    <h4 className="mt-4 text-sm font-bold text-white sm:text-base">{member.name}</h4>
                                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;