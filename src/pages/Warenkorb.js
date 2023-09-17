import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Container,
  createStyles,
  Group,
  Stack,
  Text,
  useMantineTheme,
  Title,
  Divider,
} from "@mantine/core";
import ShoppingCart from "../components/payment/ShoppingCart.js";
import { useShoppingCart } from "../components/context/shoppingCartContext.js";
import EmptyCart from "../components/payment/EmptyCart.js";
import ItemDisplay from "../components/payment/ItemDisplay.js";
import {
  useMdScreen,
  useSmScreen,
  useXlScreen,
} from "../components/context/mediaQueryContext.js";
import { useFirestore } from "../components/context/firebaseContext.js";
import { motion } from "framer-motion";
import ArrowButton from "../components/utils/ArrowButton.js";
import RecommendationCard from "../components/utils/RecommendationCard.js";
import { IconGift } from "@tabler/icons";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";

const useStyles = createStyles((theme) => ({
  inner: {
    overflow: "visible",
    width: "100%",
    padding: "0 8px",
    [theme.fn.smallerThan("sm")]: {
      paddingLeft: "0",
      paddingRight: "0",
    },
  },
  recommendedContainer: {
    position: "relative",

    marginBottom: 96,
    [theme.fn.smallerThan(1250)]: {
      maxWidth: 850,
      margin: "0 auto 96px",
    },
    [theme.fn.smallerThan("sm")]: {
      marginBottom: 96,
      padding: "0 16px",
      flexDirection: "column",
      backgroundColor: theme.white,
      overflow: "clip",
    },
  },
  recommendedStack: {
    maxWidth: 340,
    [theme.fn.smallerThan(1250)]: {
      maxWidth: 313,
    },
    [theme.fn.smallerThan("md")]: {
      maxWidth: 230,
    },
  },
  recommendedHeading: {
    [theme.fn.smallerThan("md")]: {
      fontSize: 28,
    },
  },
  recommendedText: {
    [theme.fn.smallerThan("md")]: {
      fontSize: 13,
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
}));

export default function Warenkorb() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const shoppingCart = useShoppingCart();
  const xlScreen = useXlScreen();
  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();
  const firestore = useFirestore();

  const [availableColors, setAvailableColors] = useState([]);

  useEffect(() => {
    async function getAvailableColors() {
      const colorSnapshot = await getDocs(collection(firestore, "Colors"));
      setAvailableColors([]);

      colorSnapshot.forEach((doc) => {
        setAvailableColors((prev) => [
          ...prev,
          {
            label: doc.id,
            value: doc.data().hex,
            resin: doc.data().Resin ? true : false,
            pla: doc.data().PLA ? true : false,
          },
        ]);
      });
    }
    getAvailableColors();
  }, [firestore]);

  const [recommendations, setrecommendations] = useState([
    <RecommendationCard key={uuidv4()} />,
    <RecommendationCard key={uuidv4()} />,

    <RecommendationCard key={uuidv4()} />,
    <RecommendationCard key={uuidv4()} />,
    <RecommendationCard key={uuidv4()} />,
  ]);

  useLayoutEffect(() => {
    async function fetchItems() {
      const ItemCollection = collection(firestore, "products");
      const productsQuery = query(
        ItemCollection,
        where("active", "==", true),
        limit(5)
      );
      const productsRes = await getDocs(productsQuery);

      const prices = [];
      const pricesSnapshot = await getDocs(
        query(collectionGroup(firestore, "prices"))
      );
      pricesSnapshot.forEach((price) => {
        prices.push({
          id: price.id,
          product: price.data().product,
          amount: price.data().unit_amount,
        });
      });

      const items = [];
      productsRes.forEach((item) => {
        items.push({
          name: item.data().name,
          description: item.data().description,
          images: item.data().images,
          price:
            prices.find((price) => price.product === item.id)?.amount / 100,
          priceID: prices.find((price) => price.product === item.id)?.id,
        });
      });

      return items;
    }

    let productCards = [];
    fetchItems().then((res) => {
      res.forEach((item) => {
        productCards = [
          ...productCards,
          <RecommendationCard
            key={uuidv4()}
            name={item.name}
            description={item.description}
            image={item.images[0]}
            price={item.price}
            priceID={item.priceID}
          />,
        ];
      });
      setrecommendations(productCards);
    });
  }, [firestore]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container size="xl" className={classes.inner}>
        {shoppingCart.length > 0 ? (
          <>
            <Group
              noWrap={xlScreen}
              position={"apart"}
              align={"flex-start"}
              spacing={20}
              sx={{
                marginTop: smScreen ? -136 : -110,
                marginBottom: 96,
                overflow: "visible",
              }}
            >
              {xlScreen ? (
                <>
                  <ItemDisplay availableColors={availableColors} />
                  <ShoppingCart />
                </>
              ) : (
                <>
                  <ShoppingCart />
                  <ItemDisplay availableColors={availableColors} />
                </>
              )}
            </Group>
            <Group
              noWrap
              position="apart"
              spacing={mdScreen ? 10 : 30}
              align={smScreen ? "start" : "center"}
              className={classes.recommendedContainer}
            >
              {smScreen && (
                <Stack spacing={14} className={classes.recommendedStack}>
                  <Text
                    size={32}
                    weight={"bold"}
                    sx={{ lineHeight: 1.295 }}
                    color={theme.colors.gray[9]}
                    className={classes.recommendedHeading}
                  >
                    Was dir auch gefallen könnte
                  </Text>
                  <Text
                    size={14}
                    weight={"light"}
                    mb={33}
                    color={theme.colors.gray[8]}
                    className={classes.recommendedText}
                  >
                    Wir haben noch viele weitere Modelle im Angebot, hier ist
                    eine Auswahl unserer beliebtesten Objekte
                  </Text>
                  <ArrowButton
                    text={"weitere Modelle"}
                    destination={"/produkte"}
                    isSmall
                  />
                </Stack>
              )}
              {!smScreen && (
                <div style={{ width: "100%" }}>
                  <Group align={"center"} spacing={6}>
                    <IconGift
                      color={theme.colors.primary[3]}
                      style={{ zIndex: 1 }}
                    />
                    <Title className={classes.sectionHeading}>
                      Könnte dir auch gefallen
                    </Title>
                  </Group>
                  <Divider
                    mt={10}
                    color={theme.colors.gray[2]}
                    styles={{ root: { position: "relative" } }}
                  />
                </div>
              )}
              <Group
                pt={smScreen ? 0 : 10}
                px={smScreen ? 0 : 10}
                position={smScreen ? "right" : "center"}
                spacing={smScreen ? 36 : 24}
                sx={{ maxHeight: smScreen ? 310 : 320 /* overflow: "clip" */ }}
              >
                <AnimatePresence mode="wait">{recommendations}</AnimatePresence>
              </Group>
            </Group>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </motion.div>
  );
}
