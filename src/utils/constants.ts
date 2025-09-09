export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "5511999999999";
export const APP_NAME = "Catálogo Interativo";

export const PERFORMANCE_TARGETS = {
  BUNDLE_SIZE_LIMIT: 500 * 1024,
  FIRST_LOAD_TIME: 3000,
  LIGHTHOUSE_SCORE_MIN: 95,
  MOBILE_INTERACTION_TIME: 1000,
};

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const HOTSPOT_CONFIG = {
  MIN_TOUCH_TARGET: 44,
  HOVER_DELAY: 200,
  ANIMATION_DURATION: 200,
};
