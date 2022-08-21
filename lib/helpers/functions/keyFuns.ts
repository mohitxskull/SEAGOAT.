import LZString from 'lz-string';
import {
  v1 as uuidv1,
  v4 as uuidv4,
  v5 as uuidv5,
  validate as validuuid,
} from 'uuid';
import { Supabase } from '../../client/supabase/client';
import { AppId } from '../../consts';

const Key = {
  Core: {
    Gen: () =>
      LZString.compressToBase64(
        `${uuidv1()}--${uuidv5(
          uuidv1(),
          uuidv1()
        )}--${uuidv4()}--${uuidv4()}--${uuidv4()}--${AppId}`
      ),

    ValidFormat: (COREKEY: string) => {
      try {
        const SplittedCoreKey = (
          LZString.decompressFromBase64(COREKEY) || ''
        ).split('--');

        if (SplittedCoreKey.length !== 6) throw 'check1';

        if (SplittedCoreKey[5] !== AppId) throw 'check2';

        SplittedCoreKey.pop();

        SplittedCoreKey.forEach((uuid) => {
          if (!validuuid(uuid)) throw 'check3';
        });

        return true;
      } catch (e) {
        return false;
      }
    },

    Get: () => sessionStorage.getItem('CoreKey'),

    Set: (COREKEY: string) => sessionStorage.setItem('CoreKey', COREKEY),

    Clear: () => sessionStorage.clear(),
  },

  Private: {
    Get: (): string | null =>
      Supabase.auth.user()?.user_metadata.vault.PriKey || null,
  },

  Public: {
    Get: (): string | null =>
      Supabase.auth.user()?.user_metadata.vault.PubKey || null,
  },
};

export default Key;
