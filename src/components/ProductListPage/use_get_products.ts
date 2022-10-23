import { useCallback, useEffect, useState } from "react";
import { Product } from "../types";

const useGetProducts = (subcategories: number[]) => {
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = useCallback(async () => {
    const res = await fetch(
      "https://zoomagasin.ru/api/api.php?route=list&section_ids=" +
        subcategories.map((item) => String(item)).join(",")
    );
    const result: { items: Product[] } = await res.json();
    setProducts(result.items);
  }, [subcategories]);
  useEffect(() => {
    if (subcategories.length === 0) {
      return setProducts([]);
    }
    getProducts();
  }, [subcategories, getProducts]);
  return {
    products: products.filter((p) => p.elements[0].prices.items !== null),
  };
};

export { useGetProducts };
