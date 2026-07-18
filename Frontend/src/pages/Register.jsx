import React from 'react'
import { motion } from "motion/react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios"
import { toast } from "sonner";


const Register = () => {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    const [form, setform] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handlechange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const googleauth = async () => {
        try {
            const res = await signInWithPopup(auth, provider)

            const idToken = await res.user.getIdToken();

            const result = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/google-auth`, { idToken }, { withCredentials: true })

            toast.success("Welcome Editor");

            navigate('/')
            window.scrollTo({top:0, behavior:"smooth"})

            localStorage.setItem("token", res.user.accessToken)
            localStorage.setItem("photo", res.user.photoURL)

           
            

        } catch (error) {
            console.log(error);
            toast.error("Internal Server Error")
        }
    }

    const registerviainput = async (e) => {
        e.preventDefault()

        setloading(true)

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND}/auth/register`, form ,{withCredentials:true}) 

            if (res.data.success) {
                toast.success("Welcome Editor");
                setloading(false)
                navigate('/login')
                window.scrollTo({top:0, behavior:"smooth"})
            }

        } catch (error) {
            console.log(error);
            toast.error("Internal Server Error")
            setloading(false)
        }
    }

    const inputWrapperClasses =
        "flex items-center rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-indigo-400/40 focus-within:ring-2 focus-within:ring-indigo-500/50 transition";

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center justify-center px-5 py-10">
 
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[160px]" />
                <div className="absolute left-10 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />
                <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-purple-600/10 blur-[140px]" />
            </div>

            <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:45px_45px]" />

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
            >

                <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-cyan-500/20 p-14">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px]" />

                    <motion.div
                        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]"
                    />
                    <motion.div
                        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]"
                    />

                    <div className="relative z-10 flex flex-col justify-center text-white">
                        <span className="inline-block w-fit rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm font-medium text-indigo-300 backdrop-blur">
                            🚀 DevDocs
                        </span>

                        <h1 className="mt-8 text-5xl font-black leading-tight">
                            Start Building
                            <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                Together.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-400 leading-8">
                            Create your account and collaborate on documents in real time.
                            Write code, share ideas, and build faster with your team.
                        </p>

                        <div className="mt-12 flex gap-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
                                <h3 className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    100%
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Real-Time Collaboration
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
                                <h3 className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    AI
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Smart Document Assistant
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center p-8 sm:p-12">
                    <div className="w-full max-w-md">

                        <h2 className="text-4xl font-black text-white">
                            Create Account
                        </h2>

                        <p className="mt-3 text-gray-400">
                            Join DevDocs and start collaborating instantly.
                        </p>

                        <form className="mt-8 space-y-5">

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-300">
                                    Full Name
                                </label>

                                <div className={inputWrapperClasses}>
                                    <FiUser className="text-indigo-400 text-lg" />
                                    <input
                                        type="text"
                                        onChange={handlechange}
                                        name='name'
                                        value={form.name}
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
                                    <FiMail className="text-indigo-400 text-lg" />
                                    <input
                                        type="email"
                                        onChange={handlechange}
                                        name='email'
                                        value={form.email}
                                        placeholder="Enter your email"
                                        className="w-full bg-transparent px-3 py-4 text-white placeholder:text-gray-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-300">
                                    Password
                                </label>

                                <div className={inputWrapperClasses}>
                                    <FiLock className="text-indigo-400 text-lg" />
                                    <input
                                        type="password"
                                        onChange={handlechange}
                                        name='password'
                                        value={form.password}
                                        placeholder="Create password"
                                        className="w-full bg-transparent px-3 py-4 text-white placeholder:text-gray-500 outline-none"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={registerviainput}
                                className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 font-semibold text-white shadow-xl shadow-indigo-600/30 transition"
                            >
                                {loading ? "Creating Account..." : "Create Account"}
                            </motion.button>
                        </form>

                        <div className="my-7 flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/10"></div>
                            <span className="text-sm text-gray-500">OR</span>
                            <div className="h-px flex-1 bg-white/10"></div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={googleauth}
                            type="button"
                            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-4 font-semibold text-gray-200 backdrop-blur-xl transition hover:border-indigo-400/40 hover:bg-white/10"
                        >
                            <FcGoogle className="text-2xl" />
                            Continue with Google
                        </motion.button>

                        <p className="mt-8 text-center text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </div>
                </div>
            </motion.div>
        </section>
    );

}

export default Register