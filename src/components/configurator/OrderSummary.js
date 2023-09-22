import {
  Group,
  Container,
  Stack,
  Title,
  Text,
  Button,
  createStyles,
} from "@mantine/core";
import React, { useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  useShoppingCart,
  useUpdateShoppingCart,
} from "../context/shoppingCartContext";
import {
  useConfiguratorItem,
  useSetConfiguratorItem,
} from "../context/configuratorContext";
import {
  useLgScreen,
  useMdScreen,
  useSmScreen,
  useXsScreen,
} from "../context/mediaQueryContext";
import { useFirestore, useUser } from "../context/firebaseContext";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const useStyles = createStyles((theme) => ({
  heading: {
    fontSize: 48,
    fontWeight: 800,
    color: theme.colors.dark[8],
    letterSpacing: -0.5,
    [theme.fn.smallerThan("lg")]: {
      fontSize: 43,
    },
    [theme.fn.smallerThan("lg")]: {
      fontSize: 38,
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: 34,
    },
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    gap: 80,
    padding: 0,
    marginTop: 70,
    width: "100%",
    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
      alignItems: "center",
      gap: 170,
    },
  },
  primary: {
    color: theme.colors.primary[3],
  },
  whiteBackground: {
    position: "absolute",
    width: "100vw",
    height: "1000px",
    top: -100,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 0,
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));

export default function OrderSummary({ objectData, nextStep }) {
  const { classes } = useStyles();
  const updateShoppingCart = useUpdateShoppingCart();
  const [objectImage, setObjectImage] = useState();
  const SetConfiguratorItem = useSetConfiguratorItem();
  const configuratorItem = useConfiguratorItem();
  const navigate = useNavigate();

  function addObjectToShoppingCart() {
    setObjectImage();
    console.log(configuratorItem);
    updateShoppingCart((prev) => [
      ...prev,
      {
        fileName: objectData.fileName,
        objectID: objectData.objectID,
        storageref: objectData.storageref,
        color: {
          hex: objectData.color.hex,
          name: objectData.color.name,
        },
        material: objectData.material,
        scale: objectData.scale,
        resolution: objectData.resolution,
        density: objectData.density,
        price: objectData.price,
        measurements: {
          x: objectData.measurements.x,
          y: objectData.measurements.y,
          z: objectData.measurements.z,
        },
        image: configuratorItem?.image || objectImage,
        priceID: configuratorItem?.priceID || null,
        custom: !configuratorItem,
        count: 1,
      },
    ]);
    SetConfiguratorItem();
  }

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const shoppingCart = useShoppingCart();
  const firestore = useFirestore();
  const user = useUser();
  async function createPayment() {
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
      line_items: [
        {
          price_data: {
            unit_amount: objectData.price * 100,
            currency: "eur",
            tax_behavior: "inclusive",
            product_data: {
              name: objectData.fileName,
              /* images: [item.image], */
              metadata: {
                color: objectData.color.name,
                hex: objectData.color.hex,
                density: objectData.density,
                resolution: objectData.resolution,
                material: objectData.material,
                scale: objectData.scale,
                measurementX: objectData.measurements.x,
                measurementY: objectData.measurements.y,
                measurementZ: objectData.measurements.z,
                ref: objectData.storageref._location.path_,
              },
            },
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 10,
          },
          quantity: objectData.count,
        },
      ],
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      mode: "payment",
      metadata: { uid: user.uid },
      payment_method_types: ["sofort", "card", "sepa_debit"],
    }).then((res) => {
      onSnapshot(doc(firestore, res.path), (doc) => {
        if (doc.data().error?.message) alert(doc.data().error.message);
        if (doc.data().url) window.location.assign(doc.data().url);
      });
    });
  }

  const lgScreen = useLgScreen();
  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();
  const xsScreen = useXsScreen();

  return (
    <Container className={classes.container} size="xl">
      <Stack
        sx={(theme) => ({
          width: 600,
          [theme.fn.smallerThan("md")]: { width: "unset", maxWidth: 470 },
        })}
        align="flex-start"
        spacing={20}
      >
        <Title className={classes.heading}>
          Wir drucken dein Objekt für{" "}
          <span className={classes.primary}>{objectData.price} €</span>
        </Title>
        <Text weight={500} size={lgScreen ? "md" : smScreen ? "sm" : "xs"}>
          Lege es in den Warenkorb und erhalte es bei Bestellung innerhalb der
          nächsten Wochen. Mit einer Bestellung akzeptierst du unsere{" "}
          <span className={classes.primary}>Geschäftsbedingungen</span>.
        </Text>
        <Group noWrap>
          <Button
            loading={isButtonLoading}
            size={smScreen ? "md" : xsScreen ? "sm" : "xs"}
            variant="gradient"
            mt={20}
            radius={8}
            onClick={() => {
              setIsButtonLoading(true);
              createPayment();
            }}
            sx={(theme) => ({
              [theme.fn.smallerThan("sm")]: {
                height: 38,
                fontSize: 14,
              },
              [theme.fn.smallerThan("xs")]: {
                fontSize: 13,
              },
            })}
          >
            Zur Kasse
          </Button>
          <Button
            size={smScreen ? "md" : xsScreen ? "sm" : "xs"}
            variant="outline"
            mt={20}
            radius={8}
            onClick={() => {
              addObjectToShoppingCart();
              navigate("/warenkorb");
            }}
            sx={(theme) => ({
              [theme.fn.smallerThan("sm")]: {
                height: 38,
                fontSize: 14,
              },
              [theme.fn.smallerThan("xs")]: {
                fontSize: 13,
              },
            })}
          >
            In den Warenkorb
          </Button>
        </Group>
      </Stack>
      <Stack
        mt={10}
        spacing={8}
        sx={(theme) => ({
          position: "relative",
          [theme.fn.smallerThan("sm")]: { width: "100%" },
        })}
      >
        <svg
          width="359"
          height="555"
          viewBox="0 0 359 555"
          fill="none"
          preserveAspectRatio="none"
          className={classes.whiteBackground}
        >
          <path d="M359 0L0 24.6667V555H359V0Z" fill="white" />
        </svg>
        <AnimatePresence mode="wait">
          <SummaryCard
            material={objectData.material}
            color={objectData.color}
            resolution={objectData.resolution}
            density={objectData.density}
            measurements={objectData.measurements}
            scale={objectData.scale}
            storageref={objectData.storageref}
            name={objectData.fileName}
            custom={!configuratorItem}
            objectImage={objectImage}
            setObjectImage={setObjectImage}
          />
        </AnimatePresence>
      </Stack>
    </Container>
  );
}
