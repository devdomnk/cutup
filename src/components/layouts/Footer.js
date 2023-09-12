import {
  createStyles,
  Anchor,
  Group,
  ActionIcon,
  Container,
  Button,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandTiktok,
  IconBrandInstagram,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../brand/Logo";
import { useSmScreen, useXsScreen } from "../context/mediaQueryContext";
import {
  useSetIsContactFormOpened,
  useSetIsTermsOfUseOpened,
} from "../context/modalContext";

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor: theme.white,
    position: "relative",
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  icon: {
    color: theme.colors.gray[5],
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export default function FooterCentered({ links }) {
  const { classes } = useStyles();
  const setIsTermsOfUseModalOpened = useSetIsTermsOfUseOpened();
  const setIsContactFormOpened = useSetIsContactFormOpened();
  const smScreen = useSmScreen();
  const navigate = useNavigate();

  const items = links.map((link) => (
    <Anchor
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => {
        event.preventDefault();
        link.label === "Kontakt"
          ? setIsContactFormOpened(true)
          : link.label === "Geschäftsbedingungen"
          ? setIsTermsOfUseModalOpened(true)
          : navigate(link.link);
      }}
      size={smScreen ? "sm" : "xs"}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner} size="xl">
        <Logo />

        <Group className={classes.links}>{items}</Group>

        <Group spacing={0} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandInstagram
              size={18}
              stroke={1.5}
              className={classes.icon}
              onClick={() => {
                window.open(
                  "https://www.instagram.com/_grinsmensch_/",
                  "_blank"
                );
              }}
            />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandTiktok
              size={18}
              stroke={1.5}
              className={classes.icon}
              onClick={() => {
                window.open(
                  "https://www.tiktok.com/@grinsmensch?lang=de-DE",
                  "_blank"
                );
              }}
            />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} className={classes.icon} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
