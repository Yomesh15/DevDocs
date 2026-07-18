import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import axios from "axios"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const contactInfo = [
    { icon: Mail, title: "Email", text: "support@devdocs.com" },
    { icon: Phone, title: "Phone", text: "+91 98765 43210" },
    { icon: MapPin, title: "Office", text: "Jaipur, Rajasthan, India" },
];

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND}/contact`, form, { withCredentials: true })
            toast.success("We Contact You");
            setLoading(false)
            window.scrollTo({ top: 0, behavior: "smooth" })
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            toast.error("Try Again Later")
            setLoading(false)
        }
    };

    const inputWrapperClasses =
        "flex items-center rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-indigo-400/40 focus-within:ring-2 focus-within:ring-indigo-500/50 transition";

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
                            <MessageSquare size={14} />
                            Get In Touch
                        </div>

                        <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
                            Let's Start A
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                {" "}Conversation
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                            Have a question, feedback, or just want to say hi? Our team would love to hear from you.
                        </p>
                    </motion.div>

                    <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-3 sm:gap-6">
                        {contactInfo.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 sm:h-12 sm:w-12">
                                        <Icon className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white sm:text-base">{item.title}</h4>
                                        <p className="mt-1 text-xs text-gray-400 sm:text-sm">{item.text}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto mt-16 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:mt-24 sm:rounded-3xl sm:p-10"
                    >
                        <h2 className="text-xl font-black text-white sm:text-2xl">Send Us A Message</h2>
                        <p className="mt-2 text-sm text-gray-400 sm:text-base">
                            Fill out the form below and we'll get back to you within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                                        Full Name
                                    </label>
                                    <div className={inputWrapperClasses}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full bg-transparent px-3 py-4 text-white placeholder:text-gray-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                                        Email
                                    </label>
                                    <div className={inputWrapperClasses}>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="w-full bg-transparent px-3 py-4 text-white placeholder:text-gray-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-300">
                                    Message
                                </label>
                                <div className="rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-indigo-400/40 focus-within:ring-2 focus-within:ring-indigo-500/50 transition">
                                    <textarea
                                        rows={5}
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell us what's on your mind..."
                                        className="w-full resize-none bg-transparent px-0 py-4 text-white placeholder:text-gray-500 outline-none"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-semibold text-white shadow-xl shadow-indigo-600/30 transition sm:w-auto sm:px-10"
                            >
                                {loading ? "Sending..." : "Send Message"}
                                <Send size={18} />
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;