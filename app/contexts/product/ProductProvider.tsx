import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { ProductContext } from "./ProductContext";
import type { Product, ProductDetails } from "./ProductContext";



export function ProductProvider({ children }: { children: ReactNode }) {


  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


const totalPages = Math.ceil(products.length / itemsPerPage);



  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Erreur lors du chargement des produits :", err);
    }
  }, []);

  const fetchProductDetails = useCallback(async (id: number) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setSelectedProduct(data);
    } catch (err) {
      console.error("Erreur lors du chargement du produit :", err);
    }
  }, []);

  useEffect(() => {
    console.log("🔄 useEffect dans ProductProvider exécuté");
    if (products.length === 0) {
      console.log("⏳ Chargement des produits depuis le useEffect");
      fetchProducts();
    }
  }, [fetchProducts]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage]);

const contextValue = useMemo(
  () => ({
    products,
    selectedProduct,
    fetchProducts,
    fetchProductDetails,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedProducts,
    setProducts, 
  }),
  [
    products,
    selectedProduct,
    fetchProducts,
    fetchProductDetails,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedProducts,
    setProducts, 
  ]
);

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
