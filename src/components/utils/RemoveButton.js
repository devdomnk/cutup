import { Button, useMantineTheme } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import React from "react";
import { useSmScreen } from "../context/mediaQueryContext";
import {
  useShoppingCart,
  useUpdateShoppingCart,
} from "../context/shoppingCartContext";

export default function RemoveButton({ id }) {
  const theme = useMantineTheme();
  const shoppingCart = useShoppingCart();
  const updateShoppingCart = useUpdateShoppingCart();
  const smScreen = useSmScreen();

  return (
    <Button
      variant="subtle"
      leftIcon={<IconTrash size={smScreen ? 22 : 19} />}
      color={theme.colors.primary[3]}
      size={"sm"}
      px={2}
      styles={{
        leftIcon: { marginRight: 2 },
        root: { fontSize: smScreen ? 14 : 13 },
      }}
      onClick={() => {
        updateShoppingCart(shoppingCart.filter((item) => item.objectID !== id));
      }}
    >
      Entfernen
    </Button>
  );
}
