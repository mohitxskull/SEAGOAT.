import { useListState } from '@mantine/hooks';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { PasswordObjTypes, PasswordVaultStateType } from '../types';
import Noti from '../../components/notification';
import { Supabase } from '../client/supabase/client';
import CallWorker from '../helpers/callWorker';
import {
  DecryptPassListIn,
  DecryptPassListOut,
} from '../workers/helpers/decryptList';
import Key from '../helpers/functions/keyFuns';
import FunResCons from '../helpers/funResCons';
import SupabaseLogout from '../helpers/logout';
import LogError from '../helpers/logError';
import AES256 from '../helpers/functions/aes256Fun';

interface PasswordContextInterface {
  PasswordListDec: PasswordObjTypes[];
  PasswordListDecHandlers: any;
  PasswordToSearch: string | null;
  setPasswordToSearch: Dispatch<SetStateAction<string | null>>;
  PasswordVaultState: PasswordVaultStateType;
  setPasswordVaultState: Dispatch<SetStateAction<PasswordVaultStateType>>;
  PasswordVaultLoadingText: string;
  setPasswordVaultLoadingText: Dispatch<SetStateAction<string>>;
  PublicLoading: boolean;
  setPublicLoading: Dispatch<SetStateAction<boolean>>;
  GetPasswordList: any;
  DeletePassword: any;
  AddPassword: any;
}

export const PasswordContext = createContext<PasswordContextInterface>({
  PasswordListDec: [],
  PasswordListDecHandlers: (): any => {},
  PasswordToSearch: '',
  setPasswordToSearch: () => {},
  PasswordVaultState: 'list',
  setPasswordVaultState: () => {},
  PasswordVaultLoadingText: '',
  setPasswordVaultLoadingText: () => {},
  PublicLoading: true,
  setPublicLoading: () => {},
  GetPasswordList: () => {},
  DeletePassword: () => {},
  AddPassword: () => {},
});

export const PasswordProvider = ({ children }: any) => {
  const [PasswordListDec, PasswordListDecHandlers] =
    useListState<PasswordObjTypes>([]);

  const [PasswordVaultLoadingText, setPasswordVaultLoadingText] = useState('');
  const [PasswordToSearch, setPasswordToSearch] = useState<string | null>(null);
  const [PasswordVaultState, setPasswordVaultState] =
    useState<PasswordVaultStateType>('list');

  const [PublicLoading, setPublicLoading] = useState(true);
  const Router = useRouter();

  const GetPasswordList = async () => {
    try {
      setPublicLoading(true);
      const { data, error } = await Supabase.from('passwords').select();
      if (error) throw FunResCons(400, error);

      console.log(data);

      if (data.length < 1) {
        setTimeout(() => setPublicLoading(false), 1000);
        return;
      }

      const CoreKey = Key.Core.Get();

      if (!CoreKey) {
        throw FunResCons(400, 'Session expired, Unlock vault again!', 1);
      }

      if (!Key.Core.ValidFormat(CoreKey)) {
        throw FunResCons(400, 'Invalid CoreKey format!', 2);
      }

      CallWorker<DecryptPassListIn, DecryptPassListOut>(
        'DecPassList',
        { ENCPASSLIST: data, COREKEY: CoreKey },
        async (RESPONSE) => {
          console.log('RES => ', RESPONSE);
          if ((await RESPONSE).Status === 200) {
            PasswordListDecHandlers.setState((await RESPONSE).Res);
          } else {
            throw FunResCons(400, 'Worker error!', 3, RESPONSE);
          }

          setPublicLoading(false);
        }
      );
    } catch (e: any) {
      if ('Status' in e) {
        switch (e.Status) {
          case 400:
            switch (e.SpecialStatus) {
              case 1:
                Noti(e.Res, 'Info');
                Router.push('/vault');
                break;

              case 2:
                Key.Core.Clear();
                Router.push('/vault');
                Noti(e.Res, 'Error');
                break;

              case 3:
                Noti(e.Res, 'Critical');
                SupabaseLogout();
                LogError(e, 'qJ9zf8uc6KEkko5ww8dzw');
                break;

              default:
                Noti(e.error_description || e.message || e, 'Error');
                Key.Core.Clear();
                Router.push('/vault');
                LogError(e, 'zTwvXPPJudvr3vdGdylNn');
                break;
            }
            break;

          default:
            Noti(null, 'Critical');
            SupabaseLogout();
            LogError(e, '5CyDVaXEgrhjUWPaPcpVg');
            break;
        }
      } else {
        Noti(null, 'Critical');
        SupabaseLogout();
        LogError(e, 'jMfiqmdaFU4lfOCQkJW-m');
      }
    }
  };

  const DeletePassword = async (UID: string) => {
    setPublicLoading(true);
    try {
      const SearchRes = PasswordListDec.filter(
        (PASSWORDOBJ) => PASSWORDOBJ.uid === UID
      );

      if (SearchRes.length === 1) {
        const { error } = await Supabase.from('passwords')
          .delete()
          .match({ uid: UID });

        if (error) throw FunResCons(400, error);

        PasswordListDec.forEach((PASSWORDOBJ, INDEX) => {
          if (PASSWORDOBJ.uid === UID) {
            PasswordListDecHandlers.remove(INDEX);
          }
        });

        Noti('Password deleted!', 'Info');
      } else {
        throw FunResCons(300, 'Cannot find password obj to delete!');
      }
    } catch (e: any) {
      if ('Status' in e) {
        switch (e.Status) {
          case 300:
            Noti(e.Res, 'Error');
            Key.Core.Clear();
            Router.push('/vault');
            break;

          case 400:
            Noti(e.Res, 'Error');
            break;

          default:
            Noti(null, 'Critical');
            SupabaseLogout();
            LogError(e, '9zcEzii5RFlk6jBUHtkkZ');
            break;
        }
      } else {
        Noti(null, 'Critical');
        SupabaseLogout();
        LogError(e, '9kd_9g8dDfqU_0Kc3AQA2-m');
      }
    } finally {
      setPublicLoading(false);
    }
  };

  const AddPassword = async (
    NAME: string,
    USERNAME: string,
    PASSWORD: string
  ) => {
    try {
      const CoreKey = Key.Core.Get();

      if (!CoreKey) {
        throw FunResCons(400, 'Session expired, Unlock vault again!');
      }

      if (!Key.Core.ValidFormat(CoreKey)) {
        throw FunResCons(400, 'Invalid CoreKey format!', 1);
      }

      const EncNAME = AES256.Enc(CoreKey, NAME);
      const EncUSERNAME = AES256.Enc(CoreKey, USERNAME);
      const EncPASSWORD = AES256.Enc(CoreKey, PASSWORD);

      const { data, error } = await Supabase.from('passwords').insert([
        {
          name: EncNAME.Res,
          username: EncUSERNAME.Res,
          password: EncPASSWORD.Res,
          user_id: Supabase.auth.user()?.id,
        },
      ]);

      if (error) throw FunResCons(500, error);

      PasswordListDecHandlers.append({
        uid: data[0].uid,
        name: NAME,
        username: USERNAME,
        password: PASSWORD,
        inserted_at: data[0].inserted_at,
        updated_at: data[0].updated_at,
      });

      setPasswordVaultState('list');
      Noti('Password added!', 'Done');
    } catch (e: any) {
      if ('Status' in e) {
        if (e.Status === 400) {
          Key.Core.Clear();
          Noti(e.Res, 'Info');
          Router.push('/vault');
        } else if (e.Status === 500) {
          Noti(e.Res.error_description || e.Res.message, 'Error');
          LogError(e.Res, 'rzix80HFrIz0Qm09VZJu8');
        } else {
          Noti(
            'There is an error while inserting your password!, Check console.',
            'Error'
          );

          LogError(e, 'PrmKc1QI3ivnpuEZei8y_');
        }
      } else {
        Noti(null, 'Critical');
        SupabaseLogout();
        LogError(e, '8moNmKiUtfEhv5v_ziXcz');
      }
    }
  };

  return (
    <PasswordContext.Provider
      value={{
        PasswordListDecHandlers,
        PasswordListDec,
        setPasswordToSearch,
        PasswordToSearch,
        PasswordVaultState,
        setPasswordVaultState,
        PasswordVaultLoadingText,
        setPasswordVaultLoadingText,
        PublicLoading,
        setPublicLoading,
        GetPasswordList,
        DeletePassword,
        AddPassword,
      }}
    >
      {children}
    </PasswordContext.Provider>
  );
};
