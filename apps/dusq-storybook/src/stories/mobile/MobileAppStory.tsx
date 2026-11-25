import React from 'react';
import { MobileAppPage } from '@dusq-preview/components/mobile-app/MobileAppPage';

export function MobileAppStory() {
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <MobileAppPage onNavigate={(path) => console.log('Navigate to', path)} />
    </div>
  );
}
