import React, { useEffect } from 'react';
import useCartStore from '../../stores/cart-store';
import CartItem from './cart-item';
import WhatsAppButton from './whatsapp-button';

const CartSidebar: React.FC = () => {
  const { items, isCartOpen, closeCart, getTotalItems } = useCartStore();
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCartOpen, closeCart]);
  
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);
  
  return (
    <>
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}
      
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:max-w-sm
        overflow-y-scroll
      `}>
        <div className="cart-header flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Carrinho ({getTotalItems()})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <XIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className='border-b border w-[90%] m-auto' />
        
        <div className="cart-content flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="empty-cart flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCartIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-gray-500 text-sm">
                Clique nos produtos do catálogo para adicioná-los ao carrinho.
              </p>
            </div>
          ) : (
            <div className="cart-items space-y-4 p-4">
              {items.map((item) => (
                <CartItem 
                  key={item.code} 
                  item={item} 
                />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="cart-footer border-t p-4 space-y-4">
            <div className="cart-summary">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total de itens:</span>
                <span>{getTotalItems()}</span>
              </div>
            </div>
            
            <WhatsAppButton />
            
            <button
              onClick={() => useCartStore.getState().clearCart()}
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8 0v5" />
  </svg>
);

export default CartSidebar;
