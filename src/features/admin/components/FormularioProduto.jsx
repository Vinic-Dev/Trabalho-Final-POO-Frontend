import React, { useState, useEffect } from "react";
import { PlusCircle, CheckCircle2, ImageIcon, Edit } from "lucide-react";
import { useProdutos } from "../../../context/ContextoProduto";

const FormularioProduto = ({ onSuccess, initialData, onClearEdit }) => {
    const { adicionarProduto, atualizarProduto, carregarImagem, categorias } = useProdutos();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categoria, setCategoria] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setNome(initialData.name);
            setDescricao(initialData.descricao);
            setPreco(initialData.preco.toString().replace('.', ','));

            // Handle category: check if it's an object or string
            const cat = initialData.categoria;
            const catName = typeof cat === 'object' && cat !== null ? cat.nome : cat;
            setCategoria(catName || (categorias.length > 0 ? categorias[0].nome : ""));

            setImageUrl(initialData.imageUrl);
        } else {
            resetForm();
        }
    }, [initialData, categorias]);

    const resetForm = () => {
        setNome("");
        setDescricao("");
        setPreco("");
        setImageUrl("");
        setCategoria(categorias.length > 0 ? categorias[0].nome : "");
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const url = await carregarImagem(file);
        if (url) {
            setImageUrl(url);
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome) return;

        // Find the selected category object
        const selectedCategory = categorias.find(c => c.nome === categoria);

        // If no category is found (shouldn't happen if select is populated), default to first or null
        const categoryToSend = selectedCategory || (categorias.length > 0 ? categorias[0] : null);

        const pratoDados = {
            name: nome,
            descricao: descricao || "Sem descrição",
            preco: parseFloat(preco.replace(',', '.')) || 0,
            categoria: categoryToSend, // Send the full category object
            imageUrl: imageUrl
        };

        let result;
        if (initialData) {
            result = await atualizarProduto({ ...pratoDados, id: initialData.id });
        } else {
            result = await adicionarProduto(pratoDados);
        }

        if (result !== false) {
            setSucesso(true);
            if (!initialData) resetForm();
            if (onSuccess) onSuccess();
            setTimeout(() => setSucesso(false), 3000);
        }
    };

    const handleCancel = () => {
        if (onClearEdit) onClearEdit();
        resetForm();
        if (onSuccess) onSuccess(); // Navigate back
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {initialData ? <Edit className="text-blue-600" /> : <PlusCircle className="text-red-600" />}
                {initialData ? "Editar Prato" : "Adicionar Novo Prato"}
            </h2>

            {sucesso && (
                <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-2 border border-green-100 animate-in fade-in">
                    <CheckCircle2 size={20} /> {initialData ? "Prato atualizado com sucesso!" : "Prato adicionado com sucesso!"}
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

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all resize-none h-24"
                            placeholder="Ex: Acompanha arroz, feijão e fritas..."
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
                            <option value="" disabled>Selecione uma categoria</option>
                            {categorias.map((cat, index) => (
                                <option key={cat.id || index} value={cat.nome}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Imagem do Prato</label>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <ImageIcon className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    value={imageUrl}
                                    readOnly
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-500 focus:outline-none"
                                    placeholder="URL da imagem será gerada aqui..."
                                />
                            </div>
                            <label className={`px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium cursor-pointer flex items-center ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {uploading ? 'Enviando...' : 'Upload'}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button type="submit" className={`px-8 py-3 ${initialData ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-red-600 hover:bg-red-700 shadow-red-200'} text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0`}>
                        {initialData ? "Salvar Alterações" : "Salvar Prato"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioProduto;
