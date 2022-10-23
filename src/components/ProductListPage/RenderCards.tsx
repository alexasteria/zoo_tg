import React from "react";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import { CartItem } from "../../App";

const RenderCards: React.FC<{
  products: Product[];
  cart: CartItem[];
  onIncrementItem: (item: CartItem, maxCount?: number) => void;
  onDecrementItem: (item: CartItem) => void;
}> = ({ products, cart, onDecrementItem, onIncrementItem }) => {
  return (
    <div>
      {products.map((p) => {
        if (p.elements.length === 1) {
          return (
            <ProductCard
              key={p.elements[0].id}
              product={p}
              element={p.elements[0]}
              onIncrementItem={onIncrementItem}
              onDecrementItem={onDecrementItem}
              countInCart={
                cart.find((cartItem) => cartItem.id === p.elements[0].id)
                  ?.count || 0
              }
            />
          );
        }
        return p.elements.map((element) => {
          if (element.item?.available === "N") return null;
          return (
            <ProductCard
              key={element.id}
              product={p}
              element={element}
              onIncrementItem={onIncrementItem}
              onDecrementItem={onDecrementItem}
              countInCart={
                cart.find((cartItem) => cartItem.id === element.id)?.count || 0
              }
            />
          );
        });
      })}
    </div>
  );
};
export default RenderCards;
