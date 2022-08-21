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
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Supabase } from '../lib/client/supabase/client';
import Noti from '../components/notification';

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

const SignIn: NextPage = () => {
  const [PrivateLoading, setPrivateLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    sessionStorage.clear();
    console.info('Session storage cleared!');
  }, []);

  const HandleSignIn = async (username: string, password: string) => {
    try {
      setPrivateLoading(true);
      const { error } = await Supabase.auth.signIn({
        email: `${username}@seagoat.skull`,
        password,
      });
      if (error) throw error;
      setTimeout(() => Router.push('/vault'), 2000);
    } catch (error: any) {
      Noti(error.error_description || error.message, 'Error');
      setPrivateLoading(false);
    }
  };

  const SignInForm = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) =>
        value.length < 4 ? 'Username should be at least 4 characters' : null,
      password: (value) =>
        value.length < 6 ? 'Password should be at least 6 characters' : null,
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
              onSubmit={SignInForm.onSubmit((values) =>
                HandleSignIn(values.username.trim(), values.password.trim())
              )}
            >
              <TextInput
                disabled={PrivateLoading}
                variant="default"
                label="Username"
                placeholder="Your username"
                required
                {...SignInForm.getInputProps('username')}
              />
              <PasswordInput
                disabled={PrivateLoading}
                label="Password"
                variant="default"
                placeholder="Your password"
                {...SignInForm.getInputProps('password')}
                required
                mt="md"
              />

              <Button
                type="submit"
                loading={PrivateLoading}
                variant="outline"
                fullWidth
                mt="xl"
              >
                Sign in
              </Button>
            </form>
            <Text size="sm" align="left" mt="lg">
              <Link href="/signup" passHref>
                <Anchor component="a" size="sm">
                  Register a new account
                </Anchor>
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
