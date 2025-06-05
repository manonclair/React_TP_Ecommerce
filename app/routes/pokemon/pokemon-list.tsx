import { useContext, useEffect } from "react";
import { PokemonProvider } from "../../contexts/pokemon/PokemonProvider";
import { PokemonContext } from "../../contexts/pokemon/PokemonContext";
import { NavLink } from "react-router-dom";
import "../../app.css";

const getPokemonIdFromUrl = (url: string): string => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
};

function ListPageContent() {
  const { pokemons, fetchPokemons } = useContext(PokemonContext);

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (!pokemons.length) {
    return <p className="no-result">Aucun Pokémon trouvé.</p>;
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Liste des Pokémons</h1>
      <ul className="pokemon-grid">
        {pokemons.map((pokemon) => {
          const id = getPokemonIdFromUrl(pokemon.url);
          return (
            <li key={pokemon.name}>
              <NavLink to={`/pokemon/${pokemon.name}`} className="pokemon-card">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                <span className="pokemon-name">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ListPage() {
  return (
    <PokemonProvider>
      <ListPageContent />
    </PokemonProvider>
  );
}
