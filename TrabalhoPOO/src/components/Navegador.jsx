import { useState } from 'react';

export default function Nave() {
  const [ativo, setAtivo] = useState('cardapio');

  const estiloBase = "flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-300";
  const estiloAtivo = "bg-[#D73035] text-white shadow-md";
  const estiloInativo = "text-gray-700 hover:bg-gray-100 bg-white";

  return (
    <div className="flex justify-center w-full mb-8">
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
  );
}