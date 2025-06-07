import {
  useState,
  useEffect,
  useMemo,
  type ReactNode,
  useCallback,
} from "react";
import { AuthContext, type User } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!data.token) return false;



      const usersRes = await fetch("https://fakestoreapi.com/users");
      const users = await usersRes.json();

      const foundUser = users.find((u: any) => u.username === username);
      if (!foundUser) return false;

      const fullUser: User = {
        ...foundUser,
        token: data.token,
        role: "user",
      };

      setUser(fullUser);
      sessionStorage.setItem("user", JSON.stringify(fullUser));
      return true;
    } catch (err) {
      console.error("Erreur login API :", err);
      return false;
    }
  }, []);

  const loginAsAdmin = useCallback((username: string, password: string): boolean => {
    if (username === "admin" && password === "admin123") {
      const adminUser: User = {
        id: 0,
        email: "admin@site.com",
        username: "admin",
        name: { firstname: "Admin", lastname: "User" },
        token: "fake-admin-token",
        role: "admin",
      };
      setUser(adminUser);
      sessionStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    }
    return false;
  }, []);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const contextValue = useMemo(
    () => ({
      user,
      login,
      loginAsAdmin,
      logout,
    }),
    [user, login, loginAsAdmin]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}