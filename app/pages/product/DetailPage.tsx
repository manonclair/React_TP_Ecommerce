import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ProductContext } from "../../contexts/product/ProductContext";
import { CartContext } from "../../contexts/cart/CartContext";

export default function DetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { selectedProduct, fetchProductDetails } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (productId) fetchProductDetails(Number(productId));
  }, [productId, fetchProductDetails]);

  if (!selectedProduct) return <p>Chargement...</p>;

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
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              fontWeight: "bold",
              backgroundColor: "#ea580c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
