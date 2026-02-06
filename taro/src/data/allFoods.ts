import { loadJsonFromCloud } from '../utils/mapData';

export interface CityFood {
  cityName: string;
  cityCode?: string;
  foods: string[];
}

export interface ProvinceFood {
  provinceName: string;
  provinceCode?: string;
  cities: CityFood[];
}

interface CityFoodsRaw {
  cities: { province: string; city: string; specialty_foods: string[] }[];
}

const CLOUD_FOOD_PATH = 'data/food/city_foods_complete.json';

function groupByProvince(data: CityFoodsRaw): Record<string, ProvinceFood> {
  const provinceMap: Record<string, ProvinceFood> = {};
  data.cities.forEach(item => {
    const provinceName = item.province;
    if (!provinceMap[provinceName]) {
      provinceMap[provinceName] = { provinceName, cities: [] };
    }
    provinceMap[provinceName].cities.push({
      cityName: item.city,
      foods: item.specialty_foods
    });
  });
  return provinceMap;
}

let allProvinceFoodsCache: Record<string, ProvinceFood> | null = null;

/** 从云存储加载美食数据，仅需调用一次；后续 getFoodsByProvince 等会使用缓存 */
export const loadCityFoodsCollection = async (): Promise<Record<string, ProvinceFood>> => {
  if (allProvinceFoodsCache) return allProvinceFoodsCache;
  const raw = await loadJsonFromCloud<CityFoodsRaw>(CLOUD_FOOD_PATH);
  allProvinceFoodsCache = groupByProvince(raw);
  return allProvinceFoodsCache;
};

// 根据省份名称或代码获取美食数据
export const getFoodsByProvince = (provinceNameOrCode: string): ProvinceFood | null => {
  if (!allProvinceFoodsCache) return null;
  if (allProvinceFoodsCache[provinceNameOrCode]) {
    return allProvinceFoodsCache[provinceNameOrCode];
  }
  if (!provinceNameOrCode.includes('省') && !provinceNameOrCode.includes('市')) {
    const withSuffix = provinceNameOrCode + '省';
    if (allProvinceFoodsCache[withSuffix]) {
      return allProvinceFoodsCache[withSuffix];
    }
  }
  return null;
};

// 根据城市名称获取美食数据
export const getFoodsByCity = (provinceFoods: ProvinceFood, cityName: string): CityFood | null => {
  return provinceFoods.cities.find(city => {
    // 去掉"市"后缀进行匹配
    const cityNameWithoutSuffix = city.cityName.replace('市', '');
    const searchNameWithoutSuffix = cityName.replace('市', '');
    return city.cityName === cityName || cityNameWithoutSuffix === searchNameWithoutSuffix;
  }) || null;
};

// 获取所有省份名称列表
export const getAllProvinceNames = (): string[] => {
  return allProvinceFoodsCache ? Object.keys(allProvinceFoodsCache) : [];
};

// 获取某个省份的所有城市
export const getCitiesByProvince = (provinceName: string): CityFood[] => {
  const province = getFoodsByProvince(provinceName);
  return province ? province.cities : [];
};
