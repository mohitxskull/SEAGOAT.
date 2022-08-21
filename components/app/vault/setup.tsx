import { Button, PasswordInput, SimpleGrid, Text } from '@mantine/core';
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { pbkdf2 } from 'crypto';
import { useRouter } from 'next/router';
import Key from '../../../lib/helpers/functions/keyFuns';
import UserSalt from '../../../lib/helpers/userSalt';
import Noti from '../../notification';
import SupabaseLogout from '../../../lib/helpers/logout';
import Bcrypt from '../../../lib/helpers/functions/bcryptFuns';
import { Supabase } from '../../../lib/client/supabase/client';
import VaultObj from '../../../lib/helpers/getVaultObj';
import Password from '../../../lib/helpers/functions/passwordFuns';
import AES256 from '../../../lib/helpers/functions/aes256Fun';
import LogError from '../../../lib/helpers/logError';

const VaultSetup = () => {
  const [PrivateLoading, setPrivateLoading] = useState(false);
  const Router = useRouter();

  const HandleVaultSetup = (ENCRYPTIONKEY: string) => {
    setPrivateLoading(true);
    const NewCoreKey = Key.Core.Gen();
    const NewSALT = UserSalt();

    if (!VaultObj() && NewSALT) {
      pbkdf2(
        ENCRYPTIONKEY,
        NewSALT,
        100000,
        64,
        'sha512',
        async (err, ExtendedEK) => {
          try {
            if (err) throw err;

            const ExtendedEKHex = ExtendedEK.toString('hex');

            // Encrypting Core Key with Extended Encryption Key to store in database
            const EncCoreKey = AES256.Enc(ExtendedEKHex, NewCoreKey);

            if (EncCoreKey.Status !== 200) throw EncCoreKey.Res;

            const HashedExtendedEK = Bcrypt.Hash(ExtendedEKHex);

            // Generating Key Pair
            // const { privateKey, publicKey } = await generateKey({
            //   type: 'rsa',
            //   rsaBits: 4096,
            //   userIDs: [{ email: Supabase.auth.session()?.user?.email }],
            //   passphrase: NewCoreKey,
            // });

            // const { privateKey, publicKey } = await generateKey({
            //   type: 'ecc',
            //   curve: 'curve25519',
            //   userIDs: [{ email: Supabase.auth.session()?.user?.email }],
            //   passphrase: NewCoreKey,
            //   format: 'armored',
            // });

            // Updating in database
            const { error } = await Supabase.auth.update({
              data: {
                vault: {
                  EncCK: EncCoreKey.Res,
                  HEEK: HashedExtendedEK,
                },
              },
            });

            if (error) throw error;

            Noti('Vault setup completed.', 'Done');
            Router.push('/vault');
          } catch (e) {
            Noti('There is an Error, refresh your page!', 'Error');
            LogError(e, '-Asvdw45l-zl4rbkj5FE8');
            setPrivateLoading(false);
          }
        }
      );
    } else {
      Noti(null, 'Critical');
      SupabaseLogout();
    }
  };

  const VaultSetupForm = useForm({
    initialValues: {
      EncryptionKey: '',
      ConfirmEncryptionKey: '',
    },

    validate: {
      EncryptionKey: (value) =>
        value.length < 8
          ? 'Encryption Key should be at least 8 characters'
          : null,
      ConfirmEncryptionKey: (value, values) =>
        value !== values.EncryptionKey ? 'Encryption Key did not match' : null,
    },
  });

  return (
    <>
      <SimpleGrid
        cols={2}
        spacing={0}
        breakpoints={[{ maxWidth: 768, cols: 1 }]}
      >
        <div style={{ width: '350px', margin: 'auto' }}>
          <Text size="sm" weight={700} align="left" mt={5}>
            what&apos;s an encryption key?
          </Text>

          <Text color="dimmed" size="sm" align="left" mt={5}>
            In addition to the login password, SEAGOAT also requires you to pick
            a data encryption key to encrypt & decrypt your data on your device,
            so that it&apos;s accessible only by you. The key never leaves your
            device, and it&apos;s never sent to any servers.
          </Text>
          <Text
            style={{ textDecoration: 'underline' }}
            color="dimmed"
            size="sm"
            align="left"
            mt={5}
          >
            If you ever lose this key, your data will be forever unrecoverable!
          </Text>
        </div>

        <div style={{ width: '350px', margin: 'auto' }}>
          <form
            onSubmit={VaultSetupForm.onSubmit((values) => {
              HandleVaultSetup(values.EncryptionKey.trim());
            })}
          >
            <PasswordInput
              disabled={PrivateLoading}
              variant="default"
              label="Encryption key"
              placeholder="Your encryption key"
              {...VaultSetupForm.getInputProps('EncryptionKey')}
              styles={() => ({
                input: { userSelect: 'auto' },
                description: {
                  color:
                    VaultSetupForm.values.EncryptionKey.length > 0
                      ? Password.Strength(VaultSetupForm.values.EncryptionKey)
                          .color
                      : 'gray',
                },
              })}
              description={
                VaultSetupForm.values.EncryptionKey.length > 0
                  ? Password.Strength(VaultSetupForm.values.EncryptionKey).des
                  : ''
              }
              required
              mt="md"
            />
            <PasswordInput
              required
              variant="default"
              disabled={PrivateLoading}
              mt="sm"
              label="Confirm Encryption key"
              placeholder="Confirm your encryption key"
              {...VaultSetupForm.getInputProps('ConfirmEncryptionKey')}
            />
            <Button
              type="submit"
              loading={PrivateLoading}
              variant="outline"
              color="gray"
              fullWidth
              mt="xl"
            >
              Submit
            </Button>
          </form>
        </div>
      </SimpleGrid>
    </>
  );
};

export default VaultSetup;
