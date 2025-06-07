import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { PokemonProvider } from "../../contexts/product/ProductProvider";
import { PokemonContext } from "../../contexts/product/ProductContext";

function PokemonDetailContent() {
  const { pokemonName } = useParams();
  const { selectedPokemon, fetchPokemonDetails } = useContext(PokemonContext);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonDetails(pokemonName).catch(() =>
        setError("Pokémon non trouvé.")
      );
    }
  }, [pokemonName, fetchPokemonDetails]);

  if (error) return <p>{error}</p>;
  if (!selectedPokemon) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2 className="text-xl font-bold mb-2">{selectedPokemon.name}</h2>
      <img
        src={selectedPokemon.sprites?.front_default}
        alt={selectedPokemon.name}
        width={150}
        className="mb-4"
      />
      <h3 className="font-semibold">Types :</h3>
      <ul className="mb-4">
        {selectedPokemon.types.map((t) => (
          <li key={t.slot}>{t.type.name}</li>
        ))}
      </ul>

      <h3 className="font-semibold">Capacités :</h3>
      <ul>
        {selectedPokemon.abilities.map((a) => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>

      <Link to="/pokemon" className="mt-6 inline-block text-blue-500">
        ← Retour à la liste
      </Link>
    </div>
  );
}

export default function PokemonDetail() {
  return (
    <PokemonProvider>
      <PokemonDetailContent />
    </PokemonProvider>
  );
}
