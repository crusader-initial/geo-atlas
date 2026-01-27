import { useMemo, useState } from "react";
import { getPOIsByRegion, type POI } from "@/data/pois";
import { useMapLevel } from "@/hooks/useMapLevel";

type MapFeature = {
  properties?: {
    id?: string;
    code?: string;
    adcode?: string;
    name?: string;
    childNum?: number;
  };
};

const getFeatureId = (feature?: MapFeature | null) =>
  feature?.properties?.id || feature?.properties?.code || feature?.properties?.adcode;

export const useMapSelection = () => {
  const {
    currentLevel,
    currentDataUrl,
    currentRegionName,
    canGoBack,
    drillDown,
    goBack,
    reset,
  } = useMapLevel();

  const [selectedRegion, setSelectedRegion] = useState<MapFeature | null>(null);

  const handleRegionClick = (feature: MapFeature) => {
    const id = getFeatureId(feature);
    const selectedId = getFeatureId(selectedRegion);

    if (selectedId === id) {
      drillDown(feature);
      setSelectedRegion(null);
    } else {
      setSelectedRegion(feature);
    }
  };

  const regionPOIs: POI[] = useMemo(() => {
    if (!selectedRegion) return [];
    const id = getFeatureId(selectedRegion);
    return id ? getPOIsByRegion(id) : [];
  }, [selectedRegion]);

  const selectedRegionId = getFeatureId(selectedRegion);

  const clearSelection = () => setSelectedRegion(null);

  const goBackAndClear = () => {
    goBack();
    setSelectedRegion(null);
  };

  const resetAndClear = () => {
    reset();
    setSelectedRegion(null);
  };

  const drillDownSelected = () => {
    if (!selectedRegion) return;
    drillDown(selectedRegion);
    setSelectedRegion(null);
  };

  return {
    currentLevel,
    currentDataUrl,
    currentRegionName,
    canGoBack,
    handleRegionClick,
    selectedRegion,
    selectedRegionId,
    regionPOIs,
    clearSelection,
    goBackAndClear,
    resetAndClear,
    drillDownSelected,
    setSelectedRegion,
  };
};
