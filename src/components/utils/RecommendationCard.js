import {
  Group,
  Title,
  Stack,
  Text,
  useMantineTheme,
  createStyles,
} from "@mantine/core";

import React, { useEffect, useRef } from "react";
import { useSmScreen } from "../context/mediaQueryContext";
import { useSetConfiguratorItem } from "../context/configuratorContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { useHover } from "@mantine/hooks";

export default function RecommendationCard({
  name,
  description,
  price,
  priceID,
  image,
}) {
  const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  const firstRender = useRef(true);
  const SetConfiguratorItem = useSetConfiguratorItem();
  const navigate = useNavigate();
  const smScreen = useSmScreen();

  useEffect(() => {
    firstRender.current = false;
  }, []);
  function SkeletonFadeWrapper({ children, delay }) {
    const transition = { duration: 0.4, ease: "easeInOut", delay: delay || 0 };
    return (
      <motion.div
        initial={{
          opacity: firstRender.current && 0,
          scale: firstRender.current && 0.9,
          y: firstRender.current && 6,
          transition,
        }}
        animate={{ opacity: 1, scale: 1, y: 0, transition }}
        exit={{ opacity: 0, transition }}
        key={uuidv4()}
      >
        {children}
      </motion.div>
    );
  }

  const transitionProp = "all .2s ease-out";

  function openConfigurator() {
    if (!name || !priceID) return;
    SetConfiguratorItem({ name: name, priceID: priceID });
    navigate("/konfigurator");
  }

  const useStyles = createStyles((theme) => ({
    image: {
      transition: transitionProp,
      width: 90,
    },
  }));
  const { classes } = useStyles();

  return (
    <Stack
      spacing={16}
      sx={{ width: 128, cursor: "pointer" }}
      onClick={() => {
        if (!price) return;
        openConfigurator();
      }}
      ref={ref}
    >
      <div
        style={{
          borderRadius: 8,
          boxShadow:
            hovered || !smScreen ? "0px 1px 16px 0px rgba(0,0,0,0.08)" : null,
          transition: transitionProp,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: theme.white,
            height: 176,

            borderRadius: 8,
            transition: transitionProp,
          }}
          className={"shadow"}
        >
          {image ? (
            <SkeletonFadeWrapper>
              <img src={image} className={classes.image} />
            </SkeletonFadeWrapper>
          ) : (
            <SkeletonFadeWrapper>
              <Skeleton width={90} height={90} borderRadius={16} />
            </SkeletonFadeWrapper>
          )}
        </div>
      </div>

      <Stack spacing={4}>
        {name ? (
          <SkeletonFadeWrapper delay={0.1}>
            <Title
              size={16}
              weight={"bold"}
              color={hovered ? theme.colors.primary[3] : theme.colors.dark[8]}
              sx={{ transition: transitionProp, width: "100%" }}
              truncate="end"
            >
              {name}
            </Title>
          </SkeletonFadeWrapper>
        ) : (
          <SkeletonFadeWrapper>
            <Skeleton
              width={90 + Math.random().toFixed(1) * 20}
              height={18}
              baseColor={theme.colors.gray[3]}
            />
          </SkeletonFadeWrapper>
        )}

        {description ? (
          <SkeletonFadeWrapper delay={0.2}>
            <Text size={11} lineClamp={3}>
              {description}
            </Text>
          </SkeletonFadeWrapper>
        ) : (
          <div style={{ lineHeight: 1.3 }}>
            <SkeletonFadeWrapper>
              <Skeleton
                count={2}
                height={12}
                baseColor={theme.colors.gray[2]}
              />
            </SkeletonFadeWrapper>
          </div>
        )}

        <Group
          position={"apart"}
          align="center"
          pr={10}
          mt={price ? 16 : 22}
          sx={{ transition: transitionProp }}
        >
          <Text color={theme.colors.primary[3]} size={14} weight={500}>
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
                    width={30}
                    height={14}
                    baseColor={theme.colors.primary[3]}
                  />
                  <p style={{ margin: "0 10px 0 0" }}>€</p>
                </Group>
              </SkeletonFadeWrapper>
            )}
          </Text>

          <svg width="38" height="9" viewBox="0 0 38 9">
            <path
              d={`M37 4.5L33.5 8M37 4.5L33.5 1 M37 4.5 L${
                hovered ? "1" : "16"
              } 4.5`}
              stroke="#6723F5"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: transitionProp }}
            />
          </svg>
        </Group>
      </Stack>
    </Stack>
  );
}
