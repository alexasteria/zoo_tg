import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CartItem } from "../../App";

const HomePage: React.FC<{ cart?: CartItem[] }> = ({ cart }) => {
  const { categoryID } = useParams<{ categoryID: string }>();
  const go = useNavigate();
  if (!cart) return null;
  let count = 0;
  let sum = 0;
  cart.forEach((p) => {
    count = count + p.count;
    sum = sum + p.price * p.count;
  });
  return (
    <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
      {categoryID && (
        <div
          style={{
            backgroundColor: "#bae0d5",
            padding: 5,
          }}
          onClick={() => go(-1)}
        >
          <div
            style={{
              border: "1px solid #568f2d",
              color: "#568f2d",
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "min-content",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </div>
            <div style={{ fontWeight: 700, lineHeight: "19px" }}>Назад</div>
          </div>
        </div>
      )}
      {count !== 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#bae0d5",
            width: "calc(100vw - 50px)",
            margin: 10,
            padding: 15,
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Выбрано товаров - {count} </div>
            <div>на сумму: {sum}₽</div>
          </div>
          <div style={{ fontSize: 12, textAlign: "center", color: "#888d8d" }}>
            Нажмите, чтобы завершить оформление заказа
          </div>
        </div>
      )}
      <div
        style={{
          height: "calc(100vh - 50px)",
          overflow: "scroll",
        }}
      >
        <div style={{ paddingBottom: 60 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
