// app/contexts/product/ProductProvider.tsx
import {
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { ProductContext } from "./ProductContext";
import type { Product, ProductDetails } from "./ProductContext";

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);

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

  const contextValue = useMemo(
    () => ({
      products,
      selectedProduct,
      fetchProducts,
      fetchProductDetails,
    }),
    [products, selectedProduct, fetchProducts, fetchProductDetails]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
console.log("✅ ProductProvider chargé correctement");
