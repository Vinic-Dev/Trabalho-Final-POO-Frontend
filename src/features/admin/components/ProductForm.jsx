import React, { useState } from "react";
import { PlusCircle, CheckCircle2, ImageIcon } from "lucide-react";
import { useProducts } from "../../../context/ProductContext";

const ProductForm = ({ onSuccess }) => {
    const { addProduct } = useProducts();
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categoria, setCategoria] = useState("Pratos Principais");
    const [sucesso, setSucesso] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome) return;

        const novoPrato = {
            name: nome,
            descricao: "Delicioso prato", // Default description or add field
            preco: parseFloat(preco.replace(',', '.')) || 0,
            categoria: categoria,
            imageUrl: imageUrl
        };

        addProduct(novoPrato);

        setSucesso(true);
        setNome("");
        setPreco("");
        setImageUrl("");
        if (onSuccess) onSuccess();
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
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none bg-white"
                        >
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
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
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
};

export default ProductForm;
