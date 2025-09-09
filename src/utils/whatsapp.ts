import { WHATSAPP_NUMBER } from './constants';
import type { CartItem } from '../stores/cart-store';

export const openWhatsApp = (message: string): void => {
  if (!message) {
    console.error('WhatsApp message is empty');
    return;
  }
  
  try {
    const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/${cleanNumber}?text=${message}`;
    const newWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    
    if (!newWindow) {
      window.location.href = whatsappURL;
    }
  } catch (error) {
    console.error('WhatsApp opening failed:', error);
    navigator.clipboard?.writeText(decodeURIComponent(message));
    alert('Mensagem copiada para área de transferência. Abra o WhatsApp manualmente.');
  }
};

export const formatWhatsAppMessage = (items: CartItem[]): string => {
  if (!items || items.length === 0) return '';
  
  const header = `Olá! Gostaria de fazer o seguinte pedido:`;
  
  const itemsList = items
    .map((item, index) => 
      `${index + 1}. ${item.name}\n` +
      `   Ø${item.diameter} × ${item.length}mm - ${item.surface}\n` +
      `   Código: ${item.code} | Quantidade: ${item.quantity}`
    )
    .join('\n\n');
    
  const footer = `\nTotal de itens: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n\n` +
                 `Aguardo retorno com disponibilidade e valores.\n\nObrigado!`;
  
  return encodeURIComponent(`${header}\n\n${itemsList}${footer}`);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return cleanNumber.length >= 10 && cleanNumber.length <= 15;
};

export const isWhatsAppAvailable = (): boolean => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
