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
    Calendar,
    Eye,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const activity = [];

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

    const getCharacterCount = (content) => {
        if (!content) return 0;
        return content.length;
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (d.toDateString() === today.toDateString()) return "Today";
        if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
                        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <h1 className="text-3xl font-black text-white sm:text-4xl md:text-5xl leading-tight">
                                Welcome back
                                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    {user?.name ? ` ${user.name.split(" ")[0]}` : ""}
                                </span>
                            </h1>
                            <p className="mt-3 text-sm text-gray-400 sm:text-base">
                                Manage and organize your documents with ease
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlenewdocument}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50 sm:w-auto"
                        >
                            <Plus size={18} />
                            New Document
                        </motion.button>
                    </motion.div>
 
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-8 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl hover:border-white/20 transition-all sm:mt-10"
                    >
                        <Search size={18} className="text-gray-500" />
                        <input
                            type="text"
                            onChange={(e) => setsearch(e.target.value)}
                            placeholder="Search documents..."
                            className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
                        />
                    </motion.div>
 
                    <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
                        {stats.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    whileHover={{ y: -8, scale: 1.03 }}
                                    className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-4 backdrop-blur-xl hover:border-white/20 transition-all sm:rounded-3xl sm:p-6"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600/30 to-purple-600/30 group-hover:from-indigo-600/40 group-hover:to-purple-600/40 transition-all sm:h-12 sm:w-12">
                                        <Icon className="text-indigo-300" size={20} />
                                    </div>
                                    <p className="mt-3 text-xs text-gray-400 sm:text-sm font-medium">
                                        {item.label}
                                    </p>
                                    <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                                        {item.value}
                                    </h3>
                                </motion.div>
                            );
                        })}
                    </div>
 
                    <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 sm:mt-14">
 
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-8 lg:col-span-2"
                        >
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="text-xl font-bold text-white sm:text-2xl">
                                    Recent Documents
                                </h2>
                                <FolderOpen size={22} className="text-indigo-400" />
                            </div>
                            <p className="text-sm text-gray-400">
                                {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
                            </p>

                            {filteredDocuments.length > 0 ? (
                                <div className="mt-6 space-y-3">
                                    {filteredDocuments.slice(0, 8).map((doc, idx) => (
                                        <motion.div
                                            key={doc._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05, duration: 0.4 }}
                                            whileHover={{ x: 4 }}
                                            className="group relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/8 hover:border-white/20 transition-all"
                                        > 
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600/30 to-purple-600/30 group-hover:from-indigo-600/40 group-hover:to-purple-600/40 transition-all">
                                                <FileText size={18} className="text-indigo-300" />
                                            </div>
 
                                            <div className="min-w-0 flex-1 cursor-pointer" onClick={() => navigate(`/particulardocument/${doc._id}`)}>
                                                <h4 className="truncate text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                                                    {doc.title}
                                                </h4>
                                                <div className="mt-1 flex items-center gap-3">
                                                    <span className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Calendar size={14} />
                                                        {formatDate(doc.updatedAt)}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {getCharacterCount(doc.content)} chars
                                                    </span>
                                                </div>
                                            </div>
 
                                            <div className="relative">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setOpenMenu(openMenu === doc._id ? null : doc._id)}
                                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-500 hover:text-white"
                                                >
                                                    <MoreVertical size={18} />
                                                </motion.button>
 
                                                {openMenu === doc._id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="absolute right-8 mt-[-135px] w-48 rounded-xl border border-white/10 bg-[#0f1419]/95 shadow-2xl backdrop-blur-md z-50 overflow-hidden"
                                                    >
                                                        <div className="p-2 space-y-1">
                                                            <button
                                                                onClick={() => {
                                                                    handleDownload(doc)
                                                                    setOpenMenu(null)
                                                                }}
                                                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all hover:bg-blue-600/20 hover:text-blue-200 active:scale-95"
                                                            >
                                                                <FiDownload size={16} />
                                                                <span>Download</span>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    handleDelete(doc._id)
                                                                    setOpenMenu(null)
                                                                }}
                                                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 rounded-lg transition-all hover:bg-red-600/20 hover:text-red-300 active:scale-95"
                                                            >
                                                                <FiTrash2 size={16} />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-64 items-center justify-center">
                                    <div className="text-center">
                                        <FileText size={48} className="mx-auto text-gray-600 mb-3" />
                                        <p className="text-base font-medium text-gray-400">
                                            No documents found
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {search ? "Try a different search" : "Create your first document to get started"}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
 
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-8"
                        >
                            <h2 className="text-xl font-bold text-white sm:text-2xl mb-1">
                                Recent Activity
                            </h2>
                            <p className="text-sm text-gray-400 mb-6">
                                Your latest actions
                            </p>

                            <div className="space-y-4">
                                {activity.length > 0 ? (
                                    activity.map((item, index) => (
                                        <motion.div 
                                            key={index} 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />

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
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <Eye size={40} className="text-gray-600 mb-3" />
                                        <p className="text-sm font-medium text-gray-500">
                                            No activity yet
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Your activity will appear here
                                        </p>
                                    </div>
                                )}
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