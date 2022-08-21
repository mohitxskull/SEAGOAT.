import React from 'react';
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Text,
} from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 'auto',

    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  Poopins: {
    fontFamily: 'Poppins, sans-serif',
  },

  PlayFair: {
    fontFamily: 'Playfair Display SC, serif',
  },

  Inkut: {
    fontFamily: 'Inknut Antiqua, serif',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text size="sm" className={classes.Poopins}>
          Made and Designed by Skull
        </Text>
        <Group spacing={1} className={classes.links} position="right" noWrap>
          <ActionIcon
            component="a"
            href="https://github.com/servedbyskull/SEAGOAT."
            size="lg"
          >
            <BrandGithub size={18} />
          </ActionIcon>
          {/* <ActionIcon disabled component="a" href="/dev" size="lg">
            <Binary size={18} />
          </ActionIcon> */}
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
