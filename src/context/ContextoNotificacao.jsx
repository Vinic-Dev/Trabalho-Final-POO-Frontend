import React, { createContext, useContext, useState, useCallback } from 'react';
import Aviso from '../components/ui/Aviso';

const ContextoNotificacao = createContext();

export const ProvedorNotificacao = ({ children }) => {
    const [avisos, setAvisos] = useState([]);

    const notificar = useCallback((mensagem, tipo = 'info') => {
        const id = Date.now();
        setAvisos(prev => [...prev, { id, mensagem, tipo }]);
    }, []);

    const removerAviso = useCallback((id) => {
        setAvisos(prev => prev.filter(aviso => aviso.id !== id));
    }, []);

    return (
        <ContextoNotificacao.Provider value={{ notificar }}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {avisos.map(aviso => (
                    <Aviso
                        key={aviso.id}
                        message={aviso.mensagem}
                        type={aviso.tipo}
                        onClose={() => removerAviso(aviso.id)}
                    />
                ))}
            </div>
        </ContextoNotificacao.Provider>
    );
};

export const useNotificacao = () => {
    const context = useContext(ContextoNotificacao);
    if (!context) {
        throw new Error('useNotificacao deve ser usado dentro de um ProvedorNotificacao');
    }
    return context;
};
