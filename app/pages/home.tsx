import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="home">
      <h1>Bienvenue !</h1>
      

      <div className='btnAcceuil'><Link to="/products">faire du shoping </Link></div>
    </main>
  );
}
