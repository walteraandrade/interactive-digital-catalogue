import React from 'react';
import ProductVariation from './ProductVariation';

interface ProductDiameterProps {
  diameter: string;
  lengths: string[];
  surfaceKey: string;
}

const ProductDiameter: React.FC<ProductDiameterProps> = ({ diameter, lengths, surfaceKey }) => {
  return (
    <div className="p-4 rounded-lg">
      <h4 className="text-md font-bold mb-2">Ø {diameter}</h4>
      <div className="space-y-2 min-h-[60px]">
        {lengths.map(length => (
          <ProductVariation key={length} length={length} diameter={diameter} surfaceKey={surfaceKey} />
        ))}
      </div>
    </div>
  );
};

export default ProductDiameter;
