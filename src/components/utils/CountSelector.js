import { useState } from "react";
import {
  NumberInput,
  Group,
  ActionIcon,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";
import {
  useShoppingCart,
  useUpdateShoppingCart,
} from "../context/shoppingCartContext";
import { useSmScreen } from "../context/mediaQueryContext";

const useStyles = createStyles((theme) => ({
  container: {
    border: `1px solid ${theme.colors.gray[3]}`,
    borderRadius: 8,
    padding: "0px 6px 1px 6px",

    [theme.fn.smallerThan("sm")]: {
      padding: "0px 4px",
    },
  },
}));

export default function CountSelector({ count, id }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const shoppingCart = useShoppingCart();
  const updateShoppingCart = useUpdateShoppingCart();
  const smScreen = useSmScreen();

  const [value, setValue] = useState(count);

  return (
    <Group spacing={smScreen ? 5 : 0} noWrap className={classes.container}>
      <ActionIcon
        size={18}
        variant="subtle"
        onClick={() => {
          setValue((prev) => (prev > 1 ? prev - 1 : prev));
          const updatedCart = shoppingCart.map((item) => {
            if (item.objectID === id) {
              return { ...item, count: value > 1 ? value - 1 : value };
            } else return item;
          });
          updateShoppingCart(updatedCart);
        }}
        color={theme.colors.primary[3]}
      >
        <IconMinus />
      </ActionIcon>

      <NumberInput
        hideControls
        value={value}
        onChange={(val) => setValue(val)}
        max={10}
        min={0}
        step={1}
        styles={(theme) => ({
          wrapper: { height: 29 },
          input: {
            width: 20,
            textAlign: "center",
            border: "none",
            fontSize: 13,
            padding: 0,
            [theme.fn.smallerThan("sm")]: {
              background: "transparent",
              marginTop: -2,
            },
          },
        })}
        size={"xs"}
      />

      <ActionIcon
        size={18}
        variant="subtle"
        onClick={() => {
          setValue((prev) => (prev < 10 ? prev + 1 : prev));
          const updatedCart = shoppingCart.map((item) => {
            if (item.objectID === id) {
              return { ...item, count: value < 10 ? value + 1 : value };
            } else return item;
          });
          updateShoppingCart(updatedCart);
        }}
        color={theme.colors.primary[3]}
      >
        <IconPlus />
      </ActionIcon>
    </Group>
  );
}
