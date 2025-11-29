import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
    return (
        <ProductProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </HashRouter>
        </ProductProvider>
    );
}