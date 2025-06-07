import { createContext } from "react";

export type User = {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  token: string;
  role: "user" | "admin"; 
};


type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  loginAsAdmin: (username: string, password: string) => boolean; // 👈 ajoute ça
  logout: () => void;
};


export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  loginAsAdmin: () => false, // 👈 à ajouter
  logout: () => {},
});
