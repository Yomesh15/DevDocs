import React from "react";
import { motion } from "motion/react";
import {
    ArrowRight,
    Play,
    Users,
    FileText,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom"


const Hero = () => {
    const navigate = useNavigate()

    return (
        <section className="relative overflow-hidden bg-[#030712] pt-32 pb-20">
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[160px]" />

                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-10 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]"
                />

                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[140px]"
                />
            </div>

            <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:45px_45px]" />

            <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">

                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="flex-1"
                >
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 backdrop-blur-lg">
                        <Sparkles size={16} />
                        AI Powered Collaborative Workspace
                    </div>

                    <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
                        Build
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {" "}
                            Documents{" "}
                        </span>
                        Together
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
                        Collaborate in real-time with your team, write faster using AI,
                        manage versions, chat instantly and create beautiful documentation
                        from anywhere.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-5">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                y: -3,
                            }}
                            onClick={() => {
                                navigate('/dashboard')
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-4 font-semibold text-white shadow-xl shadow-indigo-600/30"
                        >
                            Start for Free
                            <ArrowRight size={18} />
                        </motion.button>

                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                y: -3,
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>{ navigate('/demo')
                                window.scrollTo({top:0, behavior:"smooth"})
                            }}
                            className="flex items-center gap-2 cursor-pointer rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-xl"
                        >
                            <Play size={18} />
                            Live Demo
                        </motion.button>
                    </div>

                    <div className="mt-16 flex flex-wrap gap-8">
                        {[
                            {
                                icon: Users,
                                title: "10K+",
                                text: "Developers",
                            },
                            {
                                icon: FileText,
                                title: "50K+",
                                text: "Documents",
                            },
                            {
                                icon: ShieldCheck,
                                title: "99.9%",
                                text: "Secure",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8 }}
                                className="flex items-center gap-4"
                            >
                                <div className="rounded-xl bg-white/5 p-3 backdrop-blur-xl">
                                    <item.icon className="text-indigo-400" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* rigjht */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="relative flex-1"
                >
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl"
                    >
                        <div className="mb-5 flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500" />
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                        </div>

                        <div className="space-y-5">
                            <div className="h-5 w-52 rounded bg-gradient-to-r from-indigo-500 to-cyan-500" />

                            <div className="space-y-3">
                                <div className="h-3 rounded bg-white/10" />
                                <div className="h-3 w-5/6 rounded bg-white/10" />
                                <div className="h-3 w-4/6 rounded bg-white/10" />
                            </div>

                            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">
                                <p className="text-sm text-indigo-300">
                                    🤖 AI Suggestion
                                </p>

                                <p className="mt-2 text-gray-300">
                                    Improve this documentation by adding implementation examples
                                    and API references.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                        className="absolute -left-10 top-12 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                    >
                        <p className="text-sm text-gray-400">Live Editors</p>

                        <div className="mt-3 flex -space-x-3">
                            <img
                                src="https://i.pravatar.cc/40?img=1"
                                className="rounded-full border-2 border-[#030712]"
                            />

                            <img
                                src="https://i.pravatar.cc/40?img=2"
                                className="rounded-full border-2 border-[#030712]"
                            />

                            <img
                                src="https://i.pravatar.cc/40?img=3"
                                className="rounded-full border-2 border-[#030712]"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                        }}
                        className="absolute -bottom-8 right-0 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                    >
                        <p className="text-sm text-gray-400">
                            💬 New Comment
                        </p>

                        <p className="mt-2 text-white">
                            Looks great! Let's deploy it 🚀
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;