import React from "react";
import { Button } from "@mantine/core";
import { motion, useAnimation } from "framer-motion";
import { useMdScreen } from "../context/mediaQueryContext";

export default function ScrollButton() {
  const controls = useAnimation();
  const mdScreen = useMdScreen();

  return (
    <Button
      variant="transparent"
      px={0}
      onMouseEnter={() => {
        controls.start({ y: [0, 8, 0], transition: { duration: 0.5 } });
      }}
      leftIcon={
        <motion.svg
          height={mdScreen ? "26" : "21"}
          viewBox="0 0 16 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            x="1"
            y="1"
            width="14"
            height="24"
            rx="7"
            stroke="#6723F5"
            strokeWidth="2"
          />
          <motion.circle
            cx="8"
            cy="8"
            r="4"
            fill="#6723F5"
            animate={controls}
          />
        </motion.svg>
      }
      styles={(theme) => ({
        root: {
          fontWeight: 700,
          fontSize: 15,
          [theme.fn.smallerThan("md")]: {
            fontSize: 13,
          },
        },
      })}
    >
      Scroll um mehr zu erfahren
    </Button>
  );
}
