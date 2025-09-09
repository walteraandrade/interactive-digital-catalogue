import { Toaster } from 'react-hot-toast';
import CartSidebar from './components/cart/cart-sidebar';
import CallToAction from './components/layout/call-to-action';
import Header from './components/layout/header';
import InteractiveCatalog from './components/product/interactive-catalog';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Catálogo Interativo de Implantes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Clique nos produtos das imagens para adicionar ao seu carrinho e finalize seu pedido via WhatsApp.
          </p>
        </div>
        
        <InteractiveCatalog />
        <CallToAction />
      </main>
      
      <CartSidebar />
      
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App
