export interface HotspotPosition {
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface Hotspot {
  code: string;
  position: HotspotPosition;
}

export interface HotspotConfiguration {
  image: string;
  hotspots: Hotspot[];
}

export const hotspotConfigurations: Record<string, HotspotConfiguration> = {
  'implante-torq': {
    image: 'implante-torq-catalog.jpg',
    hotspots: [
      { code: '52535085', position: { top: '49.4%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525350100', position: { top: '51.0%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525350115', position: { top: '52.7%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525350130', position: { top: '54.3%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525350150', position: { top: '55.9%', left: '23%', width: '20%', height: '1.5%' } },

      { code: '525375085', position: { top: '60.4%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525375100', position: { top: '62.0%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525375115', position: { top: '63.6%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525375130', position: { top: '65.3%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525375150', position: { top: '66.9%', left: '23%', width: '20%', height: '1.5%' } },

      { code: '52540085', position: { top: '71.4%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525400100', position: { top: '73.0%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525400115', position: { top: '74.7%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525400130', position: { top: '76.3%', left: '23%', width: '20%', height: '1.5%' } },

      { code: '52550085', position: { top: '80.8%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525500100', position: { top: '82.4%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525500115', position: { top: '84.1%', left: '23%', width: '20%', height: '1.5%' } },
      { code: '525500130', position: { top: '85.7%', left: '23%', width: '20%', height: '1.5%' } },

      { code: '54535085', position: { top: '49.4%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545350100', position: { top: '51.0%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545350115', position: { top: '52.7%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545350130', position: { top: '54.3%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545350150', position: { top: '55.9%', left: '65%', width: '20%', height: '1.5%' } },

      { code: '545375085', position: { top: '60.4%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545375100', position: { top: '62.0%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545375115', position: { top: '63.6%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545375130', position: { top: '65.3%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545375150', position: { top: '66.9%', left: '65%', width: '20%', height: '1.5%' } },

      { code: '54540085', position: { top: '71.4%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545400100', position: { top: '73.0%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545400115', position: { top: '74.7%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545400130', position: { top: '76.3%', left: '65%', width: '20%', height: '1.5%' } },

      { code: '54550085', position: { top: '80.8%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545500100', position: { top: '82.4%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545500115', position: { top: '84.1%', left: '65%', width: '20%', height: '1.5%' } },
      { code: '545500130', position: { top: '85.7%', left: '65%', width: '20%', height: '1.5%' } },

      { code: '580760', position: { top: '92%', left: '50%', width: '20%', height: '1.5%' } },
      { code: '568455', position: { top: '93.6%', left: '50%', width: '20%', height: '1.5%' } }
    ]
  }
};

export const getHotspotsForProduct = (productId: string): Hotspot[] => {
  return hotspotConfigurations[productId]?.hotspots || [];
};
