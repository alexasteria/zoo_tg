import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetProducts } from "./use_get_products";
import { useGetCategories } from "../CateroryListPage/use_get_categories";
import { CartItem } from "../../App";
import RenderCards from "./RenderCards";

const ProductListPage: React.FC<{
  cart: CartItem[];
  onIncrementItem: (item: CartItem) => void;
  onDecrementItem: (item: CartItem) => void;
}> = ({ cart, onDecrementItem, onIncrementItem }) => {
  const { categories } = useGetCategories();
  const { categoryID } = useParams<{ categoryID: string }>();
  const subcategoriesID = useMemo(() => {
    return categories
      .filter((c) => c.parent_id === Number(categoryID))
      .map((c) => c.id);
  }, [categories, categoryID]);
  const { products } = useGetProducts(subcategoriesID);
  return (
    <>
      <RenderCards
        products={products.filter((p) => p.available === "Y")}
        cart={cart}
        onDecrementItem={onDecrementItem}
        onIncrementItem={onIncrementItem}
      />
      <RenderCards
        products={products.filter((p) => p.available === "N")}
        cart={cart}
        onDecrementItem={onDecrementItem}
        onIncrementItem={onIncrementItem}
      />
    </>
  );
};

export default ProductListPage;
