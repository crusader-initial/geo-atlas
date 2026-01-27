# GeoAtlas Taro App

本目录是 GeoAtlas 的 Taro 多端版本，目标覆盖 App 与小程序端，与 Web 版保持一致的地图浏览与下钻体验。

## 功能概览
- Canvas + d3-geo 渲染地图轮廓
- 点击区域选中，再次点击可下钻
- 展示区域 POI 点位
- 支持返回上一级 / 重置到全国视图

## 启动方式
```bash
pnpm install
pnpm dev:weapp
```

## 数据资源
- 构建时会把 `client/public/data` 复制到 Taro 输出目录 `dist/data`。
- 页面使用 `/data/...` 作为地图数据地址，请确保构建时可以读取该目录。
