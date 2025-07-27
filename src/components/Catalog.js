import React, { useState } from "react";
import suppliers from "../data/suppliers";
import BackButton from "./BackButton";
import styles from "../styles/SuppliersCategory.module.css";

const ITEMS_PER_PAGE = 18;

function Catalog() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(Math.max(suppliers.length, ITEMS_PER_PAGE) / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentSuppliers = suppliers.slice(start, start + ITEMS_PER_PAGE);

  // Генерируем пустышки ("Место свободно")
  const cards = [
    ...currentSuppliers,
    ...Array.from(
      { length: ITEMS_PER_PAGE - currentSuppliers.length },
      (_, i) => ({
        id: `placeholder-${i}`,
        name: "Место свободно",
        logo: "/images/no-image.webp",
        empty: true,
      })
    ),
  ];

  return (
    <div className={styles.catalogWrap}>
      <BackButton className={styles.backBtn} />
      <h2 className={styles.title}>Поставщики</h2>
      <div className={styles.grid}>
        {cards.map((supplier, idx) => (
          <div
            key={supplier.id || idx}
            className={`${styles.card} ${supplier.empty ? styles.empty : ""}`}
            title={supplier.name}
          >
            <div className={styles.imgBox}>
              <img
                src={supplier.logo || "/images/no-image.webp"}
                alt={supplier.name}
                className={styles.logo}
              />
              <div className={styles.gradient} />
              <span className={styles.name}>{supplier.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`${styles.pageBtn} ${page === i + 1 ? styles.active : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={styles.pageBtn}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Catalog;
