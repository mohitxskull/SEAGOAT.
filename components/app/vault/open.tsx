import { Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { pbkdf2 } from 'crypto';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AES256 from '../../../lib/helpers/functions/aes256Fun';
import Bcrypt from '../../../lib/helpers/functions/bcryptFuns';
import Key from '../../../lib/helpers/functions/keyFuns';
import FunResCons from '../../../lib/helpers/funResCons';
import VaultObj from '../../../lib/helpers/getVaultObj';
import LogError from '../../../lib/helpers/logError';
import SupabaseLogout from '../../../lib/helpers/logout';
import UserSalt from '../../../lib/helpers/userSalt';
import Noti from '../../notification';

const VaultOpen = () => {
  const [PrivateLoading, setPrivateLoading] = useState(false);
  const Router = useRouter();

  const OpenVaultForm = useForm({
    initialValues: {
      EncryptionKey: '',
    },

    validate: {
      EncryptionKey: (value) =>
        value.length < 8
          ? 'Encryption Key should be at least 8 characters'
          : null,
    },
  });

  const HandleVaultUnlock = (ENCRYPTIONKEY: string) => {
    setPrivateLoading(true);

    const SALT = UserSalt();
    /**
     * Hashed Extended Encryption Key
     */
    const HEEK = VaultObj()?.HEEK || null;

    /**
     * Encrypted Core Key
     */
    const EncCK = VaultObj()?.EncCK || null;

    if (!HEEK || !EncCK) {
      SupabaseLogout();
      Noti('Check console!', 'Critical');
      LogError("Can't find HEEK or EncCK", 'OnkObnn_Yr3G5Drc8r6T_');
      return;
    }

    if (SALT) {
      pbkdf2(
        ENCRYPTIONKEY,
        SALT,
        100000,
        64,
        'sha512',
        async (err, ExtendedEK) => {
          try {
            if (err) throw FunResCons(500, err);
            const ExtendedEKHex = ExtendedEK.toString('hex');
            const HashCheckRes = Bcrypt.Check(ExtendedEKHex, HEEK);

            if (HashCheckRes) {
              const DecCoreKey = AES256.Dec(ExtendedEKHex, EncCK);

              switch (DecCoreKey.Status) {
                case 200:
                  Key.Core.Set(DecCoreKey.Res);
                  Router.push('/vault');
                  break;

                case 300:
                  Noti(null, 'Critical');
                  LogError(
                    "This response shouldn't come here",
                    'SsRQBDB5-H_8JRV5mi9sF'
                  );
                  SupabaseLogout();
                  break;

                default:
                  Noti(null, 'Critical');
                  LogError(
                    "This response shouldn't come here",
                    'y8xVhHS4HHUSO3hL74dTo'
                  );
                  SupabaseLogout();
                  break;
              }
            } else {
              OpenVaultForm.setFieldError(
                'EncryptionKey',
                'Invalid Encryption Key!'
              );
              setPrivateLoading(false);
            }
          } catch (e) {
            Noti('There is an Error, refresh your page!', 'Error');
            LogError(e, 'I-nvZqPk09Qca6JuNXY_9');
          }
        }
      );
    }
  };

  return (
    <>
      <div style={{ width: '350px', margin: 'auto' }}>
        <form
          onSubmit={OpenVaultForm.onSubmit((values) => {
            HandleVaultUnlock(values.EncryptionKey.trim());
          })}
        >
          <PasswordInput
            disabled={PrivateLoading}
            variant="default"
            label="Encryption key"
            placeholder="Your encryption key"
            {...OpenVaultForm.getInputProps('EncryptionKey')}
            required
            mt="md"
          />

          <Button
            type="submit"
            loading={PrivateLoading}
            variant="outline"
            color="gray"
            fullWidth
            mt="xl"
          >
            Unlock
          </Button>
        </form>
      </div>
    </>
  );
};
export default VaultOpen;
