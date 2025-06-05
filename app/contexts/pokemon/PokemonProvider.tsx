import {
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { Pokemon, PokemonDetails } from "./PokemonContext";
import { PokemonContext } from "./PokemonContext";

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

  const fetchPokemons = useCallback(async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();
      setPokemons(data.results);
    } catch (err) {
      console.error("Erreur lors du chargement des Pokémons :", err);
    }
  }, []);

  const fetchPokemonDetails = useCallback(async (name: string) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setSelectedPokemon(data);
    } catch (err) {
      console.error("Erreur lors du chargement des détails :", err);
      setSelectedPokemon(null);
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      pokemons,
      selectedPokemon,
      fetchPokemons,
      fetchPokemonDetails,
    }),
    [pokemons, selectedPokemon, fetchPokemons, fetchPokemonDetails]
  );

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}
