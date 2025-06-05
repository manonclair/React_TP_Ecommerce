import React from 'react';
import { Link } from 'react-router-dom';




export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenue dans le Pokédex !</h1>
      <p className="text-lg mb-6">Explore les Pokémons et découvre leurs caractéristiques.</p>
      
      <Link
        to="/pokemon"
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        Voir la liste des Pokémons
      </Link>
    </main>
  );
}
