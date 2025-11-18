import Header from "./components/Header";
import Nave from "./components/Navegador";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Nave />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bem-vindo ao Sistema
        </h1>
        <p className="text-gray-600">
          Este é um texto cinza
        </p>
      </main>
    </div>
  )
}