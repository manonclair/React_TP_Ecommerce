import { useContext } from "react";
import { ProductContext } from "../../contexts/product/ProductContext";
import { Link } from "react-router-dom";

export default function ListPage() {
  const {
    paginatedProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    products,
  } = useContext(ProductContext);

  return (
    <div className="page-container">
      <h1 className="page-title">Produits ({products.length})</h1>

      <div className="product-grid">
        {paginatedProducts.map((product) => (
          <Link to={`/product/${product.id}`} className="product-card">

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
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Précédent
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Suivant ▶
        </button>
      </div>
    </div>
  );
}
