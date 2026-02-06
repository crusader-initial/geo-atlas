import { Canvas, View, Button } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as d3Geo from 'd3-geo';
import { FeatureCollection } from 'geojson';
import { loadGeoData } from '../utils/mapData';
import { POI } from '../data/pois';
import { getFoodsByProvince, getFoodsByCity } from '../data/allFoods';

export type ViewMode = 'name' | 'poi' | 'food' | 'outline';

interface MapCanvasProps {
  dataUrl: string;
  level: 'world' | 'country' | 'province' | 'city';
  viewMode?: ViewMode;
  selectedRegionId?: string;
  onRegionClick: (feature: any) => void;
  pois?: POI[];
  currentRegionName?: string;
}

const CANVAS_ID = 'geo-atlas-canvas';

export const MapCanvas = ({
  dataUrl,
  level,
  viewMode = 'name',
  selectedRegionId,
  onRegionClick,
  pois = [],
  currentRegionName = ''
}: MapCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const pathRef = useRef<d3Geo.GeoPath<any, d3Geo.GeoPermissibleObjects> | null>(null);
  const projectionRef = useRef<d3Geo.GeoProjection | null>(null);
  const dprRef = useRef<number>(1);
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  // 鼠标/单指拖拽状态
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const hasDraggedRef = useRef(false);

  // 双指捏合缩放状态
  const isPinchingRef = useRef(false);
  const pinchStartRef = useRef<{
    distance: number;
    center: { x: number; y: number };
    scale: number;
    offset: { x: number; y: number };
  } | null>(null);

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

  // 切换地图时重置缩放和偏移
  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [dataUrl]);

  const drawMap = useCallback(() => {
    if (!geoData || !contextRef.current || size.width === 0 || size.height === 0) return;

    const ctx = contextRef.current;
    ctx.clearRect(0, 0, size.width, size.height);

    // 应用缩放和平移变换
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

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
        
        // 字体跟着缩放放大，但最大不超过 10px
        // 因为 ctx 已经被 scale 了，所以这里要反向补偿
        const fontSize = Math.min(8, 10 / scale);
        ctx.font = `${fontSize}px sans-serif`;
        
        let text = '';
        if (viewMode === 'name') {
          text = feature.properties?.name || '';
        } else if (viewMode === 'food') {
          // 获取美食数据
          const provinceFoods = getFoodsByProvince(currentRegionName);
          if (provinceFoods && level === 'province') {
            const cityName = feature.properties?.name || '';
            const cityFood = getFoodsByCity(provinceFoods, cityName);
            if (cityFood && cityFood.foods.length > 0) {
              text = cityFood.foods[0]; // 显示第一个美食
            }
          }
        }

        if (text) {
          // 测量文字尺寸
          const textMetrics = ctx.measureText(text);
          const textWidth = textMetrics.width * scale; // 实际渲染的文字宽度
          const textHeight = fontSize * scale; // 实际渲染的字体大小
          
          // 计算区域边界框
          const bounds = pathGenerator.bounds(feature as any);
          if (bounds) {
            const [[x0, y0], [x1, y1]] = bounds;
            const regionWidth = x1 - x0;
            const regionHeight = y1 - y0;
            
            // 考虑缩放因子
            const effectiveWidth = regionWidth * scale;
            const effectiveHeight = regionHeight * scale;
            
            // 判断是否有足够空间显示文字（阈值0.8）
            const canFitWidth = textWidth < effectiveWidth * 0.8;
            const canFitHeight = textHeight < effectiveHeight * 0.8;
            
            // 只有在空间足够时才显示文字
            if (canFitWidth && canFitHeight) {
              ctx.fillText(text, centroid[0], centroid[1]);
            }
          }
        }
      }
    });

    if (viewMode === 'poi' && pois.length > 0 && projectionRef.current) {
      console.log('Rendering POIs:', pois.length, 'viewMode:', viewMode);
      // POI类型颜色映射
      const poiColors: Record<string, string> = {
        '景点': '#FF6B6B',      // 红色
        '火车站': '#4ECDC4',    // 青色
        '机场': '#45B7D1',      // 蓝色
        '购物': '#FFA07A',      // 橙色
        '美食': '#98D8C8',      // 绿色
        'landmark': '#FF6B6B',
        'transport': '#4ECDC4',
        'nature': '#95E1D3',
        'default': '#1b1b1b'
      };

      pois.forEach((poi, index) => {
        const point = projectionRef.current?.(poi.coordinates);
        if (!point) {
          console.log('POI projection failed:', poi.name, poi.coordinates);
          return;
        }
        
        if (index === 0) {
          console.log('First POI:', poi.name, 'coords:', poi.coordinates, 'point:', point);
        }
        
        // 根据POI类型选择颜色
        const color = poiColors[poi.type] || poiColors['default'];
        
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        ctx.arc(point[0], point[1], 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // 绘制POI名称
        if (scale > 1.5) {  // 只在放大时显示名称
          ctx.fillStyle = '#333333';
          ctx.font = `${Math.min(7, 10 / scale)}px sans-serif`;
          ctx.fillText(poi.name, point[0], point[1] + 8);
        }
      });
    }

    // 恢复上下文状态
    ctx.restore();
  }, [geoData, pois, selectedRegionId, size.height, size.width, viewMode, currentRegionName, level, scale, offset]);

  useEffect(() => {
    drawMap();
  }, [drawMap, level]);

  const handleTap = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!geoData || !contextRef.current || !pathRef.current) return;

      // 如果刚刚拖拽过，不触发点击
      if (hasDraggedRef.current) {
        hasDraggedRef.current = false;
        return;
      }

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
        
        // 应用与绘制时相同的变换状态
        ctx.save();
        ctx.translate(offset.x, offset.y);
        ctx.scale(scale, scale);
        
        ctx.beginPath();
        pathRef.current(feature as any);
        
        // 使用原始坐标进行检测
        if (ctx.isPointInPath(x, y)) {
          ctx.restore();
          
          // 计算区域中心点
          const centroid = pathRef.current.centroid(feature as any);
          if (centroid && Number.isFinite(centroid[0]) && Number.isFinite(centroid[1]) && projectionRef.current) {
            // 目标缩放级别
            const targetScale = Math.min(scale * 2, 3);
            
            // 计算使区域中心位于画布中心所需的偏移量
            // 画布中心坐标
            const canvasCenterX = size.width / 2;
            const canvasCenterY = size.height / 2;
            
            // 区域中心在当前变换下的屏幕坐标
            const regionScreenX = centroid[0] * targetScale + offset.x;
            const regionScreenY = centroid[1] * targetScale + offset.y;
            
            // 计算需要的偏移量，使区域中心移动到画布中心
            const newOffsetX = canvasCenterX - centroid[0] * targetScale;
            const newOffsetY = canvasCenterY - centroid[1] * targetScale;
            
            // 设置新的缩放和偏移
            setScale(targetScale);
            setOffset({ x: newOffsetX, y: newOffsetY });
          }
          
          onRegionClick(feature);
          break;
        }
        
        ctx.restore();
      }
    },
    [geoData, onRegionClick, scale, offset, size.width, size.height]
  );

  // 缩放控制函数
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 7));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 1));
  };

  const getTouchPos = useCallback((touch: any) => ({
    x: touch.clientX ?? touch.pageX ?? touch.x ?? 0,
    y: touch.clientY ?? touch.pageY ?? touch.y ?? 0
  }), []);

  const getPinchDistance = useCallback((t0: { x: number; y: number }, t1: { x: number; y: number }) => {
    return Math.hypot(t1.x - t0.x, t1.y - t0.y) || 1;
  }, []);

  const getPinchCenter = useCallback((t0: { x: number; y: number }, t1: { x: number; y: number }) => ({
    x: (t0.x + t1.x) / 2,
    y: (t0.y + t1.y) / 2
  }), []);

  // 触摸/鼠标拖拽与双指缩放事件处理
  const handleDragStart = useCallback((event: any) => {
    event.stopPropagation();
    const touches = event.touches || [];
    if (touches.length === 2) {
      isPinchingRef.current = true;
      isDraggingRef.current = false;
      const p0 = getTouchPos(touches[0]);
      const p1 = getTouchPos(touches[1]);
      pinchStartRef.current = {
        distance: getPinchDistance(p0, p1),
        center: getPinchCenter(p0, p1),
        scale,
        offset: { ...offset }
      };
    } else if (touches.length === 1) {
      isPinchingRef.current = false;
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      lastMousePosRef.current = getTouchPos(touches[0]);
    }
  }, [scale, offset, getTouchPos, getPinchDistance, getPinchCenter]);

  const handleDragMove = useCallback((event: any) => {
    event.stopPropagation();
    event.preventDefault();

    const touches = event.touches || [];

    // 双指捏合缩放
    if (isPinchingRef.current && touches.length === 2) {
      const start = pinchStartRef.current;
      if (!start) return;
      const p0 = getTouchPos(touches[0]);
      const p1 = getTouchPos(touches[1]);
      const curDist = getPinchDistance(p0, p1);
      const curCenter = getPinchCenter(p0, p1);
      const ratio = curDist / start.distance;
      const newScale = Math.min(7, Math.max(1, start.scale * ratio));
      // 使捏合中心对应的地图点保持不动
      const newOffsetX = curCenter.x - (start.center.x - start.offset.x) * (newScale / start.scale);
      const newOffsetY = curCenter.y - (start.center.y - start.offset.y) * (newScale / start.scale);
      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
      return;
    }

    // 单指拖拽
    if (!isDraggingRef.current || !lastMousePosRef.current || touches.length !== 1) return;

    const touch = touches[0];
    const current = getTouchPos(touch);
    const dx = current.x - lastMousePosRef.current.x;
    const dy = current.y - lastMousePosRef.current.y;

    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      hasDraggedRef.current = true;
    }

    setOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));

    lastMousePosRef.current = current;
  }, [getTouchPos, getPinchDistance, getPinchCenter]);

  const handleDragEnd = useCallback((event: any) => {
    event.stopPropagation();
    const touches = event.touches || [];
    if (touches.length < 2) {
      isPinchingRef.current = false;
      pinchStartRef.current = null;
    }
    if (touches.length === 0) {
      isDraggingRef.current = false;
      lastMousePosRef.current = null;
    }
  }, []);

  return (
    <View className="map-wrapper" catchMove>
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
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      />
      
      {/* 地图控制按钮 */}
      <View className="map-controls">
        <Button className="control-button" onClick={handleZoomIn} disabled={scale >= 7}>
          +
        </Button>
        <Button className="control-button" onClick={handleZoomOut} disabled={scale <= 1}>
          -
        </Button>
      </View>
    </View>
  );
};
