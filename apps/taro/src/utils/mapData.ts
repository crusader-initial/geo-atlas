import Taro from '@tarojs/taro';
import * as topojson from 'topojson-client';
import { GEO_DATA_MAP } from './geoRegistry';
import { FeatureCollection } from 'geojson';

export const normalizeDataUrl = (dataUrl: string) => {
  if (dataUrl.startsWith('http')) return dataUrl;
  return dataUrl.startsWith('/') ? dataUrl : `/${dataUrl}`;
};

export const loadGeoData = async (dataUrl: string): Promise<FeatureCollection> => {
 if (process.env.TARO_ENV === 'weapp') {
    const data = GEO_DATA_MAP[dataUrl];
    if (!data) {
      throw new Error(`Geo data not found for ${dataUrl}`);
    }

    if (data.type === 'Topology') {
      const key = Object.keys(data.objects)[0];
      return topojson.feature(data, data.objects[key]);
    }

    return data;
  }

  const url = normalizeDataUrl(dataUrl);
  const response = await Taro.request({ url });
  const raw = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

  if (raw?.type === 'Topology') {
    const key = Object.keys(raw.objects)[0];
    return topojson.feature(raw, raw.objects[key]) as unknown as FeatureCollection;
  }

  return raw as FeatureCollection;
};
