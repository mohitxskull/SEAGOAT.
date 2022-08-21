import type { NextApiRequest, NextApiResponse } from 'next';
import { Supabase } from '../../lib/client/supabase/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { user } = await Supabase.auth.api.getUserByCookie(req);

    if (user) {
      res.status(200).json({ Data: user, Error: null });
    } else {
      res.status(401).json({ Data: null, Error: 'Unauthorized' }); // 401 Unauthorized
    }
  } else if (req.method === 'POST') {
    Supabase.auth.api.setAuthCookie(req, res);
  } else {
    res.status(400).json({ Data: null, Error: null }); // 400 Bad Request
  }
}
