import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3-selection';
import 'd3-transition';
import * as d3Geo from 'd3-geo';
import * as topojson from 'topojson-client';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { POI } from '@/data/pois';

interface MapContainerProps {
  dataUrl: string;
  level: 'world' | 'country' | 'province' | 'city';
  onRegionClick: (feature: any) => void;
  selectedRegionId?: string;
  pois?: POI[];
}

export const MapContainer: React.FC<MapContainerProps> = ({ 
  dataUrl, 
  level, 
  onRegionClick,
  selectedRegionId,
  pois = []
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);

  // 加载数据
  useEffect(() => {
    setLoading(true);
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => {
        // 处理 TopoJSON 或 GeoJSON
        if (data.type === 'Topology') {
          // 假设 TopoJSON 中只有一个对象或取第一个
          const key = Object.keys(data.objects)[0];
          const featureCollection = topojson.feature(data, data.objects[key]) as unknown as FeatureCollection;
          setGeoData(featureCollection);
        } else {
          setGeoData(data as FeatureCollection);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load map data:', err);
        setLoading(false);
      });
  }, [dataUrl]);

  // 渲染地图
  useEffect(() => {
    if (!geoData || !svgRef.current || !wrapperRef.current) return;

    const width = wrapperRef.current.clientWidth;
    const height = wrapperRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // 清除旧内容

    // 创建投影
    // 根据层级选择不同的投影方式
    let projection: d3Geo.GeoProjection;
    if (level === 'world') {
      projection = d3Geo.geoMercator().fitSize([width, height], geoData);
    } else {
      // 中国及省市使用 Mercator 并自动适配
      projection = d3Geo.geoMercator().fitSize([width, height], geoData);
    }

    const pathGenerator = d3Geo.geoPath().projection(projection);

    // 添加阴影滤镜
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', '130%');
    
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 3)
      .attr('result', 'blur');
    
    filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('result', 'offsetBlur');
      
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'offsetBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const g = svg.append('g');

    // 绘制区域
    g.selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', pathGenerator as any)
      .attr('fill', (d: any) => {
        const id = d.properties?.id || d.properties?.code || d.properties?.adcode || d.id;
        return id === selectedRegionId ? 'var(--color-swiss-accent)' : '#ffffff';
      })
      .attr('stroke', '#333333')
      .attr('stroke-width', 0.5)
      .attr('cursor', 'pointer')
      .attr('filter', (d: any) => {
        const id = d.properties?.id || d.properties?.code || d.properties?.adcode || d.id;
        return id === selectedRegionId ? 'url(#drop-shadow)' : null;
      })
      .style('transition', 'fill 0.2s ease') // CSS transition for smoother color change
      .on('mouseover', function() {
        d3.select(this)
          .transition().duration(200)
          .attr('fill', (d: any) => {
            const id = d.properties?.id || d.properties?.code || d.properties?.adcode || d.id;
            return id === selectedRegionId ? 'var(--color-swiss-accent)' : '#f0f0f0';
          });
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition().duration(200)
          .attr('fill', (d: any) => {
            const id = d.properties?.id || d.properties?.code || d.properties?.adcode || d.id;
            return id === selectedRegionId ? 'var(--color-swiss-accent)' : '#ffffff';
          });
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        onRegionClick(d);
      });

    // 绘制区域名称标签
    g.selectAll('text.region-label')
      .data(geoData.features)
      .enter()
      .append('text')
      .attr('class', 'region-label')
      .attr('transform', (d: any) => {
        const centroid = pathGenerator.centroid(d);
        if (!centroid[0] || !centroid[1]) return null;
        return `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .text((d: any) => d.properties?.name || '')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#333')
      .attr('font-family', 'Inter, sans-serif')
      .attr('pointer-events', 'none')
      .style('text-shadow', '0px 0px 2px rgba(255,255,255,0.8)');

    // 绘制 POI
    if (pois.length > 0) {
      g.selectAll('circle')
        .data(pois)
        .enter()
        .append('circle')
        .attr('cx', d => projection(d.coordinates)?.[0] || 0)
        .attr('cy', d => projection(d.coordinates)?.[1] || 0)
        .attr('r', 4)
        .attr('fill', 'var(--color-swiss-fg)')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .attr('cursor', 'help')
        .append('title') // 简单的 tooltip
        .text(d => d.name);
        
      // 添加 POI 标签（可选，避免重叠可能需要更复杂的逻辑）
      // g.selectAll('text')
      //   .data(pois)
      //   .enter()
      //   .append('text')
      //   .attr('x', d => (projection(d.coordinates)?.[0] || 0) + 6)
      //   .attr('y', d => (projection(d.coordinates)?.[1] || 0) + 4)
      //   .text(d => d.name)
      //   .attr('font-size', '10px')
      //   .attr('fill', '#333')
      //   .attr('font-family', 'Inter, sans-serif');
    }

  }, [geoData, level, selectedRegionId, onRegionClick, pois]);

  return (
    <div ref={wrapperRef} className="w-full h-full bg-[var(--color-swiss-bg)] relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      <svg ref={svgRef} className="w-full h-full block" />
    </div>
  );
};
