import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Accueil</Link>
      <Link to="/products">Produits</Link>
      <Link to="/cart">Panier</Link>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="user-info">Bonjour {user.username}</span>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <Link to="/login">Connexion</Link>
        )}
      </div>
    </nav>
  );
}
