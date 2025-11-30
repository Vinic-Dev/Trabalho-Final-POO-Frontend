import React, { useState } from 'react';
import { useProducts } from '../../../context/ProductContext';
import { Plus, Tag } from 'lucide-react';

const CategoryManager = () => {
    const { categories, createCategory } = useProducts();
    const [newCategory, setNewCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setIsSubmitting(true);
        const success = await createCategory(newCategory);
        if (success) {
            setNewCategory('');
        }
        setIsSubmitting(false);
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
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nome da nova categoria..."
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all"
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    disabled={isSubmitting || !newCategory.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Plus size={20} />
                    Adicionar
                </button>
            </form>

            <div className="space-y-4">
                <h3 className="font-semibold text-slate-700 mb-4">Categorias Existentes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category, index) => (
                        <div
                            key={category.id || index}
                            className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-purple-200 transition-colors"
                        >
                            <span className="font-medium text-slate-700">{category.nome}</span>
                            {/* Future: Add delete/edit buttons here */}
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <div className="col-span-full text-center py-8 text-slate-400 italic">
                            Nenhuma categoria encontrada.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
