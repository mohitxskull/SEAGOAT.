import Noti from '../../components/notification';
import { Supabase } from '../client/supabase/client';
import Key from './functions/keyFuns';

const SupabaseLogout = async () => {
  try {
    const { error } = await Supabase.auth.signOut();
    if (error) throw error;
    Key.Core.Clear();
    Noti('Logged out', 'Done');
  } catch (error: any) {
    Noti(error.error_description || error.message, 'Error');
  }
};

export default SupabaseLogout;
