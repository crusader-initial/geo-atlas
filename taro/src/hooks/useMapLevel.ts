import { useCallback, useState } from 'react';

export type MapLevel = 'world' | 'country' | 'province' | 'city';

interface MapState {
  level: MapLevel;
  dataUrl: string;
  parentId: string | null;
  regionName: string;
}

export const useMapLevel = () => {
  const [history, setHistory] = useState<MapState[]>([
    {
      level: 'country',
      dataUrl: '/data/china/china.json',
      parentId: null,
      regionName: 'China'
    }
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

  const drillDown = useCallback(
    (feature: any) => {
      const props = feature.properties || {};
      const id = props.id || props.code || props.adcode;
      const name = props.name || 'Unknown';

      if (!id) return;

      if (currentState.level === 'world') {
        if (name === 'China' || id === 'CN' || id === '156') {
          navigateTo({
            level: 'country',
            dataUrl: '/data/china/china.json',
            parentId: 'world',
            regionName: 'China'
          });
        }
      } else if (currentState.level === 'country') {
        const provinceCode = id.substring(0, 2);
        navigateTo({
          level: 'province',
          dataUrl: `/data/china/geometryProvince/${provinceCode}.json`,
          parentId: 'country',
          regionName: name
        });
      } else if (currentState.level === 'province') {
        const cityCode = id.length === 4 ? `${id}00` : id;
        navigateTo({
          level: 'city',
          dataUrl: `/data/china/geometryCouties/${cityCode}.json`,
          parentId: 'province',
          regionName: name
        });
      }
    },
    [currentState.level, navigateTo]
  );

  return {
    currentLevel: currentState.level,
    currentDataUrl: currentState.dataUrl,
    currentRegionName: currentState.regionName,
    canGoBack: history.length > 1,
    drillDown,
    goBack,
    reset: () =>
      setHistory([
        {
          level: 'country',
          dataUrl: '/data/china/china.json',
          parentId: null,
          regionName: 'China'
        }
      ])
  };
};
