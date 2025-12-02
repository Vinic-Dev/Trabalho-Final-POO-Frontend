import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import useAuth from "../hooks/useAuth";

const PaginaLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(user, pass)) {
            navigate('/admin');
        } else {
            setErro("Tente user: admin / senha: 1234");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 text-gray-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium transition-colors"
                >
                    <ArrowLeft size={16} /> Voltar
                </button>

                <div className="text-center mb-8 mt-6">
                    <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 shadow-inner">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Portal do Gerente</h2>
                    <p className="text-gray-500 text-sm">Acesso Administrativo</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Usuário</label>
                        <input
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-gray-50 focus:bg-white transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Senha</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-gray-50 focus:bg-white transition-all"
                        />
                    </div>

                    {erro && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{erro}</div>}

                    <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaginaLogin;
