import type { NextApiRequest, NextApiResponse } from 'next';
import { Supabase } from '../../../lib/client/supabase/client';
import Bcrypt from '../../../lib/helpers/functions/bcryptFuns';

type resData = {
  Data: string | null;
  Error: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resData>
) {
  const AuthRes = await Supabase.auth.api.getUserByCookie(req);

  if (AuthRes.user) {
    res.redirect(301, '/vault');
  } else if (req.method === 'POST') {
    const USERNAME = req.body.username;
    const PASSWORD = req.body.password;

    if (!USERNAME || !PASSWORD) {
      res
        .status(400)
        .json({ Data: null, Error: 'Username OR Password not in Body' });
      return;
    }

    const HASHEDPASS = Bcrypt.Hash(PASSWORD);

    try {
      const { error } = await Supabase.auth.signUp(
        {
          email: `${USERNAME}@seagoat.skull`,
          password: PASSWORD,
        },
        {
          data: {
            hashedPass: HASHEDPASS,
            lastPassChange: 'new',
          },
        }
      );

      if (error) throw error;

      res.status(200).json({
        Data: 'Account Registered',
        Error: null,
      });
    } catch (error: any) {
      res.status(error.status || 400).json({
        Data: null,
        Error: `${error.error_description || error.message}`,
      });
    }
  } else {
    res.redirect(301, '/'); // .json({ Data: null, Error: "POST method" });
  }
}
