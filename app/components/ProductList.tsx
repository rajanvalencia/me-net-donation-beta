'use client'
import React from 'react';
import { useFetch } from '../hooks/useFetch';

interface ProductData {
  id: string;
  name: string;
  image: [];
  price: string;
}

interface ProductListProps {
  onProductSelect: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  const { data, isLoading, error } = useFetch<ProductData>('/api/products');
  console.log(data);

  const handleProductSelect = (productId: string) => {
    onProductSelect(productId);
  };

  return (
    <div>
      <p className="menu-title text-2xl text-white">Products</p>
      {data.map((product) => (
        <button
          className="btn p-4 m-4 text-gray-200"
          key={product.id}
          onClick={() => handleProductSelect(product.id)}
        >
          {product.name}
        </button>
      ))}
    </div>
  );
};

export default ProductList;
