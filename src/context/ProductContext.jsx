import React, { createContext, useState, useContext, useEffect } from "react";
import { useNotification } from "./NotificationContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { notify } = useNotification();
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias`);
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/pedidos`;
            console.log("Fetching orders from:", url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Adiciona status localmente se não vier do backend
            const ordersWithStatus = data.map(order => ({
                ...order,
                status: order.status || 'pendente'
            }));
            setOrders(ordersWithStatus);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchOrders();
    }, []);

    const addProduct = async (product) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                fetchProducts(); // Recarrega a lista
                notify("Produto adicionado com sucesso!", "success");
            } else {
                notify("Erro ao adicionar produto.", "error");
            }
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            notify("Erro de conexão ao adicionar produto.", "error");
        }
    };

    const removeProduct = async (id) => {
        console.log("Tentando remover produto com ID:", id);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item/${id}`, {
                method: "DELETE",
            });
            console.log("Resposta da remoção:", response.status);
            if (response.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
                notify("Produto removido com sucesso!", "success");
            } else {
                console.error("Falha ao remover produto. Status:", response.status);
                if (response.status === 500) {
                    notify("Não é possível remover este item pois ele faz parte de um pedido.", "error");
                } else {
                    notify("Erro ao remover item. Tente novamente.", "error");
                }
            }
        } catch (error) {
            console.error("Erro ao remover produto:", error);
            notify("Erro de conexão ao remover item.", "error");
        }
    };

    const updateProduct = async (product) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                fetchProducts();
                notify("Produto atualizado com sucesso!", "success");
                return true;
            } else {
                notify("Erro ao atualizar produto.", "error");
                return false;
            }
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            notify("Erro de conexão ao atualizar produto.", "error");
            return false;
        }
    };

    const removeOrder = async (id) => {
        console.log("Tentando remover pedido com ID:", id);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setOrders(prev => prev.filter(o => o.id !== id));
                notify("Pedido removido com sucesso!", "success");
            } else {
                console.error("Falha ao remover pedido. Status:", response.status);
                if (response.status === 500) {
                    notify("Erro ao remover pedido. Verifique se há restrições no banco de dados.", "error");
                } else {
                    notify("Erro ao remover pedido.", "error");
                }
            }
        } catch (error) {
            console.error("Erro ao remover pedido:", error);
            notify("Erro de conexão ao remover pedido.", "error");
        }
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item/upload`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const text = await response.text();
                return text; // Assumes the backend returns the URL as plain text
            } else {
                console.error("Erro no upload da imagem");
                notify("Erro no upload da imagem.", "error");
                return null;
            }
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            notify("Erro de conexão no upload.", "error");
            return null;
        }
    };

    const createCategory = async (categoryName) => {
        try {
            // API expects an array of objects
            const payload = [{ nome: categoryName }];

            const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                fetchCategories();
                notify("Categoria criada com sucesso!", "success");
                return true;
            } else {
                const errorText = await response.text();
                console.error("Erro ao criar categoria. Status:", response.status, "Body:", errorText);
                notify("Erro ao criar categoria. Verifique o console.", "error");
                return false;
            }
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            notify("Erro de conexão ao criar categoria.", "error");
            return false;
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchCategories();
                notify("Categoria removida com sucesso!", "success");
                return true;
            } else {
                notify("Erro ao remover categoria.", "error");
                return false;
            }
        } catch (error) {
            console.error("Erro ao remover categoria:", error);
            notify("Erro de conexão ao remover categoria.", "error");
            return false;
        }
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                // notify("Quantidade atualizada no carrinho!", "info");
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // notify("Produto adicionado ao carrinho!", "success");
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
        // notify("Produto removido do carrinho.", "info");
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
            notify("Número da mesa inválido.", "error");
            return false;
        }

        const payload = {
            mesa: mesaInt,
            itens: itensMap
        };

        console.log("Enviando pedido:", JSON.stringify(payload, null, 2));

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setCart([]); // Limpa o carrinho
                notify("Pedido enviado com sucesso!", "success");
                return true;
            }
            notify("Erro ao enviar pedido.", "error");
            return false;
        } catch (error) {
            console.error("Erro ao enviar pedido:", error);
            notify("Erro de conexão ao enviar pedido.", "error");
            return false;
        }
    };

    return (
        <ProductContext.Provider value={{ products, categories, addProduct, removeProduct, updateProduct, uploadImage, createCategory, deleteCategory, cart, addToCart, removeFromCart, submitOrder, orders, fetchOrders, updateOrderStatus, removeOrder }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
