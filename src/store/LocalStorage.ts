import { IProduct } from "@/Types/Products";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ProductStore = {
    products: IProduct[];
    addProduct: (product: IProduct) => void;
    getProducts: () => IProduct[];
  deleteProduct: (id: string) => void;
}
const LocalStorage = create<ProductStore>()(devtools((set) => ({
    products: JSON.parse(localStorage.getItem('products') ?? ''),
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
}),{name: 'ProductStore'})
);

export default LocalStorage