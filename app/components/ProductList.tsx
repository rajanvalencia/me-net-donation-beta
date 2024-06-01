'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface ProductData {
  id: string;
  name: string;
  image: [];
  price: string;
}

interface ProductListProps {
  onProductSelect: (productId: string) => void;
}

const fetchProducts = async (): Promise<ProductData[]> => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const ProductList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  const { data , isLoading, error } = useQuery<ProductData[]>({
    queryKey: ['products'],
    queryFn:() => fetchProducts(),
  });

  if (isLoading) {
    return <div className='text-white text-5xl loading-spinner'></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <p className="menu-title text-2xl text-white">Products</p>
      {data &&  data.map((product) => (
        <button
          className="btn p-4 m-4 text-gray-200"
          key={product.id}
          onClick={() => onProductSelect(product.id)}
        >
          {product.name}
        </button>
      ))}
    </div>
  );
};

export default ProductList;
