import {  create} from 'zustand'
import { IProduct } from './product';
import {devtools} from 'zustand/middleware'

export type productStore = {
    products:IProduct[],
    setProducts:(products:IProduct[])=>void,
    addProduct:(product:IProduct)=>void,
    loadProductsFromLocalStorage:()=>void,
    saveProductsToLocalStorage:()=>void
}

export const useProductStore = create<productStore>()(devtools((set)=>({
    products:[],
    setProducts:(products)=>set({products}),
    addProduct:(product)=>set((state)=>({products:[...state.products,product]})),
    loadProductsFromLocalStorage:()=>{
        const productData = localStorage.getItem('products');
        const storedProducts:IProduct[] = productData?JSON.parse(productData):[];
        set({products:storedProducts});
    },
    saveProductsToLocalStorage:()=>{
        const products = useProductStore.getState().products;
        localStorage.setItem('products',JSON.stringify(products));
    },
}),{name:'productStore'})
)