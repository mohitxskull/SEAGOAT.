import React from 'react';
import { Text } from '@mantine/core';
import { GetServerSideProps, NextPage } from 'next';
import MainHeader from '../../components/header';
import { Supabase } from '../../lib/client/supabase/client';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await Supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Photo: NextPage = () => (
  <>
    <MainHeader />
    <Text>password vault</Text>
  </>
);

export default Photo;
