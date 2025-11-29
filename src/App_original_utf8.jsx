import { useState } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Nave from "./components/Navegador";
import Corpo from "./components/Corpo";
import { LoginAdmin, DashboardAdmin } from "./components/AdminPages";

// --- COMPONENTES INTERNOS PARA GERENCIAR A NAVEGA├ç├âO ---

// 1. Componente da Home (agora isolado para usar o hook de navega├º├úo)
function PaginaHome({ cards, onCardClick }) {
    const navigate = useNavigate(); // Hook para mudar de p├ígina

    return (
        <div className="min-h-screen bg-gray-100 pb-20 font-sans">
            {/* Quando clicar no admin, mudamos a URL para /login */}
            <Header onAdminClick={() => navigate('/login')} />
            <Nave />
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Corpo cards={cards} onCardClick={onCardClick} />
            </div>
        </div>
    );
}

// 2. Componente de Login (Wrapper)
function PaginaLogin() {
    const navigate = useNavigate();

    return (
        <LoginAdmin
            onLoginSuccess={() => navigate('/admin')} // Sucesso: vai para /admin
            onVoltar={() => navigate('/')}            // Voltar: vai para a Home
        />
    );
}

// 3. Componente do Admin (Wrapper)
function PaginaAdmin({ cards, adicionarPrato }) {
    const navigate = useNavigate();

    return (
        <DashboardAdmin
            onLogout={() => navigate('/')} // Logout: volta para Home
            onAdicionarPrato={adicionarPrato}
            pratos={cards}
        />
    );
}

// --- APP PRINCIPAL ---

export default function App() {
    // O estado da telaAtual sumiu, pois a URL cuida disso agora.

    // Estado Elevado: Lista de Pratos continua aqui
    const [cards, setCards] = useState([
        { titulo: "Pizza Calabresa", id: 1, preco: "45,00" },
        { titulo: "Macarr├úo Carbonara", id: 2, preco: "32,00" },
        { titulo: "Hamb├║rguer Artesanal", id: 3, preco: "28,50" }
    ]);

    const adicionarPrato = (novoPrato) => {
        setCards([...cards, novoPrato]);
    };

    const handleCardClick = (cardId) => {
        const newCardList = cards.map(card => {
            if (card.id === cardId) {
                return { ...card, titulo: "ADICIONADO!" };
            }
            return card;
        });
        setCards(newCardList);
    };

    return (
        // HashRouter ├® usado para funcionar bem no GitHub Pages
        <HashRouter>
            <Routes>
                {/* Rota Raiz (Home) */}
                <Route
                    path="/"
                    element={<PaginaHome cards={cards} onCardClick={handleCardClick} />}
                />

                {/* Rota de Login */}
                <Route
                    path="/login"
                    element={<PaginaLogin />}
                />

                {/* Rota do Admin Protegida */}
                <Route
                    path="/admin"
                    element={<PaginaAdmin cards={cards} adicionarPrato={adicionarPrato} />}
                />
            </Routes>
        </HashRouter>
    );
}
