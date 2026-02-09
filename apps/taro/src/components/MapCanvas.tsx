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

  // Animation and interaction state
  const currentTransform = useRef({ k: 1, x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const isDragging = useRef(false);
  const lastTouch = useRef({ x: 0, y: 0 });
  const touchStartPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const lastGeoData = useRef<FeatureCollection | null>(null);

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

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

  const renderFrame = useCallback((transform: { k: number, x: number, y: number }) => {
    if (!geoData || !contextRef.current || size.width === 0 || size.height === 0) return;

    const ctx = contextRef.current;
    ctx.clearRect(0, 0, size.width, size.height);

    const projection = d3Geo.geoMercator()
      .scale(transform.k)
      .translate([transform.x, transform.y]);
    
    projectionRef.current = projection;
    const pathGenerator = d3Geo.geoPath(projection, ctx);
    pathRef.current = pathGenerator;

    geoData.features.forEach(feature => {
      const id = feature.properties?.id || feature.properties?.code || feature.properties?.adcode || feature.id;
      const isSelected = id === selectedRegionId;

      ctx.beginPath();
      pathGenerator(feature as any);
      // Theme colors - Soft Light
      ctx.fillStyle = isSelected ? '#BAE6FD' : '#FFFFFF'; // Sky 200 (Selected) : White (Default)
      ctx.strokeStyle = '#CBD5E1'; // Slate 300 (Soft Grey Stroke)
      ctx.lineWidth = 0.8;
      ctx.fill();
      ctx.stroke();

      const centroid = pathGenerator.centroid(feature as any);
      if (centroid && Number.isFinite(centroid[0]) && Number.isFinite(centroid[1])) {
        ctx.fillStyle = isSelected ? '#0369A1' : '#64748B'; // Sky 700 : Slate 500
        ctx.font = isSelected ? 'bold 12px sans-serif' : '10px sans-serif';
        let text = '';
        if (viewMode === 'name') {
          text = feature.properties?.name || '';
        } else if (viewMode === 'food') {
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
        ctx.fillStyle = '#F43F5E'; // Rose 500
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.arc(point[0], point[1], 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    }
  }, [geoData, pois, selectedRegionId, size.height, size.width, viewMode]);

  useEffect(() => {
    if (!geoData || size.width === 0 || size.height === 0) return;

    let targetFeature: any = geoData;
    let usePadding = false;

    if (selectedRegionId) {
      const feature = geoData.features.find(f => {
        const id = f.properties?.id || f.properties?.code || f.properties?.adcode || f.id;
        return id === selectedRegionId;
      });
      if (feature) {
        targetFeature = feature;
        usePadding = true;
      }
    }

    const tempProjection = d3Geo.geoMercator();
    if (usePadding) {
      const padding = Math.min(size.width, size.height) * 0.1;
      tempProjection.fitExtent(
        [
          [padding, padding],
          [size.width - padding, size.height - padding]
        ],
        targetFeature
      );

      // Limit max zoom level for small regions (like Beijing, Hong Kong)
      // Calculate global scale for reference
      const globalProjection = d3Geo.geoMercator();
      globalProjection.fitSize([size.width, size.height], geoData);
      const globalScale = globalProjection.scale();
      const maxScale = globalScale * 8; // Limit to 8x zoom
      
      if (tempProjection.scale() > maxScale) {
        const currentScale = maxScale;
        tempProjection.scale(currentScale);

        // Re-center the projection
        // We calculate the center of the target feature in the unit projection (scale=1, translate=[0,0])
        // and then calculate the required translation to center it in the view
        const unitProjection = d3Geo.geoMercator().scale(1).translate([0, 0]);
        const path = d3Geo.geoPath().projection(unitProjection);
        const bounds = path.bounds(targetFeature);
        
        if (bounds) {
          const centerX = (bounds[0][0] + bounds[1][0]) / 2;
          const centerY = (bounds[0][1] + bounds[1][1]) / 2;
          
          const tx = size.width / 2 - currentScale * centerX;
          const ty = size.height / 2 - currentScale * centerY;
          
          tempProjection.translate([tx, ty]);
        }
      }
    } else {
      tempProjection.fitSize([size.width, size.height], targetFeature);
    }

    const targetTransform = {
      k: tempProjection.scale(),
      x: tempProjection.translate()[0],
      y: tempProjection.translate()[1]
    };

    if (animationFrameId.current) {
      // @ts-ignore
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const startTransform = { ...currentTransform.current };
    const isDataChanged = geoData !== lastGeoData.current;
    lastGeoData.current = geoData;

    // Jump directly if data changed or first render
    if (isDataChanged || (startTransform.k === 1 && startTransform.x === 0 && startTransform.y === 0)) {
      currentTransform.current = targetTransform;
      renderFrame(targetTransform);
      return;
    }

    const startTime = Date.now();
    const duration = 500; // ms

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const t = easeInOutCubic(progress);

      const next = {
        k: startTransform.k + (targetTransform.k - startTransform.k) * t,
        x: startTransform.x + (targetTransform.x - startTransform.x) * t,
        y: startTransform.y + (targetTransform.y - startTransform.y) * t
      };

      currentTransform.current = next;
      renderFrame(next);

      if (progress < 1) {
        // @ts-ignore
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        animationFrameId.current = null;
      }
    };

    // @ts-ignore
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        // @ts-ignore
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [geoData, selectedRegionId, size, renderFrame]);

  const handleTouchStart = useCallback((event: any) => {
    isDragging.current = true;
    hasMoved.current = false;
    const touch = event.touches[0];
    if (touch) {
      lastTouch.current = { x: touch.x, y: touch.y };
      touchStartPos.current = { x: touch.x, y: touch.y };
    }
    if (animationFrameId.current) {
      // @ts-ignore
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }, []);

  const handleTouchMove = useCallback((event: any) => {
    if (!isDragging.current) return;
    const touch = event.touches[0];
    if (!touch) return;

    const dx = touch.x - lastTouch.current.x;
    const dy = touch.y - lastTouch.current.y;
    
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      hasMoved.current = true;
    }

    currentTransform.current.x += dx;
    currentTransform.current.y += dy;
    lastTouch.current = { x: touch.x, y: touch.y };

    renderFrame(currentTransform.current);
  }, [renderFrame]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTap = useCallback(
    (event: any) => {
      if (hasMoved.current) return;
      if (!geoData || !contextRef.current || !pathRef.current) return;

      let x, y;
      const touch = event.changedTouches?.[0];
      const dpr = dprRef.current;
      
      if (touch && typeof touch.x === 'number' && typeof touch.y === 'number') {
        x = touch.x * dpr;
        y = touch.y * dpr;
      } else {
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </View>
  );
};
