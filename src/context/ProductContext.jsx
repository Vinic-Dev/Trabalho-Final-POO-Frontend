import React, { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    // Estado inicial simulado
    const [products, setProducts] = useState([
        { id: 1, titulo: "Pizza Calabresa", preco: "45,00", categoria: "Pratos Principais" },
        { id: 2, titulo: "Macarrão Carbonara", preco: "32,00", categoria: "Pratos Principais" },
        { id: 3, titulo: "Hambúrguer Artesanal", preco: "28,50", categoria: "Pratos Principais" }
    ]);

    const addProduct = (product) => {
        setProducts(prev => [...prev, { ...product, id: Date.now() }]);
    };

    const removeProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
