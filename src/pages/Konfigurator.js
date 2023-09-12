import { createStyles, Container } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import ConfigurationStepper from "../components/configurator/ConfigurationStepper";
import { motion } from "framer-motion";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    paddingLeft: 6,
    paddingRight: 6,
    maxWidth: 1300,
  },
}));

export default function Konfigurator() {
  const { classes } = useStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container size="xl" className={classes.inner} mt={-180}>
        <ConfigurationStepper />
      </Container>
    </motion.div>
  );
}
