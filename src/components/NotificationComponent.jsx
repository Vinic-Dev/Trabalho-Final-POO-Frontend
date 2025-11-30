import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useProducts } from '../context/ProductContext';

const NotificationComponent = () => {
    const { fetchOrders } = useProducts();

    useEffect(() => {
        // 1. Connect to the WebSocket endpoint
        const socket = new SockJS('http://localhost:8080/ws-pedidos');
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

                // Action: Update state, show toast, play sound, etc.
                alert(`Novo pedido na mesa ${novoPedido.mesa}!`);

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

    return null; // Component doesn't render anything visible
};

export default NotificationComponent;
