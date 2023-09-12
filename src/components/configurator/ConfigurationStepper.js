import React, { useState, useRef, useEffect } from "react";
import { Flag, Settings, Upload } from "tabler-icons-react";
import { createStyles, Group, Stepper } from "@mantine/core";
import DropzoneFunction from "./Dropzone";
import Configurator from "./Configurator";
import OrderSummary from "./OrderSummary";
import { useStorage } from "../context/firebaseContext";
import { useUser } from "../context/firebaseContext";
import { uuidv4 } from "@firebase/util";
import { ref } from "firebase/storage";
import OrderCompleted from "./OrderCompleted";
import { useConfiguratorItem } from "../context/configuratorContext";
import {
  useMdScreen,
  useSmScreen,
  useXsScreen,
} from "../context/mediaQueryContext";

export default function ConfigurationStepper() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const setWidth = () => setWindowWidth(window.innerWidth);

    setWidth();
    window.addEventListener("resize", setWidth);

    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  const useStyles = createStyles((theme) => ({
    root: {
      position: "relative",
      width: "100%",
      maxWidth: 1288,
    },
    steps: {
      width: "100%",
      maxWidth: 1288,
      padding: "16px 50px",
      backgroundColor: theme.white,
      borderRadius: 8,
      position: "fixed",
      left: "50%",

      transform: "translateX(-50%)",
      zIndex: 999,
      [theme.fn.smallerThan(1400)]: {
        maxWidth: windowWidth - 32,
      },
      [theme.fn.smallerThan("lg")]: {
        padding: "16px 20px",
      },
      [theme.fn.smallerThan("sm")]: {
        padding: "12.5px 16px",
        top: 56,
        borderRadius: 0,
        maxWidth: "unset",
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      },
    },
    content: {
      marginTop: 110,
      marginBottom: 80,
      marginRight: 0,
      width: "100%",
      maxWidth: 1288,
      [theme.fn.smallerThan("md")]: {
        marginTop: 80,
      },
      [theme.fn.smallerThan("sm")]: {
        marginTop: 40,
      },
    },
    separator: {
      height: 2,
      borderTop: `2px dashed ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[3]
      }`,
      borderRadius: theme.radius.xl,
      backgroundColor: "transparent",
      [theme.fn.smallerThan("sm")]: {
        marginLeft: 8,
        marginRight: 8,
      },
    },
    separatorActive: {
      borderWidth: 0,
    },
    step: {
      transition: "transform 150ms ease",

      "&[data-progress]": {
        transform: "scale(1.02)",
      },
    },
    stepBody: {
      [theme.fn.smallerThan("md")]: {
        marginLeft: 8,
      },
      [theme.fn.smallerThan("sm")]: {
        marginLeft: 4,
      },
    },
    stepLabel: {
      fontWeight: 700,
      [theme.fn.smallerThan("md")]: {
        fontSize: 15,
      },
      [theme.fn.smallerThan("sm")]: {
        fontSize: 13,
      },
    },
    stepDescription: {
      color: theme.colors.gray[7],
      [theme.fn.smallerThan("md")]: {
        fontSize: 13,
        marginTop: 3,
      },
    },
    stepIcon: {
      [theme.fn.smallerThan("md")]: {
        width: 36,
        minWidth: 36,
        height: 36,
      },
      [theme.fn.smallerThan("sm")]: {
        width: 30,
        minWidth: 30,
        height: 30,
      },
      div: {
        svg: {
          [theme.fn.smallerThan("md")]: {
            width: 18,
            height: 18,
          },
          [theme.fn.smallerThan("sm")]: {
            width: 14,
            height: 14,
          },
        },
      },
    },
  }));
  const { classes } = useStyles();
  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();
  const xsScreen = useXsScreen();

  const configuratorItem = useConfiguratorItem();
  const [activeStep, setActiveStep] = useState(configuratorItem ? 1 : 0);

  const nextStep = () => {
    setActiveStep((current) => (current < 3 ? current + 1 : current));
    document.documentElement.scrollTop = 0;
  };
  const prevStep = () => {
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  };

  const user = useUser();
  const storage = useStorage();

  const storageref = useRef(
    configuratorItem
      ? ref(storage, `Items/${configuratorItem.name}.stl`)
      : ref(storage, `${user.uid}/${uuidv4()}.stl`)
  );

  const [objectData, setObjectData] = useState({
    fileName: configuratorItem?.name || "",
    objectID: uuidv4(),
    color: "",
    material: "",
    resolution: null,
    density: null,
    scale: 1,
    price: null,
    measurements: {
      x: 0,
      y: 0,
      z: 0,
    },
    storageref: storageref.current,
    count: 1,
  });

  useEffect(() => {
    if (!smScreen) return;
    document.querySelector(".mantine-Stepper-steps").classList.add("shadow");
  });

  return (
    <Stepper
      active={activeStep}
      /* onStepClick={setActiveStep} */
      classNames={classes}
    >
      <Stepper.Step
        label={smScreen ? "Schritt 1" : xsScreen ? "Upload" : "Upload"}
        description={
          mdScreen ? "Wähle deine Datei" : smScreen ? "Upload" : null
        }
        icon={
          <Upload size={mdScreen ? 24 : smScreen ? 20 : xsScreen ? 18 : 18} />
        }
      >
        <DropzoneFunction
          nextStep={nextStep}
          storageref={storageref.current}
          setObjectData={setObjectData}
        />
      </Stepper.Step>
      <Stepper.Step
        label={smScreen ? "Schritt 2" : xsScreen ? "Konfig" : "Konfig"}
        description={
          mdScreen
            ? "Konfiguriere deinen Druck"
            : smScreen
            ? "Konfiguration"
            : null
        }
        icon={
          <Settings size={mdScreen ? 24 : smScreen ? 20 : xsScreen ? 18 : 18} />
        }
      >
        <Configurator
          nextStep={nextStep}
          storageref={storageref.current}
          setObjectData={setObjectData}
        />
      </Stepper.Step>
      <Stepper.Step
        label={smScreen ? "Schritt 3" : xsScreen ? "Abschluss" : "Abschluss"}
        description={smScreen ? "Zusammenfassung" : null}
        icon={
          <Flag size={mdScreen ? 24 : smScreen ? 20 : xsScreen ? 18 : 18} />
        }
      >
        <OrderSummary objectData={objectData} nextStep={nextStep} />
      </Stepper.Step>
      <Stepper.Completed>
        <OrderCompleted />
      </Stepper.Completed>
    </Stepper>
  );
}
