'use client'
import React, { useState } from 'react';
import DonationForm from './components/DonationForm';
import ProductList from './components/ProductList';
import EmbededCheckoutButton from './components/EmbededCheckoutButton';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  return (


  

    <div>
      <ProductList onProductSelect={handleProductSelect} />
      {selectedProduct && (
        <DonationForm productId={selectedProduct} />
      )}
    </div>

  
  );
}
