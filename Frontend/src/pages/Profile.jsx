import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { User, Briefcase, Building2, Mail, FileText } from "lucide-react";
import { useAuth } from "./auth/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, setuser } = useAuth()

    const photo = localStorage.getItem("photo")

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bio: "",
        jobTitle: "",
        company: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (user) {
            setFormData({
                name: user?.name || "",
                email: user.email || "",
                bio: user.bio || "",
                jobTitle: user.jobTitle || "",
                company: user.company || "",
            });
        }
    }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            const res = await axios.patch(
                `${import.meta.env.VITE_BACKEND}/auth/update-profile`,
                formData,
                { withCredentials: true }
            );

            setuser(res.data.user);

            toast.success("Profile Updated");

            window.scrollTo({ top: 0, behavior: "smooth" });

            navigate("/");

        } catch (error) {
            toast.error("Failed to Change")
        }
    };

    const inputBaseClasses =
        "w-full h-12 rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/40 transition";

    return (
        <>
            <Navbar />
            <div className="relative min-h-screen overflow-hidden bg-[#030712] py-16 px-4">

                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[160px]" />
                    <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[140px]" />
                    <div className="absolute left-10 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />
                </div>

                <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:45px_45px]" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden"
                >

                    <div className="h-36 relative bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-cyan-500/20">

                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px]" />

                        <div className="absolute left-1/2 -bottom-14 -translate-x-1/2">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-[6px] border-[#030712] shadow-xl shadow-indigo-600/30 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                                {photo && photo.trim() !== "" ? (
                                    <img
                                        src={photo}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white text-4xl font-bold">
                                        {user?.name?.charAt(0)?.toUpperCase() || "😊"}
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>


                    <div className="pt-20 pb-10 px-8">

                        <div className="text-center mb-10">

                            <h1 className="text-3xl font-black text-white">
                                {user?.name}
                            </h1>

                            <p className="text-gray-400 mt-2">
                                Manage your profile information
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid lg:grid-cols-2 gap-6"
                        >


                            <div>
                                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={inputBaseClasses}
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        readOnly
                                        className="w-full h-12 rounded-xl border border-white/10 bg-white/[0.02] text-gray-500 pl-11 pr-4 cursor-not-allowed"
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                                    Job Title
                                </label>

                                <div className="relative">
                                    <Briefcase
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
                                    />

                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        placeholder="Frontend Developer"
                                        className={inputBaseClasses}
                                    />
                                </div>
                            </div>


                            <div>
                                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                                    Company / University
                                </label>

                                <div className="relative">
                                    <Building2
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
                                    />

                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="JECRC University"
                                        className={inputBaseClasses}
                                    />
                                </div>
                            </div>


                            <div className="lg:col-span-2">
                                <label className="text-sm font-semibold text-gray-300 mb-2 block">
                                    Bio
                                </label>

                                <div className="relative">
                                    <FileText
                                        size={18}
                                        className="absolute left-4 top-5 text-indigo-400"
                                    />

                                    <textarea
                                        rows={5}
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell others something about yourself..."
                                        className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 py-4 text-white placeholder:text-gray-500 resize-none outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/40 transition"
                                    />
                                </div>
                            </div>


                            <div className="lg:col-span-2 flex justify-end">

                                <motion.button
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="px-8 h-12 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-xl shadow-indigo-600/30 transition-all duration-300"
                                >
                                    Save Changes
                                </motion.button>

                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;