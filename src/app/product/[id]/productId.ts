/*import { IProduct } from "@/Types/Products";
import { useCallback, useEffect, useState } from "react";

const ProductId = ({ id }: { id: string }) => {
    const [product, setProduct] = useState<IProduct|null>(null);

    const fetchId = useCallback(() => {
        const products = JSON.parse(localStorage.getItem("products") ?? "");
        const product = products.find((product: IProduct) => product.id === id);
        setProduct(product);
    },[id])

    useEffect(() => {
        fetchId()
    },[fetchId]);
    return product;
}

export default ProductId;*/