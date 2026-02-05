import { View, Text, Button } from '@tarojs/components';
import { useMemo, useState, useEffect } from 'react';
import { MapCanvas, ViewMode } from '../../components/MapCanvas';
import { getPOIsByRegion } from '../../data/pois';
import { getFoodsByProvince, getFoodsByCity } from '../../data/allFoods';
import { getPOIsByCityName, convertCityPOIsToMapPOIs } from '../../data/cityPois';
import { useMapLevel } from '../../hooks/useMapLevel';
import './index.scss';

const typeLabel: Record<string, string> = {
  transport: '交通枢纽',
  landmark: '地标',
  nature: '自然景观',
  景点: '景点',
  火车站: '火车站',
  机场: '机场',
  购物: '购物',
  美食: '美食'
};

const viewModeLabels: Record<ViewMode, string> = {
  name: '显示地名',
  poi: '显示POI',
  food: '显示美食',
  outline: '轮廓模式'
};
const normalizeRegionCode = (code: string | undefined) => {
  if (!code) return '';
  if (code.length === 2) return `${code}0000`;
  if (code.length === 4) return `${code}00`;
  return code;
};

const isMunicipality = (name: string) => {
  const municipalities = ['北京', '上海', '天津', '重庆', '北京市', '上海市', '天津市', '重庆市'];
  return municipalities.some(m => name.includes(m));
};



export default function Index() {
  const {
    currentLevel,
    currentDataUrl,
    currentRegionName,
    canGoBack,
    drillDown,
    goBack,
    reset
  } = useMapLevel();

  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('name');
  const shouldShowCityPOI =
    currentLevel === 'city' ||
    (currentLevel === 'province' && isMunicipality(currentRegionName));


  // 进入城市级别时自动切换到POI模式
  useEffect(() => {
    if (shouldShowCityPOI) {
      setViewMode('poi');
    } else {
      setViewMode('name');
    }
  }, [shouldShowCityPOI]);

  const handleRegionClick = (feature: any) => {
    const id = feature.properties?.id || feature.properties?.code || feature.properties?.adcode;
    const selectedId =
      selectedRegion?.properties?.id ||
      selectedRegion?.properties?.code ||
      selectedRegion?.properties?.adcode;

    if (selectedId === id) {
      drillDown(feature);
      setSelectedRegion(null);
    } else {
      setSelectedRegion(feature);
    }
  };

  const regionPOIs = useMemo(() => {
    if (!selectedRegion) return [];
    const id = selectedRegion.properties?.id || selectedRegion.properties?.code || selectedRegion.properties?.adcode;
    const normalizedId = normalizeRegionCode(id);
    return normalizedId ? getPOIsByRegion(normalizedId) : [];
  }, [selectedRegion]);

  // 城市级POI数据（用于在进入城市地图时显示景点）
  const cityPOIs = useMemo(() => {
    // 如果不是城市级别，并且不是直辖市的province级别，就不显示POI
    if (!shouldShowCityPOI) return [];
    
    // 使用currentRegionName作为城市名称获取POI数据
    const cityPoisData = getPOIsByCityName(currentRegionName);
    console.log('Loading POIs for:', currentRegionName, 'Found:', cityPoisData.length);
    return convertCityPOIsToMapPOIs(cityPoisData);
  }, [currentLevel, currentRegionName, shouldShowCityPOI]);

  const regionFoods = useMemo(() => {
    if (!selectedRegion) return [];
    const provinceFoods = getFoodsByProvince(currentRegionName);
    if (!provinceFoods) return [];
    const cityName = selectedRegion.properties?.name || '';
    const cityFood = getFoodsByCity(provinceFoods, cityName);
    return cityFood ? cityFood.foods : [];
  }, [selectedRegion, currentRegionName]);

  return (
    <View className="page">
      <View className="header">
        <Text className="title">GeoAtlas</Text>
        <Text className="subtitle">Spatial Structure Understanding</Text>
        <View className="breadcrumbs">
          {canGoBack && (
            <Button className="icon-button" onClick={() => {
              goBack();
              setSelectedRegion(null);
            }}>
              返回
            </Button>
          )}
          <View className="pill">
            <Text className="pill-text">{currentRegionName}</Text>
            <Text className="pill-level">({currentLevel})</Text>
          </View>
        </View>
      </View>

      <View className="content">
        <View className="map-panel">
          <MapCanvas
            dataUrl={currentDataUrl}
            level={currentLevel}
            viewMode={viewMode}
            onRegionClick={handleRegionClick}
            selectedRegionId={
              selectedRegion?.properties?.id ||
              selectedRegion?.properties?.code ||
              selectedRegion?.properties?.adcode
            }
            pois={shouldShowCityPOI ? cityPOIs : regionPOIs}
            currentRegionName={currentRegionName}
          />
        </View>

        <View className="info-panel">
          <Text className="section-title">当前选择</Text>
          {selectedRegion ? (
            <View className="info-card">
              <Text className="region-name">{selectedRegion.properties?.name || 'Unknown Region'}</Text>
              <View className="info-grid">
                <View>
                  <Text className="info-label">编号</Text>
                  <Text className="info-value">
                    {selectedRegion.properties?.id || selectedRegion.properties?.code || 'N/A'}
                  </Text>
                </View>
                <View>
                  <Text className="info-label">层级</Text>
                  <Text className="info-value">
                    {currentLevel === 'country' ? '省份' : currentLevel === 'province' ? '城市' : '区县'}
                  </Text>
                </View>
              </View>

              {regionPOIs.length > 0 && (
                <View className="poi-section">
                  <Text className="section-title">重点地点</Text>
                  <View className="poi-list">
                    {regionPOIs.map((poi, index) => (
                      <View key={`${poi.name}-${index}`} className="poi-item">
                        <Text className="poi-name">{poi.name}</Text>
                        <Text className="poi-type">{typeLabel[poi.type] || poi.type}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {regionFoods.length > 0 && (
                <View className="poi-section">
                  <Text className="section-title">标志美食</Text>
                  <View className="poi-list">
                    {regionFoods.map((food, index) => (
                      <View key={`${food}-${index}`} className="food-item">
                        <Text className="food-name">{food}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <Button
                className="primary-button"
                onClick={() => {
                  drillDown(selectedRegion);
                  setSelectedRegion(null);
                }}
              >
                深入探索
              </Button>
            </View>
          ) : shouldShowCityPOI && cityPOIs.length > 0 ? (
            <View className="info-card">
              <Text className="region-name">{currentRegionName}</Text>
              <View className="poi-section">
                <Text className="section-title">城市景点 ({cityPOIs.length}个)</Text>
                <View className="poi-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {cityPOIs.map((poi, index) => (
                    <View key={`${poi.name}-${index}`} className="poi-item">
                      <Text className="poi-name">{poi.name}</Text>
                      <Text className="poi-type">{typeLabel[poi.type] || poi.type}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <View className="empty-state">
              <Text>点击地图区域查看更多信息</Text>
            </View>
          )}

          <View className="actions">
            <Button
              className="outline-button"
              onClick={() => {
                const modes: ViewMode[] = ['name', 'poi', 'food', 'outline'];
                const currentIndex = modes.indexOf(viewMode);
                const nextMode = modes[(currentIndex + 1) % modes.length];
                setViewMode(nextMode);
              }}
            >
              视图: {viewModeLabels[viewMode]}
            </Button>
            <Button
              className="outline-button"
              onClick={() => {
                reset();
                setSelectedRegion(null);
              }}
            >
              重置到全国视图
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
