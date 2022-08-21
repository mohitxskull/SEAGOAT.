import React, { useContext } from 'react';
import { PasswordContext } from '../../../../../lib/context/password';
import MultiFormCom from './form/multi';

const AddPasswordCom = () => {
  const { AddPassword: HandleAddPassword } = useContext(PasswordContext);

  return (
    <>
      <MultiFormCom SubmitBtnTxt="Add Password" SubmitFun={HandleAddPassword} />
    </>
  );
};

export default AddPasswordCom;
