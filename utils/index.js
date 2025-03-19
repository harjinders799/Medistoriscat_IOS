import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions that designers use
const baseWidth = 375; // iPhone 8/X width
const baseHeight = 812; // iPhone X height
const iPadBaseWidth = 768; // iPad mini width
const iPadBaseHeight = 1024; // iPad mini height

// Device detection
export const isTablet = () => {
  const deviceWidth = width > height ? height : width;
  return deviceWidth >= 550; // Common threshold for tablet detection
};

// Scales with tablet detection
const getWidthScale = () => {
  if (isTablet()) {
    return width / iPadBaseWidth;
  }
  return width / baseWidth;
};

const widthScale = getWidthScale();

// Use this for elements that should maintain the same size regardless of screen size
export const normalize = (size) => {
  // For tablets, we scale down a bit to prevent elements from becoming too large
  const scaleFactor = isTablet() ? 0.8 : 1;
  const newSize = size * widthScale * scaleFactor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// For font sizes with tablet adjustment
export const getFontSize = (size) => {
  console.log(PixelRatio.getFontScale(), width)
  if (isTablet()) {
    // Prevent fonts from becoming too large on tablets
    const tabletAdjustment = size >= 20 ? 1.2 : 1.3;
    return normalize(size * tabletAdjustment)/ PixelRatio.getFontScale();
  }
  // For tablets, we scale fonts differently to maintain readability
  return normalize(size) / PixelRatio.getFontScale();
};

export const getSpacing = (size) => {
  if (isTablet()) {
    // Adjust spacing for tablets
    return normalize(size * 1.2);
  }
  return normalize(size);
};