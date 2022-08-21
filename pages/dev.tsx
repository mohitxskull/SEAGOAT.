import React from 'react';
import { Button } from '@mantine/core';
import { NextPage } from 'next';
import Key from '../lib/helpers/functions/keyFuns';

const Dev: NextPage = () => {
  const Test = async () => {
    const NewCoreKey = Key.Core.Gen();
    console.log(NewCoreKey);
    console.log(Key.Core.ValidFormat(NewCoreKey));
  };

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Button onClick={Test}>Run</Button>
        </div>
      </div>
    </>
  );
};

export default Dev;
