import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { ProductContext } from "../../contexts/product/ProductContext";
import { CartContext } from "../../contexts/cart/CartContext";
import { AuthContext } from "../../contexts/auth/AuthContext";

// 🔧 Modal d'édition simulée
function EditProductModal({
  product,
  onSave,
  onClose,
}: {
  product: any;
  onSave: (updated: any) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...product,
      title,
      price,
      description,
    };
    onSave(updated); // callback pour simuler la sauvegarde
    alert("✅ Produit mis à jour (simulation)");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h2>Modifier le produit</h2>
          <label>
            Titre :
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Prix :
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>
          <label>
            Description :
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="modal-actions">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { selectedProduct, fetchProductDetails, products, setProducts } =
    useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (productId) fetchProductDetails(Number(productId));
  }, [productId, fetchProductDetails]);

  if (!selectedProduct) return <p>Chargement...</p>;

  const handleDelete = () => {
    const confirmed = confirm("🗑 Supprimer ce produit ? (simulation)");
    if (!confirmed) return;
    const updatedList = products.filter((p) => p.id !== selectedProduct.id);
    setProducts(updatedList);
    alert("🗑 Produit supprimé (simulation)");
  };

  const handleUpdate = (updated: any) => {
    const updatedList = products.map((p) =>
      p.id === updated.id ? updated : p
    );
    setProducts(updatedList);
    fetchProductDetails(updated.id); // pour actualiser la fiche
  };

  return (
    <div className="page-container">
      <h1 className="page-title">{selectedProduct.title}</h1>
      <div className="product-detail">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="product-detail-image"
        />
        <div>
          <p>
            <strong>Catégorie:</strong> {selectedProduct.category}
          </p>
          <p>
            <strong>Prix:</strong> {selectedProduct.price} €
          </p>
          <p>
            <strong>Description:</strong> {selectedProduct.description}
          </p>
          <p>
            <strong>Note:</strong> {selectedProduct.rating.rate} ⭐ (
            {selectedProduct.rating.count} avis)
          </p>

          <button
            onClick={() =>
              addToCart({
                id: selectedProduct.id,
                title: selectedProduct.title,
                price: selectedProduct.price,
                image: selectedProduct.image,
              })
            }
            className="add-to-cart-button"
          >
            Ajouter au panier
          </button>

          {user?.username === "admin" && (
            <div className="admin-actions">
              <button onClick={() => setShowModal(true)}>🛠 Modifier</button>
              <button onClick={handleDelete}>🗑 Supprimer</button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <EditProductModal
          product={selectedProduct}
          onSave={handleUpdate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
