import {
  Button,
  Container,
  createStyles,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useMdScreen, useSmScreen } from "../context/mediaQueryContext";

export default function EmptyCard() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();

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
    <Container mt={smScreen ? -30 : -60}>
      <Stack align={"center"} spacing={0} className={classes.stack}>
        <Container className={`${classes.iconContainer} shadow`}>
          <IconShoppingCart
            color={theme.colors.primary[3]}
            size={mdScreen ? 120 : smScreen ? 100 : 80}
            strokeWidth={1.8}
          />
        </Container>
        <Title
          color={theme.colors.primary[3]}
          weight={900}
          size={mdScreen ? 36 : smScreen ? 34 : 28}
          mt={40}
          align="center"
        >
          Ohje! Dein Warenkorb ist leer
        </Title>
        <Text
          size={15}
          sx={{ width: smScreen ? 350 : "full", textAlign: "center" }}
        >
          Sieht so aus als hättest du noch keinen Artikel in deinen Warenkorb
          gelegt
        </Text>
        <Button
          variant="filled"
          size={mdScreen ? "md" : "sm"}
          className={classes.button}
          onClick={() => {
            navigate("/produkte");
          }}
        >
          Zu unseren Produkten
        </Button>
      </Stack>
    </Container>
  );
}
