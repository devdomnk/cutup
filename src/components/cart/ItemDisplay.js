import React from "react";
import {
  Container,
  Group,
  Title,
  Divider,
  createStyles,
  useMantineTheme,
  Stack,
} from "@mantine/core";
import { IconListDetails } from "@tabler/icons";

import { useShoppingCart } from "../context/shoppingCartContext";
import ItemDisplayArticle from "./ItemDisplayArticle";
import { useSmScreen } from "../context/mediaQueryContext";
import { v4 as uuidv4 } from "uuid";

const useStyles = createStyles((theme) => ({
  container: {
    width: 850,
    position: "relative",
    marginLeft: 0,
    marginRight: 0,

    [theme.fn.smallerThan(1250)]: {
      marginLeft: "auto",
      marginRight: "auto",
    },

    [theme.fn.largerThan(1250)]: {
      minHeight: 384,
    },
    [theme.fn.largerThan("sm")]: {
      padding: "28px 40px 55px",
      borderRadius: 8,
      backgroundColor: "#fdfdfd",
    },
    [theme.fn.smallerThan("sm")]: {
      marginTop: 130,
      marginBottom: 40,
      paddingTop: 10,
    },
  },
  sectionHeading: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: 700,
    zIndex: 1,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 18,
    },
  },
  mobileBackground: {
    position: "absolute",
    width: "300vw",
    height: "3000px",
    top: -175,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 0,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function ItemDisplay({ availableColors }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const shoppingCart = useShoppingCart();
  const smScreen = useSmScreen();

  console.log(shoppingCart);

  return (
    <Container className={`${classes.container} ${smScreen ? "shadow" : ""}`}>
      <svg
        width="359"
        height="555"
        viewBox="0 0 359 555"
        fill="none"
        preserveAspectRatio="none"
        className={classes.mobileBackground}
      >
        <path d="M359 0L0 24.6667V555H359V0Z" fill="white" />
      </svg>
      <Group align={"center"} spacing={6}>
        <IconListDetails
          color={theme.colors.primary[3]}
          style={{ zIndex: 1 }}
        />
        <Title className={classes.sectionHeading}>Die Artikel</Title>
      </Group>

      <Divider
        mt={10}
        mb={50}
        color={theme.colors.gray[2]}
        styles={{ root: { position: "relative" } }}
      />
      <Stack spacing={10}>
        {shoppingCart.map((item, index) => (
          <>
            <ItemDisplayArticle
              key={uuidv4()}
              name={item.fileName}
              price={item.price}
              color={item.color.hex}
              material={item.material}
              resolution={item.resolution}
              imageSrc={item.image}
              id={item.objectID}
              count={item.count}
              density={item.density}
              availableColors={availableColors}
            />
            {item == shoppingCart[shoppingCart.length - 1] ? null : (
              <Divider
                mt={50}
                mb={50}
                color={theme.colors.gray[2]}
                styles={{ root: { position: "relative" } }}
              />
            )}
          </>
        ))}
      </Stack>
    </Container>
  );
}
