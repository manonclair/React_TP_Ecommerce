import { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { PokemonProvider } from "../../contexts/pokemon/PokemonProvider";
import { PokemonContext } from "../../contexts/pokemon/PokemonContext";

function DetailPageContent() {
  const { pokemonName } = useParams();
  const { selectedPokemon, fetchPokemonDetails } = useContext(PokemonContext);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonDetails(pokemonName).catch(() =>
        setError("Pokémon non trouvé.")
      );
    }
  }, [pokemonName]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!selectedPokemon) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <NavLink to="/pokemon" className="text-red hover:underline">
        ← Retour à la liste
      </NavLink>

      <h1 className="text-3xl font-bold mt-4 capitalize">{selectedPokemon.name}</h1>

      <img
        src={selectedPokemon.sprites.front_default}
        alt={selectedPokemon.name}
        className="w-32 h-32 mt-4"
      />

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Types</h2>
        <ul className="list-disc ml-6">
          {selectedPokemon.types.map((t) => (
            <li key={t.slot}>{t.type.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Capacités</h2>
        <ul className="list-disc ml-6">
          {selectedPokemon.abilities.map((a) => (
            <li key={a.ability.name}>{a.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DetailPage() {
  return (
    <PokemonProvider>
      <DetailPageContent />
    </PokemonProvider>
  );
}
