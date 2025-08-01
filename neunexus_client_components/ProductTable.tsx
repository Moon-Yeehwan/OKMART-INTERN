import React, { useState } from "react";

type Product = {
  id: number;
  name: string;
  code: string;
  price: number;
  stock: number;
  status: "판매중" | "판매중지";
};

const ProductTable = () => {
  const [productList, setProductList] = useState<Product[]>([
    {
      id: 1,
      name: "티셔츠",
      code: "A12345",
      price: 19900,
      stock: 10,
      status: "판매중",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    price: "",
    stock: "",
    status: "판매중",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: productList.length + 1,
      name: formData.name,
      code: formData.code,
      price: Number(formData.price),
      stock: Number(formData.stock),
      status: formData.status as "판매중" | "판매중지",
    };
    setProductList([...productList, newProduct]);
    setFormData({ name: "", code: "", price: "", stock: "", status: "판매중" });
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">판매상품 리스트</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {showForm ? "폼 닫기" : "상품 등록"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded space-y-4 bg-gray-50">
          <div>
            <label className="block mb-1">상품명</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">자체 상품코드</label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">가격</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">재고</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">판매 상태</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="판매중">판매중</option>
              <option value="판매중지">판매중지</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            등록하기
          </button>
        </form>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">상품명</th>
            <th className="border px-4 py-2">코드</th>
            <th className="border px-4 py-2">가격</th>
            <th className="border px-4 py-2">재고</th>
            <th className="border px-4 py-2">상태</th>
            <th className="border px-4 py-2">수정</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.code}</td>
              <td className="border px-4 py-2">{product.price.toLocaleString()}원</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2">{product.status}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
