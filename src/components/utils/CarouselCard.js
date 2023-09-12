import { createStyles, Image, Card, Text, Group, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconStar } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useSetConfiguratorItem } from "../context/configuratorContext";
import { useState } from "react";
import { useSmScreen } from "../context/mediaQueryContext";

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
}) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const SetConfiguratorItem = useSetConfiguratorItem();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const smScreen = useSmScreen();

  function openConfigurator() {
    SetConfiguratorItem({ name: name, priceID: priceID });
    navigate("/konfigurator");
  }

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
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
          {slides}
        </Carousel>
      </Card.Section>

      <Group position="apart" mt="lg">
        <Text weight={500} size={smScreen ? "lg" : "md"}>
          {name}
        </Text>

        <Group spacing={5}>
          <IconStar size={smScreen ? 16 : 14} />
          <Text size="xs" weight={500}>
            4.78
          </Text>
        </Group>
      </Group>

      <Text
        size={smScreen ? 14 : "xs"}
        color="dimmed"
        mt={8}
        sx={{ flexGrow: 1 }}
      >
        {description}
      </Text>

      <Group position="apart">
        <div>
          <Text
            size={smScreen ? "xl" : "lg"}
            span
            weight={500}
            className={classes.price}
          >
            {Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(price)}
          </Text>
          <Text span size={smScreen ? "sm" : 0} color="dimmed">
            {" "}
            / standard
          </Text>
        </div>

        <Button
          radius="md"
          onClick={() => {
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
