/* eslint-disable no-restricted-globals */

import FunResCons from '../helpers/funResCons';
import LogError from '../helpers/logError';
import { DecryptPassList } from './helpers/decryptList';
import { ValidWorkerFunctionsType } from './types';

self.addEventListener(
  'message',
  async (
    EVENT: MessageEvent<{ Function: ValidWorkerFunctionsType; Input: any }>
  ) => {
    switch (EVENT.data.Function) {
      case 'DecPassList':
        self.postMessage(await DecryptPassList(EVENT.data.Input));
        break;

      default:
        LogError('Invalid function call!', '7aSeaY9cyIgUgPNFywMo8');
        self.postMessage(FunResCons(300, Error('Invalid function call!')));
        break;
    }

    self.close();
  }
);

export {};
