export interface POI {
  name: string;
  type: 'transport' | 'landmark' | 'nature';
  coordinates: [number, number];
  regionCode: string;
}

export const POIS: POI[] = [
  { name: "Beijing Capital Int'l Airport", type: 'transport', coordinates: [116.5871, 40.0799], regionCode: '110000' },
  { name: 'Forbidden City', type: 'landmark', coordinates: [116.397, 39.9163], regionCode: '110000' },
  { name: 'Great Wall (Badaling)', type: 'nature', coordinates: [116.0169, 40.3593], regionCode: '110000' },
  { name: 'Shanghai Hongqiao Station', type: 'transport', coordinates: [121.3189, 31.1941], regionCode: '310000' },
  { name: 'The Bund', type: 'landmark', coordinates: [121.4905, 31.2323], regionCode: '310000' },
  { name: 'Oriental Pearl Tower', type: 'landmark', coordinates: [121.4998, 31.2397], regionCode: '310000' },
  { name: 'Hangzhou East Station', type: 'transport', coordinates: [120.2132, 30.2907], regionCode: '330100' },
  { name: 'West Lake', type: 'nature', coordinates: [120.1453, 30.247], regionCode: '330100' },
  { name: 'Lingyin Temple', type: 'landmark', coordinates: [120.1035, 30.2408], regionCode: '330100' },
  { name: 'Guangzhou South Station', type: 'transport', coordinates: [113.2684, 22.9887], regionCode: '440100' },
  { name: 'Canton Tower', type: 'landmark', coordinates: [113.3244, 23.1064], regionCode: '440100' },
  { name: 'Shenzhen North Station', type: 'transport', coordinates: [114.0294, 22.6094], regionCode: '440300' },
  { name: 'Window of the World', type: 'landmark', coordinates: [113.973, 22.5365], regionCode: '440300' }
];

export const getPOIsByRegion = (regionCode: string): POI[] => {
  const exact = POIS.filter(p => p.regionCode === regionCode);
  if (exact.length > 0) return exact;

  if (regionCode.endsWith('0000')) {
    const prefix = regionCode.substring(0, 2);
    return POIS.filter(p => p.regionCode.startsWith(prefix)).slice(0, 5);
  }

  return [];
};
