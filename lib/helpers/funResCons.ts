import { FunResStatusType, FunResTypes } from '../types';

/**
 * Construct Function Response Body
 */
const FunResCons = <Type, Special>(
  STATUS: FunResStatusType,
  RES: Type,
  SPECIALSTATUS: number | null = null,
  SPECIALRES: Special | null = null
): FunResTypes<Type, Special> => ({
  Status: STATUS,
  Res: RES,
  SpecialStatus: SPECIALSTATUS,
  SpecialRes: SPECIALRES,
});

export default FunResCons;
