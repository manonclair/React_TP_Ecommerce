import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";

export default function AdminLoginPage() {
  const { loginAsAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAsAdmin(username, password);
    if (success) {
      navigate("/products");
    } else {
      setError("Échec de la connexion administrateur.");
    }
  };

  return (
    <main className="page-container">
      <h1 className="page-title">Connexion Admin</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <label>
          Nom d'utilisateur :
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Connexion Admin</button>
      </form>
    </main>
  );
}
