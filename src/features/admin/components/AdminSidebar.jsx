import React from "react";
import { Utensils, LogOut, LayoutDashboard, PlusCircle, List } from "lucide-react";

const AdminSidebar = ({ activePage, onNavigate, onLogout }) => {
    const MenuButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activePage === id
                ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
        >
            <Icon size={20} />
            {label}
        </button>
    );

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-20 transition-all duration-300">
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3 text-red-500">
                    <Utensils size={28} />
                    <span className="font-bold text-xl text-white tracking-tight">Gerenciamento<span className="text-red-600">.</span></span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                <MenuButton id="dashboard" icon={LayoutDashboard} label="Visão Geral" />
                <MenuButton id="novo-prato" icon={PlusCircle} label="Novo Prato" />
                <MenuButton id="cardapio" icon={List} label="Ver Cardápio" />
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-all text-sm font-medium"
                >
                    <LogOut size={18} /> Sair do Sistema
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
