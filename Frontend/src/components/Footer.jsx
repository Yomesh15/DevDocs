import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner"
import axios from "axios"

import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

const Footer = () => {
    const [email, setemail] = useState("")
    const navigate = useNavigate();

    const handlesubscribe = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND}/subscribe`, { email }, { withCredentials: true })

            toast.success("Subscribe Successfully")

            window.scrollTo({ top: 0, behavior: "smooth" })
            
            setemail("")

        } catch (error) {
            toast.error("Failed to Subscribe")
        }
    }

    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712]">

            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-[170px]" />
                <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[170px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-16 lg:grid-cols-5">

                    <div className="lg:col-span-2">

                        <motion.h2
                            whileHover={{ scale: 1.05 }}
                            className="text-4xl font-black text-white"
                        >
                            Dev
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                Docs
                            </span>
                        </motion.h2>

                        <p className="mt-6 max-w-md leading-8 text-gray-400">
                            A modern collaborative documentation platform built for
                            developers, teams and organizations. Create, collaborate and
                            ship faster with AI-powered productivity.
                        </p>

                        <div className="mt-8 flex gap-4">

                            {[FaGithub, FaXTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (

                                <motion.a
                                    key={index}
                                    whileHover={{
                                        y: -6,
                                        scale: 1.1,
                                    }}
                                    href="#"
                                    className="rounded-2xl border border-white/10 bg-white/5 p-3 text-gray-300 transition hover:text-white"
                                >
                                    <Icon size={20} />
                                </motion.a>

                            ))}

                        </div>

                    </div>

                    <div>

                        <h3 className="font-bold text-white">
                            Product
                        </h3>

                        <ul className="mt-6 space-y-4">

                            {[
                                "Features",
                                "AI Assistant",
                                "Version History",
                                "Security",
                            ].map((item) => (

                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 transition hover:text-white"
                                    >
                                        {item}
                                    </a>
                                </li>

                            ))}

                        </ul>

                    </div>


                    <div>

                        <h3 className="font-bold text-white">
                            Resources
                        </h3>

                        <ul className="mt-6 space-y-4">

                            {[
                                "Documentation",
                                "Blog",
                                "API",
                                "Support",
                            ].map((item) => (

                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 transition hover:text-white"
                                    >
                                        {item}
                                    </a>
                                </li>

                            ))}

                        </ul>

                    </div>

                    <div>

                        <h3 className="font-bold text-white">
                            Company
                        </h3>

                        <ul className="mt-6 space-y-4">

                            {[
                                "About",
                                "Privacy",
                                "Terms",
                                "Contact",
                            ].map((item) => (

                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 transition hover:text-white"
                                    >
                                        {item}
                                    </a>
                                </li>

                            ))}

                        </ul>

                    </div>

                </div>


                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .8 }}
                    className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                >

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <h3 className="text-3xl font-bold text-white">
                                Stay Updated
                            </h3>

                            <p className="mt-3 text-gray-400">
                                Get updates about new features and AI improvements.
                            </p>

                        </div>

                        <div className="flex w-full max-w-xl">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                className="flex-1 rounded-l-2xl border border-white/10 bg-[#111827] px-5 py-4 text-white outline-none"
                            />

                            <button onClick={handlesubscribe} className="rounded-r-2xl cursor-pointer bg-gradient-to-r from-indigo-600 to-cyan-500 px-7 font-semibold text-white">
                                Subscribe
                            </button>

                        </div>

                    </div>

                </motion.div>


                <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">

                    <p className="text-gray-500">
                        © {new Date().getFullYear()} DevDocs. All rights reserved.
                    </p>

                    <motion.button
                        whileHover={{
                            y: -5,
                            scale: 1.05,
                        }}
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        className="flex items-center cursor-pointer gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white"
                    >
                        Back to Top
                        <ArrowUpRight size={18} />
                    </motion.button>

                </div>

            </div>

        </footer>
    );
};

export default Footer;