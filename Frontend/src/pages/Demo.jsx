import React from "react";
import { motion } from "motion/react";
import {
    ArrowLeft,
    Clock,
    FileText,
    Calendar,
    CheckCircle2,
    Sparkles,
    Code2,
    Table2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


const Demo = () => {

    const navigate = useNavigate()

    return (
        <>
        <Navbar/>
        <section className="relative min-h-screen overflow-hidden bg-[#030712] py-20">

            <div className="absolute inset-0 -z-10">
                <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[180px]" />
                <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[180px]" />
                <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[160px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6">

                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .7 }}
                    className="mb-12 flex items-center justify-between"
                >

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gray-300 transition hover:text-white"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Link>

                    <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300">
                        Live Demo
                    </span>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .8 }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                    <div className="flex items-center justify-between border-b border-white/10 px-8 py-5">

                        <div>

                            <h2 className="text-3xl font-black text-white">

                                Welcome to{" "}

                                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    DevDocs
                                </span>

                            </h2>

                            <p className="mt-2 text-gray-400">
                                This is how your document will look after creation.
                            </p>

                        </div>

                        <button
                            onClick={() => {
                                navigate('/dashboard')
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                            className="rounded-xl cursor-pointer bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105">
                            Create Document
                        </button>

                    </div>


                    <div className="flex justify-center p-10">

                        <motion.div
                            initial={{ scale: .95 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: .2 }}
                            className="w-full max-w-4xl rounded-2xl bg-white p-12 shadow-2xl"
                        >

                            <h1 className="text-5xl font-black text-gray-900">
                                🚀 DevDocs Product Roadmap
                            </h1>

                            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">

                                <div className="flex items-center gap-2">
                                    <FileText size={16} />
                                    Demo Document
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    5 min read
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    July 18, 2026
                                </div>

                            </div>

                            <hr className="my-10" />

                            <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold text-gray-900">
                                <Sparkles className="text-indigo-500" />
                                Welcome
                            </h2>

                            <p className="leading-8 text-gray-700">
                                DevDocs is a modern collaborative documentation platform
                                designed for developers, startups and teams.
                                Create beautiful documents, organize projects,
                                and keep your knowledge in one secure workspace.
                            </p>

                            <h2 className="mt-12 text-3xl font-bold text-gray-900">
                                ✨ Features
                            </h2>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">

                                {[
                                    "Rich Text Editor",
                                    "Google Authentication",
                                    "Fast Dashboard",
                                    "Search Documents",
                                    "Export as PDF",
                                    "Beautiful UI",
                                ].map((item) => (

                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border bg-gray-50 p-4"
                                    >

                                        <CheckCircle2
                                            size={20}
                                            className="text-green-500"
                                        />

                                        <span className="font-medium text-gray-700">
                                            {item}
                                        </span>

                                    </div>

                                ))}

                            </div>


                            <h2 className="mt-14 text-3xl font-bold text-gray-900">
                                📋 Meeting Notes
                            </h2>

                            <p className="mt-5 leading-8 text-gray-700">
                                Our team discussed the upcoming release of DevDocs.
                                Major focus areas include authentication,
                                document management,
                                search performance,
                                exporting documents,
                                and improving dashboard experience.
                            </p>

                            <ol className="mt-6 list-decimal space-y-3 pl-8 text-gray-700">

                                <li>Finalize dashboard UI</li>

                                <li>Improve editor performance</li>

                                <li>Implement PDF export</li>

                                <li>Add advanced search</li>

                                <li>Deploy stable release</li>

                            </ol>


                            <h2 className="mt-14 flex items-center gap-2 text-3xl font-bold text-gray-900">

                                <Code2 className="text-indigo-600" />

                                Code Example

                            </h2>

                            <div className="mt-6 overflow-hidden rounded-xl bg-gray-900">
                                <pre className="overflow-auto p-6 text-sm leading-7 text-green-400">
                                    {`const document = {
  title: "DevDocs",
  author: "Yomesh Nagar",
  status: "Published",
};

console.log(document);`}
                                </pre>
                            </div>


                            <h2 className="mt-14 flex items-center gap-2 text-3xl font-bold text-gray-900">
                                <Table2 className="text-indigo-600" />
                                Project Status
                            </h2>

                            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                                <table className="w-full border-collapse">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border-b border-gray-200 px-6 py-4 text-left font-semibold text-gray-800">
                                                Feature
                                            </th>
                                            <th className="border-b border-gray-200 px-6 py-4 text-left font-semibold text-gray-800">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {[
                                            ["Authentication", "✅ Completed"],
                                            ["Dashboard", "✅ Completed"],
                                            ["Profile", "✅ Completed"],
                                            ["Document Editor", "✅ Completed"],
                                            ["Search", "✅ Completed"],
                                            ["PDF Export", "🚀 Coming Soon"],
                                        ].map(([feature, status], index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="border-b border-gray-200 px-6 py-4 text-gray-700">
                                                    {feature}
                                                </td>

                                                <td className="border-b border-gray-200 px-6 py-4 font-medium">
                                                    {status}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>


                            <div className="mt-14 rounded-2xl border-l-4 border-indigo-500 bg-indigo-50 p-8">

                                <p className="text-2xl italic font-medium text-gray-700">
                                    "Documentation is a love letter that you write to your future self."
                                </p>

                                <p className="mt-4 text-gray-500">
                                    — Damian Conway
                                </p>

                            </div>


                            <h2 className="mt-14 text-3xl font-bold text-gray-900">
                                ✅ Launch Checklist
                            </h2>

                            <div className="mt-6 space-y-4">

                                {[
                                    "Create your account",
                                    "Login securely",
                                    "Create your first document",
                                    "Edit your content",
                                    "Save automatically",
                                    "Export document as PDF",
                                ].map((item, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50"
                                    >

                                        <CheckCircle2
                                            size={22}
                                            className="text-green-500"
                                        />

                                        <span className="text-gray-700 font-medium">
                                            {item}
                                        </span>

                                    </div>

                                ))}

                            </div>


                            <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 p-10 text-center">

                                <h2 className="text-4xl font-black text-white">
                                    Ready to Build Something Amazing?
                                </h2>

                                <p className="mx-auto mt-5 max-w-2xl text-lg text-indigo-100">
                                    Create beautiful documents, organize your ideas,
                                    collaborate with your team, and keep everything in one
                                    secure place.
                                </p>

                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    className="mt-8"
                                >

                                    <button
                                        onClick={() => {
                                            navigate('/dashboard')
                                            window.scrollTo({ top: 0, behavior: "smooth" })
                                        }}

                                        className="rounded-xl transition duration-300 bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-102 cursor-pointer"
                                    >
                                        Create Your First Document
                                    </button>

                                </motion.div>

                            </div>

                        </motion.div>

                    </div>

                </motion.div>

            </div>

        </section>
        <Footer/>
        </>
    );
};

export default Demo;