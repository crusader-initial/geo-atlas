import { Canvas, View } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as d3Geo from 'd3-geo';
import { FeatureCollection } from 'geojson';
import { loadGeoData } from '../utils/mapData';
import { POI } from '../data/pois';

export type ViewMode = 'name' | 'poi' | 'food' | 'outline';

interface MapCanvasProps {
  dataUrl: string;
  level: 'world' | 'country' | 'province' | 'city';
  viewMode?: ViewMode;
  selectedRegionId?: string;
  onRegionClick: (feature: any) => void;
  pois?: POI[];
}

const CANVAS_ID = 'geo-atlas-canvas';

export const MapCanvas = ({
  dataUrl,
  level,
  viewMode = 'name',
  selectedRegionId,
  onRegionClick,
  pois = []
}: MapCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const pathRef = useRef<d3Geo.GeoPath<any, d3Geo.GeoPermissibleObjects> | null>(null);
  const projectionRef = useRef<d3Geo.GeoProjection | null>(null);
  const dprRef = useRef<number>(1);
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useReady(() => {
    const query = Taro.createSelectorQuery();
    query
      .select(`#${CANVAS_ID}`)
      .fields({ node: true, size: true })
      .exec(res => {
        const { node, width, height } = res?.[0] || {};
        if (!node || !width || !height) return;

        const dpr = Taro.getSystemInfoSync().pixelRatio || 1;
        dprRef.current = dpr;
        node.width = width * dpr;
        node.height = height * dpr;

        const ctx = node.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
        }

        canvasRef.current = node;
        contextRef.current = ctx;
        setSize({ width, height });
      });
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    loadGeoData(dataUrl)
      .then(data => {
        if (!mounted) return;
        setGeoData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load map data:', error);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [dataUrl]);

  const drawMap = useCallback(() => {
    if (!geoData || !contextRef.current || size.width === 0 || size.height === 0) return;

    const ctx = contextRef.current;
    ctx.clearRect(0, 0, size.width, size.height);

    const projection = d3Geo.geoMercator().fitSize([size.width, size.height], geoData);
    const pathGenerator = d3Geo.geoPath(projection, ctx);
    projectionRef.current = projection;
    pathRef.current = pathGenerator;

    geoData.features.forEach(feature => {
      const id = feature.properties?.id || feature.properties?.code || feature.properties?.adcode || feature.id;
      const isSelected = id === selectedRegionId;

      ctx.beginPath();
      pathGenerator(feature as any);
      ctx.fillStyle = isSelected ? '#111111' : '#ffffff';
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 0.6;
      ctx.fill();
      ctx.stroke();

      const centroid = pathGenerator.centroid(feature as any);
      if (centroid && Number.isFinite(centroid[0]) && Number.isFinite(centroid[1])) {
        ctx.fillStyle = isSelected ? '#ffffff' : '#333333';
        ctx.font = '10px sans-serif';
        
        let text = '';
        if (viewMode === 'name') {
          text = feature.properties?.name || '';
        } else if (viewMode === 'food') {
          // TODO: Fetch food data from properties or external source
          text = feature.properties?.food || '';
        }

        if (text) {
          ctx.fillText(text, centroid[0], centroid[1]);
        }
      }
    });

    if (viewMode === 'poi' && pois.length > 0 && projectionRef.current) {
      pois.forEach(poi => {
        const point = projectionRef.current?.(poi.coordinates);
        if (!point) return;
        ctx.beginPath();
        ctx.fillStyle = '#1b1b1b';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.arc(point[0], point[1], 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    }
  }, [geoData, pois, selectedRegionId, size.height, size.width, viewMode]);

  useEffect(() => {
    drawMap();
  }, [drawMap, level]);

  const handleTap = useCallback(
    (event: any) => {
      if (!geoData || !contextRef.current || !pathRef.current) return;

      let x, y;
      // Handle Mini Program Canvas 2D touch coordinates
      const touch = event.changedTouches?.[0];
      const dpr = dprRef.current;
      
      if (touch && typeof touch.x === 'number' && typeof touch.y === 'number') {
        // 小程序 Canvas 2D 环境下，touch.x/y 通常是 CSS 逻辑像素
        // 而 Canvas 上下文已经 scale(dpr, dpr)，路径也是基于物理像素绘制的（在内部）
        // 但 isPointInPath 需要传入物理像素坐标才能正确匹配被 scale 的路径
        x = touch.x * dpr;
        y = touch.y * dpr;
      } else {
        // Fallback for Web or other environments
        // Web 环境下 event.detail.x/y 也是逻辑像素，可能同样需要乘以 dpr，
        // 具体取决于 Taro 在 Web 端的实现。通常 Web Canvas 如果也做了 scale，
        // 原生 isPointInPath 并不受当前矩阵影响，所以需要传入原始坐标？
        // 这里暂时保持逻辑一致，如果 Web 端有问题再单独调整。
        x = (event.detail?.x || 0) * dpr;
        y = (event.detail?.y || 0) * dpr;
      }

      if (typeof x !== 'number' || typeof y !== 'number') return;

      for (const feature of geoData.features) {
        const ctx = contextRef.current;
        ctx.beginPath();
        pathRef.current(feature as any);
        if (ctx.isPointInPath(x, y)) {
          onRegionClick(feature);
          break;
        }
      }
    },
    [geoData, onRegionClick]
  );

  return (
    <View className="map-wrapper">
      {loading && (
        <View className="map-loading">
          <View className="spinner" />
        </View>
      )}
      <Canvas
        type="2d"
        id={CANVAS_ID}
        canvasId={CANVAS_ID}
        className="map-canvas"
        onTap={handleTap}
      />
    </View>
  );
};
