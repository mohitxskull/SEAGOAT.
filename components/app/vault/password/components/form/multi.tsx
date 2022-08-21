import { ActionIcon, Button, Group, TextInput, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useContext, useState } from 'react';
import { Eye, EyeOff, RotateClockwise } from 'tabler-icons-react';
import { generate } from 'generate-password';
import { PasswordContext } from '../../../../../../lib/context/password';
import Password from '../../../../../../lib/helpers/functions/passwordFuns';

const MultiFormCom = ({
  SubmitFun,
  SubmitBtnTxt,
  InitialValues = { Name: '', Username: '', Password: '' },
}: {
  SubmitFun: Function;
  SubmitBtnTxt: string;
  InitialValues?: {
    Name: string;
    Username: string;
    Password: string;
  };
}) => {
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [PrivateLoading, setPrivateLoading] = useState(false);
  const { setPasswordVaultState, setUidToEdit } = useContext(PasswordContext);

  const AddPasswordForm = useForm({
    initialValues: InitialValues,

    validate: {
      Name: (value) =>
        value.length > 100 ? 'Name should be less than 100 characters' : null,
      Username: (value) =>
        value.length > 100
          ? 'Username should be less than 100 characters'
          : null,
      Password: (value) =>
        value.length > 100
          ? 'Password should be less than 100 characters'
          : null,
    },
  });

  return (
    <>
      <div
        style={{
          width: '350px',
          margin: 'auto',
          marginTop: '100px',
          marginBottom: '50px',
        }}
      >
        <form
          onSubmit={AddPasswordForm.onSubmit((values) => {
            setPrivateLoading(true);
            SubmitFun(values.Name, values.Username, values.Password);
          })}
        >
          <TextInput
            disabled={PrivateLoading}
            styles={{ input: { userSelect: 'auto' } }}
            placeholder="Instagram"
            label="Name"
            required
            {...AddPasswordForm.getInputProps('Name')}
          />
          <TextInput
            disabled={PrivateLoading}
            styles={{ input: { userSelect: 'auto' } }}
            mt="sm"
            placeholder="mohitxskull"
            label="Username"
            required
            {...AddPasswordForm.getInputProps('Username')}
          />

          <TextInput
            disabled={PrivateLoading}
            placeholder="Password"
            mt="sm"
            styles={() => ({
              input: { userSelect: 'auto' },
              description: {
                color:
                  AddPasswordForm.values.Password.length > 0
                    ? Password.Strength(AddPasswordForm.values.Password).color
                    : 'gray',
              },
            })}
            label="Password"
            description={
              AddPasswordForm.values.Password.length > 0
                ? Password.Strength(AddPasswordForm.values.Password).des
                : 'Always keep strong passwords'
            }
            required
            rightSectionWidth={55}
            type={PasswordVisible ? 'text' : 'password'}
            rightSection={
              <Group noWrap spacing={0}>
                <Tooltip label="Generate strong password">
                  <ActionIcon
                    onClick={() =>
                      AddPasswordForm.setFieldValue(
                        'Password',
                        generate({
                          length: 25,
                          numbers: true,
                          excludeSimilarCharacters: true,
                        })
                      )
                    }
                    size="sm"
                    variant="transparent"
                  >
                    <RotateClockwise size={15} />
                  </ActionIcon>
                </Tooltip>

                <ActionIcon
                  size="sm"
                  onClick={() => setPasswordVisible(!PasswordVisible)}
                  variant="transparent"
                >
                  {PasswordVisible ? <EyeOff size={15} /> : <Eye size={15} />}
                </ActionIcon>
              </Group>
            }
            {...AddPasswordForm.getInputProps('Password')}
          />

          <Button
            loading={PrivateLoading}
            type="submit"
            variant="outline"
            fullWidth
            mt="xl"
          >
            {SubmitBtnTxt}
          </Button>
          <Button
            onClick={() => {
              setUidToEdit(null);
              setPasswordVaultState('list');
            }}
            disabled={PrivateLoading}
            variant="light"
            fullWidth
            mt="sm"
          >
            Cancle
          </Button>
        </form>
      </div>
    </>
  );
};

export default MultiFormCom;
