import { useContext } from "react";
import { CartContext } from "../../contexts/cart/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalHT,
    getTotalTTC,
  } = useContext(CartContext);

  const tva = 0.2;

  if (cartItems.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Mon Panier</h1>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h2>{item.title}</h2>
              <p>Prix unitaire : {item.price} €</p>
              <p>
                Quantité :
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </p>
              <p>Total : {item.price * item.quantity} €</p>
              <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Sous-total HT : {getTotalHT().toFixed(2)} €</p>
        <p>TVA (20%) : {(getTotalHT() * tva).toFixed(2)} €</p>
        <p><strong>Total TTC : {getTotalTTC(tva).toFixed(2)} €</strong></p>
      </div>
    </div>
    
  );
}
