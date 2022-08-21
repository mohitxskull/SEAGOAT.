import React from 'react';
import { Text } from '@mantine/core';
import { NextLink } from '@mantine/next';

export interface LogoProps {}

const Logo: React.FC<LogoProps> = () => (
  <>
    <Text
      sx={{
        fontSize: '45px',
        letterSpacing: 7,
        cursor: 'pointer',
        fontFamily: 'Bebas Neue, cursive',
      }}
      py="auto"
      component={NextLink}
      href="/"
      weight={900}
    >
      SEAGOAT
    </Text>
  </>
);

export default Logo;
