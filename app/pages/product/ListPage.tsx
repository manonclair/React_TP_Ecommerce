import { useEffect, useContext } from "react";
import { ProductContext } from "../../contexts/product/ProductContext";
import "./ListPage.css"; // 👈 ajoute ceci

export default function ListPage() {
  const { products, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="page-container">
      <h1 className="page-title">Produits</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
            </div>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-category">{product.category}</p>
            <p className="product-price">{product.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}
