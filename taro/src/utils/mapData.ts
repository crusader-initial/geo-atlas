import Taro from '@tarojs/taro';
import * as topojson from 'topojson-client';
import { FeatureCollection } from 'geojson';

/** 微信云存储根路径，与 apps/taro 共用同一云环境时可复用；也可改为自己的 cloud://envId.xxx */
const CLOUD_STORAGE_BASE =
  'cloud://cloud1-5gmeipzm0b2cc6dc.636c-cloud1-5gmeipzm0b2cc6dc-1402841647';

export const normalizeDataUrl = (dataUrl: string) => {
  if (dataUrl.startsWith('http')) return dataUrl;
  return dataUrl.startsWith('/') ? dataUrl : `/${dataUrl}`;
};

/**
 * 从云存储（小程序）或相对路径（H5）加载 JSON
 * @param cloudPath 云存储相对路径，如 data/poi/china_cities_poi_merged.json
 */
function getTempFileURLOrThrow(fileID: string, label: string): Promise<string> {
  return Taro.cloud.getTempFileURL({ fileList: [fileID] }).then(({ fileList }) => {
    const item = fileList?.[0];
    if (item?.tempFileURL) return item.tempFileURL;
    const msg = item?.errMsg || 'unknown';
    const hint =
      msg === 'STORAGE_EXCEED_AUTHORITY'
        ? ' [请在微信开发者工具中打开 云开发 → 云存储 → 权限设置，允许「所有用户可读」或为对应目录配置读权限]'
        : '';
    throw new Error(`Cloud file not found: ${label}\nfileID: ${fileID}\nerrMsg: ${msg}${hint}`);
  });
}

export const loadJsonFromCloud = async <T = any>(cloudPath: string): Promise<T> => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    const path = cloudPath.replace(/^\//, '');
    const fileID = `${CLOUD_STORAGE_BASE}/${path}`;
    const tempFileURL = await getTempFileURLOrThrow(fileID, cloudPath);
    const response = await Taro.request({ url: tempFileURL });
    const raw = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    return raw as T;
  }
  const url = cloudPath.startsWith('/') ? cloudPath : `/${cloudPath}`;
  const response = await Taro.request({ url });
  const raw = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  return raw as T;
};

const parseRawToFeatureCollection = (raw: any): FeatureCollection => {
  if (raw?.type === 'Topology') {
    const key = Object.keys(raw.objects)[0];
    return topojson.feature(raw, raw.objects[key]) as unknown as FeatureCollection;
  }
  return raw as FeatureCollection;
};

export const loadGeoData = async (dataUrl: string): Promise<FeatureCollection> => {
  const url = normalizeDataUrl(dataUrl);

  if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
    if (dataUrl.startsWith('http')) {
      const response = await Taro.request({ url: dataUrl });
      const raw = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      return parseRawToFeatureCollection(raw);
    }

    const path = dataUrl.replace(/^\//, '');
    const fileID = `${CLOUD_STORAGE_BASE}/${path}`;
    const tempFileURL = await getTempFileURLOrThrow(fileID, dataUrl);
    const response = await Taro.request({ url: tempFileURL });
    const raw = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
    return parseRawToFeatureCollection(raw);
  }

  const response = await Taro.request({ url });
  const raw = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  return parseRawToFeatureCollection(raw);
};
