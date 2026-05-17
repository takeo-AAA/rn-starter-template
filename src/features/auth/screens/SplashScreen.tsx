import React, { useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui';
import { useAuthStore } from '../store/auth.store';

export const SplashScreen = (): React.JSX.Element => {
  const hydrate = useAuthStore(s => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <LoadingSpinner fullScreen />;
};
