import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null);



const AuthProvider = (props) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            setAuth(userInfo);
        }

        setLoading(false);
    },[]);

     const onLogin = (newAuth, token) => {
        setAuth(newAuth);
        localStorage.setItem('token',token);
        localStorage.setItem('userInfo',JSON.stringify(newAuth));
     }

    const onLogout = () => {
        setAuth(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    }

    const authData = {auth, onLogin, onLogout};
    return (
        <AuthContext.Provider value={authData}>
            { !loading && props.children}
        </AuthContext.Provider>
        
    )
}

export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);
