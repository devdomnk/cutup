import { Card, Text, createStyles, ActionIcon, Image } from "@mantine/core";
import { IconDots } from "@tabler/icons";
import React from "react";
import { ArrowNarrowRight } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  Card: {
    width: 300,
    height: 330,
    display: "flex",
    flexDirection: "column",
    gap: 30,
    cursor: "pointer",
    transition: "all ease-in-out .1s",
    "&:hover": { transform: "scale(1.015)" },
  },
  CardHeader: {
    borderBottom: `0.5px solid ${theme.colors.gray[2]}`,
    padding: `10px`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.gray[1],
    padding: "8px 10px",
  },
  primaryColor: {
    color: theme.colors.primary[3],
  },
}));

export default function ProductCard({ name, preview, price }) {
  const { classes } = useStyles();
  return (
    <Card shadow={"md"} p='md' radius={"md"} className={classes.Card}>
      <Card.Section className={classes.CardHeader}>
        <Text>{name}</Text>
        <ActionIcon>
          <IconDots />
        </ActionIcon>
      </Card.Section>
      <Card.Section px={50} my={"auto"}>
        <Image src={preview} />
      </Card.Section>
      <Card.Section className={classes.CardFooter}>
        <Text size={"sm"} weight={500} className={classes.primaryColor}>
          ab {price}€
        </Text>
        <ArrowNarrowRight className={classes.primaryColor} />
      </Card.Section>
    </Card>
  );
}
