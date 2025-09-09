import { WHATSAPP_NUMBER } from './constants';

export const openWhatsApp = (message: string): void => {
  if (!message) {
    console.error('WhatsApp message is empty');
    return;
  }
  
  try {
    const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    
  
  } catch (error) {
    console.error('WhatsApp opening failed:', error);
    navigator.clipboard?.writeText(decodeURIComponent(message));
    alert('Mensagem copiada para área de transferência. Abra o WhatsApp manualmente.');
  }
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return cleanNumber.length >= 10 && cleanNumber.length <= 15;
};

export const isWhatsAppAvailable = (): boolean => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
