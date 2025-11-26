import { useState } from "react";
import {
    Lock, LogOut, User, ArrowLeft, Utensils, DollarSign, List,
    PlusCircle, LayoutDashboard, Search, Image as ImageIcon,
    CheckCircle2, Trash2, Edit
} from "lucide-react";

// ==========================================
// TELA DE LOGIN
// ==========================================
export function LoginAdmin({ onLoginSuccess, onVoltar }) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (user === "admin" && pass === "1234") {
            onLoginSuccess();
        } else {
            setErro("Tente user: admin / senha: 1234");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onVoltar}
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
                            placeholder="admin"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Senha</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-gray-50 focus:bg-white transition-all"
                            placeholder="1234"
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
}

// ==========================================
// FORMULÁRIO INTERNO (Auxiliar)
// ==========================================
function FormularioNovoPrato({ onSalvar }) {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [sucesso, setSucesso] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome) return;

        const novoPrato = {
            id: Date.now(),
            titulo: nome,
            preco: preco || "0,00"
        };

        onSalvar(novoPrato);

        setSucesso(true);
        setNome("");
        setPreco("");
        setTimeout(() => setSucesso(false), 3000);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <PlusCircle className="text-red-600" /> Adicionar Novo Prato
            </h2>

            {sucesso && (
                <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2 border border-green-100 animate-in fade-in">
                    <CheckCircle2 size={20} /> Prato adicionado com sucesso ao cardápio!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nome do Prato</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all"
                            placeholder="Ex: Picanha na Chapa"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Preço (R$)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-slate-400">R$</span>
                            <input
                                type="text"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all"
                                placeholder="0,00"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                        <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white">
                            <option>Pratos Principais</option>
                            <option>Bebidas</option>
                            <option>Sobremesas</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">URL da Imagem (Opcional)</label>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <ImageIcon className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all"
                                    placeholder="https://..."
                                />
                            </div>
                            <button type="button" className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button type="button" className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                        Salvar Prato
                    </button>
                </div>
            </form>
        </div>
    );
}

// ==========================================
// DASHBOARD PRINCIPAL (Exportado)
// ==========================================
export function DashboardAdmin({ onLogout, onAdicionarPrato, pratos }) {
    const [paginaAtiva, setPaginaAtiva] = useState("dashboard");

    const MenuButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setPaginaAtiva(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                paginaAtiva === id
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
                        onClick={onLogout}
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
                                <p className="text-3xl font-bold text-slate-800">{pratos.length}</p>
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
                    </div>
                )}

                {paginaAtiva === 'novo-prato' && (
                    <FormularioNovoPrato onSalvar={onAdicionarPrato} />
                )}

                {paginaAtiva === 'cardapio' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="font-bold text-lg text-slate-800">Itens no Cardápio</h2>
                            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                                {pratos.length} Itens
                            </span>
                        </div>

                        {pratos.length === 0 ? (
                            <div className="p-12 text-center text-slate-400">
                                <List className="mx-auto mb-4" size={48} />
                                <p>Nenhum prato cadastrado ainda.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {pratos.map((prato) => (
                                    <div key={prato.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xl">
                                                🍽️
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800">{prato.titulo}</h3>
                                                <p className="text-sm text-slate-500 font-medium">R$ {prato.preco}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}