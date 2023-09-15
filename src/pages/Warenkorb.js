import React, { useEffect, useState } from "react";
import { Container, createStyles, Group, Stack, Text } from "@mantine/core";
import ShoppingCart from "../components/payment/ShoppingCart.js";
import { useShoppingCart } from "../components/context/shoppingCartContext.js";
import EmptyCart from "../components/payment/EmptyCart.js";
import ItemDisplay from "../components/payment/ItemDisplay.js";
import { collection, getDocs } from "firebase/firestore";
import {
  useSmScreen,
  useXlScreen,
} from "../components/context/mediaQueryContext.js";
import { useFirestore } from "../components/context/firebaseContext.js";
import { motion } from "framer-motion";
import ArrowButton from "../components/utils/ArrowButton.js";
import RecommendationCard from "../components/utils/RecommendationCard.js";

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
}));

export default function Warenkorb() {
  const { classes } = useStyles();
  const shoppingCart = useShoppingCart();
  const xlScreen = useXlScreen();
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
            <Group noWrap mb={96} spacing={80} align="start">
              <Stack spacing={14} sx={{ maxWidth: 300 }}>
                <Text size={28} weight={"bold"} sx={{ lineHeight: 1.295 }}>
                  Was dir auch gefallen könnte
                </Text>
                <Text size={14} weight={"lighter"} mb={33}>
                  Wir haben noch viele weitere Modelle im Angebot, hier ist eine
                  Auswahl unserer beliebtesten Objekte
                </Text>
                <ArrowButton
                  text={"weitere Modelle"}
                  destination={"/produkte"}
                  isSmall
                />
              </Stack>
              <Group>
                <RecommendationCard
                  name={"3DBenchy"}
                  description={
                    "Dekorativer Geist, der jeden Schreibtisch etwas gruseliger werden lässt"
                  }
                  price={8.5}
                />
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
