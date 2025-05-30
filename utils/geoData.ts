
export interface GeoData {
  latitude: number;
  longitude: number;
  zipCodes: string[];
  averageHomePrice: number;
  medianHomePrice: number;
  pricePerSqFt: number;
  daysOnMarket: number;
}

export interface GeoDataSet {
  centennialHills: GeoData;
  providence: GeoData;
  skyeCanyon: GeoData;
}

export const geoData: GeoDataSet = {
  centennialHills: {
    latitude: 36.2719,
    longitude: -115.2737,
    zipCodes: ['89149', '89166'],
    averageHomePrice: 650000,
    medianHomePrice: 580000,
    pricePerSqFt: 280,
    daysOnMarket: 45
  },
  providence: {
    latitude: 36.2483,
    longitude: -115.2745,
    zipCodes: ['89166'],
    averageHomePrice: 750000,
    medianHomePrice: 680000,
    pricePerSqFt: 320,
    daysOnMarket: 38
  },
  skyeCanyon: {
    latitude: 36.2847,
    longitude: -115.2937,
    zipCodes: ['89166'],
    averageHomePrice: 700000,
    medianHomePrice: 625000,
    pricePerSqFt: 310,
    daysOnMarket: 42
  }
};

export function getGeoData(area?: keyof GeoDataSet): GeoData | GeoDataSet {
  if (area && geoData[area]) {
    return geoData[area];
  }
  return geoData;
}
