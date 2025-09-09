import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useCartStore from '../../stores/cart-store';
import { generateProductCodes } from '../../data/products';
import type { HotspotPosition } from '../../data/hotspots';

interface HotspotProps {
  code: string;
  position: HotspotPosition;
  showIcon?: boolean;
  className?: string;
}

const Hotspot: React.FC<HotspotProps> = ({ 
  code, 
  position, 
  showIcon = true,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  
  const productData = generateProductCodes().find(p => p.code === code);
  
  if (!productData) {
    console.warn(`Product not found for code: ${code}`);
    return null;
  }
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(productData);
    toast.success(`${productData.name} adicionado ao carrinho!`, {
      duration: 2000,
      position: 'bottom-center',
    });
  };
  
  return (
    <button
      className={`
        hotspot absolute z-10 cursor-pointer transition-all duration-200
        ${showIcon ? 'hotspot-with-icon' : 'hotspot-invisible'}
        ${className}
        touch-manipulation
      `}
      style={position}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Adicionar ${productData.name} Ø${productData.diameter} × ${productData.length}mm ao carrinho`}
    >
      {showIcon && (
        <div className="hotspot-icon h-[8px]">
          <div className="text-white p-2 shadow-lg transform transition-transform hover:scale-110">
            <PlusIcon />
          </div>
        </div>
      )}
      
      {isHovered && (
        <div className="hotspot-tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
          <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <div className="font-semibold">{productData.name}</div>
            <div>Ø{productData.diameter} × {productData.length}mm</div>
            <div>{productData.surface}</div>
            
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </button>
  );
};

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default Hotspot;
