import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useProducts } from '../context/ProductContext';
import { Bell } from 'lucide-react';

const NotificationComponent = () => {
    const { fetchOrders } = useProducts();
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // 1. Connect to the WebSocket endpoint
        const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws-pedidos`);
        const stompClient = Stomp.over(socket);

        // Disable debug logs for cleaner console
        stompClient.debug = () => { };

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            // 2. Subscribe to the new orders topic
            stompClient.subscribe('/topic/novos-pedidos', (message) => {
                // 3. Process the received message
                const novoPedido = JSON.parse(message.body);
                console.log('New Order Received:', novoPedido);

                // Show centered notification
                setNotification(novoPedido);

                // Play sound (Uncomment if you add a notification.mp3 file to your public folder)
                // const audio = new Audio('/notification.mp3');
                // audio.play().catch(e => console.log('Audio play failed', e));

                // Refresh orders list
                fetchOrders();
            });
        }, (error) => {
            console.error('WebSocket connection error:', error);
        });

        // Cleanup on unmount
        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, [fetchOrders]);

    if (!notification) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-white rounded-lg shadow-lg border-l-4 border-red-500 p-4 flex items-center gap-4 max-w-sm">
                <div className="bg-red-50 p-2 rounded-full">
                    <Bell size={20} className="text-red-600" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm">Novo Pedido!</h4>
                    <p className="text-slate-600 text-xs">Mesa {notification.mesa}</p>
                </div>
                <button
                    onClick={() => setNotification(null)}
                    className="ml-2 text-slate-400 hover:text-slate-600"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default NotificationComponent;
