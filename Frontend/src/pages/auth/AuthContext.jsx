import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchCurrentUser = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND}/auth/getcurrentuser`,
                { withCredentials: true }
            )
            setuser(res.data.user)
            
        } catch (error) {
            setuser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setuser, loading, refreshUser: fetchCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
