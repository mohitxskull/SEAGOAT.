import React, { useContext, useEffect } from 'react';
import { PasswordContext } from '../../../../../lib/context/password';
import Noti from '../../../../notification';
import MultiFormCom from './form/multi';

const EditPasswordCom = () => {
  const {
    PasswordListDec,
    setPasswordVaultState,
    setUidToEdit,
    UidToEdit,
    EditPasswordFun: HandleEditPassword,
  } = useContext(PasswordContext);

  const SearchRes = PasswordListDec.filter(
    (PASSWORDOBJ) => PASSWORDOBJ.uid === UidToEdit
  );

  useEffect(() => {
    if (SearchRes.length !== 1) {
      Noti('Invalid uid', 'Error');
      setUidToEdit(null);
      setPasswordVaultState('list');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUidToEdit]);

  return (
    <>
      <MultiFormCom
        SubmitBtnTxt="Save password"
        SubmitFun={HandleEditPassword}
        InitialValues={{
          Name: SearchRes[0].name,
          Username: SearchRes[0].username,
          Password: SearchRes[0].password,
        }}
      />
    </>
  );
};

export default EditPasswordCom;
