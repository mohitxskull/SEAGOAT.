import { compareSync, hashSync } from 'bcryptjs';

const Bcrypt = {
  Hash: (TEXT: string) => hashSync(TEXT, 10),
  Check: (TEXT: string, HASH: string) => compareSync(TEXT, HASH),
};

export default Bcrypt;
