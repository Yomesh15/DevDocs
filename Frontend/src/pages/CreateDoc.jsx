import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import JoditEditor from "jodit-react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Save,
  Clock,
  FileText,
  Share2,
  MoreVertical,
  Check,
  Loader,
  Eye,
  Download,
  Copy,
  Trash2,
  Users,
  Calendar,
  Info,
} from "lucide-react";

const CreateDoc = () => {
  const { id } = useParams();

  const [showdelete, setshowdelete] = useState(false)
  const navigate = useNavigate();
  const editor = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [document, setDocument] = useState(null);
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/document/${id}`,
          {
            withCredentials: true,
          }
        );
        setDocument(res.data.document);
        setContent(res.data.document.content || "");
        setLastSaved(new Date(res.data.document.updatedAt));
        updateStats(res.data.document.content || "");
      } catch (error) {
        console.log(error);
        toast.error("Failed to load document");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id, navigate]);

  const updateStats = useCallback((text) => {
    if (!text) {
      setWordCount(0);
      setCharCount(0);
      setReadingTime(0);
      return;
    }

    const plainText = text.replace(/<[^>]*>/g, "");
    const words = plainText.trim().split(/\s+/).filter((word) => word).length;
    const chars = plainText.length;
    const reading = words > 0 ? Math.ceil(words / 200) : 0;

    setWordCount(words);
    setCharCount(chars);
    setReadingTime(reading);
  }, []);

  const handleContentChange = useCallback((newContent) => {
    setContent(newContent);
    updateStats(newContent);
  }, [updateStats]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setDocument(prev => ({ ...prev, title: newTitle }));
  };

  const handleSave = async () => {
    if (!document) return;

    try {
      setSaving(true);

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND}/document/update/${id}`,
        {
          title: document.title,
          content,
        },
        {
          withCredentials: true,
        }
      );

      setDocument(res.data.document);
      setLastSaved(new Date());
      setSaveSuccess(true);
      toast.success("Document saved successfully");

      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save document");
    } finally {
      setSaving(false);
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return "Never saved";
    const now = new Date();
    const diff = now - lastSaved;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  const exportAsText = () => {
    const element = document.createElement("a");
    const plainText = content.replace(/<[^>]*>/g, "");
    const file = new Blob([plainText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${document?.title || "document"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Document exported");
  };



  const config = useMemo(() => ({
    readonly: false,
    height: "auto",
    minHeight: 600,
    placeholder: "Start writing your document here...",
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "ul",
      "ol",
      "indent",
      "outdent",
      "|",
      "font",
      "fontsize",
      "lineHeight",
      "|",
      "align",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "link",
      "image",
      "table",
      "blockquote",
    ],
  }), []);


  const deletedocument = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/document/delete/${id}`, { withCredentials: true })
      toast.success("Document Deleted")

      navigate("/dashboard")
    } catch (error) {
      toast.error("Failed to Delete")
    }
  }




  if (loading) {
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
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      <div className="fixed inset-0 -z-20">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[130px]" />
        <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/15 blur-[110px]" />
        <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 border-b border-white/10 bg-[#030712]/98 backdrop-blur-2xl"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-gray-300 hover:text-white transition-all hover:border-indigo-400/50"
                >
                  <ArrowLeft size={20} />
                </motion.button>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">DOCUMENT</p>
                  <p className="truncate text-sm font-bold text-white mt-0.5">
                    {document?.title || "Untitled"}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden cursor-pointer sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-gray-300 hover:text-white"
                  title="Share document"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={saving}
                  className="relative cursor-pointer flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 disabled:opacity-70"
                >
                  {saving ? (
                    <Loader size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  <span className="hidden sm:inline">
                    {saving ? "Saving..." : "Save"}
                  </span>
                  <AnimatePresence>
                    {saveSuccess && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500"
                      >
                        <Check size={16} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setshowdelete(!showdelete)}
                    className="flex cursor-pointer h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                    title="More options"
                  >
                    <MoreVertical size={18} />
                  </motion.button>

                  <AnimatePresence>
                    {showdelete && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-6 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#111827] shadow-2xl backdrop-blur-xl z-50"
                      >
                        <button
                          onClick={deletedocument}
                          className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors "
                        >
                          <Trash2 size={16} />
                          Delete Document
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>


              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-1"
            >
              <p className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <FileText size={14} className="text-indigo-400" />
                Words
              </p>
              <p className="text-lg font-bold text-white">{wordCount}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-1"
            >
              <p className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <Copy size={14} className="text-purple-400" />
                Characters
              </p>
              <p className="text-lg font-bold text-white">{charCount}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-1"
            >
              <p className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <Clock size={14} className="text-cyan-400" />
                Reading Time
              </p>
              <p className="text-lg font-bold text-white">{readingTime} min</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-1"
            >
              <p className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <Calendar size={14} className="text-pink-400" />
                Last Saved
              </p>
              <p className="text-lg font-bold text-white">{formatLastSaved()}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="space-y-2 mb-8">
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            type="text"
            value={document?.title || ""}
            onChange={handleTitleChange}
            placeholder="Document Title"
            className="w-full bg-transparent text-4xl sm:text-5xl md:text-6xl font-black text-white placeholder:text-gray-700 outline-none focus:text-indigo-100 transition-colors caret-indigo-400"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              Last edited {formatLastSaved()}
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>You</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="rounded-2xl overflow-hidden bg-white shadow-2xl border border-white/10 backdrop-blur-xl">
          <style>{`
            .jodit-container {
              background-color: white !important;
              border-radius: 0 !important;
            }
            .jodit-wysiwyg {
              background-color: white !important;
              color: #1a1a1a !important;
              padding: 2rem !important;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
              line-height: 1.8 !important;
              min-height: 600px !important;
            }
            .jodit-wysiwyg p {
              color: #1a1a1a !important;
              font-size: 16px !important;
              margin-bottom: 1rem !important;
            }
            .jodit-wysiwyg h1,
            .jodit-wysiwyg h2,
            .jodit-wysiwyg h3,
            .jodit-wysiwyg h4,
            .jodit-wysiwyg h5,
            .jodit-wysiwyg h6 {
              color: #000 !important;
              margin-top: 1.5rem !important;
              margin-bottom: 0.75rem !important;
              font-weight: 600 !important;
            }
            .jodit-wysiwyg h1 {
              font-size: 28px !important;
            }
            .jodit-wysiwyg h2 {
              font-size: 24px !important;
            }
            .jodit-wysiwyg li,
            .jodit-wysiwyg span,
            .jodit-wysiwyg div {
              color: #1a1a1a !important;
            }
            .jodit-wysiwyg ul,
            .jodit-wysiwyg ol {
              margin: 1rem 0 1rem 2rem !important;
            }
            .jodit-wysiwyg a {
              color: #0066cc !important;
              text-decoration: underline !important;
            }
            .jodit-placeholder {
              color: #ccc !important;
              font-style: italic !important;
            }
            .jodit-toolbar {
              background: linear-gradient(to bottom, #fafafa, #f5f5f5) !important;
              border-bottom: 1px solid #e5e5e5 !important;
              padding: 8px !important;
            }
            .jodit-toolbar__box {
              background: transparent !important;
            }
            .jodit-toolbar-button {
              color: #333 !important;
            }
            .jodit-toolbar-button:hover {
              background-color: #e0e0e0 !important;
              color: #000 !important;
            }
            .jodit-toolbar-button.active {
              background-color: #d0d0d0 !important;
              color: #000 !important;
            }
          `}</style>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(value) => {
              setContent(value);
              updateStats(value);
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-gray-300 hover:text-white"
          >
            <Copy size={16} />
            Copy to Clipboard
          </motion.button>
{/* 
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportAsText}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-gray-300 hover:text-white"
          >
            <Download size={16} />
            Export as Text
          </motion.button> */}

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              deletedocument()
              navigate('/dashboard')
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="flex items-center cursor-pointer justify-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-gray-300 hover:text-white"
          >
            <Trash2 size={16} />
            Delete
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
            <div className="space-y-1 flex-1">
              <p className="text-sm font-semibold text-white">Professional Editing Tips</p>
              <p className="text-xs text-gray-400">
                Use keyboard shortcuts for faster editing. Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Ctrl + B</kbd> for bold, <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Ctrl + I</kbd> for italic, and <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">Ctrl + Z</kbd> to undo.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreateDoc;