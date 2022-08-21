import {
  ActionIcon,
  Card,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { openConfirmModal } from '@mantine/modals';
import React, { useContext } from 'react';
import {
  Binary,
  Copy,
  DotsVertical,
  Edit,
  Key,
  Trash,
  User,
} from 'tabler-icons-react';
import { PasswordContext } from '../../../../../lib/context/password';

const ListPasswordCom = () => {
  const {
    PasswordListDec,
    PasswordToSearch,
    DeletePassword,
    setPasswordVaultState,
    setUidToEdit,
  } = useContext(PasswordContext);
  const Clipboard = useClipboard({ timeout: 600 });
  // const Smallscreen = useMediaQuery('(max-width: 450px)', true);

  const DeletePasswordModal = (UID: string, NAME: string, USERNAME: string) => {
    openConfirmModal({
      title: 'Delete password?',
      centered: true,
      radius: 'md',
      children: (
        <>
          <Text size="sm">
            Are you sure you want to delete your password? This action is
            destructive and you&apos;ll not be able to restore your it.
          </Text>
          <Card my="xl" p="sm" radius="md" withBorder>
            <Text
              style={{
                textOverflow: 'ellipsis',
                width: '200px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              size="lg"
              weight="bold"
            >
              {NAME}
            </Text>

            <Text
              style={{
                textOverflow: 'ellipsis',
                width: '200px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
              size="sm"
              color="dimmed"
            >
              {USERNAME}
            </Text>
          </Card>
        </>
      ),
      labels: { confirm: 'Delete password', cancel: "No don't delete it" },
      confirmProps: { color: 'red', variant: 'outline' },
      cancelProps: { variant: 'light' },
      onCancel: () => {},
      onConfirm: () => DeletePassword(UID),
    });
  };

  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 768, cols: 1 }]}>
      {React.Children.toArray(
        Array.from(PasswordListDec)
          .reverse()
          .map((PASSWORDOBJ) => (
            <Paper
              style={{
                backgroundColor: '#25262b',
                display: PasswordToSearch
                  ? PasswordToSearch === PASSWORDOBJ.name
                    ? 'block'
                    : 'none'
                  : 'block',
              }}
              p="md"
              radius="md"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Text
                    style={{
                      textOverflow: 'ellipsis',
                      width: '150px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                    size="lg"
                    weight="bold"
                  >
                    {PASSWORDOBJ.name}
                  </Text>

                  <Text
                    style={{
                      textOverflow: 'ellipsis',
                      width: '150px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                    size="sm"
                    color="dimmed"
                  >
                    {PASSWORDOBJ.username}
                  </Text>
                </div>

                <div style={{ display: 'flex' }}>
                  <Group spacing="sm">
                    <Menu
                      position="bottom-end"
                      withArrow
                      trigger="click"
                      width={150}
                      shadow="lg"
                    >
                      <Menu.Target>
                        <ActionIcon variant="transparent">
                          <Copy size={20} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Copy creds</Menu.Label>
                        <Menu.Item
                          onClick={() => Clipboard.copy(PASSWORDOBJ.password)}
                          icon={<Key size={18} />}
                        >
                          Password
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => Clipboard.copy(PASSWORDOBJ.username)}
                          icon={<User size={18} />}
                        >
                          Username
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                    <Menu
                      position="bottom-end"
                      withArrow
                      trigger="click"
                      width={150}
                      shadow="lg"
                    >
                      <Menu.Target>
                        <ActionIcon variant="transparent">
                          <DotsVertical size={20} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Options</Menu.Label>
                        <Menu.Item
                          onClick={() => {
                            setUidToEdit(PASSWORDOBJ.uid);
                            setPasswordVaultState('edit');
                          }}
                          icon={<Edit size={18} />}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item icon={<Binary size={18} />}>
                          Encrypted
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          onClick={() =>
                            DeletePasswordModal(
                              PASSWORDOBJ.uid,
                              PASSWORDOBJ.name,
                              PASSWORDOBJ.username
                            )
                          }
                          color="red"
                          icon={<Trash size={18} />}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </div>
              </div>
            </Paper>
          ))
      )}
    </SimpleGrid>
  );
};

export default ListPasswordCom;
