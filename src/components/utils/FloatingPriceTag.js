import { ActionIcon, createStyles, Group, Stack, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import React from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useSmScreen } from "../context/mediaQueryContext";
import { useNavigate } from "react-router-dom";
import { useSetConfiguratorItem } from "../context/configuratorContext";

export default function FloatingPriceTag({
  name,
  price,
  measurements,
  weight,
  image,
  imageLink,
  rightOffset,
  priceID,
}) {
  const useStyles = createStyles((theme) => ({
    container: {
      position: "absolute",
      right: `${+rightOffset + 485}px`,
      top: 420,
      zIndex: 10,
      width: 240,
      height: 140,
      backgroundColor: "#fff",
      borderRadius: 14,
      padding: "55px 25px 20px",
      [theme.fn.smallerThan(1400)]: {
        height: 115,
        padding: "30px 25px 40px",
        right: `${+rightOffset + 90}px`,
        top: "clamp(450px, 53vh, 535px)",
      },
      [theme.fn.smallerThan(1250)]: {
        display: "none",
      },
      [theme.fn.smallerThan("sm")]: {
        display: "initial",
        right: "50%",
        translate: "50%",
        padding: "55px 25px 20px",
        zIndex: 2,
        top: 544,
        width: 225,
      },
    },
    image: {
      position: "absolute",
      left: 16,
      top: -43,
      height: 89,
      aspectRatio: 1,
      [theme.fn.smallerThan(1400)]: {
        display: "none",
      },
    },
    name: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: -0.4,
      color: theme.colors.darkText[0],
      display: "flex",
      flexWrap: "none",

      [theme.fn.smallerThan("sm")]: {
        fontSize: 15,
      },
    },
    info: {
      fontSize: 13,
      fontWeight: 300,
      color: theme.colors.gray[6],
      whiteSpace: "nowrap",
      [theme.fn.smallerThan("sm")]: {
        fontSize: 12,
      },
    },
    price: {
      fontSize: 14,
      fontWeight: 700,
      color: theme.colors.darkText[0],
      letterSpacing: -0.8,
      display: "flex",

      flexWrap: "none",
      [theme.fn.smallerThan("sm")]: {
        fontSize: 12,
      },
    },
  }));
  const { classes } = useStyles();
  const smScreen = useSmScreen();

  const navigate = useNavigate();
  const SetConfiguratorItem = useSetConfiguratorItem();

  const text = {
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.25,
        type: "tween",
        ease: "easeOut",
      },
    },
    goOutOfSight: {
      x: -10,
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.2,
      },
    },
    goIntoSight: {
      x: 10,
      opacity: 0,
      scale: 0.9,
    },
  };

  const ShoppingCartButtonControls = useAnimation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "tween",
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      className={classes.container + " shadow"}
    >
      <AnimatePresence>
        <motion.img
          key={Math.random()}
          src={image}
          className={classes.image}
          initial={{
            x: 50,
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.25,
              type: "tween",
              ease: "easeOut",
            },
          }}
          exit={{
            x: -10,
            opacity: 0,
            scale: 0.9,
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.15,
            },
          }}
        />
      </AnimatePresence>
      <Group position="apart" noWrap>
        <Stack spacing={0} sx={{ width: 130 }}>
          <Text className={classes.name} truncate>
            <AnimatePresence>
              <motion.div
                variants={text}
                initial="goIntoSight"
                animate="visible"
                exit={"goOutOfSight"}
                key={name}
                style={{ minWidth: smScreen ? 130 : 120 }}
              >
                {name}
              </motion.div>
            </AnimatePresence>
          </Text>
          <Text className={classes.info} mt={-4}>
            <AnimatePresence>
              <motion.div
                variants={text}
                initial="goIntoSight"
                animate="visible"
                exit={"goOutOfSight"}
                key={measurements}
              >
                {measurements}
              </motion.div>
            </AnimatePresence>
          </Text>
        </Stack>
        <Stack spacing={0} align="end" justify="flex-start">
          <Text className={classes.price} sx={{ width: smScreen ? 45 : 35 }}>
            <AnimatePresence>
              <motion.div
                variants={text}
                initial="goIntoSight"
                animate="visible"
                exit={"goOutOfSight"}
                key={price}
                style={{
                  minWidth: smScreen ? 45 : 35,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(price)}
              </motion.div>
            </AnimatePresence>
          </Text>
          <Text className={classes.info}>
            <AnimatePresence>
              <motion.div
                variants={text}
                initial="goIntoSight"
                animate="visible"
                exit={"goOutOfSight"}
                key={weight}
              >
                {Intl.NumberFormat("de-DE", {
                  style: "unit",
                  unit: "gram",
                  unitDisplay: "short",
                }).format(weight)}
              </motion.div>
            </AnimatePresence>
          </Text>
        </Stack>
      </Group>
      <ActionIcon
        variant="filled"
        radius={"50%"}
        color="primary.3"
        size={48}
        sx={(theme) => ({
          position: "absolute",
          left: "50%",
          bottom: 0,
          translate: "-50% 50%",
          border: `2px solid ${theme.colors.primary[4]}`,
          transition: "all .1s ease-in-out",
          "&:hover": {
            backgroundColor: theme.colors.primary[3],
          },
          ":active": { transform: "translateY(3px) scale(0.95)" },
          [theme.fn.smallerThan("sm")]: {
            display: "none",
          },
        })}
        onMouseEnter={() => {
          ShoppingCartButtonControls.start({
            rotate: [0, -10, 10, 0],
            transition: { type: "spring" },
          });
        }}
        onClick={() => {
          SetConfiguratorItem({ name: name, priceID: "", image: imageLink });
          navigate("/konfigurator");
        }}
      >
        <motion.div animate={ShoppingCartButtonControls}>
          <IconShoppingCart />
        </motion.div>
      </ActionIcon>
    </motion.div>
  );
}
