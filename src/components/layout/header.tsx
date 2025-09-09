import React from 'react';
import useCartStore from '../../stores/cart-store';
import { APP_NAME } from '../../utils/constants';

const Header: React.FC = () => {
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-dental-blue">
              {APP_NAME}
            </h1>
          </div>

          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-600 hover:text-dental-blue transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
            aria-label={`Carrinho de compras (${totalItems} itens)`}
          >
            <CartIcon className="w-6 h-6" />
            
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-fade-in">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};


const CartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.75 4.5m0 0H20l-2.5 7.5H7.5m-1.75-7.5l1.75 7.5m0 0a2.25 2.25 0 104.5 0m-4.5 0h4.5m0 0a2.25 2.25 0 104.5 0h-4.5z"
    />
  </svg>
);
export default Header;
