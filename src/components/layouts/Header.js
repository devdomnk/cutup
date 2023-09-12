import { useEffect, useLayoutEffect, useState } from "react";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Transition,
  useMantineTheme,
  Menu,
  Text,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandTiktok,
  IconShoppingCart,
  IconUser,
  IconHome,
  IconSettings,
  Icon3dCubeSphere,
  IconHelp,
} from "@tabler/icons";
import Logo from "../brand/Logo";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useShoppingCart } from "../context/shoppingCartContext";
import { useFunctions, useUser } from "../context/firebaseContext";
import { httpsCallable } from "firebase/functions";
import { useMdScreen, useSmScreen } from "../context/mediaQueryContext";
import { useScroll, motion } from "framer-motion";

export default function HomeHeader({ links }) {
  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState();
  const shoppingCartItemCount = useShoppingCart().length;
  const user = useUser();
  const functions = useFunctions();
  const [isUserLoading, setIsUserLoading] = useState(false);
  const smScreen = useSmScreen();
  const mdScreen = useMdScreen();
  const navigate = useNavigate();
  let location = useLocation();

  const { scrollY } = useScroll();
  const [scroll, setScroll] = useState(0);
  const [transparentHeader, setTransparentHeader] = useState(
    scroll <= 0 && location.pathname === "/"
  );

  useEffect(() => {
    close();
  }, [mdScreen]);

  useEffect(() => {
    setTransparentHeader(scroll <= 0 && location.pathname === "/");
    close();
  }, [location.pathname]);

  useLayoutEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScroll(latest);
      setTransparentHeader(latest <= 0 && location.pathname === "/");
    });

    return () => {
      unsubscribe();
    };
  }, [location.pathname]);

  const useStyles = createStyles((theme) => ({
    header: {
      zIndex: 1000,
      background: transparentHeader ? "transparent" : "white",
      borderBottom: transparentHeader
        ? `0px solid transparent`
        : `1px solid ${theme.colors.gray[2]}`,
      transition: ".15s ease-in-out all",
      maxWidth: "100vw",
    },
    inner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: smScreen
        ? transparentHeader
          ? "150px"
          : "56px"
        : transparentHeader
        ? "100px"
        : "56px",
      transition: ".15s ease-in-out all",

      /* [theme.fn.smallerThan("sm")]: {
        justifyContent: "flex-start",
      }, */
    },

    icon: {
      color: theme.colors.darkText[0],
    },

    links: {
      width: 320,

      [theme.fn.smallerThan("md")]: {
        display: "none",
      },
    },

    icons: {
      width: 320,

      [theme.fn.smallerThan("md")]: {
        width: "auto",
        marginLeft: "auto",
      },
    },

    social: {
      display: smScreen ? "flex" : "none",
    },

    burger: {
      marginRight: smScreen ? theme.spacing.md : "auto",

      [theme.fn.smallerThan("sm")]: {
        width: 68,
      },

      [theme.fn.largerThan("md")]: {
        display: "none",
      },
    },

    link: {
      display: "block",
      lineHeight: 1,
      padding: "8px 12px",
      borderRadius: theme.radius.sm,
      textDecoration: "none",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.darkText[0],
      fontSize: smScreen ? theme.fontSizes.sm : theme.fontSizes.xs,
      fontWeight: 600,
      "&:hover": {
        backgroundColor: transparentHeader ? "#ffffff35" : theme.colors.gray[1],
      },
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: transparentHeader
          ? "#ffffff35"
          : theme.colors.primary[0],
        color: theme.colors.primary[3],
      },
    },

    dropdownLinks: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      height: 56,
      backgroundColor: theme.white,
      borderBottom: `1px solid ${theme.colors.gray[2]}`,
    },

    shoppingCartBadge: {
      position: "absolute",
      right: 1,
      top: 2,
      height: 13,
      width: 13,
      borderRadius: 6,
      backgroundColor: theme.colors.primary[3],
      color: theme.white,
      fontSize: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }));
  const { classes, cx } = useStyles();

  useEffect(() => {
    setActive(
      links.find((link) => link.link == location.pathname)
        ? links.find((link) => link.link == location.pathname).link
        : null
    );
  }, [location]);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active == link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  async function openStripeUser() {
    setIsUserLoading(true);
    const createPortalLink = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const { data } = await createPortalLink({
      returnURL: window.location.origin,
      locale: "auto",
    });
    window.location.assign(data.url);
  }

  return (
    <Header height={56} className={classes.header}>
      <motion.div
        initial={{ y: -150 }}
        animate={{
          y: 0,
          transition: {
            delay: location.pathname === "/" ? 1 + 1.4 : 0,
            type: "tween",
            duration: 0.25,
            ease: "easeOut",
          },
        }}
      >
        <Container className={classes.inner} size={1480}>
          <Menu
            shadow="sm"
            width={160}
            opened={!scroll && opened}
            closeOnClickOutside
            closeOnEscape
            closeOnItemClick
            offset={10}
            withArrow
            transition="pop-top-left"
            arrowPosition="center"
            styles={(theme) => ({
              dropdown: {
                left: "16px !important",
              },
              itemLabel: {
                fontSize: 13,
              },
              label: {
                fontSize: 12,
              },
              arrow: {
                marginLeft: -37,
              },
            })}
          >
            <Menu.Target>
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                className={classes.burger}
                color={theme.colors.gray[9]}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Store</Menu.Label>
              <Link to={"/"}>
                <Menu.Item icon={<IconHome size={14} />}>Startseite</Menu.Item>
              </Link>
              <Link to={"/produkte"}>
                <Menu.Item icon={<Icon3dCubeSphere size={14} />}>
                  Produkte
                </Menu.Item>
              </Link>
              <Link to={"/konfigurator"}>
                <Menu.Item icon={<IconSettings size={14} />}>
                  Konfigurator
                </Menu.Item>
              </Link>
              <Link to={"/hilfe"}>
                <Menu.Item icon={<IconHelp size={14} />}>Hilfe</Menu.Item>
              </Link>

              <Menu.Divider />

              <Menu.Label>Account</Menu.Label>
              <a
                onClick={() => {
                  openStripeUser();
                }}
              >
                <Menu.Item
                  icon={
                    isUserLoading ? (
                      <Loader size={14} />
                    ) : (
                      <IconUser size={14} />
                    )
                  }
                >
                  Benutzer
                </Menu.Item>{" "}
              </a>
              <Link to={"/warenkorb"}>
                <Menu.Item
                  color="primary.3"
                  icon={<IconShoppingCart size={14} />}
                >
                  Warenkorb
                </Menu.Item>
              </Link>
            </Menu.Dropdown>
          </Menu>

          <Group className={classes.links} spacing={16}>
            {items}
          </Group>

          <Logo white={transparentHeader} />

          <Group spacing={50} className={classes.icons} position="right" noWrap>
            <Group spacing={4} noWrap>
              {user ? (
                <ActionIcon
                  loading={isUserLoading}
                  loaderProps={{ color: theme.colors.primary[3] }}
                  size={"lg"}
                  variant={transparentHeader ? "transparent" : "subtle"}
                  onClick={() => {
                    openStripeUser();
                  }}
                >
                  <IconUser size={20} stroke={1.6} className={classes.icon} />
                </ActionIcon>
              ) : null}
              <ActionIcon
                size="lg"
                onClick={() => {
                  navigate("/warenkorb");
                }}
                variant={transparentHeader ? "transparent" : "subtle"}
              >
                <IconShoppingCart
                  size={20}
                  stroke={1.6}
                  className={classes.icon}
                />
                {shoppingCartItemCount > 0 ? (
                  <div className={classes.shoppingCartBadge}>
                    {shoppingCartItemCount}
                  </div>
                ) : null}
              </ActionIcon>
            </Group>
          </Group>
        </Container>
        <Transition
          mounted={scroll && opened}
          transition={"scale-y"}
          duration={150}
          timingFunction="ease"
        >
          {(styles) => (
            <Container
              style={styles}
              className={classes.dropdownLinks}
              size={"xl"}
            >
              {items}
            </Container>
          )}
        </Transition>
      </motion.div>
    </Header>
  );
}
