import React from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImagem from "../assets/logo.png";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-red-600 py-6 relative shadow-lg">
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => navigate('/login')}
                    className="text-white/80 hover:text-white hover:bg-red-700 p-2 rounded-full transition-colors flex items-center gap-2 text-sm group"
                    title="Acesso Gerente"
                >
                    <span className="hidden sm:inline font-medium group-hover:underline decoration-red-400 underline-offset-4">Gerente</span>
                    <Lock size={20} />
                </button>
            </div>

            <div className="flex justify-center">
                <img src={logoImagem} alt="Logo" className="h-20 object-contain" />
            </div>
        </div>
    );
};

export default Header;
