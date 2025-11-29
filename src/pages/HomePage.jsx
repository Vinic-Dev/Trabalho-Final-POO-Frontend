import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import Header from "../components/layout/Header";

const HomePage = () => {
    const { products, addToCart, cart, removeFromCart, submitOrder } = useProducts();
    const [ativo, setAtivo] = useState('cardapio');
    const [mesa, setMesa] = useState("");
    const [sucessoPedido, setSucessoPedido] = useState(false);

    const estiloBase = "flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-300";
    const estiloAtivo = "bg-[#D73035] text-white shadow-md";
    const estiloInativo = "text-gray-700 hover:bg-gray-100 bg-white";

    const handleFinalizarPedido = async () => {
        if (!mesa) {
            alert("Por favor, informe o número da mesa.");
            return;
        }
        const success = await submitOrder(mesa);
        if (success) {
            setSucessoPedido(true);
            setTimeout(() => setSucessoPedido(false), 3000);
            setMesa("");
        } else {
            alert("Erro ao enviar pedido. Tente novamente.");
        }
    };

    const total = cart.reduce((acc, item) => acc + (item.product.preco * item.quantity), 0);

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
                        {cart.length > 0 && (
                            <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {ativo === 'cardapio' ? (
                    <div className="flex flex-wrap justify-center gap-6 p-6 max-w-5xl mx-auto">
                        {products.map(card => (
                            <button
                                key={card.id}
                                onClick={() => addToCart(card)}
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
                ) : (
                    <div className="max-w-2xl mx-auto p-6">
                        {sucessoPedido && (
                            <div className="mb-6 bg-green-100 text-green-800 p-4 rounded-xl text-center font-bold animate-bounce">
                                Pedido enviado com sucesso! 🚀
                            </div>
                        )}

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gray-50">
                                <h2 className="text-xl font-bold text-gray-800">Seu Pedido</h2>
                            </div>

                            {cart.length === 0 ? (
                                <div className="p-12 text-center text-gray-400">
                                    <p>Seu carrinho está vazio.</p>
                                    <button onClick={() => setAtivo('cardapio')} className="mt-4 text-red-600 font-bold hover:underline">
                                        Voltar ao Cardápio
                                    </button>
                                </div>
                            ) : (
                                <div className="p-6 space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.product.id} className="flex justify-between items-center border-b border-gray-50 pb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                                    {item.product.imageUrl ? (
                                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xl">🍽️</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">{item.product.name}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {item.quantity}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.preco)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-bold text-gray-800">
                                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.product.preco * item.quantity)}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6"></path><path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-4 flex justify-between items-center text-xl font-bold text-gray-800">
                                        <span>Total</span>
                                        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</span>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Número da Mesa</label>
                                        <input
                                            type="number"
                                            value={mesa}
                                            onChange={(e) => setMesa(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-500 outline-none transition-all mb-4"
                                            placeholder="Ex: 5"
                                        />
                                        <button
                                            onClick={handleFinalizarPedido}
                                            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-200 transform hover:-translate-y-1 active:translate-y-0"
                                        >
                                            Finalizar Pedido
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
