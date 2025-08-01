// src/pages/ProductPage.tsx
import React from "react";
import ProductTable from "../components/ProductTable";

const ProductPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">판매 상품 목록</h1>
      <ProductTable />
    </div>
  );
};

export default ProductPage;
