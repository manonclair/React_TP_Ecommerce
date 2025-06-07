
import { useState, useEffect } from "react";
import type { Product } from "../contexts/product/ProductContext";

type Props = {
  product: Product;
  onSave: (updated: Product) => void;
  onClose: () => void;
};

export default function EditProductModal({ product, onSave, onClose }: Props) {
  const [edited, setEdited] = useState<Product>(product);

  useEffect(() => {
    setEdited(product); 
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(edited);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Modifier le produit</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Titre :
            <input name="title" value={edited.title} onChange={handleChange} />
          </label>
          <label>
            Prix :
            <input name="price" value={edited.price} onChange={handleChange} type="number" />
          </label>
          <label>
            Catégorie :
            <input name="category" value={edited.category} onChange={handleChange} />
          </label>
          <label>
            Description :
            <textarea name="description" value={edited.description} onChange={handleChange} />
          </label>
          <div className="modal-actions">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}
