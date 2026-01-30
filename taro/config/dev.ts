import { defineConfig } from '@tarojs/cli';

const DEFAULT_DATA_BASE_URL = 'http://100.84.194.49:8080';

export default defineConfig({
  defineConstants: {
    'process.env.TARO_APP_DATA_BASE_URL': JSON.stringify(
      process.env.TARO_APP_DATA_BASE_URL || DEFAULT_DATA_BASE_URL
    )
  }
});
