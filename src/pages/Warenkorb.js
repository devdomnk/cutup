import React, { useEffect, useState } from "react";
import { Container, createStyles, Group } from "@mantine/core";
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
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container size="xl" className={classes.inner}>
        {shoppingCart.length > 0 ? (
          <Group
            noWrap={xlScreen}
            position={"apart"}
            align={"flex-start"}
            spacing={20}
            sx={{
              marginTop: smScreen ? -136 : -110,
              marginBottom: 80,
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
        ) : (
          <EmptyCart />
        )}
      </Container>
    </motion.div>
  );
}
