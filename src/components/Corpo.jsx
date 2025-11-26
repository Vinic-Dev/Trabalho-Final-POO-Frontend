export default function Corpo({ cards, onCardClick }) {
    return (
        <div className="flex flex-wrap justify-center gap-6 p-6 max-w-5xl mx-auto">
            {cards.map(card => (
                <button
                    onClick={() => onCardClick(card.id)}
                    className="group relative rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-6 w-72 h-72 flex flex-col items-center justify-center border border-gray-100 overflow-hidden"
                    key={card.id}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-amber-400 group-hover:h-2 transition-all"></div>

                    <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                        <span className="text-4xl">🍽️</span>
                    </div>

                    <h1 className="font-bold text-gray-800 text-xl mb-2 group-hover:text-red-600 transition-colors">{card.titulo}</h1>

                    {card.preco && (
                        <span className="text-green-600 font-bold mb-2 block">R$ {card.preco}</span>
                    )}

                    <div className="mt-2 px-4 py-1 rounded-full bg-gray-50 text-xs text-gray-500 font-medium group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                        Clique para adicionar
                    </div>
                </button>
            ))}
        </div>
    )
}