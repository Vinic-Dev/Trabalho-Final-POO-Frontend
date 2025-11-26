import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Reaproveita o CSS global (Tailwind)
import { LoginAdmin, DashboardAdmin } from "./components/AdminPages";

function AdminApp() {
    // Estado simples para controlar se está logado ou não
    const [logado, setLogado] = useState(false);

    // Estado dos pratos (Nota: em sites separados, dados locais não se comunicam sem LocalStorage ou Backend.
    // Por enquanto, vou manter o estado fixo aqui só para funcionar a visualização).
    const [cards, setCards] = useState([
        { titulo: "Pizza Calabresa", id: 1, preco: "45,00" },
        { titulo: "Macarrão Carbonara", id: 2, preco: "32,00" }
    ]);

    const adicionarPrato = (novoPrato) => {
        setCards([...cards, novoPrato]);
    };

    if (!logado) {
        return <LoginAdmin
            onLoginSuccess={() => setLogado(true)}
            onVoltar={() => window.location.href = "/"} // Volta para o index.html
        />;
    }

    return <DashboardAdmin
        onLogout={() => window.location.href = "/"}
        onAdicionarPrato={adicionarPrato}
        pratos={cards}
    />;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AdminApp />
    </StrictMode>,
)