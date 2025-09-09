import React from 'react';
import WhatsAppButton from '../cart/whatsapp-button';
import useCartStore from '../../stores/cart-store';

const CallToAction: React.FC = () => {
  const { items } = useCartStore();

  return (
    <section className="bg-white py-12 mt-8 rounded-lg shadow-md">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Pronto para fazer seu pedido?</h2>
        {items.length > 0 ? (
          <p className="text-gray-600 mb-8">Clique no botão abaixo para finalizar seu pedido pelo WhatsApp.</p>
        ) : (
          <p className="text-gray-600 mb-8">Navegue pelo catálogo, adicione itens ao seu carrinho e eles aparecerão aqui.</p>
        )}
        <div className="max-w-xs mx-auto">
          <WhatsAppButton />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
