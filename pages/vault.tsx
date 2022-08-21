import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Loader } from '@mantine/core';
import MainHeader from '../components/header';
import { Supabase } from '../lib/client/supabase/client';

import VaultSetup from '../components/app/vault/setup';
import Key from '../lib/helpers/functions/keyFuns';
import VaultObj from '../lib/helpers/getVaultObj';
import VaultOpen from '../components/app/vault/open';
import { VaultStateType } from '../lib/types';

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

const Vault: NextPage = () => {
  const [VaultState, setVaultState] = useState<VaultStateType>('Loading');
  const Router = useRouter();

  useEffect(() => {
    const CoreKeyy = Key.Core.Get() || '';
    if (VaultObj()) {
      if (Key.Core.ValidFormat(CoreKeyy)) {
        setTimeout(() => Router.replace('/vault/password'), 1000);
      } else {
        setVaultState('Open');
      }
    } else {
      setVaultState('Setup');
    }
  }, [Router]);

  return (
    <div className="box">
      <div className="row header">
        <MainHeader />
      </div>

      <div className="row content">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
            }}
          >
            <Container>
              {VaultState === 'Loading' && (
                <div style={{ textAlign: 'center' }}>
                  <Loader variant="bars" />
                </div>
              )}
              {VaultState === 'Open' && <VaultOpen />}
              {VaultState === 'Setup' && <VaultSetup />}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
