import Noti from '../../components/notification';
import { Supabase } from '../client/supabase/client';
import SupabaseLogout from './logout';

const UserSalt = () => {
  const UserID = Supabase.auth.user()?.id;

  if (UserID) {
    return UserID;
  }

  SupabaseLogout();
  Noti(
    'Error while getting user id | ErrorID => ZXNDQm48jIwweCrEruHdL',
    'Critical'
  );
  return null;
};

export default UserSalt;
