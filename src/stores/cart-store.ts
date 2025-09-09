import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  code: string;
  name: string;
  diameter: string;
  length: string;
  surface: string;
  productId: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (code: string) => void;
  updateQuantity: (code: string, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getWhatsAppMessage: () => string;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.code === product.code);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.code === product.code
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          
          return {
            items: [...state.items, { ...product, quantity: 1 }]
          };
        });
      },
      
      removeItem: (code) => {
        set((state) => ({
          items: state.items.filter(item => item.code !== code)
        }));
      },
      
      updateQuantity: (code, quantity) => {
        if (quantity <= 0) {
          get().removeItem(code);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.code === code ? { ...item, quantity } : item
          )
        }));
      },
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      closeCart: () => set({ isCartOpen: false }),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getWhatsAppMessage: () => {
        const items = get().items;
        
        if (items.length === 0) return '';
        
        const itemsList = items
          .map(item => 
            `*Produto:* ${item.name}\n` +
            `*Medidas:* Ø${item.diameter} × ${item.length}mm\n` +
            `*Superfície:* ${item.surface}\n` +
            `*Código:* ${item.code}\n` +
            `*Quantidade:* ${item.quantity}`
          )
          .join('\n\n');
          
        return encodeURIComponent(
          `Olá! Gostaria de fazer o seguinte pedido:\n\n${itemsList}\n\n` +
          `*Total de itens:* ${get().getTotalItems()}\n\n` +
          `Aguardo retorno com disponibilidade e valores.\n\nObrigado!`
        );
      }
    }),
    {
      name: 'dental-cart-storage',
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (_, error) => {
        if (error) {
          console.error('Cart rehydration failed:', error);
        }
      },
    }
  )
);

export default useCartStore;
