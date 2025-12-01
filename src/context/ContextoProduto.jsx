import React, { createContext, useState, useContext, useEffect } from "react";
import { useNotificacao } from "./ContextoNotificacao";

const ContextoProduto = createContext();

export const ProvedorProduto = ({ children }) => {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const { notificar } = useNotificacao();
    const [carrinho, setCarrinho] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    const buscarProdutos = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item`);
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const buscarCategorias = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias`);
            if (response.ok) {
                const data = await response.json();
                setCategorias(data);
            }
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const buscarPedidos = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/pedidos`;
            console.log("Fetching orders from:", url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Adiciona status localmente se não vier do backend
            const pedidosComStatus = data.map(pedido => ({
                ...pedido,
                status: pedido.status || 'pendente'
            }));
            setPedidos(pedidosComStatus);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        }
    };

    useEffect(() => {
        buscarProdutos();
        buscarCategorias();
        buscarPedidos();
    }, []);

    const adicionarProduto = async (produto) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produto),
            });
            if (response.ok) {
                buscarProdutos(); // Recarrega a lista
                notificar("Produto adicionado com sucesso!", "success");
            } else {
                notificar("Erro ao adicionar produto.", "error");
            }
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            notificar("Erro de conexão ao adicionar produto.", "error");
        }
    };

    const removerProduto = async (id) => {
        console.log("Tentando remover produto com ID:", id);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item/${id}`, {
                method: "DELETE",
            });
            console.log("Resposta da remoção:", response.status);
            if (response.ok) {
                setProdutos(prev => prev.filter(p => p.id !== id));
                notificar("Produto removido com sucesso!", "success");
            } else {
                console.error("Falha ao remover produto. Status:", response.status);
                if (response.status === 500) {
                    notificar("Não é possível remover este item pois ele faz parte de um pedido.", "error");
                } else {
                    notificar("Erro ao remover item. Tente novamente.", "error");
                }
            }
        } catch (error) {
            console.error("Erro ao remover produto:", error);
            notificar("Erro de conexão ao remover item.", "error");
        }
    };

    const atualizarProduto = async (produto) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/item/${produto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produto),
            });

            if (response.ok) {
                buscarProdutos();
                notificar("Produto atualizado com sucesso!", "success");
                return true;
            } else {
                notificar("Erro ao atualizar produto.", "error");
                return false;
            }
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            notificar("Erro de conexão ao atualizar produto.", "error");
            return false;
        }
    };

    const removerPedido = async (id) => {
        console.log("Tentando remover pedido com ID:", id);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setPedidos(prev => prev.filter(o => o.id !== id));
                notificar("Pedido removido com sucesso!", "success");
            } else {
                console.error("Falha ao remover pedido. Status:", response.status);
                if (response.status === 500) {
                    notificar("Erro ao remover pedido. Verifique se há restrições no banco de dados.", "error");
                } else {
                    notificar("Erro ao remover pedido.", "error");
                }
            }
        } catch (error) {
            console.error("Erro ao remover pedido:", error);
            notificar("Erro de conexão ao remover pedido.", "error");
        }
    };

    const atualizarStatusPedido = (pedidoId, novoStatus) => {
        setPedidos(prevPedidos =>
            prevPedidos.map(pedido =>
                pedido.id === pedidoId ? { ...pedido, status: novoStatus } : pedido
            )
        );
    };

    const carregarImagem = async (arquivo) => {
        const formData = new FormData();
        formData.append("file", arquivo);

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
                notificar("Erro no upload da imagem.", "error");
                return null;
            }
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            notificar("Erro de conexão no upload.", "error");
            return null;
        }
    };

    const criarCategoria = async (nomeCategoria) => {
        try {
            // API expects an array of objects
            const payload = [{ nome: nomeCategoria }];

            const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                buscarCategorias();
                notificar("Categoria criada com sucesso!", "success");
                return true;
            } else {
                const errorText = await response.text();
                console.error("Erro ao criar categoria. Status:", response.status, "Body:", errorText);
                notificar("Erro ao criar categoria. Verifique o console.", "error");
                return false;
            }
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            notificar("Erro de conexão ao criar categoria.", "error");
            return false;
        }
    };

    const deletarCategoria = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/categorias/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                buscarCategorias();
                notificar("Categoria removida com sucesso!", "success");
                return true;
            } else {
                notificar("Erro ao remover categoria.", "error");
                return false;
            }
        } catch (error) {
            console.error("Erro ao remover categoria:", error);
            notificar("Erro de conexão ao remover categoria.", "error");
            return false;
        }
    };

    const adicionarAoCarrinho = (produto) => {
        setCarrinho(prev => {
            const existente = prev.find(item => item.product.id === produto.id);
            if (existente) {
                // notificar("Quantidade atualizada no carrinho!", "info");
                return prev.map(item =>
                    item.product.id === produto.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // notificar("Produto adicionado ao carrinho!", "success");
            return [...prev, { product: produto, quantity: 1 }];
        });
    };

    const removerDoCarrinho = (produtoId) => {
        setCarrinho(prev => prev.filter(item => item.product.id !== produtoId));
        // notificar("Produto removido do carrinho.", "info");
    };

    const enviarPedido = async (numeroMesa) => {
        if (!numeroMesa || carrinho.length === 0) return false;

        const itensMap = {};
        carrinho.forEach(item => {
            itensMap[item.product.id] = item.quantity;
        });

        const mesaInt = parseInt(numeroMesa);
        if (isNaN(mesaInt)) {
            console.error("Número da mesa inválido");
            notificar("Número da mesa inválido.", "error");
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
                setCarrinho([]); // Limpa o carrinho
                notificar("Pedido enviado com sucesso!", "success");
                return true;
            }
            notificar("Erro ao enviar pedido.", "error");
            return false;
        } catch (error) {
            console.error("Erro ao enviar pedido:", error);
            notificar("Erro de conexão ao enviar pedido.", "error");
            return false;
        }
    };

    return (
        <ContextoProduto.Provider value={{ produtos, categorias, adicionarProduto, removerProduto, atualizarProduto, carregarImagem, criarCategoria, deletarCategoria, carrinho, adicionarAoCarrinho, removerDoCarrinho, enviarPedido, pedidos, buscarPedidos, atualizarStatusPedido, removerPedido }}>
            {children}
        </ContextoProduto.Provider>
    );
};

export const useProdutos = () => useContext(ContextoProduto);
