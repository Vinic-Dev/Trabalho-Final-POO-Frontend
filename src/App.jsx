import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ProvedorProduto } from "./context/ContextoProduto";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaLogin from "./pages/PaginaLogin";
import PainelAdmin from "./pages/PainelAdmin";
import { ProvedorNotificacao } from "./context/ContextoNotificacao";

export default function App() {
    return (
        <ProvedorNotificacao>
            <ProvedorProduto>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<PaginaInicial />} />
                        <Route path="/login" element={<PaginaLogin />} />
                        <Route path="/admin" element={<PainelAdmin />} />
                    </Routes>
                </HashRouter>
            </ProvedorProduto>
        </ProvedorNotificacao>
    );
}