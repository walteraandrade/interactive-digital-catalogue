import React from 'react';
import { type Product } from '../../../data/products';
import ProductDiameter from './ProductDiameter';

interface ProductGroupProps {
  variation: Product['variations'][string];
  surfaceKey: string;
}

const ProductGroup: React.FC<ProductGroupProps> = ({ variation, surfaceKey }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-2">{(variation.name.toLocaleLowerCase() === 'porous' || variation.name.toLocaleLowerCase() === 'vulcano') && 'Superfície: ' } {variation.name}</h3>
        <p>* Ø = diâmetro</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(variation.diameters).map(([diameter, lengths]) => (
          <ProductDiameter key={diameter} diameter={diameter} lengths={lengths} surfaceKey={surfaceKey} />
        ))}
      </div>
    </div>
  );
};

export default ProductGroup;
