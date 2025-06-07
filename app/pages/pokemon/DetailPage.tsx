import { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { PokemonProvider } from "../../contexts/product/ProductProvider";
import { PokemonContext } from "../../contexts/product/ProductContext";

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

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!selectedPokemon) return <p>Chargement...</p>;

  return (
    <div className="detail-container">
      <div className="detail-card">
        <NavLink to="/pokemon" className="detail-back">← Retour à la liste</NavLink>
        <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
        <h1 className="detail-name">{selectedPokemon.name}</h1>

        <div className="detail-section">
        <h2>Types</h2>
        <div className="pokemon-types">
            {selectedPokemon.types.map((t) => (
            <span key={t.slot} className="pokemon-type">
            {t.type.name}
            </span>
            ))}
        </div>
    </div>

<div className="detail-section">
  <h2>Capacités</h2>
  <ul className="pokemon-abilities">
    {selectedPokemon.abilities.map((a) => (
      <li key={a.ability.name}>{a.ability.name}</li>
    ))}
  </ul>
</div>

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
