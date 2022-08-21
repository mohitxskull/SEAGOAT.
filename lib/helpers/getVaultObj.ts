import { Supabase } from '../client/supabase/client';
import { VaultObjTypes } from '../types';

const VaultObj = (): VaultObjTypes | null =>
  Supabase.auth.user()?.user_metadata.vault || null;

export default VaultObj;
