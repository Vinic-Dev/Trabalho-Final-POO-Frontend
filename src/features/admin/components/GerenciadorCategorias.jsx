import React, { useState } from 'react';
import { useProdutos } from '../../../context/ContextoProduto';
import { Plus, Tag, Trash2 } from 'lucide-react';
import Modal from '../../../components/ui/Modal';

const GerenciadorCategorias = () => {
    const { categorias, criarCategoria, deletarCategoria } = useProdutos();
    const [novaCategoria, setNovaCategoria] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [categoriaParaDeletar, setCategoriaParaDeletar] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!novaCategoria.trim()) return;

        setEnviando(true);
        const sucesso = await criarCategoria(novaCategoria);
        if (sucesso) {
            setNovaCategoria('');
        }
        setEnviando(false);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Tag className="text-purple-600" />
                Gerenciar Categorias
            </h2>

            <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
                <input
                    type="text"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                    placeholder="Nome da nova categoria..."
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all"
                    disabled={enviando}
                />
                <button
                    type="submit"
                    disabled={enviando || !novaCategoria.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Plus size={20} />
                    Adicionar
                </button>
            </form>

            <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 mb-4">Categorias Existentes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {categorias.map((categoria, index) => (
                        <div
                            key={categoria.id || index}
                            className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-purple-200 transition-colors"
                        >
                            <span className="font-medium text-slate-700">{categoria.nome}</span>
                            <button
                                onClick={() => {
                                    console.log("Deleting category:", categoria);
                                    setCategoriaParaDeletar(categoria);
                                }}
                                className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-50 rounded-lg"
                                title="Remover categoria"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {categorias.length === 0 && (
                        <div className="col-span-full text-center py-8 text-slate-400 italic">
                            Nenhuma categoria encontrada.
                        </div>
                    )}
                </div>
            </div>
            <Modal
                isOpen={!!categoriaParaDeletar}
                onClose={() => setCategoriaParaDeletar(null)}
                title="Confirmar Exclusão"
                footer={
                    <>
                        <button
                            onClick={() => setCategoriaParaDeletar(null)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                if (categoriaParaDeletar) {
                                    deletarCategoria(categoriaParaDeletar.id);
                                    setCategoriaParaDeletar(null);
                                }
                            }}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Excluir Categoria
                        </button>
                    </>
                }
            >
                <p className="text-slate-600">
                    Tem certeza que deseja excluir a categoria <strong>{categoriaParaDeletar?.nome}</strong>?
                    <br />
                    <span className="text-sm text-red-500 mt-2 block">
                        Isso pode afetar os produtos associados a esta categoria.
                    </span>
                </p>
            </Modal>
        </div>
    );
};

export default GerenciadorCategorias;
