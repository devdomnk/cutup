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
import ShoppingCart from "../components/cart/ShoppingCart.js";
import { useShoppingCart } from "../components/context/shoppingCartContext.js";
import EmptyCart from "../components/cart/EmptyCart.js";
import ItemDisplay from "../components/cart/ItemDisplay.js";
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
import RecommendedSection from "../components/cart/RecommendedSection.js";

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
            <RecommendedSection />
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </motion.div>
  );
}
