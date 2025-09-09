import { products } from '../../../data/products';
import WarningIcon from '../../ui/warning-sign';
import ProductGroup from './ProductGroup';

const InteractiveSelection = () => {
  const product = products[0]

  return (
    <div className="my-8">
      <div className='flex flex-col justify-center items-center mt-6 text-sm text-gray-600'>
        <WarningIcon />
        <p className='font-bold text-[#000]'>60</p>
        <p className='font-bold text-[#000]'>N.cm</p>
        <p>Toque de inserção recomendado</p>
      </div>

      <div className='h-4 md:h-8' />

      <div className="space-y-4">
        {Object.entries(product.variations).map(([key, variation]) => (
          <ProductGroup key={key} variation={variation} surfaceKey={key} />
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelection;
