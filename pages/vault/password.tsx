import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Supabase } from '../../lib/client/supabase/client';
import PasswordVault from '../../components/app/vault/password/Main';
import { PasswordProvider } from '../../lib/context/password';

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

const Password: NextPage = () => (
  <PasswordProvider>
    <PasswordVault />
  </PasswordProvider>
);

export default Password;
