import React from 'react';
import useCartStore, { type CartItem } from '../../stores/cart-store';

interface CartItemProps {
  item: CartItem;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.code);
    } else {
      updateQuantity(item.code, newQuantity);
    }
  };

  return (
    <div className="cart-item bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{item.name}</h4>
          <div className="text-sm text-gray-600 mt-1">
            <div>Ø{item.diameter} × {item.length}mm</div>
            <div>{item.surface}</div>
          </div>
        </div>
        
        <button
          onClick={() => removeItem(item.code)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="Remover item"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="Diminuir quantidade"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          
          <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="Aumentar quantidade"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          {item.quantity} {item.quantity === 1 ? 'unidade' : 'unidades'}
        </div>
      </div>
    </div>
  );
};

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const MinusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default CartItemComponent;
