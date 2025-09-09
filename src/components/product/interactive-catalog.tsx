import React, { useState, useRef } from 'react';
import { products } from '../../data/products';
import InteractiveSelection from './interactive-selection/InteractiveSelection';

interface InteractiveCatalogProps {
  productId?: string;
}

const InteractiveCatalog: React.FC<InteractiveCatalogProps> = ({ productId = 'implante-torq' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return <div className="text-center text-red-500">Produto não encontrado</div>;
  }
  
  return (
    <div className="interactive-catalog relative">
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}
      
      <div className="relative">
        <img
          ref={imageRef}
          src={`/assets/images/${product.image}`}
          alt={`${product.name} - Catálogo interativo`}
          className={`w-full h-auto rounded-lg shadow-lg transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          draggable={false}
        />
          <InteractiveSelection />
      </div>
    </div>
  );
};

export default InteractiveCatalog;
