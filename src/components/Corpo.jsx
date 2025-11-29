import React from "react";

export default function Corpo({ products, addToCart }) {
    return (
        <div className="max-w-5xl mx-auto space-y-12 p-6">
            {Object.entries(products.reduce((acc, product) => {
                const cat = product.categoria || 'Outros';
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(product);
                return acc;
            }, {})).map(([category, items]) => (
                <div key={category} className="space-y-6">
                    {/* Category Separator */}
                    <div className="flex items-center gap-4">
                        <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-red-200 rounded-full"></div>
                        <div className="flex items-center gap-2 text-red-600">
                            <div className="p-2 bg-red-50 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>
                            </div>
                            <h2 className="text-xl font-bold uppercase tracking-wider">{category.replace('_', ' ')}</h2>
                        </div>
                        <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-red-200 rounded-full"></div>
                    </div>

                    {/* Horizontal Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {items.map(card => (
                            <button
                                key={card.id}
                                onClick={() => addToCart(card)}
                                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex overflow-hidden border border-gray-100 h-40 w-full text-left"
                            >
                                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-400 to-amber-400 group-hover:w-2 transition-all z-10"></div>

                                {/* Image Section - Left */}
                                <div className="w-40 h-full relative shrink-0">
                                    {card.imageUrl ? (
                                        <img
                                            src={card.imageUrl}
                                            alt={card.name}
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
                                            {card.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                            {card.descricao || "Delicioso prato preparado com ingredientes selecionados."}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        {card.preco && (
                                            <span className="text-green-600 font-bold text-lg">
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.preco)}
                                            </span>
                                        )}
                                        <div className="px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-bold text-gray-500 group-hover:bg-red-50 group-hover:text-red-600 transition-colors uppercase tracking-wider">
                                            Adicionar
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}