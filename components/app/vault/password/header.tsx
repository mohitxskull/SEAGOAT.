import React, { useContext, useEffect, useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  ActionIcon,
  Tooltip,
  Select,
  Text,
} from '@mantine/core';
import { LayoutList, Lock, NewSection, Refresh } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { PasswordContext } from '../../../../lib/context/password';
import Key from '../../../../lib/helpers/functions/keyFuns';
import Uniq from '../../../../lib/helpers/uniq';

const useStyles = createStyles(() => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

const PasswordHeader = () => {
  const { classes } = useStyles();
  const Router = useRouter();
  const {
    PasswordListDec,
    PasswordToSearch,
    setPasswordToSearch,
    PasswordVaultState,
    setPasswordVaultState,
    GetPasswordList,
  } = useContext(PasswordContext);

  const [AllowRefresh, setAllowRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => setAllowRefresh(true), 10000);
  }, []);

  return (
    <Header
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[9],
        borderRadius: '10px',
        border: 0,
      })}
      height={60}
    >
      <Container fluid className={classes.inner}>
        {PasswordVaultState === 'list' ? (
          <>
            <Select
              placeholder="Name"
              radius="md"
              value={PasswordToSearch}
              onChange={setPasswordToSearch}
              searchable
              disabled={PasswordListDec.length <= 0}
              clearable
              nothingFound="No passwords"
              styles={{
                input: {
                  '@media (max-width: 424px)': {
                    maxWidth: '200px',
                  },
                },
              }}
              data={Array.from(
                Uniq(Array.from(PasswordListDec, (password) => password.name)),
                (name) => ({
                  value: name.toString(),
                  label: name.toString(),
                })
              )}
            />
            {/* <ActionIcon onClick={() => console.log(PasswordListDec)}>
              <Wifi />
            </ActionIcon> */}
          </>
        ) : (
          <Text
            sx={{
              fontSize: '25px',
              cursor: 'pointer',
              fontFamily: 'Bebas Neue, cursive',
              letterSpacing: 0.5,
            }}
            py="auto"
            weight={900}
          >
            Add Password
          </Text>
        )}

        <Group>
          <Tooltip label="Lock vault!" position="top-end" withArrow>
            <ActionIcon
              variant="transparent"
              color="yellow"
              onClick={() => {
                Key.Core.Clear();
                Router.push('/vault');
              }}
            >
              <Lock />
            </ActionIcon>
          </Tooltip>
          {PasswordVaultState === 'list' && (
            <Tooltip label="Refresh" position="top-end" withArrow>
              <ActionIcon
                disabled={!AllowRefresh}
                variant="transparent"
                onClick={GetPasswordList}
              >
                <Refresh />
              </ActionIcon>
            </Tooltip>
          )}

          {PasswordVaultState === 'list' ? (
            <Tooltip label="Add password" position="top-end" withArrow>
              <ActionIcon
                variant="transparent"
                onClick={() => setPasswordVaultState('add')}
              >
                <NewSection />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip label="Password list" position="top-end" withArrow>
              <ActionIcon
                variant="transparent"
                onClick={() => setPasswordVaultState('list')}
              >
                <LayoutList />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Container>
    </Header>
  );
};

export default PasswordHeader;
