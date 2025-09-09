import { products } from '../../../data/products';
import ProductGroup from './ProductGroup';

const InteractiveSelection = () => {
  const product = products[0]

  return (
    <div className="my-8">
      <div className="space-y-4">
        {Object.entries(product.variations).map(([key, variation]) => (
          <ProductGroup key={key} variation={variation} surfaceKey={key} />
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelection;
