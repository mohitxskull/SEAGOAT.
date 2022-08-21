import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import '../styles/world.css';
import { NotificationsProvider } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { ModalsProvider } from '@mantine/modals';
import { Supabase } from '../lib/client/supabase/client';
import { FetchPost } from '../lib/helpers/functions/fetchFuns';
import Key from '../lib/helpers/functions/keyFuns';
import useOnline from '../lib/hooks/useOnline';

export default function App(props: AppProps) {
  const [colorScheme, setColorScheme] = useState<any>('dark');
  const { Component, pageProps } = props;

  const Router = useRouter();
  const { Online } = useOnline();

  useEffect(() => {
    // console.log(Supabase.auth.session()?.user?.user_metadata);
    Supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth Change --- ${event} --- ${session?.user?.email}`);

      if (event === 'TOKEN_REFRESHED') {
        Key.Core.Clear();
        // Noti('Token refreshed!', 'Info');
      }

      if (event === 'SIGNED_OUT' && session === null) {
        Router.push('/signin');
        FetchPost('/api/auth', { event, session });
        Key.Core.Clear();
      }
      if (event === 'SIGNED_IN' && session !== null) {
        FetchPost('/api/auth', { event, session });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ColorSchemeFromLocalStorage = localStorage.getItem('colourScheme');
    if (ColorSchemeFromLocalStorage !== null) {
      setColorScheme(ColorSchemeFromLocalStorage);
    } else {
      localStorage.setItem('colourScheme', colorScheme);
    }
  }, [colorScheme]);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    localStorage.setItem('colourScheme', nextColorScheme);
  };

  return (
    <>
      <Head>
        <title>SEAGOAT</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta charSet="utf-8" />

        <meta name="description" content="it's an sea coming out of a goat!" />

        <meta
          name="Keywords"
          content="encrypt decrypt encryption file-encryption javascript client-side serverless decryption xchcha20 argon2id encryption-decryption webcrypto crypto browser in-browser"
        />
      </Head>

      {Online ? (
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
              primaryColor: colorScheme === 'dark' ? 'gray' : 'dark',
            }}
          >
            <ModalsProvider>
              <NotificationsProvider>
                <Component {...pageProps} />
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      ) : (
        <>offline</>
      )}
    </>
  );
}
