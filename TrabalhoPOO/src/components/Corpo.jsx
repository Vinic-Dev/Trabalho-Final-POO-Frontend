import { useState } from "react";

export default function Corpo() {
    const [Cards, SetCards] = useState([
        {
            titulo: "pizza",
            id: 1
        },
        {
            titulo: "macarrao",
            id: 2
        }
    ]);

    function onCardClick(cardId) {
        const newCardList = Cards.map(card => {

            if (card.id === cardId) {
                return {
                    ...card,
                    titulo: "CLICADO!"
                };
            }
            return card;
        });

        SetCards(newCardList);
    }

    return (
        <div className="flex gap-3 m-5">
            {Cards.map(card => (
                <button
                    onClick={() => onCardClick(card.id)}
                    className="rounded-2xl bg-amber-300 p-2 w-64 h-64"
                    key={card.id}
                >
                    <h1>{card.titulo}</h1>
                </button>
            ))}
        </div>
    )
}