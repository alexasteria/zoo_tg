import React from "react";
import { Product, ProductElement } from "../types";
import { CartItem } from "../../App";

const ProductCard: React.FC<{
  product: Product;
  element: ProductElement;
  onIncrementItem: (item: CartItem, maxCount?: number) => void;
  onDecrementItem: (item: CartItem) => void;
  countInCart: number;
}> = ({ product, element, onDecrementItem, onIncrementItem, countInCart }) => {
  const price =
    element.prices.items && element.prices.items.length > 0
      ? element.prices.items[0].price
      : undefined;
  if (!price) throw Error("стоимость товара отсутствует");
  const maxCount = element.item?.quantity || product.quantity;
  return (
    <div
      key={product.id}
      style={{
        padding: 8,
        borderRadius: 8,
        margin: "10px",
        backgroundColor: "#007151",
        boxShadow:
          "inset 2px 2px 5px rgb(226 191 157 / 50%), 1px 1px 5px rgb(255 255 255)",
      }}
    >
      <div style={{ display: "flex" }}>
        <div>
          <img
            style={{ margin: 10 }}
            alt={product.name}
            height={100}
            width={100}
            src={
              product.image_url
                ? product.image_url
                : "https://www.steaua-dunarii.ro/client/img/image-not-found.png"
            }
          />
          <div
            style={{
              padding: "0 10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {product.available === "Y" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "30%" }}>
                  <button
                    onClick={() =>
                      onDecrementItem({
                        id: element.id,
                        name: product.name,
                        price: price,
                        variant: element.properties
                          ?.filter((prop) => prop.value)
                          .map((prop) => prop.value),
                        count: 1,
                      })
                    }
                    style={{
                      backgroundColor: "#b65454",
                      border: "none",
                      color: "white",
                      padding: "8px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: 12,
                      borderRadius: 4,
                    }}
                  >
                    -1
                  </button>
                </div>
                <div
                  style={{
                    margin: "auto",
                    fontSize: 25,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {countInCart}
                </div>
                <div style={{ width: "30%" }}>
                  {countInCart < maxCount && (
                    <button
                      onClick={() => {
                        onIncrementItem(
                          {
                            id: element.id,
                            name: product.name,
                            price: price,
                            variant: element.properties
                              ?.filter((prop) => prop.value)
                              .map((prop) => prop.value),
                            count: 1,
                          },
                          maxCount
                        );
                      }}
                      style={{
                        backgroundColor: "#4CAF50",
                        border: "none",
                        color: "white",
                        padding: "8px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: 12,
                        borderRadius: 4,
                      }}
                    >
                      +1
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ margin: "10px 10px 0 0" }}>
          <span>{product.detail.slice(0, 180)}</span>
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 700, color: "#fff", padding: "8px 0" }}>
          {product.name}
        </div>
      </div>
      {getElements(element, product.available === "Y")}
    </div>
  );
};
export default ProductCard;

const getElements = (element: ProductElement, available: boolean) => {
  if (!available) {
    return (
      <div
        style={{
          color: "#e77878",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px #fff solid",
          padding: "5px 0",
        }}
      >
        <div>Временно нет в наличии</div>
      </div>
    );
  }
  if (!element.item) {
    const price = getStaticPrice(element);
    return (
      <div
        style={{
          color: "#FFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px #fff solid",
          padding: "5px 0",
        }}
      >
        <div>Цена:</div>
        <div>{price.price} руб.</div>
      </div>
    );
  }
  const price = getStaticPrice(element);
  if (element.item?.available === "N") return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px #fff solid",
        padding: "5px 0",
      }}
    >
      <div>
        {element.properties?.map((p, i) => {
          if (
            !ProductProps[p.property_id] ||
            element.item?.available === "N" ||
            !p.value
          )
            return null;
          return (
            <div style={{ color: "#FFF" }} key={i}>
              {ProductProps[p.property_id].title}: {p.value}
              {/*{price.sale ? price.sale : ""}*/}
            </div>
          );
        })}
      </div>
      <div>{price.price} руб.</div>
    </div>
  );
};

const getStaticPrice: (element: ProductElement) => {
  price: number;
  sale: null | string;
} = (element) => {
  const price = element.prices.items?.find((p) => p.quantity_from === null);
  if (price?.discount_price) {
    return {
      price: price.discount_price,
      sale: `Скидка ${price.discount_value_percents}%`,
    };
  }
  if (!price) throw Error("Ошибка получения цены");
  return { price: price.price, sale: null };
};
const ProductProps: { [key: number]: { title: string; m?: string } } = {
  31: { title: "Цвет" },
  35: { title: "Вес", m: "гр" },
  42: { title: "Вкус" },
  43: { title: "Диаметр", m: "см" },
};
