import React, { useState, useMemo } from 'react';
import { MapContainer } from '@/components/MapContainer';
import { useMapLevel } from '@/hooks/useMapLevel';
import { getPOIsByRegion } from '@/data/pois';
import { ArrowLeft, Map as MapIcon, Globe, Train, Landmark, Mountain } from 'lucide-react';

export default function Home() {
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

  const handleRegionClick = (feature: any) => {
    // 如果点击的是当前选中的区域，则下钻
    const id = feature.properties?.id || feature.properties?.code || feature.properties?.adcode;
    const selectedId = selectedRegion?.properties?.id || selectedRegion?.properties?.code || selectedRegion?.properties?.adcode;
    
    if (selectedId === id) {
      drillDown(feature);
      setSelectedRegion(null); // 下钻后清除选中状态
    } else {
      setSelectedRegion(feature);
    }
  };

  // 获取当前选中区域的 POI
  const regionPOIs = useMemo(() => {
    if (!selectedRegion) return [];
    const id = selectedRegion.properties?.id || selectedRegion.properties?.code || selectedRegion.properties?.adcode;
    return id ? getPOIsByRegion(id) : [];
  }, [selectedRegion]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-swiss-bg)]">
      {/* 左侧地图区域 */}
      <div className="flex-1 relative">
        <div className="absolute top-6 left-6 z-10">
          <h1 className="text-3xl font-bold text-[var(--color-swiss-fg)] tracking-tight flex items-center gap-2">
            <MapIcon className="w-6 h-6" />
            GeoAtlas
          </h1>
          <p className="text-sm text-muted-foreground mt-1 ml-8">Spatial Structure Understanding</p>
          
          {/* 面包屑导航 */}
          <div className="flex items-center gap-2 mt-6 ml-1">
            {canGoBack && (
              <button 
                onClick={() => {
                  goBack();
                  setSelectedRegion(null);
                }}
                className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors border border-[var(--color-swiss-border)]"
                aria-label="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-[var(--color-swiss-border)] rounded-sm text-sm font-medium">
              {currentRegionName} <span className="text-muted-foreground text-xs ml-1 uppercase">({currentLevel})</span>
            </div>
          </div>
        </div>
        
        <MapContainer 
          dataUrl={currentDataUrl}
          level={currentLevel}
          onRegionClick={handleRegionClick}
          selectedRegionId={selectedRegion?.properties?.id || selectedRegion?.properties?.code || selectedRegion?.properties?.adcode}
          pois={regionPOIs}
        />
      </div>

      {/* 右侧信息面板 */}
      <div className="w-96 border-l border-[var(--color-swiss-border)] bg-white p-8 shadow-sm z-20 flex flex-col overflow-y-auto">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Current Selection</h2>
            {selectedRegion ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-4xl font-bold text-[var(--color-swiss-fg)] leading-tight">
                    {selectedRegion.properties.name || 'Unknown Region'}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground block uppercase tracking-wider">Code</span>
                      <span className="font-mono text-lg text-[var(--color-swiss-fg)]">
                        {selectedRegion.properties.id || selectedRegion.properties.code || 'N/A'}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground block uppercase tracking-wider">Level</span>
                      <span className="text-lg capitalize text-[var(--color-swiss-fg)]">
                        {currentLevel === 'country' ? 'Province' : currentLevel === 'province' ? 'City' : 'District'}
                      </span>
                    </div>
                    {selectedRegion.properties.childNum && (
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block uppercase tracking-wider">Subdivisions</span>
                        <span className="text-lg text-[var(--color-swiss-fg)]">
                          {selectedRegion.properties.childNum}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* POI 列表 */}
                {regionPOIs.length > 0 && (
                  <div className="pt-4 border-t border-[var(--color-swiss-border)]">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Key Locations</h4>
                    <ul className="space-y-3">
                      {regionPOIs.map((poi, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <span className="mt-0.5 text-muted-foreground">
                            {poi.type === 'transport' && <Train className="w-4 h-4" />}
                            {poi.type === 'landmark' && <Landmark className="w-4 h-4" />}
                            {poi.type === 'nature' && <Mountain className="w-4 h-4" />}
                          </span>
                          <span className="text-[var(--color-swiss-fg)]">{poi.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      drillDown(selectedRegion);
                      setSelectedRegion(null);
                    }}
                    className="w-full py-3 bg-[var(--color-swiss-fg)] text-white text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    Explore Region
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center border border-dashed border-[var(--color-swiss-border)] rounded-sm bg-gray-50">
                <p className="text-sm text-muted-foreground italic">Select a region on the map</p>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-[var(--color-swiss-border)]">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button 
                onClick={() => {
                  reset();
                  setSelectedRegion(null);
                }}
                className="w-full px-4 py-3 text-left text-sm border border-[var(--color-swiss-border)] hover:bg-gray-50 transition-colors flex items-center gap-3 group"
              >
                <Globe className="w-4 h-4 text-muted-foreground group-hover:text-[var(--color-swiss-fg)]" />
                <span>Reset to National View</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground pt-6 border-t border-[var(--color-swiss-border)]">
          <p>Data Source: GeoJSON.cn</p>
          <p className="mt-1">Design: Swiss Style / Minimalist</p>
        </div>
      </div>
    </div>
  );
}
