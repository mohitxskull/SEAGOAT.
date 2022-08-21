import AES256 from '../../helpers/functions/aes256Fun';
import FunResCons from '../../helpers/funResCons';
import LogError from '../../helpers/logError';
import { FunResTypes, PasswordObjTypes } from '../../types';

const DecPassObj = (
  ENCPASSOBJ: PasswordObjTypes,
  COREKEY: string
): Promise<FunResTypes<PasswordObjTypes | Error, null>> =>
  new Promise((MainResolve, MainReject) => {
    const DecSingle = (INPUT: string): Promise<string> =>
      new Promise((ChildResolve, ChildReject) => {
        const DecRes = AES256.Dec(COREKEY, INPUT);
        if (DecRes.Status === 200) {
          ChildResolve(DecRes.Res);
        } else {
          ChildReject(DecRes.Res);
        }
      });

    Promise.all([
      DecSingle(ENCPASSOBJ.name),
      DecSingle(ENCPASSOBJ.username),
      DecSingle(ENCPASSOBJ.password),
    ])
      .then((RESPONSE) => {
        MainResolve(
          FunResCons(200, {
            uid: ENCPASSOBJ.uid,
            name: RESPONSE[0],
            username: RESPONSE[1],
            password: RESPONSE[2],
            inserted_at: ENCPASSOBJ.inserted_at,
            updated_at: ENCPASSOBJ.updated_at,
          })
        );
      })
      .catch((ERROR) => {
        LogError(ERROR, 'Jbe5IadvXkj43A12OigzF');
        MainReject(FunResCons(500, Error()));
      });
  });

export const DecryptPassList = async ({
  ENCPASSLIST,
  COREKEY,
}: {
  ENCPASSLIST: PasswordObjTypes[];
  COREKEY: string;
}) => {
  try {
    const DecryptedPassList: any[] = [];

    await Promise.allSettled(
      ENCPASSLIST.map(async (ENCPASSOBJ) => {
        const Response = await DecPassObj(ENCPASSOBJ, COREKEY);
        if (Response.Status === 200) {
          DecryptedPassList.push(Response.Res);
        } else {
          throw FunResCons(
            500,
            'There was error while decrypting an Password object!'
          );
        }
      })
    );

    return FunResCons(200, DecryptedPassList);
  } catch (e: any) {
    LogError(e, 'pdUoT8glvaUCx0u1_7Lx9');
    return e;
  }
};

export type DecryptPassListOut = ReturnType<typeof DecryptPassList>;
export type DecryptPassListIn = Parameters<typeof DecryptPassList>[0];
