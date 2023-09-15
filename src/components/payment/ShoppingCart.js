import React, { useEffect, useState } from "react";
import {
  Container,
  Group,
  Title,
  Divider,
  createStyles,
  useMantineTheme,
  Stack,
  Text,
  Button,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import ShoppingCartItem from "./ShoppingCartItem";
import { useShoppingCart } from "../context/shoppingCartContext";
import { useFirestore, useUser } from "../context/firebaseContext";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { useSmScreen } from "../context/mediaQueryContext";

export default function ShoppingCart() {
  const theme = useMantineTheme();
  const shoppingCart = useShoppingCart();
  const firestore = useFirestore();
  const user = useUser();
  const [fullPrice, setFullPrice] = useState(
    shoppingCart.reduce((prev, curr) => prev + curr.price * curr.count, 0)
  );
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const smScreen = useSmScreen();

  const useStyles = createStyles((theme) => ({
    container: {
      position: "sticky",
      top: 120,
      marginBottom: 90,
      alignSelf: "flex-start",
      marginLeft: 0,
      marginRight: 0,

      [theme.fn.smallerThan(1250)]: {
        position: "unset",
        width: 850,
        marginLeft: "auto",
        marginRight: "auto",
      },

      [theme.fn.largerThan("sm")]: {
        padding: "28px 30px 30px",
        borderRadius: 8,
        backgroundColor: "#fdfdfd",
        marginBottom: 0,
      },
    },
    itemStack: {
      maxHeight: 470,
      overflowY: shoppingCart.length > 5 ? "scroll" : "hidden",
      overflowX: "hidden",
      boxSizing: "content-box",
    },
    sectionHeading: {
      marginTop: 6,
      fontSize: 20,
      fontWeight: 700,
      [theme.fn.smallerThan("sm")]: {
        fontSize: 18,
      },
    },
    sum: {
      fontSize: 22,
      fontWeight: 600,
      color: theme.colors.gray[8],
      [theme.fn.smallerThan("sm")]: {
        fontSize: 17,
      },
    },
    grayedText: {
      fontWeight: 400,
      color: theme.colors.gray[6],
      fontSize: 13,
      [theme.fn.smallerThan("sm")]: {
        fontSize: 11,
      },
    },
    normalText: {
      marginTop: 3,
      fontWeight: 600,
      color: theme.colors.gray[8],
      fontSize: 15,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 13,
      },
    },
    currency: {
      fontWeight: 600,
      color: theme.colors.gray[8],
      fontSize: 15,
    },
  }));
  const { classes } = useStyles();

  useEffect(() => {
    setFullPrice(
      shoppingCart.reduce((prev, curr) => prev + curr.price * curr.count, 0)
    );
  }, [setFullPrice, shoppingCart]);

  async function createPayment() {
    /* const shoppingCartMetadata = shoppingCart.forEach((item, index) => {
      return {
        [`color${index++}`]: item.color.name,
      };
    }); */

    const docRef = collection(
      firestore,
      "customers",
      user.uid,
      "checkout_sessions"
    );
    await addDoc(docRef, {
      automatic_tax: false,
      tax_id_collection: false,
      collect_shipping_address: true,
      allow_promotion_codes: true,
      line_items: shoppingCart.map((item) => {
        /* if (item.custom) { */
        return {
          price_data: {
            unit_amount: item.price * 100,
            currency: "eur",
            tax_behavior: "inclusive",
            product_data: {
              name: item.fileName,
              /* images: [item.image], */
              metadata: {
                color: item.color.name,
                hex: item.color.hex,
                density: item.density,
                resolution: item.resolution,
                material: item.material,
                scale: item.scale,
                measurementX: item.measurements.x,
                measurementY: item.measurements.y,
                measurementZ: item.measurements.z,
                ref: item.storageref._location.path,
              },
            },
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
          quantity: item.count,
          /* tax_rates: ["txr_1M32MYDGH7OzcNzcMPPSEfAZ"], */
        };
        /*} else {
          return {
            price: item.priceID,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
            quantity: item.count,
          };
        } */
      }),

      mode: "payment",
      payment_method_types: ["sofort", "card", "sepa_debit"],
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      metadata: {
        uid: user.uid,
      },
    }).then((res) => {
      onSnapshot(doc(firestore, res.path), (doc) => {
        if (doc.data().error?.message) alert(doc.data().error.message);
        if (doc.data().url) window.location.assign(doc.data().url);
      });
    });
  }
  /* console.log({ ...shoppingCart[0] }); */

  return (
    <Container className={`${classes.container} ${smScreen ? "shadow" : ""}`}>
      <Group align={"center"} spacing={smScreen ? 6 : 4}>
        <IconShoppingCart color={theme.colors.primary[3]} />
        <Title className={classes.sectionHeading}>Dein Warenkorb</Title>
      </Group>
      <Divider
        mt={10}
        mb={30}
        color={smScreen ? theme.colors.gray[2] : "#CACACA"}
      />
      <Stack
        align={"stretch"}
        spacing={10}
        className={`${classes.itemStack} scrollbar`}
      >
        {shoppingCart.map((item) => (
          <ShoppingCartItem
            key={item.objectID}
            name={item.fileName}
            price={item.price}
            color={item.color.name}
            material={item.material}
            resolution={item.resolution}
            imageSrc={item.image}
            id={item.objectID}
            count={item.count}
          />
        ))}
      </Stack>

      <Divider
        mt={30}
        mb={30}
        color={smScreen ? theme.colors.gray[2] : "#CACACA"}
      />
      <Group position="apart" px={6} align="center">
        <Text className={classes.normalText}>Zwischensumme</Text>
        <Group align={"end"} spacing={6}>
          <Text className={classes.grayedText} mb={3}>
            EUR
          </Text>
          <Text className={classes.sum}>
            {new Intl.NumberFormat("de-De", {
              style: "currency",
              currency: "EUR",
            }).format(fullPrice)}
          </Text>
        </Group>
      </Group>
      <Button
        sx={{
          width: "100%",
          [theme.fn.smallerThan("sm")]: {
            height: 38,
            fontSize: 15,
          },
        }}
        size={smScreen ? "md" : "xs"}
        variant="gradient"
        mt={30}
        radius={8}
        onClick={() => {
          setIsButtonLoading(true);
          createPayment();
        }}
        loading={isButtonLoading}
      >
        Zur Kasse
      </Button>
    </Container>
  );
}
