import {
  Anchor,
  Button,
  Global,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Supabase } from '../lib/client/supabase/client';
import Noti from '../components/notification';
import { FetchPost } from '../lib/helpers/functions/fetchFuns';
import Password from '../lib/helpers/functions/passwordFuns';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await Supabase.auth.api.getUserByCookie(req);

  if (user) {
    return {
      redirect: {
        destination: '/vault',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const SignUp: NextPage = () => {
  const [PrivateLoading, setPrivateLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    sessionStorage.clear();
    console.info('Session storage cleared!');
  }, []);

  const HandleSignUp = async (USERNAME: string, PASSWORD: string) => {
    try {
      setPrivateLoading(true);
      const Response = await FetchPost('/api/auth/signup', {
        username: USERNAME,
        password: PASSWORD,
      });

      if (Response.status !== 301) {
        const data = await Response.json();
        console.log(data, 'Redirect => ', Response.redirected, Response.status);
        if (data.Error) throw data.Error;

        if (Response.ok) {
          Router.push('/signin');
        }

        Noti(data.Data, 'Done');
      }
    } catch (error: any) {
      Noti(error, 'Error');
    } finally {
      setPrivateLoading(false);
    }
  };

  const SignUpForm = useForm({
    initialValues: {
      Username: '',
      Password: '',
      ConfirmPassword: '',
    },

    validate: {
      Username: (value) =>
        value.length < 4 ? 'Username should be at least 4 characters' : null,
      Password: (value) =>
        value.length < 6 ? 'Password should be at least 6 characters' : null,
      ConfirmPassword: (value, values) =>
        value !== values.Password ? 'Passwords did not match' : null,
    },
  });

  return (
    <>
      <Global
        styles={() => ({
          body: {
            overflow: 'hidden',
          },
        })}
      />

      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div style={{ width: '350px' }}>
            <form
              onSubmit={SignUpForm.onSubmit((values) =>
                HandleSignUp(values.Username.trim(), values.Password.trim())
              )}
            >
              <TextInput
                disabled={PrivateLoading}
                variant="default"
                label="Username"
                placeholder="Your username"
                required
                {...SignUpForm.getInputProps('Username')}
              />
              <PasswordInput
                disabled={PrivateLoading}
                variant="default"
                label="Password"
                placeholder="Your password"
                styles={() => ({
                  input: { userSelect: 'auto' },
                  description: {
                    color:
                      SignUpForm.values.Password.length > 0
                        ? Password.Strength(SignUpForm.values.Password).color
                        : 'gray',
                  },
                })}
                description={
                  SignUpForm.values.Password.length > 0
                    ? Password.Strength(SignUpForm.values.Password).des
                    : ''
                }
                {...SignUpForm.getInputProps('Password')}
                required
                mt="md"
              />
              <PasswordInput
                required
                variant="default"
                disabled={PrivateLoading}
                mt="sm"
                label="Confirm password"
                placeholder="Confirm your password"
                {...SignUpForm.getInputProps('ConfirmPassword')}
              />
              <Button
                type="submit"
                loading={PrivateLoading}
                variant="outline"
                fullWidth
                mt="xl"
              >
                Sign up
              </Button>
            </form>
            <Text color="dimmed" size="sm" align="left" mt="lg">
              Have an account?
              <Link href="/signin" passHref>
                <Anchor component="a" size="sm">
                  {' '}
                  Sign in
                </Anchor>
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
