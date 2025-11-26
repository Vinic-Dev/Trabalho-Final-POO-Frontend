import Header from "./components/Header";
import Nave from "./components/Navegador";
import Corpo from "./components/Corpo";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
        <Header />
        <Nave />
        <Corpo />
    </div>
  )
}