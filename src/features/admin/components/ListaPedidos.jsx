import React, { useState } from "react";
import { useProdutos } from "../../../context/ContextoProduto";
import { Clock, MapPin, CheckCircle2, ChefHat, Package, Trash2 } from "lucide-react";
import { formatCurrency } from "../../../utils/formatters";
import Modal from "../../../components/ui/Modal";

const ListaPedidos = () => {
    const { pedidos, atualizarStatusPedido, removerPedido } = useProdutos();
    const [pedidoParaDeletar, setPedidoParaDeletar] = useState(null);

    const calcularTotal = (pedido) => {
        if (pedido.precoTotal && pedido.precoTotal > 0) return pedido.precoTotal;
        return pedido.itens.reduce((acc, itemObj) => acc + (itemObj.item.preco * itemObj.quantidade), 0);
    };

    const confirmarExclusao = () => {
        if (pedidoParaDeletar) {
            removerPedido(pedidoParaDeletar);
            setPedidoParaDeletar(null);
        }
    };

    if (!pedidos || pedidos.length === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Package size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700">Nenhum pedido encontrado</h3>
                <p className="text-slate-500">Os pedidos realizados aparecerão aqui.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Clock className="text-red-600" /> Pedidos Recentes
            </h2>

            <div className="grid gap-6">
                {pedidos.map((pedido) => (
                    <div key={pedido.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 border-b border-slate-50 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 font-bold text-lg">
                                    #{pedido.id}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                        <Clock size={14} />
                                        <span>{pedido.data || "Data não informada"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-bold text-slate-800">
                                        <MapPin size={16} className="text-red-500" />
                                        <span>Mesa {pedido.mesa}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <div>
                                    <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">Total do Pedido</span>
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatCurrency(calcularTotal(pedido))}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setPedidoParaDeletar(pedido.id)}
                                    className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors text-xs font-bold"
                                >
                                    <Trash2 size={14} /> Excluir
                                </button>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="flex items-center gap-2 mb-4 bg-slate-50 p-2 rounded-lg">
                            <span className="text-sm font-bold text-slate-600 mr-2">Status:</span>

                            <button
                                onClick={() => atualizarStatusPedido(pedido.id, 'pendente')}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${pedido.status === 'pendente'
                                    ? 'bg-slate-200 text-slate-700 shadow-sm'
                                    : 'text-slate-400 hover:bg-slate-100'
                                    }`}
                            >
                                Pendente
                            </button>

                            <button
                                onClick={() => atualizarStatusPedido(pedido.id, 'preparando')}
                                className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all ${pedido.status === 'preparando'
                                    ? 'bg-amber-100 text-amber-700 shadow-sm'
                                    : 'text-slate-400 hover:bg-amber-50 hover:text-amber-600'
                                    }`}
                            >
                                <ChefHat size={12} /> Preparando
                            </button>

                            <button
                                onClick={() => atualizarStatusPedido(pedido.id, 'concluido')}
                                className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all ${pedido.status === 'concluido'
                                    ? 'bg-green-100 text-green-700 shadow-sm'
                                    : 'text-slate-400 hover:bg-green-50 hover:text-green-600'
                                    }`}
                            >
                                <CheckCircle2 size={12} /> Concluído
                            </button>
                        </div>

                        <div className="space-y-3">
                            {pedido.itens.map((itemObj, index) => (
                                <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg overflow-hidden border border-slate-100">
                                            {itemObj.item.imageUrl ? (
                                                <img src={itemObj.item.imageUrl} alt={itemObj.item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-lg">🍽️</div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-700">{itemObj.item.name}</p>
                                            <p className="text-xs text-slate-500">{formatCurrency(itemObj.item.preco)} un.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-sm font-bold text-slate-600">
                                            {itemObj.quantidade}x
                                        </span>
                                        <span className="font-bold text-slate-800 min-w-[80px] text-right">
                                            {formatCurrency(itemObj.item.preco * itemObj.quantidade)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={!!pedidoParaDeletar}
                onClose={() => setPedidoParaDeletar(null)}
                title="Confirmar Exclusão"
                footer={
                    <>
                        <button
                            onClick={() => setPedidoParaDeletar(null)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmarExclusao}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Excluir Pedido
                        </button>
                    </>
                }
            >
                <p className="text-slate-600">
                    Tem certeza que deseja excluir o pedido <strong>#{pedidoParaDeletar}</strong>? Esta ação não pode ser desfeita.
                </p>
            </Modal>
        </div>
    );
};

export default ListaPedidos;
