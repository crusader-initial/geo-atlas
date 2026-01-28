// src/utils/geoRegistry.ts

import china from '../data/china/china.json';
import p11 from '../data/china/geometryProvince/11.json';
import p31 from '../data/china/geometryProvince/31.json';


export const GEO_DATA_MAP: Record<string, any> = {
  '/data/china/china.json': china,
  '/data/china/geometryProvince/11.json': p11,
  '/data/china/geometryProvince/31.json': p31,
};
