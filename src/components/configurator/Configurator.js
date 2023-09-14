import {
  Group,
  Stack,
  Title,
  createStyles,
  Grid,
  Select,
  Slider,
  Text,
  Button,
  useMantineTheme,
  Loader,
  Box,
} from "@mantine/core";

import { getDownloadURL } from "firebase/storage";
import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  Suspense,
} from "react";
/* import { StlViewer } from "react-stl-viewer"; */
import { Search } from "tabler-icons-react";
import DimensionDisplay from "./DimensionDisplay";
import {
  Canvas,
  useFrame,
  extend,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { useForm } from "@mantine/form";
import { useMdScreen, useSmScreen } from "../context/mediaQueryContext";
import { collection, getDocs } from "firebase/firestore";
import { useFirestore } from "../context/firebaseContext";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  wrapper: {
    [theme.fn.smallerThan("xl")]: {
      flexDirection: "column",
      gap: 80,
    },
    [theme.fn.smallerThan("md")]: {
      gap: 40,
    },
    [theme.fn.smallerThan("sm")]: {
      gap: 20,
    },
  },
  configuratorWrapper: {
    width: "59%",
    [theme.fn.smallerThan("xl")]: {
      width: "100%",
      order: 2,
    },
  },
  previewContainer: {
    width: "39%",
    [theme.fn.smallerThan("xl")]: {
      width: "100%",
      order: 1,
    },
  },
  previewWrapper: {
    backgroundColor: theme.white,
    borderRadius: 4,
    padding: "0",
    height: 370,
    cursor: "pointer",
    position: "relative",
    [theme.fn.smallerThan("xl")]: {
      height: 500,
    },
    [theme.fn.smallerThan("md")]: {
      height: 400,
    },
    [theme.fn.smallerThan("sm")]: {
      height: 300,
    },
    [theme.fn.smallerThan(500)]: {
      height: 250,
    },
    [theme.fn.smallerThan(450)]: {
      height: 220,
    },
    [theme.fn.smallerThan("xs")]: {
      height: 220,
    },
  },
  gridContainer: {
    backgroundColor: theme.white,
    borderRadius: 4,
    padding: "60px 40px",
    width: "100%",
    [theme.fn.smallerThan("md")]: {
      padding: "30px 30px 40px",
    },
    [theme.fn.smallerThan("sm")]: {
      backgroundColor: "transparent",
      padding: "0",
    },
  },
  sectionHeading: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: 700,
    [theme.fn.smallerThan("md")]: {
      fontSize: 16,
    },
  },
  primaryColor: {
    color: theme.colors.primary[3],
  },
  previewActionText: {
    color: theme.colors.primary[3],
    fontSize: 10,
    marginTop: 3,
    [theme.fn.smallerThan(1200)]: {
      fontSize: 16,
    },
    [theme.fn.smallerThan("md")]: {
      fontSize: 13,
      marginTop: 0,
    },
    [theme.fn.smallerThan("sm")]: { fontSize: 11 },
  },
  previewText: {
    color: theme.colors.gray[7],
    fontSize: 13,
  },
  previewExplanationWrapper: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "nowrap",
    backgroundColor: theme.white,
    padding: "10px 0 10px 12px",
    borderRadius: "4px 4px 0 0",
    zIndex: 10,
  },

  thumb: { border: `1px solid ${theme.colors.primary[3]}` },
  mark: {
    height: 10,
    width: 10,
    borderWidth: 2,
    transform: "translateY(-30%) translateX(-40%)",
  },
  track: {
    height: 3,
    borderRadius: 2,
    div: {
      [theme.fn.smallerThan("md")]: {
        fontSize: 13,
      },
    },
  },
}));

const ColorSelectItem = forwardRef(({ value, label, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <div
        style={{
          backgroundColor: value,
          width: 18,
          height: 18,
          borderRadius: 9,
          content: "",
          border: `${value === "#ffffff" ? "1px" : 0} solid #eeeeee`,
        }}
      ></div>
      <Text size="sm">{label}</Text>
    </Group>
  </div>
));
ColorSelectItem.displayName = "ColorSelectItem";

export default function Configurator({ storageref, setObjectData, nextStep }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const form = useForm({
    validate: {
      density: (value) => (value == null ? "Wähle eine Option" : null),
      resolution: (value) => (value == null ? "Wähle eine Option" : null),
      color: (value) => (value === "#A3A3A3" ? "Wähle eine Option" : null),
    },
  });

  const firestore = useFirestore();
  const [availableColors, setAvailableColors] = useState([]);
  useEffect(() => {
    async function getAvailableColors() {
      const colorSnapshot = await getDocs(collection(firestore, "Colors"));
      setAvailableColors([]);

      colorSnapshot.forEach((doc) => {
        setAvailableColors((prev) => [
          ...prev,
          {
            label: doc.id,
            value: doc.data().hex,
            resin: doc.data().Resin ? true : false,
            pla: doc.data().PLA ? true : false,
          },
        ]);
      });
    }
    getAvailableColors();
  }, []);

  const [selectedMaterial, setSelectedMaterial] = useState("Beste Option");
  const [materialColors, setMaterialColors] = useState([]);
  const [objectVolume, setObjectVolume] = useState();

  const [objectScale, setObjectScale] = useState(1);
  const [maxScale, setMaxScale] = useState(3.5);
  const [scaleMarks, setScaleMarks] = useState([
    { value: 0.1, label: "0.1x" },
    { value: 1, label: "1x" },
    { value: 2, label: "2x" },
    { value: 3, label: "3x" },
  ]);
  const [objectMeasurements, setObjectMeasurements] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  function STLModel(
    {
      url,
      initialRotationX,
      initialRotationY,
      initialRotationZ,
      position,
      rotateX,
      rotateZ,
      rotateY,
    },
    props
  ) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const geom = useLoader(STLLoader, url);

    //calculate marks on scale slider
    geom.computeBoundingBox();
    setObjectMeasurements({
      x: geom.boundingBox.max.x - geom.boundingBox.min.x,
      y: geom.boundingBox.max.y - geom.boundingBox.min.y,
      z: geom.boundingBox.max.z - geom.boundingBox.min.z,
    });
    setMaxScale(
      (
        200 /
        Math.max(
          geom.boundingBox.max.x - geom.boundingBox.min.x,
          geom.boundingBox.max.y - geom.boundingBox.min.y,
          geom.boundingBox.max.z - geom.boundingBox.min.z
        )
      ).toFixed(1)
    );
    let marks = [];
    for (let i = 1; i <= maxScale; i++) {
      marks.push({ value: i, label: `${i}x` });
    }
    setScaleMarks([{ value: 0.1, label: "0.1x" }, ...marks]);

    //calculate object volume
    function signedVolumeOfTriangle(p1, p2, p3) {
      return p1.dot(p2.cross(p3)) / 6.0;
    }

    let objectPosition = geom.attributes.position;
    let faces = objectPosition.count / 3;

    let p1 = new THREE.Vector3(),
      p2 = new THREE.Vector3(),
      p3 = new THREE.Vector3();

    let sum = 0;
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(objectPosition, i * 3 + 0);
      p2.fromBufferAttribute(objectPosition, i * 3 + 1);
      p3.fromBufferAttribute(objectPosition, i * 3 + 2);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
    setObjectVolume(sum);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
      if (initialRotationX) mesh.current.rotation.x = initialRotationX;
      if (initialRotationY) mesh.current.rotation.y = initialRotationY;
      if (initialRotationZ) mesh.current.rotation.z = initialRotationZ;

      if (rotateX) mesh.current.rotation.x += 0.001;
      if (rotateY) mesh.current.rotation.y += 0.001;
      if (rotateZ) mesh.current.rotation.z += 0.001;
    });
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        position={position}
        ref={mesh}
        geometry={geom}
        scale={[objectScale, objectScale, objectScale]}
      >
        <meshStandardMaterial color={form.values.color} />
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

  extend({ OrbitControls });
  function Controls() {
    const controls = useRef();
    const { camera, gl } = useThree();
    useFrame(() => controls.current.update());
    return (
      <orbitControls
        ref={controls}
        args={[camera, gl.domElement]}
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.5}
      />
    );
  }

  useEffect(() => {
    if (selectedMaterial === "Beste Option") {
      setMaterialColors(availableColors);
      form.setFieldValue("color", "#A3A3A3");
      return;
    }

    const filteredColors = availableColors.filter(
      (color) => color[selectedMaterial] === true
    );
    setMaterialColors(filteredColors);

    form.setFieldValue("color", "#A3A3A3");
  }, [selectedMaterial, availableColors]);

  function storeObject() {
    setObjectData((prev) => ({
      ...prev,
      color: {
        hex: form.values.color,
        name: availableColors.find((color) => color.value === form.values.color)
          .label,
      },
      material: selectedMaterial,
      scale: objectScale,
      resolution: form.values.resolution,
      density: form.values.density,
      price: calculateObjectPrice(),
      measurements: {
        x: objectMeasurements.x.toFixed(0),
        y: objectMeasurements.y.toFixed(0),
        z: objectMeasurements.z.toFixed(0),
      },
    }));
  }

  function calculateObjectPrice() {
    const VolumeInCubicCm = ((objectVolume / 1000) * objectScale) ^ 3;
    const WeightInGrams = VolumeInCubicCm * 1.24; //g/cm³
    const objectTime /*in h*/ = (
      (3.53 * VolumeInCubicCm) /*in m*/ /
      60
    ).toFixed(0);

    const materialCost = WeightInGrams * 0.024; //Price in € per 1kg: 24€ -> 1g: 0.024€
    const electricityCost =
      150 /*anyCubic i3 Mega W*/ *
      (0.24 /*electricity € per kWh*/ / 1000) /*price per W/h*/ *
      objectTime; /*average h*/
    const productionCost = materialCost + electricityCost;

    const price =
      (productionCost +
        objectTime * 0.8 /*80cent/h*/ +
        5) /*pauschal 5€ profit*/ *
      1.2; /*Mehrwertsteuer*/
    const rounded = Math.round(price * 100) / 100;

    return rounded;
  }

  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();
  const largeScreen = useMediaQuery("(min-width: 1199px)");

  return (
    <Group className={classes.wrapper} align="start" position={"apart"}>
      <form
        className={classes.configuratorWrapper}
        onSubmit={form.onSubmit((values) => {
          storeObject();
          nextStep();
        })}
      >
        <Stack spacing={smScreen ? "md" : 8}>
          <Group
            align="center"
            spacing={mdScreen ? "xs" : 8}
            sx={(theme) => ({
              [theme.fn.smallerThan("sm")]: { display: "none" },
            })}
          >
            <svg
              height={mdScreen ? 24 : 20}
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4L8 4"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 4L19 4"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 12L10 12"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 12L19 12"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 20L6 20"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 20L19 20"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 1L8 7"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 9L14 15"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 17L6 23"
                stroke={theme.colors.primary[3]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Title className={classes.sectionHeading}>Konfiguration</Title>
          </Group>
          <div className={classes.gridContainer}>
            <Grid justify={"center"} gutter={mdScreen ? 30 : smScreen ? 20 : 8}>
              <Grid.Col span={smScreen ? 6 : 12}>
                <Select
                  size={mdScreen ? "sm" : "xs"}
                  iconWidth={49}
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      style={{
                        marginLeft: 3,
                        borderRadius: 9,
                        border: `${
                          form.values.color === "#ffffff" ? "1px" : 0
                        } solid #eeeeee`,
                      }}
                    >
                      <circle cx="9" cy="9" r="9" fill={form.values.color} />
                    </svg>
                  }
                  label="Farbe"
                  placeholder="Wähle deine Option"
                  data={materialColors || []}
                  itemComponent={ColorSelectItem}
                  /* onChange={setSelectedColor}
                  value={selectedColor} */
                  {...form.getInputProps("color")}
                  styles={(theme) => ({
                    input: {
                      height: 38,
                      [theme.fn.smallerThan("sm")]: { border: "none" },
                    },
                  })}
                />
              </Grid.Col>
              <Grid.Col span={smScreen ? 6 : 12}>
                <Select
                  size={mdScreen ? "sm" : "xs"}
                  label="Material"
                  placeholder="Wähle deine Option"
                  data={[
                    { value: "Beste Option", label: "Beste Option" },
                    { value: "pla", label: "Kunststoff" },
                    { value: "resin", label: "Harz" },
                  ]}
                  value={selectedMaterial}
                  onChange={setSelectedMaterial}
                  styles={(theme) => ({
                    input: {
                      height: 38,
                      [theme.fn.smallerThan("sm")]: { border: "none" },
                    },
                  })}
                />
              </Grid.Col>
              <Grid.Col span={smScreen ? 6 : 12}>
                <Select
                  size={mdScreen ? "sm" : "xs"}
                  label="Auflösung"
                  placeholder="Wähle deine Option"
                  data={[
                    { value: 0.1, label: "Fein - 0.10mm" },
                    { value: 0.2, label: "Mittel - 0.20mm" },
                    { value: 0.4, label: "Grob - 0.40mm" },
                  ]}
                  {...form.getInputProps("resolution")}
                  styles={(theme) => ({
                    input: {
                      height: 38,
                      [theme.fn.smallerThan("sm")]: { border: "none" },
                    },
                  })}
                />
              </Grid.Col>
              <Grid.Col span={smScreen ? 6 : 12}>
                <Select
                  size={mdScreen ? "sm" : "xs"}
                  label="Dichte"
                  placeholder="Wähle deine Option"
                  data={[
                    { value: "10%", label: "Leicht - 10%" },
                    { value: "20%", label: "Normal - 20%" },
                    { value: "40%", label: "Stabil - 40%" },
                    { value: "60%", label: "Ausfüllen - 60%" },
                  ]}
                  {...form.getInputProps("density")}
                  styles={(theme) => ({
                    input: {
                      height: 38,
                      [theme.fn.smallerThan("sm")]: { border: "none" },
                    },
                  })}
                />
              </Grid.Col>
              <Grid.Col span={12} mt={6} mb={10}>
                <Text
                  size={mdScreen ? 15 : 13}
                  weight={500}
                  sx={(theme) => ({
                    color: theme.colors.dark[6],
                  })}
                >
                  Skalierung
                </Text>
                <Slider
                  value={objectScale}
                  onChange={setObjectScale}
                  mt={10}
                  classNames={classes}
                  min={0.1}
                  max={maxScale}
                  precision={1}
                  step={0.1}
                  thumbSize={26}
                  marks={scaleMarks}
                  thumbChildren={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4275 3.72417L8.2758 0.572514C8.2758 0.572514 8.27577 0.572484 8.27574 0.572453C8.17905 0.475824 8.02233 0.475854 7.9257 0.572514L0.572514 7.9257C0.572514 7.92573 0.572484 7.92576 0.572453 7.92579C0.475824 8.02248 0.475854 8.1792 0.572514 8.27583L3.72393 11.4275C3.77036 11.4739 3.83332 11.5 3.899 11.5C3.96467 11.5 4.02763 11.4739 4.07406 11.4275L5.64936 9.85225C5.64951 9.8521 5.64969 9.85207 5.64984 9.85192C5.65 9.85177 5.65 9.85158 5.65015 9.85143L7.04993 8.45174C7.05005 8.45162 7.05023 8.45156 7.05035 8.45144C7.05047 8.45132 7.05051 8.45114 7.05063 8.45101L8.45111 7.0506C8.45117 7.05054 8.45126 7.05051 8.45132 7.05044C8.45138 7.05038 8.45138 7.05029 8.45144 7.05023L9.85177 5.64997C9.8518 5.64994 9.8518 5.64997 9.85183 5.64994C9.85186 5.6499 9.85183 5.6499 9.85186 5.64987L11.4275 4.0743L11.4276 4.07421C11.5242 3.97752 11.5241 3.8208 11.4275 3.72417ZM9.67679 5.12468L8.80151 4.2494C8.80033 4.24819 8.79915 4.24701 8.79797 4.24586C8.70031 4.15017 8.54356 4.15174 8.44787 4.2494C8.35215 4.34702 8.35372 4.5038 8.45138 4.59949L9.32667 5.47478L8.27622 6.52519L6.70023 4.94965C6.69905 4.94844 6.69787 4.94726 6.69669 4.94608C6.59903 4.85039 6.44226 4.85196 6.34656 4.94965C6.25087 5.04731 6.25244 5.20405 6.3501 5.29975L7.9261 6.87529L6.87529 7.92607L6 7.05038C5.90374 6.95605 5.74971 6.95605 5.65344 7.05038C5.55578 7.14611 5.55418 7.30285 5.6499 7.40051L6.52516 8.27619L5.47475 9.32657L3.89897 7.75067C3.89782 7.74946 3.89664 7.74828 3.89543 7.7471C3.79777 7.65141 3.64102 7.65298 3.54533 7.75067C3.44961 7.84833 3.45121 8.00507 3.54887 8.10077L5.12459 9.6767L3.899 10.9023L1.09774 8.10077L8.10077 1.09774L10.9023 3.89924L9.67679 5.12468Z"
                        fill={theme.colors.primary[3]}
                      />
                    </svg>
                  }
                />
              </Grid.Col>
            </Grid>
          </div>
          <Button
            size={mdScreen ? "md" : "sm"}
            variant="gradient"
            mt={smScreen ? 10 : 45}
            type="submit"
            sx={(theme) => ({
              [theme.fn.smallerThan("md")]: {
                height: 38,
              },
            })}
          >
            Konfiguration abschließen
          </Button>
        </Stack>
      </form>
      <Stack className={classes.previewContainer}>
        <Group
          align="center"
          spacing={mdScreen ? "xs" : 8}
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: { display: "none" },
          })}
        >
          <Search size={mdScreen ? 24 : 20} className={classes.primaryColor} />
          <Title className={classes.sectionHeading}> Dateivorschau</Title>
        </Group>
        <div className={classes.previewWrapper}>
          <div className={classes.previewExplanationWrapper}>
            {largeScreen ? (
              <>
                <Text className={classes.previewActionText}>
                  LINKS KLICKEN:{" "}
                </Text>
                <Text className={classes.previewText}>Drehen</Text>
                <Text className={classes.previewText}> | </Text>
                <Text className={classes.previewActionText}>
                  RECHTS KLICKEN:{" "}
                </Text>
                <Text className={classes.previewText}>Verschieben</Text>
                <Text className={classes.previewText}> | </Text>
                <Text className={classes.previewActionText}>MAUSRAD: </Text>
                <Text className={classes.previewText}>Zoomen</Text>
              </>
            ) : (
              <>
                <Text className={classes.previewActionText}>Maße:</Text>
                <DimensionDisplay
                  subtle
                  size={(objectMeasurements.x * objectScale).toFixed(0)}
                />
                <Box
                  sx={{
                    fontWeight: 500,
                    [theme.fn.smallerThan("xl")]: { fontSize: 11 },
                  }}
                >
                  x
                </Box>
                <DimensionDisplay
                  subtle
                  size={(objectMeasurements.y * objectScale).toFixed(0)}
                />
                <Box
                  sx={{
                    fontWeight: 500,
                    [theme.fn.smallerThan("xl")]: { fontSize: 11 },
                  }}
                >
                  x
                </Box>
                <DimensionDisplay
                  subtle
                  size={(objectMeasurements.z * objectScale).toFixed(0)}
                />
              </>
            )}
          </div>
          <Suspense fallback={<Loader />}>
            <Canvas camera={{ position: [100, 40, 100], fov: 40 }}>
              <ambientLight />
              <pointLight position={[100, 100, 100]} />
              <pointLight position={[-100, -100, -100]} />
              {stlUrl && (
                <STLModel
                  url={stlUrl}
                  initialRotationX={Math.PI * 1.5}
                  position={[0, -14, 0]}
                />
              )}
              <gridHelper
                position={[0, -14, 0]}
                args={[
                  objectMeasurements.x * objectScale > 100 ||
                  objectMeasurements.y * objectScale > 100 ||
                  objectMeasurements.z * objectScale > 100
                    ? 450
                    : 300,
                  20,
                  "lightgray",
                  "lightgray",
                ]}
              />
              <Controls />
            </Canvas>
          </Suspense>
        </div>
        <Group
          position="right"
          spacing={6}
          mt={10}
          sx={(theme) => ({
            [theme.fn.smallerThan("xl")]: { display: "none" },
          })}
        >
          <DimensionDisplay
            size={(objectMeasurements.x * objectScale).toFixed(0)}
          />
          <span style={{ fontWeight: 500 }}>x</span>
          <DimensionDisplay
            size={(objectMeasurements.y * objectScale).toFixed(0)}
          />
          <span style={{ fontWeight: 500 }}>x</span>
          <DimensionDisplay
            size={(objectMeasurements.z * objectScale).toFixed(0)}
          />
        </Group>
      </Stack>
    </Group>
  );
}
