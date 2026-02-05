import cityFoodsData from './city_foods_complete.json';

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

// 将 JSON 数据按省份分组
function groupByProvince(): Record<string, ProvinceFood> {
  const provinceMap: Record<string, ProvinceFood> = {};

  cityFoodsData.cities.forEach(item => {
    const provinceName = item.province;
    
    if (!provinceMap[provinceName]) {
      provinceMap[provinceName] = {
        provinceName: provinceName,
        cities: []
      };
    }

    // 保留所有美食
    provinceMap[provinceName].cities.push({
      cityName: item.city,
      foods: item.specialty_foods
    });
  });

  return provinceMap;
}

// 生成所有省份美食数据
export const allProvinceFoods = groupByProvince();

// 根据省份名称或代码获取美食数据
export const getFoodsByProvince = (provinceNameOrCode: string): ProvinceFood | null => {
  // 直接查找省份名称
  if (allProvinceFoods[provinceNameOrCode]) {
    return allProvinceFoods[provinceNameOrCode];
  }
  
  // 尝试添加"省"后缀查找
  if (!provinceNameOrCode.includes('省') && !provinceNameOrCode.includes('市')) {
    const withSuffix = provinceNameOrCode + '省';
    if (allProvinceFoods[withSuffix]) {
      return allProvinceFoods[withSuffix];
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
  return Object.keys(allProvinceFoods);
};

// 获取某个省份的所有城市
export const getCitiesByProvince = (provinceName: string): CityFood[] => {
  const province = getFoodsByProvince(provinceName);
  return province ? province.cities : [];
};
