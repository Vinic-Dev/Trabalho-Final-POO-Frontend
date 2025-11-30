import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import { NotificationProvider } from "./context/NotificationContext";

export default function App() {
    return (
        <NotificationProvider>
            <ProductProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </HashRouter>
            </ProductProvider>
        </NotificationProvider>
    );
}