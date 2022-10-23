import React, { useCallback } from "react";
import { useGetCategories } from "./use_get_categories";
import { useNavigate } from "react-router-dom";

const getImg = (id: number) => {
  switch (id) {
    case 1:
      return "https://zoomagasin.ru/images/im-ej-logo.png";
    case 19:
      return "https://zoomagasin.ru/images/im-possum-logo.png";
    case 23:
      return "https://zoomagasin.ru/images/im-rept-logo.png";
    case 27:
      return "https://zoomagasin.ru/images/im-nasek-logo.png";
    default:
      return "https://zoomagasin.ru/images/im-drug-logo.png";
  }
};

const CategoryListPage = () => {
  const go = useNavigate();
  const { categories } = useGetCategories();
  const goToCategory = useCallback(
    (id: number) => {
      go(`/zoo_tg/${id}`);
    },
    [go]
  );
  return (
    <div style={{ padding: 10 }}>
      {categories
        .filter((c) => !c.parent_id)
        .map((c) => (
          <div
            style={{
              backgroundColor: "#33b47e",
              backgroundImage: "url(" + getImg(c.id) + ")",
              backgroundPosition: "98% 95%",
              backgroundSize: 50,
              backgroundRepeat: "no-repeat",
              borderRadius: 8,
              margin: "10px 0",
              padding: 8,
            }}
            key={c.id}
            id={String(c.id)}
            onClick={() => {
              goToCategory(c.id);
            }}
          >
            <div
              style={{ fontWeight: 700, color: "#fff", margin: "0 0 8px 0" }}
            >
              {c.name}
            </div>
            <div style={{ width: "85%" }}>{c.description}</div>
          </div>
        ))}
      <div>Есть вопросы?</div>
      <div>
        <a href="tel:+79022954808" target="_blank" rel="noreferrer">
          +7 (902) 294-48-08
        </a>
      </div>
      <div>
        <a href="https://vk.com/zoomagasin" target="_blank" rel="noreferrer">
          vk.com/zoomagasin
        </a>
      </div>
      <div>
        <a href="https://zoomagasin.ru/" target="_blank" rel="noreferrer">
          zoomagasin.ru
        </a>
      </div>
    </div>
  );
};

export default CategoryListPage;
