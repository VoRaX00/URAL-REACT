import React, {createContext, useContext, useReducer, useState} from 'react'
import Context from 'universal-cookie'
import Cookies from "universal-cookie";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const cookies = new Cookies()
    const [isAuthenticated, setIsAuthenticated] = useState(cookies.get('jwt_authorization'))

    const login = (token) => {
        cookies.set("jwt_authorization", token, {path: "/"})
        setIsAuthenticated(true)
    }

    const logout = () => {
        cookies.remove("jwt_authorization");
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)