import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import Header from "../components/layout/Header";

const HomePage = () => {
    const { products } = useProducts();
    const [ativo, setAtivo] = useState('cardapio');

    const estiloBase = "flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-300";
    const estiloAtivo = "bg-[#D73035] text-white shadow-md";
    const estiloInativo = "text-gray-700 hover:bg-gray-100 bg-white";

    return (
        <div className="min-h-screen bg-gray-100 pb-20 font-sans">
            <Header />

            {/* Navegador (Nave.jsx) */}
            <div className="flex justify-center w-full mb-8 mt-8">
                <div className="bg-white p-1 rounded-full shadow-xl flex gap-1">
                    <button
                        onClick={() => setAtivo('cardapio')}
                        className={`${estiloBase} ${ativo === 'cardapio' ? estiloAtivo : estiloInativo}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                            <path d="M7 2v20"></path>
                            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                        </svg>
                        Cardápio
                    </button>

                    <button
                        onClick={() => setAtivo('pedidos')}
                        className={`${estiloBase} ${ativo === 'pedidos' ? estiloAtivo : estiloInativo}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        Meu Pedido
                    </button>
                </div>
            </div>

            {/* Corpo (Corpo.jsx) */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-wrap justify-center gap-6 p-6 max-w-5xl mx-auto">
                    {products.map(card => (
                        <button
                            key={card.id}
                            className="group relative rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-6 w-72 h-72 flex flex-col items-center justify-center border border-gray-100 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-amber-400 group-hover:h-2 transition-all"></div>

                            {card.imageUrl ? (
                                <div className="w-24 h-24 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner rounded-full overflow-hidden">
                                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                                    <span className="text-4xl">🍽️</span>
                                </div>
                            )}

                            <h1 className="font-bold text-gray-800 text-xl mb-2 group-hover:text-red-600 transition-colors">{card.name}</h1>

                            {card.preco && (
                                <span className="text-green-600 font-bold mb-2 block">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(card.preco)}
                                </span>
                            )}

                            <div className="mt-2 px-4 py-1 rounded-full bg-gray-50 text-xs text-gray-500 font-medium group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                                Clique para adicionar
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
