export interface VaultObjTypes {
  EncCK: string;
  HEEK: string;
}

export type VaultStateType = 'Loading' | 'Setup' | 'Open';

export type PasswordVaultStateType = 'list' | 'add';

export type FunResStatusType = 200 | 300 | 400 | 500;

export interface FunResTypes<Type, Special> {
  Status: FunResStatusType;
  Res: Type;
  SpecialStatus: number | null;
  SpecialRes: Special | null;
}

export interface PasswordObjTypes {
  name: string;
  username: string;
  password: string;
  inserted_at: string;
  uid: string;
  updated_at: string;
}
