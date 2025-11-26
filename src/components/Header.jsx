import { Lock } from "lucide-react";
import logoImagem from '../assets/logo.png';

export default function Header() {
    // Removemos a prop onAdminClick, pois vamos usar link direto
    return (
        <div className="bg-red-600 py-6 relative shadow-lg">
            <div className="absolute top-4 right-4">
                {/* Mudamos de <button> para <a> (link direto) */}
                <a
                    href="/admin.html"
                    className="text-white/80 hover:text-white hover:bg-red-700 p-2 rounded-full transition-colors flex items-center gap-2 text-sm group"
                    title="Acesso Gerente"
                >
                    <span className="hidden sm:inline font-medium group-hover:underline decoration-red-400 underline-offset-4">Gerente</span>
                    <Lock size={20} />
                </a>
            </div>

            <div className="flex justify-center">
                <img src={logoImagem} alt="Logo" className="h-20 object-contain" />
            </div>
        </div>
    );
}