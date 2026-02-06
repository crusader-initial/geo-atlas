import { loadJsonFromCloud } from '../utils/mapData';

export interface CityPOI {
  name: string;
  type: string;
  lat: number;
  lng: number;
}

export interface CityPOIData {
  city: string;
  province: string;
  pois: CityPOI[];
}

export interface CityPOICollection {
  description: string;
  total_cities: number;
  data_version: string;
  cities: CityPOIData[];
}

const CLOUD_POI_PATH = 'data/poi/china_cities_poi_merged.json';

let poisCollectionCache: CityPOICollection | null = null;

/** 从云存储加载 POI 数据，仅需调用一次（如页面 onLoad 时）；后续 getPOIsByCityName 等会使用缓存 */
export const loadCityPoisCollection = async (): Promise<CityPOICollection> => {
  if (poisCollectionCache) return poisCollectionCache;
  poisCollectionCache = await loadJsonFromCloud<CityPOICollection>(CLOUD_POI_PATH);
  return poisCollectionCache;
};

/**
 * 根据城市名称获取该城市的POI数据
 * @param cityName 城市名称，如"北京"、"上海"
 * @returns 该城市的POI数组，如果未加载或找不到则返回空数组
 */
export const getPOIsByCityName = (cityName: string): CityPOI[] => {
  if (!cityName || !poisCollectionCache) return [];

  const normalizedName = normalizeCityName(cityName);

  const cityData = poisCollectionCache.cities.find(
    city => city.city === normalizedName || city.city === cityName
  );

  return cityData?.pois || [];
};

const stripSuffixes = (name: string, suffixes: string[]) => {
  let result = name;
  for (const suffix of suffixes) {
    if (result.endsWith(suffix)) {
      result = result.slice(0, -suffix.length);
      break;
    }
  }
  return result;
};

const normalizeCityName = (name: string) => {
  return stripSuffixes(name, [
    '市',
    '自治区',
    '省',
    '特别行政区',
    '回族自治区',
    '维吾尔自治区',
    '壮族自治区',
    '藏族自治区'
  ]);
};




/**
 * 将CityPOI转换为地图组件使用的POI格式
 * @param cityPois 城市POI数组
 * @returns 转换后的POI数组，包含coordinates字段
 */
export const convertCityPOIsToMapPOIs = (cityPois: CityPOI[]) => {
  return cityPois.map(poi => ({
    name: poi.name,
    type: poi.type,
    coordinates: [poi.lng, poi.lat] as [number, number]
  }));
};

/**
 * 获取所有城市列表
 * @returns 城市名称数组
 */
export const getAllCities = (): string[] => {
  return poisCollectionCache ? poisCollectionCache.cities.map(city => city.city) : [];
};

/**
 * 根据省份获取该省份下的所有城市
 * @param provinceName 省份名称
 * @returns 该省份下的城市数组
 */
export const getCitiesByProvince = (provinceName: string): CityPOIData[] => {
  if (!poisCollectionCache) return [];
  const normalized = stripSuffixes(provinceName, ['省', '市', '自治区', '特别行政区']);
  return poisCollectionCache.cities.filter(city => {
    const cityProvince = city.province;
    const normalizedCityProvince = stripSuffixes(cityProvince, ['省', '市', '自治区', '特别行政区']);
    return cityProvince === provinceName || normalizedCityProvince === normalized;
  });
};


/**
 * 按类型过滤POI
 * @param pois POI数组
 * @param types 要筛选的类型数组，如["景点", "火车站"]
 * @returns 过滤后的POI数组
 */
export const filterPOIsByType = (pois: CityPOI[], types: string[]): CityPOI[] => {
  return pois.filter(poi => types.includes(poi.type));
};
