import { useContext, useEffect } from "react";
import { PokemonProvider } from "../../contexts/pokemon/PokemonProvider";
import { PokemonContext } from "../../contexts/pokemon/PokemonContext";
import { NavLink } from "react-router-dom";

// 🔎 Récupère l'ID du Pokémon à partir de son URL
const getPokemonIdFromUrl = (url: string): string => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1]; // Exemple : "https://pokeapi.co/api/v2/pokemon/1/" → "1"
};

function ListPageContent() {
  const { pokemons, fetchPokemons } = useContext(PokemonContext);

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (!pokemons.length) {
    return <p className="text-center text-white">Aucun Pokémon trouvé.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Liste des Pokémons</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemons.map((pokemon) => {
          const id = getPokemonIdFromUrl(pokemon.url);
          return (
            <li key={pokemon.name}>
              <NavLink
                to={`/pokemon/${pokemon.name}`}
                className="block p-4 bg-white text-center rounded shadow hover:shadow-md transition"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  className="mx-auto mb-2 w-16 h-16"
                />
                <span className="text-black font-medium">
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
