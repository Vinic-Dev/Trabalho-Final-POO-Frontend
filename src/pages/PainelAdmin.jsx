import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, List, DollarSign, UtensilsCrossed } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useProdutos } from "../context/ContextoProduto";
import FormularioProduto from "../features/admin/components/FormularioProduto";
import ListaProdutos from "../features/admin/components/ListaProdutos";
import ListaPedidos from "../features/admin/components/ListaPedidos";
import BarraLateralAdmin from "../features/admin/components/BarraLateralAdmin";
import CartaoEstatistica from "../features/admin/components/CartaoEstatistica";
import GerenciadorCategorias from "../features/admin/components/GerenciadorCategorias";
import { formatCurrency } from "../utils/formatters";
import ComponenteNotificacao from "../components/ComponenteNotificacao";

const PainelAdmin = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { produtos, pedidos } = useProdutos();
    const [paginaAtiva, setPaginaAtiva] = useState("dashboard");
    const [editingProduct, setEditingProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('products');
    const [isEditing, setIsEditing] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setIsEditing(true);
        setActiveTab('products');
    };

    const handleClearEdit = () => {
        setEditingProduct(null);
        setIsEditing(false);
    };

    const calculateTotalSales = () => {
        return pedidos
            .filter(o => o.status === 'concluido')
            .reduce((acc, order) => {
                const total = order.precoTotal || order.itens.reduce((sum, item) => sum + (item.item.preco * item.quantidade), 0);
                return acc + total;
            }, 0);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <ComponenteNotificacao />
            {/* Sidebar */}
            <BarraLateralAdmin
                activePage={paginaAtiva}
                onNavigate={(page) => {
                    setPaginaAtiva(page);
                    if (page !== 'novo-prato' && page !== 'cardapio') {
                        setEditingProduct(null);
                        setIsEditing(false);
                    }
                    if (page === 'cardapio') {
                        setActiveTab('products');
                    }
                }}
                onLogout={handleLogout}
            />

            {/* Conteúdo */}
            <main className="flex-1 ml-64 p-8 animate-in fade-in duration-500">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            {paginaAtiva === 'dashboard' ? 'Painel de Controle' : paginaAtiva === 'cardapio' ? (activeTab === 'products' ? (isEditing ? 'Editar Prato' : 'Gerenciar Cardápio') : 'Gerenciar Categorias') : 'Gerenciar Pratos'}
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
                            <CartaoEstatistica
                                icon={List}
                                iconBg="bg-blue-50"
                                iconColor="text-blue-600"
                                title="Total de Pratos"
                                value={produtos.length}
                            />
                            <CartaoEstatistica
                                icon={DollarSign}
                                iconBg="bg-green-50"
                                iconColor="text-green-600"
                                title="Vendas Hoje"
                                value={formatCurrency(calculateTotalSales())}
                            />
                            <CartaoEstatistica
                                icon={Utensils}
                                iconBg="bg-amber-50"
                                iconColor="text-amber-600"
                                title="Pedidos Pendentes"
                                value={pedidos.filter(o => o.status !== 'concluido').length}
                            />
                        </div>

                        {/* Order List Section */}
                        <ListaPedidos />
                    </div>
                )}

                {/* The 'novo-prato' page is now integrated into 'cardapio' as a tab, but keeping it for now if it's a separate flow */}
                {paginaAtiva === 'novo-prato' && (
                    <FormularioProduto
                        onSuccess={handleClearEdit}
                        initialData={editingProduct}
                        onClearEdit={() => setEditingProduct(null)}
                    />
                )}

                {paginaAtiva === 'cardapio' && (
                    <div className="space-y-6">
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => { setActiveTab('products'); setIsEditing(false); setEditingProduct(null); }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'products'
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                                    : 'bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <UtensilsCrossed size={20} />
                                Gerenciar Cardápio
                            </button>
                            <button
                                onClick={() => setActiveTab('categories')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'categories'
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                    : 'bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <List size={20} />
                                Categorias
                            </button>
                        </div>

                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {activeTab === 'products' ? (
                                isEditing ? (
                                    <FormularioProduto
                                        onSuccess={() => setIsEditing(false)}
                                        initialData={editingProduct}
                                        onClearEdit={() => { setEditingProduct(null); setIsEditing(false); }}
                                    />
                                ) : (
                                    <ListaProdutos onEdit={handleEditProduct} />
                                )
                            ) : (
                                <GerenciadorCategorias />
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PainelAdmin;
