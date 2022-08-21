import { AES, enc } from 'crypto-js';
import FunResCons from '../funResCons';

const AES256 = {
  Enc: (KEY: string, INPUT: string) => {
    const EncodedInput = enc.Latin1.parse(INPUT);

    const EncRes = AES.encrypt(EncodedInput, KEY);

    return FunResCons(200, EncRes.toString());
  },

  Dec: (KEY: string, INPUT: string) => {
    const DecRes = AES.decrypt(INPUT, KEY);

    try {
      return FunResCons(200, enc.Latin1.stringify(DecRes));
    } catch (e) {
      return FunResCons(300, 'Invalid CoreKey');
    }
  },
};

export default AES256;
