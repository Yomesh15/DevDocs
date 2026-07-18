import React, { useEffect, useState } from 'react'
import { motion } from "motion/react";
import { useAuth } from "./auth/AuthContext";
import Navbar from "../components/Navbar"
import { FiTrash2 } from "react-icons/fi";
import Footer from "../components/Footer"
import { FiDownload } from "react-icons/fi";
import html2pdf from "html2pdf.js";
import { FaEnvelopeOpenText } from "react-icons/fa";
import {
    FileText,
    Users,
    Clock,
    TrendingUp,
    Plus,
    Search,
    MoreVertical,
    Star,
    FolderOpen,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';



const activity = [
];

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate()

    const [search, setsearch] = useState("")

    const [openMenu, setOpenMenu] = useState(null);

    const [documents, setdocuments] = useState([])

    const [stats, setStats] = useState([
        { icon: FileText, label: "Total Documents", value: "0" },
        { icon: Users, label: "Collaborators", value: "0" },
        { icon: Clock, label: "Hours Saved", value: "0" },
        { icon: TrendingUp, label: "This Month", value: "+18%" },
    ])


    const filteredDocuments = documents.filter((doc) =>
        doc.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleDownload = (doc) => {
        const element = document.createElement("div");
        element.innerHTML = `
    <h1>${doc.title}</h1>
    <hr/>
    ${doc.content}
  `;

        html2pdf()
            .set({
                margin: 10,
                filename: `${doc.title}.pdf`,
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait",
                },
            })
            .from(element)
            .save();

        setOpenMenu(null);
    };

    useEffect(() => {
        const fetchdocument = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND}/document/my-documents`, { withCredentials: true })

                setdocuments(res.data.documents)

                const totalDocs = res.data.documents.length;

                setStats([
                    {
                        icon: FileText,
                        label: "Total Documents",
                        value: totalDocs.toString(),
                    },
                    {
                        icon: Users,
                        label: "Collaborators",
                        value: "0",
                    },
                    {
                        icon: Clock,
                        label: "Hours Saved",
                        value: totalDocs.toString(),
                    },
                    {
                        icon: TrendingUp,
                        label: "This Month",
                        value: totalDocs.toString(),
                    },
                ]);


            } catch (error) {
                console.log(error);

                toast.error("Internal Server Error")
            }
        }

        fetchdocument()
    }, [])


    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND}/document/delete/${id}`,
                { withCredentials: true }
            );

            const updatedDocuments = documents.filter(doc => doc._id !== id);

            setdocuments(updatedDocuments);

            const totalDocs = updatedDocuments.length;

            setStats([
                {
                    icon: FileText,
                    label: "Total Documents",
                    value: totalDocs.toString(),
                },
                {
                    icon: Users,
                    label: "Collaborators",
                    value: "0",
                },
                {
                    icon: Clock,
                    label: "Hours Saved",
                    value: totalDocs.toString(),
                },
                {
                    icon: TrendingUp,
                    label: "This Month",
                    value: totalDocs.toString(),
                },
            ]);


            setOpenMenu(null);
            toast.success("Document Deleted");
        } catch (error) {
            console.log(error);
            toast.error("Failed to Delete");
        }
    };


    const handlenewdocument = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND}/document/create`,
                {},
                { withCredentials: true }
            );

            navigate(`/document/${res.data.document._id}`);
        } catch (error) {
            toast.error("Failed to create document");
        }
    };

    return (
        <>
            <Navbar />

            <div className="relative min-h-screen overflow-hidden bg-[#030712] pt-10 pb-20 sm:pt-14">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px] sm:h-[450px] sm:w-[450px] sm:blur-[160px]" />
                    <div className="absolute left-4 top-60 h-40 w-40 rounded-full bg-cyan-500/10 blur-[100px] sm:left-10 sm:h-72 sm:w-72 sm:blur-[140px]" />
                    <div className="absolute right-4 bottom-10 h-40 w-40 rounded-full bg-purple-600/10 blur-[100px] sm:right-10 sm:h-72 sm:w-72 sm:blur-[140px]" />
                </div>

                <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:45px_45px]" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <h1 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">
                                Welcome back
                                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    {user?.name ? ` ${user.name.split(" ")[0]}` : ""}
                                </span>
                            </h1>
                            <p className="mt-2 text-sm text-gray-400 sm:text-base">
                                Here's what's happening with your documents today.
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlenewdocument}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 sm:w-auto"
                        >
                            <Plus size={18} />
                            New Document
                        </motion.button>
                    </motion.div>

                    <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl sm:mt-10">
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            onChange={(e) => setsearch(e.target.value)}
                            placeholder="Search documents..."
                            className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-4">
                        {stats.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 sm:h-11 sm:w-11">
                                        <Icon className="text-white" size={18} />
                                    </div>
                                    <h3 className="mt-4 text-xl font-black text-white sm:text-2xl">
                                        {item.value}
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                        {item.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-3">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8 lg:col-span-2"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white sm:text-xl">
                                    Recent Documents
                                </h2>
                                <FolderOpen size={20} className="text-indigo-400" />
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {filteredDocuments.length > 0 ? (filteredDocuments.slice(0, 6).map((doc) => (
                                    <motion.div
                                        key={doc._id}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="relative rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600/30 to-purple-600/30">
                                                <FileText size={16} className="text-indigo-300" />
                                            </div>

                                            <div className="relative">
                                                <button
                                                    onClick={() =>
                                                        setOpenMenu(openMenu === doc._id ? null : doc._id)
                                                    }
                                                    className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                                                >
                                                    <MoreVertical
                                                        size={16}
                                                        className="text-gray-500"
                                                    />
                                                </button>

                                                {openMenu === doc._id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="absolute right-0 mt-[-4px] w-48 rounded-xl border border-white/10 bg-[#0f1419]/95 shadow-2xl backdrop-blur-md z-50"
                                                    >
                                                        <div className="p-2 space-y-1">
                                                            {/* <button
                                                                onClick={() => {
                                                                    navigate(`/particulardocument/${doc._id}`)
                                                                    setOpenMenu(null)
                                                                }}
                                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-white rounded-lg transition-all hover:bg-indigo-600/20 hover:text-indigo-200 active:scale-95"
                                                            >
                                                                <FaEnvelopeOpenText size={16} />
                                                                <span>Open</span>
                                                            </button> */}
                                                            <button
                                                                onClick={() => {
                                                                    handleDownload(doc)
                                                                    setOpenMenu(null)
                                                                }}
                                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-white rounded-lg transition-all hover:bg-blue-600/20 hover:text-blue-200 active:scale-95"
                                                            >
                                                                <FiDownload size={16} />
                                                                <span>Download</span>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    handleDelete(doc._id)
                                                                    setOpenMenu(null)
                                                                }}
                                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 rounded-lg transition-all hover:bg-red-600/20 hover:text-red-300 active:scale-95"
                                                            >
                                                                <FiTrash2 size={16} />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        <motion.h4 className="mt-3 truncate text-sm font-semibold cursor-pointer text-white" initial={{ x: "-100%" }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => {
                                                navigate(`/particulardocument/${doc._id}`)
                                            }} whileHover={{}}>
                                            {doc.title}
                                        </motion.h4>

                                        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                            <span>
                                                {new Date(doc.updatedAt).toLocaleDateString()}
                                            </span>

                                            <span>
                                                {doc.content?.length || 0} characters
                                            </span>
                                        </div>
                                    </motion.div>
                                ))
                                )
                                    :
                                    (
                                        <div className="col-span-full flex h-103 items-center justify-center">
                                            <p className="text-lg font-medium text-gray-400">
                                                No Documents Found
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-8"
                        >
                            <h2 className="text-lg font-bold text-white sm:text-xl">
                                Recent Activity
                            </h2>

                            <div className="mt-6 space-y-5">
                                {
                                    activity.length > 0 ? (
                                        activity.map((item, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />

                                                <div className="min-w-0">
                                                    <p className="text-sm text-gray-300">
                                                        <span className="font-semibold text-white">
                                                            {item.user}
                                                        </span>{" "}
                                                        {item.action}{" "}
                                                        <span className="text-indigo-300">
                                                            {item.target}
                                                        </span>
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {item.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center justify-center py-48 relative top-0">
                                            <h1 className="text-sm font-medium text-gray-500">
                                                No Recent Activity
                                            </h1>
                                        </div>
                                    )
                                }
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default Dashboard