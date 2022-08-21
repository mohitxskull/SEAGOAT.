import React from 'react';
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import { NextLink } from '@mantine/next';
import Footer from '../components/footer';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 40,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    filter: 'grayscale(100%)',

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
}));

export default function HeroBullets() {
  const { classes } = useStyles();

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  padding: '7px 5px 0px 5px',
                  borderRadius: '2px',
                }}
              >
                SEAGOAT
              </span>
              is an encrypted, secure password and photo storage service
            </Title>
            <Text color="dimmed" mt="md">
              Your passwords and photos are encrypted before they leave your
              device, so we can&apos;t read your passwords, and no one else can
              either.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} color="dark" radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Open source</b> – you can read line by line, how seagoat
                works and how your data is secured.
              </List.Item>
              <List.Item>
                <b>Anonymous sign up</b> – all you need is a username. we do not
                require you to provide any personal identifiers, like an email
                address or phone number, to create an account with us.
              </List.Item>
              <List.Item>
                <b>Client-side encryption</b> – Your passwords and photos never
                leave your device unencrypted. They are encrypted at all times
                with your encryption key.
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                variant="filled"
                color="dark"
                radius="sm"
                size="md"
                className={classes.control}
                component={NextLink}
                href="/signup/"
              >
                Sign up
              </Button>
              <Button
                variant="outline"
                color="gray"
                radius="sm"
                size="md"
                className={classes.control}
                component={NextLink}
                href="/signin/"
              >
                Sign in
              </Button>
            </Group>
          </div>
          <Image alt="" src="/sky.jpg" className={classes.image} />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
