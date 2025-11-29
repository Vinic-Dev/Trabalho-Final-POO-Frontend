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

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    const submitOrder = async (tableNumber) => {
        if (!tableNumber || cart.length === 0) return false;

        const itensMap = {};
        cart.forEach(item => {
            itensMap[item.product.id] = item.quantity;
        });

        const mesaInt = parseInt(tableNumber);
        if (isNaN(mesaInt)) {
            console.error("Número da mesa inválido");
            return false;
        }

        const payload = {
            mesa: mesaInt,
            itens: itensMap
        };

        console.log("Enviando pedido:", JSON.stringify(payload, null, 2));

        try {
            const response = await fetch("http://localhost:8080/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setCart([]); // Limpa o carrinho
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao enviar pedido:", error);
            return false;
        }
    };

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:8080/pedidos");
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <ProductContext.Provider value={{ products, addProduct, removeProduct, uploadImage, cart, addToCart, removeFromCart, submitOrder, orders, fetchOrders }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
