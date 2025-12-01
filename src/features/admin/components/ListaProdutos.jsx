import React, { useState } from "react";
import { Trash2, Edit, List } from "lucide-react";
import { useProdutos } from "../../../context/ContextoProduto";
import { formatCurrency } from "../../../utils/formatters";
import Modal from "../../../components/ui/Modal";

const ListaProdutos = ({ onEdit }) => {
    const { produtos, removerProduto } = useProdutos();
    const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);

    const confirmarExclusao = () => {
        if (produtoParaDeletar) {
            removerProduto(produtoParaDeletar.id);
            setProdutoParaDeletar(null);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800">Itens no Cardápio</h2>
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                    {produtos.length} Itens
                </span>
            </div>

            {produtos.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                    <List className="mx-auto mb-4" size={48} />
                    <p>Nenhum prato cadastrado ainda.</p>
                </div>
            ) : (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {produtos.map((prato) => (
                        <div
                            key={prato.id}
                            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex overflow-hidden border border-gray-100 h-40 w-full text-left"
                        >
                            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-400 to-amber-400 group-hover:w-2 transition-all z-10"></div>

                            {/* Image Section - Left */}
                            <div className="w-40 h-full relative shrink-0">
                                {prato.imageUrl ? (
                                    <img
                                        src={prato.imageUrl}
                                        alt={prato.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-amber-50 flex items-center justify-center">
                                        <span className="text-4xl">🍽️</span>
                                    </div>
                                )}
                            </div>

                            {/* Content Section - Right */}
                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-red-600 transition-colors line-clamp-1 mb-1">
                                        {prato.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                        {prato.descricao || "Sem descrição definida."}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-2 gap-3">
                                    <span className="text-green-600 font-bold text-lg">
                                        {formatCurrency(prato.preco)}
                                    </span>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(prato)}
                                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                            title="Editar"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => setProdutoParaDeletar(prato)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div >
            )}

            <Modal
                isOpen={!!produtoParaDeletar}
                onClose={() => setProdutoParaDeletar(null)}
                title="Confirmar Exclusão"
                footer={
                    <>
                        <button
                            onClick={() => setProdutoParaDeletar(null)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmarExclusao}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Excluir Item
                        </button>
                    </>
                }
            >
                <p className="text-slate-600">
                    Tem certeza que deseja excluir o item <strong>{produtoParaDeletar?.name}</strong>? Esta ação não pode ser desfeita.
                </p>
            </Modal>
        </div >
    );
};

export default ListaProdutos;
