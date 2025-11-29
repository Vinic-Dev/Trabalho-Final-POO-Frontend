import React from "react";
import { useProducts } from "../../../context/ProductContext";
import { Clock, MapPin, DollarSign, Package } from "lucide-react";

const OrderList = () => {
    const { orders } = useProducts();

    const calculateTotal = (order) => {
        if (order.precoTotal && order.precoTotal > 0) return order.precoTotal;
        return order.itens.reduce((acc, itemObj) => acc + (itemObj.item.preco * itemObj.quantidade), 0);
    };

    if (!orders || orders.length === 0) {
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
                {orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 border-b border-slate-50 pb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 font-bold text-lg">
                                    #{order.id}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                        <Clock size={14} />
                                        <span>{order.data || "Data não informada"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-bold text-slate-800">
                                        <MapPin size={16} className="text-red-500" />
                                        <span>Mesa {order.mesa}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">Total do Pedido</span>
                                <span className="text-2xl font-bold text-green-600">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculateTotal(order))}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {order.itens.map((itemObj, index) => (
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
                                            <p className="text-xs text-slate-500">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itemObj.item.preco)} un.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-sm font-bold text-slate-600">
                                            {itemObj.quantidade}x
                                        </span>
                                        <span className="font-bold text-slate-800 min-w-[80px] text-right">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itemObj.item.preco * itemObj.quantidade)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList;
