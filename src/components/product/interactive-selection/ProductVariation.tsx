import React from 'react';
import { toast } from 'react-hot-toast';
import useCartStore from '../../../stores/cart-store';
import { generateProductCodes } from '../../../data/products';

interface ProductVariationProps {
  length: string;
  diameter: string;
  surfaceKey: string;
}

const ProductVariation: React.FC<ProductVariationProps> = ({ length, diameter, surfaceKey }) => {
  const addItem = useCartStore(state => state.addItem);
  const allProducts = generateProductCodes();
  const productData = allProducts.find(
    p => p.diameter === diameter && p.length === length && p.surface.toLowerCase().includes(surfaceKey.toLowerCase())
  );


  if (!productData) {
    return null;
  }

  const handleClick = () => {
    addItem(productData);
    toast.success(`${productData.name}:${productData.diameter}x${productData.length}mm adicionado ao carrinho!`);
  };

  return (
    <div className="flex items-center bg-[#EAEAEA]/50 p-2 rounded-sm justify-between">
      <div>
        <p className="font-semibold">{`Ø ${diameter} x ${length} mm`}</p>
      </div>
      <button
        onClick={handleClick}
        className="px-4 py-2 text-sm font-medium text-white bg-[#392099] cursor-pointer rounded-md hover:bg-[#4B2A73] active:bg-[#2C1845] transition-colors transition-duration-200 hover:scale-101"
        aria-label={`Adicionar ${productData.name} ao carrinho`}
      >
        Adicionar
      </button>
    </div>
  );
};

export default ProductVariation;
