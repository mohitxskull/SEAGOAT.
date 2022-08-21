import {
  createMessage,
  encrypt,
  decrypt,
  readMessage,
  readKey,
  decryptKey,
  readPrivateKey,
  Key,
  PrivateKey as PriKey,
} from 'openpgp';
import { FunResTypes } from '../../types';
import FunResCons from '../funResCons';
import LogError from '../logError';

/**
 * ------- Asymmetric Encryption & Decryption ---------
 *
 * Use Two Key
 *
 *
 * First core key is checked!
 *
 * 300 - 1 - Invalid Core Key
 *
 *
 * --- enc ---
 *
 * 200 - sucess
 *
 * 500 - critical error
 *
 *
 * --- dec ---
 *
 * 200 - sucess
 *
 * 400 - 2 - Signature could not be verified
 *
 * 500 - critical error
 */
export const Asymmetric = async (
  PUBKEY: string,
  PRIKEY: string,
  COREKEY: string,
  INPUT: string,
  ACTION: 'enc' | 'dec'
): Promise<FunResTypes<string | Error, null>> => {
  let PublicKey: Key;
  let PrivateKey: PriKey;

  try {
    PublicKey = await readKey({ armoredKey: PUBKEY });
    PrivateKey = await decryptKey({
      privateKey: await readPrivateKey({ armoredKey: PRIKEY }),
      passphrase: COREKEY,
    });
  } catch (e) {
    LogError(e, 'BY07-UuoVvxGyzKDRGUEs');
    return FunResCons(300, Error('Invalid CoreKey!'), 1);
  }

  switch (ACTION) {
    case 'enc':
      try {
        const EncRes = await encrypt({
          message: await createMessage({ text: INPUT }),
          encryptionKeys: PublicKey,
          signingKeys: PrivateKey,
        });

        return FunResCons(200, EncRes.toString());
      } catch (e) {
        LogError(e, 'sRYuNHpo2WPslGvhePudv');
        return FunResCons(500, Error('Error while encrypting!'));
      }

    case 'dec':
      try {
        const { data: decrypted, signatures } = await decrypt({
          message: await readMessage({
            armoredMessage: INPUT,
          }),
          verificationKeys: PublicKey,
          decryptionKeys: PrivateKey,
        });

        try {
          await signatures[0].verified;
          return FunResCons(200, decrypted.toString());
        } catch (e: any) {
          LogError(
            `Signature could not be verified: ${e.message}`,
            'vCU0eGzj4NA2s1gwkm7yI'
          );
          return FunResCons(
            400,
            Error(`Signature could not be verified: ${e.message}`),
            2
          );
        }
      } catch (e) {
        LogError(e, 'nfN7ZQpK4_DAAoSpGtdvC');
        return FunResCons(500, Error('Error while decrypting!'));
      }

    default:
      LogError('Invalid Action!', 'c-XVNZx7DWU14x88IN6wI');
      return FunResCons(300, Error('Invalid Action!'));
  }
};

// ---------------------------------------------------

/**
 * ------- Symmetric Encryption & Decryption ---------
 *
 * Use One Key
 *
 *
 * --- enc ---
 *
 * 200 - sucess
 *
 * 500 - critical error
 *
 *
 * --- dec ---
 *
 * 200 - sucess
 *
 * 300 - 1 - invalid key
 *
 * 500 - critical error
 */
export const Symmetric = async (
  KEY: string,
  INPUT: string,
  ACTION: 'enc' | 'dec'
): Promise<FunResTypes<string | Error, null>> => {
  switch (ACTION) {
    case 'enc':
      try {
        const EncRes = await encrypt({
          passwords: KEY,
          message: await createMessage({
            text: INPUT,
          }),
        });
        return FunResCons(200, EncRes.toString());
      } catch (e) {
        LogError(e, 'FJ0w2nLPVjpMU9oaJMuBK');
        return FunResCons(500, Error('Error while encrypting!'));
      }

    case 'dec':
      try {
        const DecRes = await decrypt({
          passwords: KEY,
          message: await readMessage({ armoredMessage: INPUT }),
          format: 'binary',
        });

        // @ts-ignore
        return FunResCons(200, new TextDecoder().decode(DecRes.data));
      } catch (e: any) {
        if (e.toString().includes('Session key decryption failed')) {
          LogError('Invalid Key!', 'Xu_kWYq20V5u_DFEbPJvr');
          return FunResCons(300, Error('Invalid Key!'), 1);
        }
        LogError(e, 'Error while decryption!');
        return FunResCons(500, Error('Error while decrypting!'));
      }

    default:
      LogError('Invalid Action!', 'DGHVsKP84YPJ15pbaJA_i');
      return FunResCons(300, Error('Invalid Action!'));
  }
};
// ---------------------------------------------------
