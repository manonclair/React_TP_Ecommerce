import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="home">
      <h1>Bienvenue dans le Pokédex !</h1>
      <p>Explore les Pokémons et découvre leurs caractéristiques.</p>
      <Link to="/pokemon">Voir la liste des Pokémons</Link>
    </main>
  );
}
