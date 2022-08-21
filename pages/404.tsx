import React from 'react';
import { NextPage } from 'next';
import { Button, Image } from '@mantine/core';
import { NextLink } from '@mantine/next';

const FourZeroFour: NextPage = () => {
  const LostGifs = [
    'https://media.giphy.com/media/Ss5nyLJYk0hY5HgnH9/giphy.gif',
    'https://media.giphy.com/media/kF0ngyP7S1DfmzKqiN/giphy-downsized.gif',
    'https://media.giphy.com/media/YyKPbc5OOTSQE/giphy.gif',
    'https://media.giphy.com/media/Ss5nyLJYk0hY5HgnH9/giphy.gif',
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Image
          width={350}
          height={300}
          radius="md"
          src={LostGifs[Math.floor(Math.random() * LostGifs.length)]}
        />
        <Button
          component={NextLink}
          href="/"
          radius="md"
          variant="outline"
          fullWidth
          mt="md"
        >
          /
        </Button>
      </div>
    </div>
  );
};

export default FourZeroFour;
