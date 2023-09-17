import {
  createStyles,
  Image,
  Card,
  Text,
  Group,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconStar } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useSetConfiguratorItem } from "../context/configuratorContext";
import { useState } from "react";
import { useSmScreen } from "../context/mediaQueryContext";
import { v4 as uuidv4 } from "uuid";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    width: 370,
    height: 430,
    display: "flex",
    flexDirection: "column",
    [theme.fn.smallerThan("sm")]: {
      height: 400,
      width: 350,
    },
  },
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  image: {
    backgroundColor: theme.colors.gray[1],
  },

  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",

    "&[data-active]": {
      width: 16,
    },
  },
}));

/* const images = [
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
]; */

export function CarouselCard({
  id,
  name,
  images,
  price,
  description,
  priceID,
  rating,
}) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const SetConfiguratorItem = useSetConfiguratorItem();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const smScreen = useSmScreen();

  function openConfigurator() {
    if (!name || !priceID) return;
    SetConfiguratorItem({ name: name, priceID: priceID });
    navigate("/konfigurator");
  }

  const slides =
    images &&
    images.map((image) => (
      <Carousel.Slide key={image}>
        <SkeletonFadeWrapper>
          <Image
            src={image}
            width={smScreen ? 150 : 130}
            sx={{
              maxHeight: smScreen ? 160 : 140,
              minHeight: smScreen ? 160 : 140,
            }}
            my={35}
            mx="auto"
          />
        </SkeletonFadeWrapper>
      </Carousel.Slide>
    ));

  return (
    <Card
      radius="md"
      withBorder
      p={smScreen ? "xl" : "lg"}
      className={classes.card}
    >
      <Card.Section className={classes.image}>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides || (
            <Carousel.Slide key={uuidv4()}>
              <SkeletonFadeWrapper>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "35px auto 35px auto",
                    height: 160,
                  }}
                >
                  <Skeleton
                    width={smScreen ? 130 : 110}
                    height={smScreen ? 130 : 110}
                    borderRadius={24}
                  />
                </div>
              </SkeletonFadeWrapper>
            </Carousel.Slide>
          )}
        </Carousel>
      </Card.Section>

      <Group position="apart" mt="lg">
        {name ? (
          <SkeletonFadeWrapper delay={0.1}>
            <Text weight={500} size={smScreen ? "lg" : "md"}>
              {name}
            </Text>
          </SkeletonFadeWrapper>
        ) : (
          <SkeletonFadeWrapper>
            <Skeleton
              width={150 + Math.random().toFixed(1) * 50}
              height={24}
              baseColor={theme.colors.gray[3]}
            />
          </SkeletonFadeWrapper>
        )}

        <Group spacing={5}>
          <IconStar size={smScreen ? 16 : 14} />
          <Text size="xs" weight={500}>
            {rating ? (
              <SkeletonFadeWrapper delay={0.1}>
                {rating?.toFixed(1)}
              </SkeletonFadeWrapper>
            ) : (
              <SkeletonFadeWrapper>
                <Skeleton width={20} baseColor={theme.colors.gray[3]} />
              </SkeletonFadeWrapper>
            )}
          </Text>
        </Group>
      </Group>

      <Text
        size={smScreen ? 14 : "xs"}
        color="dimmed"
        mt={8}
        sx={{ flexGrow: 1 }}
      >
        {description ? (
          <SkeletonFadeWrapper delay={0.2}>{description}</SkeletonFadeWrapper>
        ) : (
          <SkeletonFadeWrapper>
            <Skeleton count={3} baseColor={theme.colors.gray[1]} />
          </SkeletonFadeWrapper>
        )}
      </Text>

      <Group position="apart">
        <Text
          size={smScreen ? "xl" : "lg"}
          span
          weight={500}
          className={classes.price}
        >
          {price ? (
            <SkeletonFadeWrapper delay={0.3}>
              {Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(price)}
            </SkeletonFadeWrapper>
          ) : (
            <SkeletonFadeWrapper>
              <Group spacing={4} noWrap>
                <Skeleton
                  width={40}
                  height={24}
                  baseColor={theme.colors.gray[3]}
                />
                <p>€</p>
              </Group>
            </SkeletonFadeWrapper>
          )}
        </Text>

        <Button
          radius="md"
          onClick={() => {
            if (!price) return;
            setIsButtonLoading(true);
            openConfigurator();
          }}
          loading={isButtonLoading}
          size={smScreen ? "sm" : "xs"}
        >
          Konfigurator
        </Button>
      </Group>
    </Card>
  );
}

function SkeletonFadeWrapper({ children, delay }) {
  const transition = { duration: 0.4, ease: "easeInOut", delay: delay || 0 };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6, transition }}
      animate={{ opacity: 1, scale: 1, y: 0, transition }}
      exit={{ opacity: 0, transition }}
      key={uuidv4()}
    >
      {children}
    </motion.div>
  );
}
