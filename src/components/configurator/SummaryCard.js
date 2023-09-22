import { createStyles, Group, Stack, Text, Title, Image } from "@mantine/core";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { getDownloadURL } from "firebase/storage";
import { useConfiguratorItem } from "../context/configuratorContext";
import { useSmScreen } from "../context/mediaQueryContext";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const useStyles = createStyles((theme) => ({
  cardWrapper: {
    width: 380,
    padding: "20px 30px",
    borderRadius: 8,
    backgroundColor: theme.white,
    [theme.fn.smallerThan("lg")]: {
      width: 340,
    },
    [theme.fn.smallerThan("md")]: {
      width: 360,
    },
    [theme.fn.smallerThan("sm")]: {
      width: 270,
      backgroundColor: "transparent",
      padding: "20px 0px",
      margin: "0 auto",
    },
  },
  cardImage: {
    margin: "20px auto 30px",
    [theme.fn.smallerThan("lg")]: {
      margin: "10px auto 30px",
    },
  },
  propertyDescription: {
    fontSize: 15,
    color: theme.colors.gray[5],
    fontWeight: 500,
    [theme.fn.smallerThan("lg")]: {
      fontSize: 13,
    },

    position: "relative",
  },
  propertyValue: {
    fontSize: 15,
    color: theme.colors.dark[5],
    fontWeight: 500,
    [theme.fn.smallerThan("lg")]: {
      fontSize: 13,
    },

    position: "relative",
  },
  fileName: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 700,
    color: theme.colors.gray[8],
    maxWidth: 320,
    position: "relative",
    [theme.fn.smallerThan("lg")]: {
      fontSize: 16,
    },
    [theme.fn.smallerThan("md")]: {
      fontSize: 20,
    },
    [theme.fn.smallerThan("sm")]: {
      margin: "4px auto 0",
    },
  },
}));

const materialMap = {
  "Beste Option": "Beste Option",
  resin: "Harz",
  pla: "Kunststoff",
};

const resolutionMap = {
  0.1: "Fein - 0.10mm",
  0.2: "Mittel - 0.20mm",
  0.4: "Grob - 0.40mm",
};

const densityMap = {
  "10%": "Leicht - 10%",
  "20%": "Normal - 20%",
  "40%": "Stabil - 40%",
  "60%": "Ausfüllen - 60%",
};

export default function SummaryCard({
  material,
  color,
  resolution,
  density,
  measurements,
  scale,
  storageref,
  name,
  setObjectImage,
  custom,
}) {
  const { classes } = useStyles();
  const configuratorItem = useConfiguratorItem();

  function STLModel(
    { url, initialRotationX, initialRotationY, initialRotationZ, position },
    props
  ) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const geom = useLoader(STLLoader, url);

    const img = document
      .getElementsByTagName("canvas")[0]
      .toDataURL("image/png");

    setObjectImage(img);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
      if (initialRotationX) mesh.current.rotation.x = initialRotationX;
      if (initialRotationY) mesh.current.rotation.y = initialRotationY;
      if (initialRotationZ) mesh.current.rotation.z = initialRotationZ;
    });
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh {...props} position={position} ref={mesh} geometry={geom}>
        {/* <boxGeometry args={[2, 2, 2]} /> */}
        <meshStandardMaterial color={0x6723f5} />
      </mesh>
    );
  }

  const firstRender = useRef(true);
  const [stlUrl, setStlUrl] = useState();
  async function getSTLFile() {
    if (!firstRender.current) return;
    firstRender.current = false;

    const url = await getDownloadURL(storageref);
    setStlUrl(url);
  }
  getSTLFile();

  const smScreen = useSmScreen();

  const ColorRotationMap = {
    Glutorange: 105,
    Gold: 125,
    Graphitgrau: 0,
    Kirschrot: 80,
    Mattschwarz: 0,
    Minzgrün: 210,
    Polarlichter: 290,
    "Rauchiges Schwarz": 0,
    "Transluzent Grün": 170,
    Weiß: 0,
  };

  const ColorSaturationMap = {
    Graphitgrau: 0.2,
    Mattschwarz: 0,
    "Rauchiges Schwarz": 0.3,
    Weiß: 2,
  };

  function getItemColorFilter(selectedColor) {
    if (!selectedColor) return;

    if (selectedColor === "Weiß") {
      return `brightness(4)  grayscale(1) `;
    }

    if (ColorRotationMap[selectedColor] === 0) {
      return `saturate(${ColorSaturationMap[selectedColor] * 100}%)`;
    }

    return `hue-rotate(${ColorRotationMap[selectedColor]}deg)`;
  }

  return (
    <Stack className={classes.cardWrapper} spacing={4}>
      <Title className={classes.fileName}>{name}</Title>
      <div className={classes.cardImage}>
        <AnimatePresence mode="wait">
          {custom ? (
            <motion.div
              key={"dwano-adwa3"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ filter: getItemColorFilter(color.name) }}
            >
              <Canvas
                camera={{ position: [100, 40, 100], fov: 25 }}
                gl={{ preserveDrawingBuffer: true }}
              >
                <ambientLight />
                <pointLight position={[100, 100, 100]} />
                {stlUrl && (
                  <STLModel
                    url={stlUrl}
                    initialRotationX={Math.PI * 1.5}
                    position={[0, -20, 0]}
                  />
                )}
              </Canvas>
            </motion.div>
          ) : (
            <motion.div
              key={"ztelw-dnwo9"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={configuratorItem.image}
                sx={{
                  maxWidth: smScreen ? 150 : 110,
                  maxHeight: smScreen ? 150 : 110,
                  filter: getItemColorFilter(color.name),
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Group position={"apart"}>
        <Text className={classes.propertyDescription}>Material</Text>
        <Text className={classes.propertyValue}>{materialMap[material]}</Text>
      </Group>
      <Group position={"apart"}>
        <Text className={classes.propertyDescription}>Farbe</Text>
        <Text className={classes.propertyValue}>{color.name}</Text>
      </Group>
      <Group position={"apart"}>
        <Text className={classes.propertyDescription}>Auflösung</Text>
        <Text className={classes.propertyValue}>
          {resolutionMap[resolution]}
        </Text>
      </Group>
      <Group position={"apart"}>
        <Text className={classes.propertyDescription}>Dichte</Text>
        <Text className={classes.propertyValue}>{densityMap[density]}</Text>
      </Group>
      <Group position={"apart"}>
        <Text className={classes.propertyDescription}>Abmessungen</Text>
        <Text className={classes.propertyValue}>{`${(
          measurements.x * scale
        ).toFixed(0)}mm x ${(measurements.y * scale).toFixed(0)}mm x ${(
          measurements.z * scale
        ).toFixed(0)}mm`}</Text>
      </Group>
    </Stack>
  );
}
