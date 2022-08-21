import React from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  ActionIcon,
  Menu,
  Text,
} from '@mantine/core';
import {
  Apps,
  Key,
  Logout,
  Photo,
  Settings,
  Tools,
  UserCircle,
} from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { NextLink } from '@mantine/next';
import Logo from './logo';
import SupabaseLogout from '../lib/helpers/logout';
import { Supabase } from '../lib/client/supabase/client';

const useStyles = createStyles(() => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

const MainHeader = () => {
  const { classes } = useStyles();
  const Router = useRouter();
  // const Smallscreen = useMediaQuery('(max-width: 450px)', true);

  return (
    <Header
      sx={(theme) => ({ backgroundColor: theme.colors.dark[9] })}
      height={80}
      withBorder
    >
      <Container className={classes.inner}>
        <Logo />
        <Group>
          {/* {Online ? (
            <Tooltip color="green" label="Online">
              <ActionIcon color="green" variant="transparent">
                <Wifi />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip color="red" label="Offline">
              <ActionIcon color="red" variant="transparent">
                <WifiOff />
              </ActionIcon>
            </Tooltip>
          )} */}

          {Router.pathname !== '/vault' && (
            <>
              <Menu
                position="bottom-end"
                withArrow
                trigger="click"
                shadow="md"
                width={200}
              >
                <Menu.Target>
                  <ActionIcon variant="transparent">
                    <Apps size={20} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Storage</Menu.Label>
                  <Menu.Item
                    component={NextLink}
                    href="/vault/password"
                    icon={<Key size={18} />}
                  >
                    Passwords
                  </Menu.Item>
                  <Menu.Item
                    // component={NextLink}
                    // href="/vault/photo"
                    disabled
                    icon={<Photo size={18} />}
                  >
                    Photos
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}

          <Menu
            position="bottom-end"
            withArrow
            trigger="click"
            shadow="lg"
            width={200}
          >
            <Menu.Target>
              <ActionIcon variant="transparent">
                <UserCircle size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label sx={{ color: '#fff' }} pb={0} px="sm">
                <Text>Logged in as</Text>
                <Text size="md" weight="bold">
                  {Supabase.auth.user()?.email?.split('@')[0]}
                </Text>
              </Menu.Label>
              <Menu.Divider />
              <Menu.Item icon={<Settings size={18} />}>Settings</Menu.Item>
              <Menu.Item icon={<Tools size={18} />}>Tools</Menu.Item>

              <Menu.Divider />

              <Menu.Item
                onClick={SupabaseLogout}
                color="red"
                icon={<Logout size={18} />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </Header>
  );
};

export default MainHeader;
