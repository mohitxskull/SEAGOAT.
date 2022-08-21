import React, { useContext, useEffect } from 'react';
import { Center, Container, Loader, SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { PasswordContext } from '../../../../lib/context/password';
import Key from '../../../../lib/helpers/functions/keyFuns';
import MainHeader from '../../../header';
import PasswordHeader from './header';
import ListPasswordCom from './components/list';
import AddPasswordCom from './components/add';
import EditPasswordCom from './components/edit';

const PasswordVault = () => {
  const {
    PasswordVaultState,
    PasswordVaultLoadingText,
    PublicLoading,
    GetPasswordList,
    PasswordListDec,
  } = useContext(PasswordContext);

  const Router = useRouter();

  useEffect(() => {
    const CoreKeyy = Key.Core.Get() || '';

    if (Key.Core.ValidFormat(CoreKeyy)) {
      GetPasswordList();
    } else {
      setTimeout(() => Router.replace('/vault'), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Router]);

  return (
    <>
      <div className="box">
        <div className="row header">
          <MainHeader />
        </div>

        <div className="row content">
          {PublicLoading ? (
            <>
              <div
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -45%)',
                    width: '100%',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    {PasswordVaultLoadingText.length > 0 ? (
                      <Text className="loadingEllipsis">
                        {PasswordVaultLoadingText}
                      </Text>
                    ) : (
                      <Loader variant="bars" />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Container fluid mt="md" mb="xl">
                <PasswordHeader />

                <Container fluid mt="md">
                  {PasswordVaultState === 'edit' && <EditPasswordCom />}
                  {PasswordVaultState === 'add' && <AddPasswordCom />}
                  {PasswordVaultState === 'list' &&
                    (PasswordListDec.length > 0 ? (
                      <ListPasswordCom />
                    ) : (
                      <Center mt={150}>
                        <SimpleGrid cols={1}>
                          <Text color="dimmed" size="xl" weight="bolder">
                            Empty!
                          </Text>
                        </SimpleGrid>
                      </Center>
                    ))}
                </Container>
              </Container>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordVault;
