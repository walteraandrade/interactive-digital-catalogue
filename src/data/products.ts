export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  indications: string[];
  variations: {
    [key: string]: {
      name: string;
      diameters: {
        [key: string]: string[];
      };
    };
  };
}

export const products: Product[] = [
  {
    id: 'implante-torq',
    name: 'Implante Torq®',
    description: 'Ø 3,5 - 3,75 - 4,0 - 5,0',
    image: 'implante-torq-catalog.jpg',
    features: [
      'TiGr4 Hard®',
      'Macro estrutura cilíndrica',
      'Dupla rosca com ápice ativo, quatro fresados',
      'Cone Morse indexado NP',
      'Rosca interna M 1.6',
      'Bioplatform® (tipo switch)',
      'Linha única de componentes'
    ],
    indications: [
      'Implantação estética unitária, parcial e múltipla',
      'Protocolo convencional e carga imediata',
      'Indicação dupla, maxila e mandíbula',
      'Short NP mandíbula, prótese múltipla'
    ],
    variations: {
      porous: {
        name: 'Porous',
        diameters: {
          '3.5': ['8.5', '10', '11.5', '13', '15'],
          '3.75': ['8.5', '10', '11.5', '13', '15'],
          '4.0': ['8.5', '10', '11.5', '13'],
          '5.0': ['8.5', '10', '11.5', '13']
        }
      },
      vulcano: {
        name: 'Vulcano',
        diameters: {
          '3.5': ['8.5', '10', '11.5', '13', '15'],
          '3.75': ['8.5', '10', '11.5', '13', '15'],
          '4.0': ['8.5', '10', '11.5', '13'],
          '5.0': ['8.5', '10', '11.5', '13']
        }
      },
      short: {
        name: 'Short NP BLT',
        diameters: {
          '3.75': ['6.5', '5.5'],
          '4.3': ['6.5', '5.5']
        }
      }
    }
  }
];

export interface ProductCode {
  code: string;
  name: string;
  diameter: string;
  length: string;
  surface: string;
  productId: string;
  image: string;
}

export const generateProductCodes = (): ProductCode[] => {
  const codes: ProductCode[] = [];
  
  products.forEach(product => {
    Object.entries(product.variations).forEach(([surfaceKey, surface]) => {
      Object.entries(surface.diameters).forEach(([diameter, lengths]) => {
        lengths.forEach(length => {
          const code = generateCode(surfaceKey, diameter, length);
          codes.push({
            code,
            name: product.name,
            diameter,
            length,
            surface: surface.name,
            productId: product.id,
            image: product.image
          });
        });
      });
    });
  });
  
  return codes;
};

const generateCode = (surface: string, diameter: string, length: string): string => {
  if (surface === 'short') {
    if (diameter === '3.75' && length === '6.5') return '580760';
    if (diameter === '4.3' && length === '5.5') return '568455';
  }
  
  const surfacePrefix = surface === 'porous' ? '525' : '545';
  let diameterCode: string;
  let lengthCode: string;
  
  if (length === '8.5') {
    diameterCode = diameter.replace('.', '');
    lengthCode = '085';
  } else {
    if (diameter === '3.5') diameterCode = '350';
    else if (diameter === '3.75') diameterCode = '375';
    else if (diameter === '4.0') diameterCode = '400';
    else if (diameter === '5.0') diameterCode = '500';
    else diameterCode = diameter.replace('.', '');
    
    if (length === '10') lengthCode = '100';
    else if (length === '11.5') lengthCode = '115';
    else if (length === '13') lengthCode = '130';
    else if (length === '15') lengthCode = '150';
    else lengthCode = (parseFloat(length) * 10).toString().padStart(3, '0');
  }
  
  return `${surfacePrefix}${diameterCode}${lengthCode}`;
};
