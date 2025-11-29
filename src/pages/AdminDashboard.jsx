import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, LogOut, LayoutDashboard, PlusCircle, List, DollarSign } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useProducts } from "../context/ProductContext";
import ProductForm from "../features/admin/components/ProductForm";
import ProductList from "../features/admin/components/ProductList";
import OrderList from "../features/admin/components/OrderList";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { products } = useProducts();
    const [paginaAtiva, setPaginaAtiva] = useState("dashboard");

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const MenuButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setPaginaAtiva(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${paginaAtiva === id
                ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
        >
            <Icon size={20} />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
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
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 px-4 py-3 rounded-xl transition-all text-sm font-medium"
                    >
                        <LogOut size={18} /> Sair do Sistema
                    </button>
                </div>
            </aside>

            {/* Conteúdo */}
            <main className="flex-1 ml-64 p-8 animate-in fade-in duration-500">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            {paginaAtiva === 'dashboard' ? 'Painel de Controle' : paginaAtiva === 'novo-prato' ? 'Gerenciar Pratos' : 'Lista do Cardápio'}
                        </h1>
                        <p className="text-slate-500 text-sm">Bem-vindo de volta, Gerente.</p>
                    </div>
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold border border-red-200">
                        G
                    </div>
                </header>

                {paginaAtiva === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><List size={24} /></div>
                                </div>
                                <h3 className="text-slate-500 text-sm font-medium">Total de Pratos</h3>
                                <p className="text-3xl font-bold text-slate-800">{products.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-xl"><DollarSign size={24} /></div>
                                </div>
                                <h3 className="text-slate-500 text-sm font-medium">Vendas Hoje</h3>
                                <p className="text-3xl font-bold text-slate-800">R$ 1.250</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Utensils size={24} /></div>
                                </div>
                                <h3 className="text-slate-500 text-sm font-medium">Pedidos Pendentes</h3>
                                <p className="text-3xl font-bold text-slate-800">4</p>
                            </div>
                        </div>

                        {/* Order List Section */}
                        <OrderList />
                    </div>
                )}

                {paginaAtiva === 'novo-prato' && (
                    <ProductForm onSuccess={() => setPaginaAtiva('cardapio')} />
                )}

                {paginaAtiva === 'cardapio' && (
                    <ProductList />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
