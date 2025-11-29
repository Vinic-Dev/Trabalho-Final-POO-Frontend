import { useState } from "react";

// Hook simples para simular autenticação
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('admin_auth') === 'true');

    const login = (user, pass) => {
        if (user === "admin" && pass === "1234") {
            setIsAuthenticated(true);
            localStorage.setItem('admin_auth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_auth');
    };

    return { isAuthenticated, login, logout };
};

export default useAuth;
