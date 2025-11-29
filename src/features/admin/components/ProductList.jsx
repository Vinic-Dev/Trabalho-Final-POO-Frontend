import React from "react";
import { Trash2, Edit, List } from "lucide-react";
import { useProducts } from "../../../context/ProductContext";

const ProductList = () => {
    const { products, removeProduct } = useProducts();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-bold text-lg text-slate-800">Itens no Cardápio</h2>
                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                    {products.length} Itens
                </span>
            </div>

            {products.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                    <List className="mx-auto mb-4" size={48} />
                    <p>Nenhum prato cadastrado ainda.</p>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {products.map((prato) => (
                        <div key={prato.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xl overflow-hidden">
                                    {prato.imageUrl ? (
                                        <img src={prato.imageUrl} alt={prato.name} className="w-full h-full object-cover" />
                                    ) : (
                                        "🍽️"
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{prato.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prato.preco)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => removeProduct(prato.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
