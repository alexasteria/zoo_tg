import React, { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryListPage from "./components/CateroryListPage";
import ProductListPage from "./components/ProductListPage";
import HomePage from "./components/HomePage";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  variant?: string[];
  count: number;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const onIncrementItem = useCallback(
    (item: CartItem, maxCount?: number) => {
      if (!maxCount) throw Error("Максимально доступное количество неизвестно");
      if (cart.map((p) => p.id).includes(item.id)) {
        const newCart = cart.map((p) => {
          if (p.id !== item.id) return p;
          if (p.count + 1 > maxCount) {
            //превышено доступное количество
            return p;
          }
          return {
            ...p,
            count: p.count + 1,
          };
        });
        return setCart(newCart);
      }
      const newCart = [...cart, { ...item, count: 1 }];
      setCart(newCart);
    },
    [cart, setCart]
  );
  const onDecrementItem = useCallback(
    (item: CartItem) => {
      const cartElement = cart.find((p) => p.id === item.id);
      if (!cartElement) {
        return;
      }
      if (cartElement.count === 1) {
        return setCart(cart.filter((p) => p.id !== item.id));
      }
      return setCart([
        ...cart.map((p) => {
          if (p.id !== item.id) return p;
          return {
            ...p,
            count: p.count - 1,
          };
        }),
      ]);
    },
    [cart, setCart]
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/zoo_tg" element={<HomePage cart={cart} />}>
          <Route index element={<CategoryListPage />} />
          <Route
            path=":categoryID"
            element={
              <ProductListPage
                cart={cart}
                onIncrementItem={onIncrementItem}
                onDecrementItem={onDecrementItem}
              />
            }
          >
            {/*<Route path=":productID" element={<ProductPage />} />*/}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
