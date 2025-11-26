
import logoImagem from '../assets/logo.png';

export default function Header() {
  return (
    <>
    <div className = "bg-red-600 py-16 flex justify-center" >
        <img src={logoImagem} className="h-24 p-0 border-spacing-0"></img>
    </div>
    
    </>
  );
}