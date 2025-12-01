import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Aviso = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={20} className="text-green-500" />,
        error: <AlertCircle size={20} className="text-red-500" />,
        info: <Info size={20} className="text-blue-500" />
    };

    const bgColors = {
        success: 'bg-green-50 border-green-100',
        error: 'bg-red-50 border-red-100',
        info: 'bg-blue-50 border-blue-100'
    };

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${bgColors[type]} animate-slide-in min-w-[300px] max-w-md pointer-events-auto`}>
            <div className="shrink-0">
                {icons[type]}
            </div>
            <p className="flex-1 text-sm font-medium text-slate-700">
                {message}
            </p>
            <button
                onClick={onClose}
                className="p-1 hover:bg-black/5 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Aviso;
