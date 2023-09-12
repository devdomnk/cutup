import React, { useState } from "react";
import { Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useMdScreen, useXsScreen } from "../context/mediaQueryContext";
import { Link } from "react-router-dom";

export default function ArrowButton({ text, destination }) {
  const [hover, setHover] = useState(false);
  const mdScreen = useMdScreen();
  const xsScreen = useXsScreen();

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
        size={mdScreen ? "md" : "sm"}
        variant="filled"
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
            height={mdScreen ? "30" : "24"}
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
              fill="white"
            />
            <motion.path
              animate={hover ? "hovered" : "initial"}
              variants={arrowVariants}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.7216 19.5608L21.0132 14.5936"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.7216 9.62642L21.0132 14.5936"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        }
        styles={(theme) => ({
          root: {
            width: 200,
            padding: "3px 7px 3px 24px",
            fontWeight: 500,
            fontSize: 15,
            display: "flex",
            justifyContent: "space-between",
            "&:hover": {
              backgroundColor: theme.colors.primary[3],
            },
            [theme.fn.smallerThan("md")]: {
              fontSize: 13,
              width: "unset",
            },
            [theme.fn.smallerThan("xs")]: {
              padding: "3px 5px 3px 16px",
              width: 166,
            },
          },
          rightIcon: {
            marginLeft: hover ? 14 : 24,
            transition: "all .15s ease-out",
            [theme.fn.smallerThan("xs")]: {
              marginLeft: hover ? 5 : 15,
            },
          },
        })}
      >
        {text}
      </Button>
    </Link>
  );
}
