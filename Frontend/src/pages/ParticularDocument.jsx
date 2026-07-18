import axios from 'axios'
import { Heading1 } from 'lucide-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { toast } from 'sonner'
import {motion} from "motion/react"
import {Loader} from "lucide-react"

const ParticularDocument = () => {
    const { id } = useParams()

    const [document, setDocument] = useState(null);

    useEffect(() => {
        const fetchparticulardocument = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND}/document/${id}`, { withCredentials: true })

                setDocument(res.data.document)

            } catch (error) {
                toast.error("Internal Server Error")
            }
        }

        fetchparticulardocument()
    }, [])


    if (!document) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#030712] text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="mx-auto mb-6 h-12 w-12"
                    >
                        <Loader className="h-12 w-12 text-indigo-400" />
                    </motion.div>
                    <p className="text-lg font-semibold">Loading your document</p>
                    <p className="mt-2 text-sm text-gray-400">Please wait...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen pt-10 bg-[#030712] text-white overflow-hidden">

                <div className="fixed inset-0 -z-20">
                    <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]" />
                    <div className="absolute right-0 top-1/3 h-[320px] w-[320px] rounded-full bg-purple-600/15 blur-[120px]" />
                    <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan-600/10 blur-[120px]" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

                        <span className="text-xs tracking-widest uppercase text-indigo-400 font-semibold">
                            Document
                        </span>

                        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black text-white break-words">
                            {document.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">

                            <div className="flex items-center gap-2">
                                📅
                                <span>
                                    Last updated{" "}
                                    {new Date(document.updatedAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="h-5 w-px bg-white/10 hidden sm:block" />

                            <div className="flex items-center gap-2">
                                👤
                                <span>Read Only</span>
                            </div>

                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white shadow-2xl">

                        <div className="p-6 sm:p-10 lg:p-16">

                            <div
                                className=" text-black
              prose
              prose-sm
              sm:prose
              lg:prose-lg
              max-w-none
              prose-headings:text-gray-900
              prose-p:text-gray-700
              prose-strong:text-gray-900
              prose-code:text-pink-600
              prose-a:text-indigo-600
              prose-img:rounded-xl
              prose-img:shadow-xl
              prose-blockquote:border-indigo-500
              prose-li:text-gray-700
            "
                                dangerouslySetInnerHTML={{
                                    __html: document.content,
                                }}
                            />

                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default ParticularDocument