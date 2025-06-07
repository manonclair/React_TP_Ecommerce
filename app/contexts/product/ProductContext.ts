
import { createContext } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type ProductDetails = Product & {
  rating: {
    rate: number;
    count: number;
  };
};

type ProductContextType = {
  products: Product[];
  selectedProduct: ProductDetails | null;
  fetchProducts: () => Promise<void>;
  fetchProductDetails: (id: number) => Promise<void>;

  paginatedProducts: Product[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;

  setProducts: (products: Product[]) => void; 
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  selectedProduct: null,
  fetchProducts: async () => {},
  fetchProductDetails: async () => {},
  paginatedProducts: [],
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 1,
  setProducts: () => {}, 
});
