import {
  Group,
  Stack,
  Title,
  Text,
  Container,
  createStyles,
  useMantineTheme,
  Image,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { CarouselCard } from "../components/utils/CarouselCard.js";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useSmScreen } from "../components/context/mediaQueryContext.js";
import { useFirestore } from "../components/context/firebaseContext.js";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
  },
  text: {
    width: "65ch",
    [theme.fn.smallerThan("xl")]: {
      width: "52ch",
    },
    [theme.fn.smallerThan("lg")]: {
      maxWidth: "40ch",
    },
    [theme.fn.smallerThan("md")]: {
      marginTop: 12,
      fontSize: theme.fontSizes.xs,
    },
    [theme.fn.smallerThan("sm")]: {
      width: "unset",
      fontSize: theme.fontSizes.xs,
    },
  },
  scrollText: {
    color: theme.colors.primary[3],
    fontWeight: 800,
    fontSize: 16,
    [theme.fn.smallerThan("sm")]: {
      fontSize: theme.fontSizes.xs,
    },
  },
  scrollIcon: {
    [theme.fn.smallerThan("sm")]: {
      height: 22,
      marginRight: -10,
    },
  },
  heading: {
    maxWidth: "24ch",
    fontSize: 52,
    fontWeight: 800,
    color: theme.colors.dark[8],
    letterSpacing: -0.5,
    [theme.fn.smallerThan("xl")]: {
      width: "12ch",
    },
    [theme.fn.smallerThan("lg")]: {
      width: "unset",
    },
    [theme.fn.smallerThan("md")]: {
      fontSize: 43,
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: 34,
    },
  },
  heroIcon: {
    [theme.fn.smallerThan("lg")]: {
      display: "none",
    },
  },
  icon: {
    height: 44,
    width: 44,
    backgroundColor: theme.white,
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  gradient: {
    background:
      "linear-gradient(0.25turn, #6723F5 0%, #8724F5 32.81%, #B224F5 100%)",
    backgroundClip: "text",
    color: "rgba(0,0,0,0)",
  },
}));

export default function Produkte() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const firestore = useFirestore();
  const smScreen = useSmScreen();

  const [products, setProducts] = useState([
    <CarouselCard key={uuidv4()} />,
    <CarouselCard key={uuidv4()} />,
    <CarouselCard key={uuidv4()} />,
    <CarouselCard key={uuidv4()} />,
    <CarouselCard key={uuidv4()} />,
    <CarouselCard key={uuidv4()} />,
  ]);

  useEffect(() => {
    async function fetchItems() {
      const ItemCollection = collection(firestore, "products");
      const productsQuery = query(ItemCollection, where("active", "==", true));
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
          id: item.id,
          name: item.data().name,
          description: item.data().description,
          images: item.data().images,
          price:
            prices.find((price) => price.product === item.id)?.amount / 100,
          priceID: prices.find((price) => price.product === item.id)?.id,
          rating: Math.random().toFixed(1) * 5,
        });
      });

      return items;
    }

    let productCards = [];
    fetchItems().then((res) => {
      res.forEach((item) => {
        productCards = [
          ...productCards,
          <CarouselCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            images={item.images}
            price={item.price}
            priceID={item.priceID}
            rating={item.rating}
          />,
        ];
      });
      setProducts(productCards);
    });
  }, [firestore]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container
        size={"xl"}
        className={classes.inner}
        sx={(theme) => ({
          height: 440,
          marginTop: -180,
          display: "flex",
          justifyContent: "space-between",
          gap: 64,
          [theme.fn.smallerThan("lg")]: {
            height: "unset",
            marginTop: -200,
          },
          [theme.fn.smallerThan("sm")]: {
            marginTop: -220,
            marginBottom: 20,
          },
        })}
      >
        <Stack spacing={10} mt={100}>
          <Title order={1} className={classes.heading}>
            Vorgefertigte Zeichnungen
          </Title>
          <Text size="sm" weight={500} className={classes.text}>
            {smScreen
              ? "Einfach und bequem ein Objekt auswählen, konfigurieren und ab in den Warenkorb. Ganz ohne den Aufwand Dateien im Internet zu finden."
              : "Bequem Objekt wählen und ab in den Warenkorb. Ganz ohne den Aufwand Dateien im Internet zu finden."}
          </Text>
          <Group
            mt={smScreen ? 60 : 30}
            sx={(theme) => ({
              [theme.fn.smallerThan("xl")]: { display: "none" },
            })}
          >
            <svg
              className={classes.scrollIcon}
              width="19"
              height="32"
              viewBox="0 0 19 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="16.5806"
                height="30"
                rx="8.29032"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
              />
              <circle
                cx="9.30005"
                cy="9.5"
                r="4.5"
                fill={theme.colors.primary[3]}
              />
            </svg>
            <Text className={classes.scrollText}>Wirf einen Blick drauf</Text>
          </Group>
        </Stack>
        <Image
          src="ProductsHeader.png"
          width={smScreen ? 500 : 400}
          mt={smScreen ? 75 : 90}
        />
      </Container>
      <Container
        size={"xl"}
        py={70}
        className={classes.inner}
        sx={(theme) => ({
          backgroundColor: theme.white,
          zIndex: 10,
          position: "relative",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 40,
          minHeight: 600,
        })}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            translate: "-50%",
            height: "100%",
            minHeight: 600,
            width: "100vw",
            backgroundColor: "#fff",
            zIndex: -1,
          }}
        ></div>
        <AnimatePresence mode="wait">{products}</AnimatePresence>
      </Container>
    </motion.div>
  );
}
