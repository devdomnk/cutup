import {
  Group,
  Stack,
  Title,
  Text,
  Container,
  createStyles,
  useMantineTheme,
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
import { motion } from "framer-motion";

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
    width: "24ch",
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

  const [products, setProducts] = useState([]);

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
          [theme.fn.smallerThan("lg")]: {
            height: "unset",
            marginTop: -200,
            marginBottom: 100,
          },
          [theme.fn.smallerThan("sm")]: {
            marginTop: -220,
            marginBottom: 80,
          },
        })}
      >
        <Stack spacing={10} mt={100}>
          <Title order={1} className={classes.heading}>
            Vorgefertigte Zeichnungen
          </Title>
          <Text size="sm" weight={500} className={classes.text}>
            Einfach und bequem ein Objekt auswählen, konfigurieren und ab in den
            Warenkorb. Ganz ohne den Aufwand Dateien im Internet zu finden.
          </Text>
          <Group mt={smScreen ? 60 : 30}>
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
        <svg
          className={classes.heroIcon}
          width="558"
          height="524"
          viewBox="0 0 558 524"
          fill="none"
        >
          <path
            d="M53.4333 417.917L440.364 521.595C445.087 522.86 450.137 519.599 451.403 514.875L533.388 208.903C533.702 207.796 533.794 206.639 533.66 205.497C533.525 204.355 533.165 203.251 532.602 202.248C532.039 201.245 531.284 200.364 530.379 199.654C529.474 198.945 528.438 198.421 527.33 198.113L465.231 181.05L484.284 109.943C484.698 108.235 484.606 106.445 484.021 104.789C483.436 103.132 482.381 101.682 480.987 100.614C479.592 99.5459 477.918 98.9061 476.166 98.7723C474.415 98.6386 472.662 99.0167 471.122 99.8607L372.001 155.435L192.03 105.985L200.023 76.1534C201.289 71.4305 198.887 66.1866 194.164 64.9211L151.109 53.3847C124.471 46.2469 96.887 60.6253 86.0571 85.2217L85.3591 85.0347L12.6033 356.563L13.1581 356.712C9.48313 384.371 26.4173 410.678 53.4333 417.917ZM452.986 158.333L433.664 153.156C431.395 152.548 428.979 152.866 426.945 154.04C424.912 155.214 423.428 157.148 422.82 159.416C422.212 161.685 422.53 164.101 423.704 166.135C424.879 168.168 426.812 169.652 429.08 170.26L448.403 175.437L444.966 188.266L438.445 186.518C436.176 185.91 433.76 186.229 431.726 187.403C429.693 188.577 428.209 190.511 427.601 192.779C426.993 195.047 427.311 197.464 428.485 199.497C429.66 201.531 431.593 203.015 433.862 203.622L440.383 205.37L436.086 221.405L416.764 216.227C414.495 215.62 412.079 215.938 410.045 217.112C408.012 218.286 406.528 220.22 405.92 222.488C405.312 224.756 405.63 227.173 406.805 229.206C407.979 231.24 409.912 232.724 412.181 233.332L431.503 238.509L426.92 255.613L420.399 253.866C418.131 253.258 415.714 253.576 413.68 254.75C411.647 255.924 410.163 257.858 409.555 260.126C408.948 262.395 409.266 264.811 410.44 266.845C411.614 268.878 413.548 270.362 415.816 270.97L422.337 272.717L418.04 288.752L398.718 283.575C396.45 282.967 394.033 283.285 391.999 284.459C389.966 285.634 388.482 287.567 387.874 289.836C387.266 292.104 387.585 294.52 388.759 296.554C389.933 298.588 391.867 300.071 394.135 300.679L413.457 305.857L409.733 319.754L403.212 318.006C400.944 317.399 398.528 317.717 396.494 318.891C394.46 320.065 392.977 321.999 392.369 324.267C391.761 326.535 392.079 328.952 393.253 330.985C394.427 333.019 396.361 334.503 398.629 335.111L405.15 336.858L404.578 338.996L186.466 280.553L461.736 125.677L452.986 158.333ZM350.015 167.758L158.914 275.256C157.367 276.171 156.12 277.516 155.325 279.129C154.53 280.741 154.222 282.549 154.438 284.334C154.644 286.108 155.366 287.784 156.514 289.152C157.663 290.521 159.187 291.523 160.899 292.034L408.184 358.294C410.565 358.828 413.06 358.439 415.165 357.204C417.269 355.969 418.826 353.98 419.521 351.641L460.648 198.154L514.007 212.818L436.463 502.217L58.0163 400.813C38.0216 395.455 26.1736 374.334 31.5312 354.34L32.9955 348.875C34.2873 344.139 36.502 339.705 39.5124 335.828C42.5228 331.95 46.2695 328.706 50.5375 326.281C54.8054 323.855 59.5104 322.297 64.3822 321.696C69.2541 321.094 74.1968 321.461 78.9264 322.775L121.981 334.311C126.704 335.577 131.397 332.272 132.662 327.549L187.447 123.09L350.015 167.758ZM146.526 70.4888L180.752 79.6595L117.735 314.842L83.5095 305.671C70.1259 301.93 55.8224 303.394 43.474 309.768L100.357 97.4792C105.714 77.4845 126.532 65.1313 146.526 70.4888Z"
            fill={theme.colors.primary[3]}
          />
          <path
            d="M290.171 268.063C290.381 269.823 291.101 271.483 292.243 272.839C293.385 274.194 294.899 275.185 296.598 275.69L367.296 294.634C372.02 295.899 376.901 292.624 378.167 287.899L397.056 217.403C397.519 215.719 397.47 213.936 396.916 212.279C396.362 210.623 395.328 209.169 393.945 208.103C392.562 207.036 390.893 206.405 389.15 206.29C387.407 206.175 385.67 206.581 384.159 207.457L294.552 259.124C293.027 260.021 291.799 261.347 291.02 262.936C290.241 264.525 289.946 266.308 290.171 268.063ZM374.431 233.425L363.234 275.213L321.87 264.129L374.431 233.425Z"
            fill={theme.colors.primary[3]}
          />
        </svg>
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
        {products}
      </Container>
    </motion.div>
  );
}
