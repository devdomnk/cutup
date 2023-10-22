import React, { useState } from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useMdScreen } from "../context/mediaQueryContext";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

export default function ArrowButton({
  text,
  destination,
  isSmall,
  isBig,
  outline,
  unlimitedOnPhone,
}) {
  const [hover, setHover] = useState(false);
  const mdScreen = useMdScreen();
  const xxsScreen = useMediaQuery("(min-width: 420px)");

  const viewBoxVariants = {
    initial: {
      viewBox: "0 0 30 30",
      width: 30,
    },
    hovered: {
      viewBox: "0 0 12 30",
      width: 40,
    },
  };

  const backgroundCircleVariants = {
    initial: {
      fillOpacity: 0.17,
    },
    hovered: {
      fillOpacity: 0,
    },
  };

  const arrowVariants = {
    initial: {
      d: "M19.3296 14.5936 L8.6153 14.5936",
    },
    hovered: {
      d: "M19.3296 14.5936 L-10.6153 14.5936",
    },
  };

  return (
    <Link to={destination}>
      <Button
        size={mdScreen ? (isSmall ? "sm" : "md") : "sm"}
        variant={outline ? "outline" : "filled"}
        radius={30}
        onClick={() => {}}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        rightIcon={
          <motion.svg
            height={mdScreen ? (isSmall ? "24 " : "30") : "24"}
            fill="none"
            animate={hover ? "hovered" : "initial"}
            variants={viewBoxVariants}
          >
            <motion.rect
              animate={hover ? "hovered" : "initial"}
              variants={backgroundCircleVariants}
              x="30"
              width="30"
              height="30"
              rx="15"
              transform="rotate(90 30 0)"
              fill={outline ? "transparent" : "white"}
            />
            <motion.path
              animate={hover ? "hovered" : "initial"}
              variants={arrowVariants}
              stroke={outline ? "#6723F5" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.7216 19.5608L21.0132 14.5936"
              stroke={outline ? "#6723F5" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.7216 9.62642L21.0132 14.5936"
              stroke={outline ? "#6723F5" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        }
        styles={(theme) => ({
          root: {
            minWidth: isSmall ? 172 : isBig ? 240 : 160,
            maxWidth: isSmall ? 172 : isBig ? 240 : 200,
            padding: isSmall ? "3px 7px 3px 18px" : "3px 7px 3px 24px",
            fontWeight: 500,
            fontSize: isSmall ? 14 : 15,
            display: "flex",
            justifyContent: "space-between",
            "&:hover": {
              backgroundColor: outline ? null : theme.colors.primary[3],
            },
            [theme.fn.smallerThan("md")]: {
              fontSize: 13,
              width: "unset",
              minWidth: isSmall ? 166 : isBig ? 214 : 136,
              maxWidth: isSmall ? 166 : isBig ? 214 : 180,
            },
            [theme.fn.smallerThan("xs")]: {
              padding: "3px 5px 3px 16px",
              width: 166,
            },
            [theme.fn.smallerThan(420)]: {
              padding: "3px 5px 3px 16px",
              maxWidth: unlimitedOnPhone
                ? "unset"
                : isSmall
                ? 166
                : isBig
                ? 214
                : 180,
              minWidth: unlimitedOnPhone
                ? "unset"
                : isSmall
                ? 166
                : isBig
                ? 214
                : 136,
              width: unlimitedOnPhone ? "100%" : 166,
            },
          },
          inner: {
            [theme.fn.smallerThan(420)]: {
              width: unlimitedOnPhone ? "100%" : null,
            },
          },
          a: {
            [theme.fn.smallerThan(420)]: {
              width: unlimitedOnPhone ? "100%" : null,
            },
          },
          rightIcon: {
            marginLeft: unlimitedOnPhone
              ? xxsScreen
                ? hover
                  ? isSmall
                    ? 9
                    : outline
                    ? 9
                    : 14
                  : isSmall
                  ? 16
                  : outline
                  ? 9
                  : 24
                : "auto"
              : hover
              ? isSmall
                ? 9
                : outline
                ? 9
                : 14
              : isSmall
              ? 16
              : outline
              ? 9
              : 24,
            transition: "all .15s ease-out",
            [theme.fn.smallerThan("xs")]: {
              marginLeft: unlimitedOnPhone ? "auto" : hover ? 5 : 15,
              transition: "all .15s ease-out",
            },
          },
        })}
      >
        {text}
      </Button>
    </Link>
  );
}
