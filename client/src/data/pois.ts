export interface POI {
  name: string;
  type: 'transport' | 'landmark' | 'nature';
  coordinates: [number, number];
  regionCode: string;
}

// 示例 POI 数据，实际项目中应从数据库或更完整的文件加载
export const POIS: POI[] = [
  // 北京
  { name: 'Beijing Capital Int\'l Airport', type: 'transport', coordinates: [116.5871, 40.0799], regionCode: '110000' },
  { name: 'Forbidden City', type: 'landmark', coordinates: [116.3970, 39.9163], regionCode: '110000' },
  { name: 'Great Wall (Badaling)', type: 'nature', coordinates: [116.0169, 40.3593], regionCode: '110000' },
  
  // 上海
  { name: 'Shanghai Hongqiao Station', type: 'transport', coordinates: [121.3189, 31.1941], regionCode: '310000' },
  { name: 'The Bund', type: 'landmark', coordinates: [121.4905, 31.2323], regionCode: '310000' },
  { name: 'Oriental Pearl Tower', type: 'landmark', coordinates: [121.4998, 31.2397], regionCode: '310000' },

  // 浙江 - 杭州
  { name: 'Hangzhou East Station', type: 'transport', coordinates: [120.2132, 30.2907], regionCode: '330100' },
  { name: 'West Lake', type: 'nature', coordinates: [120.1453, 30.2470], regionCode: '330100' },
  { name: 'Lingyin Temple', type: 'landmark', coordinates: [120.1035, 30.2408], regionCode: '330100' },

  // 广东 - 广州
  { name: 'Guangzhou South Station', type: 'transport', coordinates: [113.2684, 22.9887], regionCode: '440100' },
  { name: 'Canton Tower', type: 'landmark', coordinates: [113.3244, 23.1064], regionCode: '440100' },
  
  // 广东 - 深圳
  { name: 'Shenzhen North Station', type: 'transport', coordinates: [114.0294, 22.6094], regionCode: '440300' },
  { name: 'Window of the World', type: 'landmark', coordinates: [113.9730, 22.5365], regionCode: '440300' },
];

export const getPOIsByRegion = (regionCode: string): POI[] => {
  // 简单的匹配逻辑：匹配前缀
  // 例如 regionCode '330000' (浙江省) 应该包含 '330100' (杭州) 的 POI 吗？
  // 根据需求，"每个区域最多 3-5 个"，如果是省级视图，可能需要筛选最重要的
  
  // 精确匹配
  const exact = POIS.filter(p => p.regionCode === regionCode);
  if (exact.length > 0) return exact;

  // 如果是省级代码 (末尾是 0000)，尝试查找该省下属城市的 POI
  if (regionCode.endsWith('0000')) {
    const prefix = regionCode.substring(0, 2);
    return POIS.filter(p => p.regionCode.startsWith(prefix)).slice(0, 5);
  }

  return [];
};
