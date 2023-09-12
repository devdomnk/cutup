import {
  Badge,
  Container,
  Image,
  Group,
  Text,
  Stack,
  createStyles,
  useMantineTheme,
  ActionIcon,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconX } from "@tabler/icons";
import React from "react";
import { useConfiguratorItem } from "../context/configuratorContext";
import { useXlScreen } from "../context/mediaQueryContext";
import {
  useShoppingCart,
  useUpdateShoppingCart,
} from "../context/shoppingCartContext";

const materialMap = {
  pla: "Kunststoff",
  resin: "Harz",
  "Beste Option": "Beste Option",
};

const resolutionMap = {
  0.1: "Fein",
  0.2: "Mittel",
  0.4: "Grob",
};

export default function ShoppingCartItem({
  name,
  price,
  imageSrc,
  color,
  material,
  resolution,
  count,
  id,
}) {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const updateShoppingCart = useUpdateShoppingCart();
  const shoppingCart = useShoppingCart();
  const xlScreen = useXlScreen();

  const useStyles = createStyles((theme) => ({
    container: {
      position: "relative",
      width: xlScreen ? 340 : "unset",
      cursor: "pointer",
      padding: "6px 0",

      [theme.fn.largerThan("sm")]: {
        padding: 6,
        borderRadius: 8,
        "&:hover": {
          backgroundColor: theme.colors.gray[0],
        },
      },
    },
    imageContainer: {
      position: "relative",
      padding: 6,
      borderRadius: 8,
      backgroundColor: theme.white,

      [theme.fn.largerThan("sm")]: {
        padding: 12,
        border: `1px solid ${theme.colors.gray[2]}`,
      },
    },
    badge: {
      position: "absolute",
      top: 4,
      right: 4,
      padding: 6,
      translate: "50% -50%",
      backgroundColor: theme.colors.primary[3],
      color: theme.white,

      [theme.fn.largerThan("sm")]: {
        border: `1px solid ${theme.colors.gray[2]}`,
        backgroundColor: theme.white,
        color: theme.colors.gray[8],
        padding: 7,
      },
    },
    itemName: {
      fontWeight: 700,
      color: theme.colors.gray[8],
      fontSize: 16,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 15,
      },
    },
    itemDetails: {
      fontWeight: 400,
      color: theme.colors.gray[7],
      fontSize: 13,
      [theme.fn.smallerThan("sm")]: {
        fontSize: 12,
      },
    },
    currency: {
      fontWeight: 600,
      color: theme.colors.gray[8],
      fontSize: 16,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 15,
      },
    },
    removeButton: {
      display: hovered ? "flex" : "none",
      position: "absolute",
      top: 0,
      right: 0,
      translate: "30% -20%",
      borderRadius: "50%",
      backgroundColor: theme.colors.red[5],
      ":hover": {
        backgroundColor: theme.colors.red[6],
      },
    },
  }));
  const { classes } = useStyles();

  function removeItemFromShoppingCart(id) {
    updateShoppingCart(shoppingCart.filter((item) => item.objectID !== id));
  }

  return (
    <Group noWrap position='apart' className={classes.container} ref={ref}>
      {/* <ActionIcon className={classes.removeButton} size={"sm"}>
        <IconX
          size={12}
          color={theme.white}
          stroke={3.5}
          onClick={() => {
            removeItemFromShoppingCart(id);
          }}
        />
      </ActionIcon> */}
      <Group noWrap spacing={20}>
        <div className={classes.imageContainer}>
          <Image src={imageSrc} width={48} height={48} />
          <Badge variant='outline' className={classes.badge}>
            {count}
          </Badge>
        </div>

        <Stack spacing={0}>
          <Text className={classes.itemName}>{name}</Text>
          <Text className={classes.itemDetails}>
            {materialMap[material]} | {resolutionMap[resolution]}
          </Text>
        </Stack>
      </Group>
      <Text className={classes.currency}>
        {new Intl.NumberFormat("de-De", {
          style: "currency",
          currency: "EUR",
        }).format(price * count)}
      </Text>
    </Group>
  );
}
