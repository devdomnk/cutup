import {
  Group,
  Image,
  Title,
  Stack,
  Text,
  Checkbox,
  createStyles,
} from "@mantine/core";
import React from "react";

export default function ShippingCard({
  imageSrc,
  name,
  price,
  selectedShippingCard,
  setSelectedShippingCard,
}) {
  const checked = selectedShippingCard === name;

  const useStyles = createStyles((theme) => ({
    container: {
      width: 260,
      padding: "14px 10px",
      borderRadius: 4,
      border: `1px solid ${
        checked ? theme.colors.primary[3] : theme.colors.gray[3]
      }`,
      backgroundColor: checked ? `${theme.colors.primary[3]}15` : theme.white,
      cursor: "pointer",
      transition: "all eases-in-out .2s",
    },
    heading: {
      fontWeight: 600,
      fontSize: 14,
      whiteSpace: "nowrap",
    },
    price: {
      fontSize: 12,
      color: theme.colors.gray[9],
      marginTop: -6,
      whiteSpace: "nowrap",
    },
    checkbox: {
      cursor: "pointer",
    },
  }));
  const { classes } = useStyles();

  return (
    <Group
      className={classes.container}
      align={"center"}
      position={"apart"}
      onClick={() => {
        setSelectedShippingCard(name);
      }}
    >
      <Group noWrap>
        <Image src={imageSrc} height={25} fit={"contain"} />
        <Stack spacing={0}>
          <Title className={classes.heading}>{name}</Title>
          <Text className={classes.price}>{price} €</Text>
        </Stack>
      </Group>
      <Checkbox className={classes.checkbox} checked={checked} />
    </Group>
  );
}
