import { Canvas, View } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as d3Geo from 'd3-geo';
import { FeatureCollection } from 'geojson';
import { loadGeoData } from '../utils/mapData';
import { POI } from '../data/pois';

interface MapCanvasProps {
  dataUrl: string;
  level: 'world' | 'country' | 'province' | 'city';
  selectedRegionId?: string;
  onRegionClick: (feature: any) => void;
  pois?: POI[];
}

const CANVAS_ID = 'geo-atlas-canvas';

export const MapCanvas = ({
  dataUrl,
  level,
  selectedRegionId,
  onRegionClick,
  pois = []
}: MapCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const pathRef = useRef<d3Geo.GeoPath<any, d3Geo.GeoPermissibleObjects> | null>(null);
  const projectionRef = useRef<d3Geo.GeoProjection | null>(null);
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
        console.log('canvas size from selector:', width, height);
        if (!node || !width || !height) return;

        const dpr = Taro.getSystemInfoSync().pixelRatio || 1;
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
        ctx.font = '20px sans-serif';
        ctx.fillText(feature.properties?.name || '', centroid[0], centroid[1]);
      }
    });

    if (pois.length > 0 && projectionRef.current) {
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
  }, [geoData, pois, selectedRegionId, size.height, size.width]);

  useEffect(() => {
    drawMap();
  }, [drawMap, level]);

  const handleTap = useCallback(
    (event: any) => {
      if (!geoData || !contextRef.current || !pathRef.current) return;

      const { x, y } = event.detail || {};
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
