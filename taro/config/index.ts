import { defineConfig } from '@tarojs/cli';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export default defineConfig(async () => {
  return {
    projectName: 'geo-atlas-taro',
    date: '2024-01-01',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-framework-react'],
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false
      }
    },
    alias: {
      '@tarojs/shared': require.resolve('@tarojs/shared')
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {}
        },
        url: {
          enable: true,
          config: {
            limit: 10240
          }
        },
        cssModules: {
          enable: false
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false
        }
      }
    },
    copy: {
      patterns: [
        {
          from: '../client/public/data',
          to: 'dist/data'
        }
      ],
      options: {}
    }
  };
});
