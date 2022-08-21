import React from 'react';
import { Loader } from '@mantine/core';

export const FullPageLoader = () => (
  <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Loader variant="bars" />
    </div>
  </div>
);
