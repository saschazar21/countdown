import { useEffect } from 'preact/hooks';
import { registerSW } from 'virtual:pwa-register';

import { Index } from 'pages/Index';

export const App = (): JSX.Element => {
  useEffect(() => {
    registerSW({
      onOfflineReady: () => console.log('App is now offline-ready.'),
    })(true);
  }, []);

  return <Index />;
};
