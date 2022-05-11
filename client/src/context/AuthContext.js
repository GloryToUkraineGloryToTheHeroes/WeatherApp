
import React from 'react'

const nothing = () => {}

export const AuthContext = React.createContext({
    token: null,
    userId: null,
    login: nothing,
    logout: nothing,
    isAuthenticated: false
})







