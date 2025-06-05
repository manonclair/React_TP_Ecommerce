// app/contexts/pokemon/PokemonContext.ts

import { createContext } from "react";

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonDetails = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string }; slot: number }[];
  abilities: { ability: { name: string } }[];
};

export type PokemonContextType = {
  pokemons: Pokemon[];
  selectedPokemon: PokemonDetails | null;
  fetchPokemons: () => Promise<void>;
  fetchPokemonDetails: (name: string) => Promise<void>;
};

export const PokemonContext = createContext<PokemonContextType>({
  pokemons: [],
  selectedPokemon: null,
  fetchPokemons: async () => {},
  fetchPokemonDetails: async () => {},
});
