import React, { createContext, useState, useContext, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/item");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product) => {
        try {
            const response = await fetch("http://localhost:8080/item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                fetchProducts(); // Recarrega a lista
            }
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/item/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error("Erro ao remover produto:", error);
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8080/item/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const text = await response.text();
                return text; // Assumes the backend returns the URL as plain text
            } else {
                console.error("Erro no upload da imagem");
                return null;
            }
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            return null;
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, removeProduct, uploadImage }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
