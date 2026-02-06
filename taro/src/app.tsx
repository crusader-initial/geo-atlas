import { PropsWithChildren } from 'react';
import Taro, { useLaunch } from '@tarojs/taro';

import './app.scss';

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    if (process.env.TARO_ENV === 'weapp' && Taro.cloud) {
      Taro.cloud.init({ traceUser: true });
    }
  });

  return children;
}

export default App;
