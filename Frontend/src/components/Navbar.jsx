import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import { toast } from "sonner"
import { useAuth } from "../pages/auth/AuthContext"
import { useNavigate, NavLink } from "react-router-dom"
import devdocs from "../assets/devdocs.png"
import { motion } from "motion/react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]

const Navbar = () => {
  const { user, loading } = useAuth();

  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  const logout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND}/auth/logout`, { withCredentials: true })
      toast.success("Logout")
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error("Logout Failed")
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  const linkClasses = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${isActive
      ? "text-indigo-300 bg-indigo-500/10"
      : "text-gray-400 hover:text-indigo-300 hover:bg-white/5"
    }`

  return (
    <nav className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-3 shrink-0">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.3 }}
              className="w-11 h-11 rounded-xl cursor-pointer overflow-hidden border border-white/10">
              <img
                src={devdocs}
                alt="DevDocs Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="flex flex-col leading-none">
              <h1 className="text-xl font-bold tracking-tight text-white">
                Dev
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Docs
                </span>
              </h1>

              <p className="text-[11px] text-gray-500 font-medium">
                Code • Collaborate • Create
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }, 0);
                }}
                className={linkClasses}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-28 h-9 rounded-lg bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex cursor-pointer items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-indigo-400/40 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs font-semibold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-gray-300 max-w-[100px] truncate">
                    {user?.name || "Account"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-xl border border-white/10 bg-[#0b1120]/95 backdrop-blur-xl shadow-2xl py-1.5 animate-[fadeIn_0.15s_ease-out]">
                    <NavLink
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-indigo-300 transition-colors"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-indigo-300 transition-colors"
                    >
                      Settings
                    </NavLink>
                    <div className="my-1 border-t border-white/10" />
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-400 hover:text-indigo-300 transition-colors"
                >
                  Log in
                </button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 cursor-pointer text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg shadow-indigo-600/30 transition-colors"
                >
                  Sign up
                </motion.button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
          }`}
      >
        <div className="px-4 py-3 space-y-1 bg-[#030712]">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? "text-indigo-300 bg-indigo-500/10"
                  : "text-gray-400 hover:bg-white/5 hover:text-indigo-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="pt-3 mt-3 border-t border-white/10">
            {loading ? (
              <div className="px-3 py-2">
                <div className="w-full h-9 rounded-lg bg-white/5 animate-pulse" />
              </div>
            ) : user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs font-semibold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-gray-300 truncate max-w-[140px]">
                    {user?.name || "Account"}
                  </span>
                </div>
                <button
                  onClick={() => { setMobileOpen(false); logout() }}
                  className="px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-3">
                <button
                  onClick={() => { setMobileOpen(false); navigate('/login') }}
                  className="w-full px-4 py-2.5 text-sm font-medium text-gray-300 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/register') }}
                  className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg shadow-indigo-600/30 transition-colors"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar