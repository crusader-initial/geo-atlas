import { useState, useCallback } from 'react';

export type MapLevel = 'world' | 'country' | 'province' | 'city';

interface MapState {
  level: MapLevel;
  dataUrl: string;
  parentId: string | null; // 用于返回上一级
  regionName: string;
}

export const useMapLevel = () => {
  const [history, setHistory] = useState<MapState[]>([
    { level: 'country', dataUrl: '/data/china/china.json', parentId: null, regionName: 'China' }
  ]);

  const currentState = history[history.length - 1];

  const navigateTo = useCallback((newState: MapState) => {
    setHistory(prev => [...prev, newState]);
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  const drillDown = useCallback((feature: any) => {
    const props = feature.properties;
    const id = props.id || props.code || props.adcode;
    const name = props.name;

    if (!id) return;

    // 逻辑判断：根据当前层级决定下一级
    if (currentState.level === 'world') {
      // 世界 -> 国家
      // 目前只支持中国
      if (name === 'China' || id === 'CN' || id === '156') {
        navigateTo({
          level: 'country',
          dataUrl: '/data/china/china.json',
          parentId: 'world',
          regionName: 'China'
        });
      }
    } else if (currentState.level === 'country') {
      // 国家 -> 省份
      // id 格式通常为 6 位数字，前两位是省份代码
      // 数据路径: /data/china/geometryProvince/{code}.json
      // 注意：geometryProvince 下的文件名是前两位代码，如 33.json
      const provinceCode = id.substring(0, 2);
      navigateTo({
        level: 'province',
        dataUrl: `/data/china/geometryProvince/${provinceCode}.json`,
        parentId: 'country',
        regionName: name
      });
    } else if (currentState.level === 'province') {
      // 省份 -> 城市
      // id 格式为 6 位数字，如 330100 (杭州)
      // 数据路径: /data/china/geometryCouties/{code}.json
      // 注意：有些直辖市或特殊区域可能没有下一级，需要错误处理
      navigateTo({
        level: 'city',
        dataUrl: `/data/china/geometryCouties/${id}.json`,
        parentId: 'province',
        regionName: name
      });
    }
  }, [currentState, navigateTo]);

  return {
    currentLevel: currentState.level,
    currentDataUrl: currentState.dataUrl,
    currentRegionName: currentState.regionName,
    canGoBack: history.length > 1,
    drillDown,
    goBack,
    reset: () => setHistory([{ level: 'country', dataUrl: '/data/china/china.json', parentId: null, regionName: 'China' }])
  };
};
