import {
  Button,
  Container,
  createStyles,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  useMdScreen,
  useSmScreen,
  useXlScreen,
} from "../context/mediaQueryContext";
import ArrowButton from "../utils/ArrowButton";
import { useMediaQuery } from "@mantine/hooks";

export default function EmptyCard() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();
  const xlScreen = useXlScreen();
  const xxsScreen = useMediaQuery("(min-width: 420px)");

  const useStyles = createStyles((theme) => ({
    stack: {
      position: "relative",
    },
    iconContainer: {
      width: mdScreen ? 180 : smScreen ? 160 : 140,
      height: mdScreen ? 180 : smScreen ? 160 : 140,
      backgroundColor: theme.white,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    button: {
      marginTop: 75,
      padding: mdScreen ? "14px 80px" : smScreen ? "12px 60px" : "11px 50px",
      height: "unset",
      borderRadius: 8,
    },
  }));
  const { classes } = useStyles();

  return (
    <Container
      mt={smScreen ? -110 : xxsScreen ? -110 : -120}
      sx={(theme) => ({
        display: "flex",
        justifyContent: "start",
        gap: 68,
        maxWidth: 1480,
        padding: 0,
        margin: 0,
        minHeight: 286,
        [theme.fn.smallerThan("xl")]: {
          justifyContent: "end",
        },
        [theme.fn.smallerThan("sm")]: { padding: "0 16px", minHeight: "unset" },
      })}
    >
      <Image
        src="EmptyCartIcon.svg"
        width={526}
        sx={(theme) => ({
          [theme.fn.smallerThan("sm")]: { display: "none" },
        })}
      />
      <Stack
        align="start"
        justify="space-between"
        sx={{ padding: "30px 0", gap: xxsScreen ? 60 : 40 }}
      >
        <Stack>
          <Title
            color={theme.colors.gray[9]}
            weight={900}
            size={mdScreen ? 36 : smScreen ? 34 : 28}
            sx={(theme) => ({
              [theme.fn.smallerThan("xl")]: { width: "18ch" },
              [theme.fn.smallerThan("sm")]: { width: "unset" },
              [theme.fn.smallerThan(420)]: { fontSize: 22 },
            })}
          >
            Ohje! Dein{" "}
            <svg
              width={xxsScreen ? "34" : "28"}
              viewBox="0 0 30 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginBottom: -2 }}
            >
              <path
                d="M13.1927 1.85089C13.5104 1.22862 13.2708 0.463969 12.6615 0.142288C12.0521 -0.179392 11.2917 0.0631866 10.974 0.680181L6.125 10.1249H1.66667C0.744792 10.1249 0 10.879 0 11.8124C0 12.7458 0.744792 13.5 1.66667 13.5L4.36979 24.4424C4.73958 25.9453 6.07292 27 7.60417 27H22.3958C23.9271 27 25.2604 25.9453 25.6302 24.4424L28.3333 13.5C29.2552 13.5 30 12.7458 30 11.8124C30 10.879 29.2552 10.1249 28.3333 10.1249H23.875L19.026 0.680181C18.7083 0.0631866 17.9531 -0.179392 17.3385 0.142288C16.724 0.463969 16.4896 1.22862 16.8073 1.85089L21.0573 10.1249H8.94271L13.1927 1.85089ZM10 16.0312V21.0937C10 21.5578 9.625 21.9375 9.16667 21.9375C8.70833 21.9375 8.33333 21.5578 8.33333 21.0937V16.0312C8.33333 15.5671 8.70833 15.1875 9.16667 15.1875C9.625 15.1875 10 15.5671 10 16.0312ZM15 15.1875C15.4583 15.1875 15.8333 15.5671 15.8333 16.0312V21.0937C15.8333 21.5578 15.4583 21.9375 15 21.9375C14.5417 21.9375 14.1667 21.5578 14.1667 21.0937V16.0312C14.1667 15.5671 14.5417 15.1875 15 15.1875ZM21.6667 16.0312V21.0937C21.6667 21.5578 21.2917 21.9375 20.8333 21.9375C20.375 21.9375 20 21.5578 20 21.0937V16.0312C20 15.5671 20.375 15.1875 20.8333 15.1875C21.2917 15.1875 21.6667 15.5671 21.6667 16.0312Z"
                fill="#6723F5"
              />
            </svg>{" "}
            Warenkorb ist leer
          </Title>
          <Text
            size={xxsScreen ? 15 : 14}
            sx={{ maxWidth: smScreen ? (xlScreen ? 550 : 455) : "full" }}
          >
            Sieht so aus als hättest du noch keinen Artikel in deinen Warenkorb
            gelegt. Na los, sie warten schon auf dich!
          </Text>
        </Stack>
        {xxsScreen ? (
          <Group spacing={16}>
            <ArrowButton
              text={"Zu unseren Produkten"}
              destination={"/produkte"}
              isBig
              unlimitedOnPhone
            />
            <ArrowButton
              text={"Konfigurator"}
              destination={"/konfigurator"}
              outline
              unlimitedOnPhone
            />
          </Group>
        ) : (
          <Stack spacing={16} align="stretch" sx={{ width: "100%" }}>
            <ArrowButton
              text={"Zu unseren Produkten"}
              destination={"/produkte"}
              isBig
              unlimitedOnPhone
            />
            <ArrowButton
              text={"Konfigurator"}
              destination={"/konfigurator"}
              outline
              unlimitedOnPhone
            />
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
