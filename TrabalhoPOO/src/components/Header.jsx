import { useState } from 'react';
import logoImagem from '../assets/logo.png';

export default function Header() {
  return (
    <>
    <div className = "bg-red-600 py-16" >
        <img src={logoImagem}></img>
    </div>
    
    </>
  );
}