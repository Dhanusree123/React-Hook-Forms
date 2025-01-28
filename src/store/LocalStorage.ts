import { create } from "zustand";
import { IProduct } from "../Types/Product"

type ProductStore = {
    products: IProduct[];
    addProduct: (product: IProduct) => void;
    getProducts: () => IProduct[];
  deleteProduct: (id: string) => void;
}
const LocalStorage = create<ProductStore>()((set) => ({
    products: JSON.parse(localStorage.getItem('products') ?? '[]'),
    addProduct: (product: IProduct) => {
        set((state) => {
            const updatedProducts = [...state.products, product];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return { products: updatedProducts };
        });
    },
    getProducts: () => {
        return JSON.parse(localStorage.getItem("products") ?? "[]");
      },
      deleteProduct: (id: string) => {
        set((state) => {
          const updatedProducts = state.products.filter((product) => product.id !== id);
          localStorage.setItem("products", JSON.stringify(updatedProducts));
          return { products: updatedProducts };
        });
      },
}))

export default LocalStorage