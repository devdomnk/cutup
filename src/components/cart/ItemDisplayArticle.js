import {
  Group,
  Image,
  Stack,
  Title,
  Text,
  Select,
  createStyles,
  useMantineTheme,
  ActionIcon,
  Popover,
} from "@mantine/core";
import React from "react";
import CountSelector from "../utils/CountSelector";
import { useState, useEffect } from "react";
import RemoveButton from "../utils/RemoveButton";
import {
  useShoppingCart,
  useUpdateShoppingCart,
} from "../context/shoppingCartContext";
import { IconSettings } from "@tabler/icons";
import { useSmScreen } from "../context/mediaQueryContext";

const useStyles = createStyles((theme) => ({
  container: { position: "relative" },
  displayImage: {
    height: 168,
    width: 168,
    padding: 20,
    backgroundColor: theme.colors.gray[1],
    borderRadius: 8,
    [theme.fn.smallerThan("sm")]: {
      height: 100,
      width: 100,
      padding: 14,
      border: `1px solid ${theme.colors.gray[2]}`,
      borderRadius: 8,
      backgroundColor: theme.white,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 20,
    fontWeight: 700,
    color: theme.colors.gray[8],
    [theme.fn.smallerThan("sm")]: {
      fontSize: 18,
      maxWidth: 150,
      overflow: "hidden",
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: 18,
      maxWidth: 110,
      overflow: "hidden",
    },
  },
  piecePrice: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.colors.gray[6],
    [theme.fn.smallerThan("sm")]: {
      fontSize: 12,
      marginTop: -4,
    },
  },
  fullPrice: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: 600,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 15,
    },
  },
}));

export default function ItemDisplayArticle({
  name,
  price,
  color,
  material,
  resolution,
  imageSrc,
  id,
  count,
  density,
  availableColors,
}) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const shoppingCart = useShoppingCart();
  const updateShoppingCart = useUpdateShoppingCart();
  const smScreen = useSmScreen();

  const [selectedMaterial, setSelectedMaterial] = useState(material);
  const [selectedResolution, setSelectedResolution] = useState(resolution);
  const [selectedDensity, setSelectedDensity] = useState(density);
  const [selectedColor, setSelectedColor] = useState(color);

  const [materialColors, setMaterialColors] = useState([]);
  useEffect(() => {
    if (selectedMaterial === "Beste Option") {
      setMaterialColors(availableColors);
      setSelectedColor("#A3A3A3");
      return;
    }

    const filteredColors = availableColors.filter(
      (color) => color[selectedMaterial] == true
    );
    setMaterialColors(filteredColors);

    setSelectedColor("#A3A3A3");
  }, [selectedMaterial, availableColors]);

  useEffect(() => {
    setSelectedColor(selectedColor);
  }, [availableColors]);

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

    const colorObject = availableColors.find(
      (colorObject) => colorObject.value === selectedColor
    );

    if (colorObject?.label === "Weiß") {
      return `brightness(4)  grayscale(1) `;
    }

    if (ColorRotationMap[colorObject?.label] === 0) {
      return `saturate(${ColorSaturationMap[colorObject?.label] * 100}%)`;
    }

    return `hue-rotate(${ColorRotationMap[colorObject?.label]}deg)`;
  }

  return (
    <Group noWrap position="apart" className={classes.container}>
      <Group noWrap spacing={smScreen ? 36 : 18}>
        <div className={classes.displayImage}>
          <Image
            src={imageSrc || "/MissingItemWhite.svg"}
            sx={{
              maxWidth: smScreen ? 110 : 65,
              filter: getItemColorFilter(selectedColor),
            }}
          />
        </div>
        <Group noWrap position={"apart"}>
          <Stack spacing={smScreen ? 45 : 25}>
            <Stack spacing={0}>
              <Title className={classes.itemName} truncate>
                {name}
              </Title>
              <Group noWrap spacing={smScreen ? 6 : 4}>
                <Text className={classes.piecePrice}>
                  {Intl.NumberFormat("de-De", {
                    style: "currency",
                    currency: "EUR",
                  }).format(price)}
                </Text>
                <Text className={classes.piecePrice}>|</Text>
                <Text className={classes.piecePrice}>pro Stück</Text>
              </Group>
            </Stack>
            <Group
              noWrap
              sx={(theme) => ({
                [theme.fn.smallerThan("md")]: { gap: 10 },
                [theme.fn.smallerThan("sm")]: {
                  gap: 6,
                },
              })}
            >
              <CountSelector count={count} id={id} />
              <Select
                placeholder="Wähle deine Option"
                data={[
                  { value: "Beste Option", label: "Beste Option" },
                  { value: "pla", label: "Kunststoff" },
                  { value: "resin", label: "Harz" },
                ]}
                radius={8}
                value={selectedMaterial}
                onChange={(curr) => {
                  setSelectedMaterial(curr);
                  const updatedCart = shoppingCart.map((item) => {
                    if (item.objectID === id) {
                      return {
                        ...item,
                        material: curr,
                        color: { hex: "#eeeeee", name: "Wähle deine Option" },
                      };
                    } else return item;
                  });
                  updateShoppingCart(updatedCart);
                }}
                size={"xs"}
                styles={(theme) => ({
                  root: {
                    [theme.fn.smallerThan("md")]: {
                      display: "none",
                    },
                  },
                  input: {
                    width: 120,
                  },
                })}
              />

              <Popover
                width={200}
                position="right"
                withArrow
                shadow="md"
                sx={(theme) => ({
                  [theme.fn.largerThan("md")]: {
                    display: "none",
                  },
                })}
              >
                <Popover.Target>
                  <ActionIcon
                    variant="default"
                    radius={8}
                    size={smScreen ? 32 : 28}
                  >
                    <IconSettings
                      color={theme.colors.primary[2]}
                      size={smScreen ? 20 : 18}
                    />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Stack spacing={10}>
                    <Select
                      placeholder="Wähle deine Option"
                      data={[
                        { value: "Beste Option", label: "Beste Option" },
                        { value: "pla", label: "Kunststoff" },
                        { value: "resin", label: "Harz" },
                      ]}
                      radius={8}
                      value={selectedMaterial}
                      onChange={(curr) => {
                        setSelectedMaterial(curr);
                        const updatedCart = shoppingCart.map((item) => {
                          if (item.objectID === id) {
                            return {
                              ...item,
                              material: curr,
                              color: {
                                hex: "#eeeeee",
                                name: "Wähle deine Option",
                              },
                            };
                          } else return item;
                        });
                        updateShoppingCart(updatedCart);
                      }}
                      size={"xs"}
                    />
                    <Select
                      placeholder="Wähle deine Option"
                      data={materialColors}
                      radius={8}
                      value={selectedColor}
                      onChange={(curr) => {
                        setSelectedColor(curr);
                        const newCart = shoppingCart.map((item) => {
                          if (item.objectID === id) {
                            const colorObject = availableColors.find(
                              (colorObject) => colorObject.value === curr
                            );
                            return {
                              ...item,
                              color: {
                                hex: colorObject.value,
                                name: colorObject.label,
                              },
                            };
                          } else return item;
                        });
                        updateShoppingCart(newCart);
                      }}
                      size={"xs"}
                    />
                    <Select
                      placeholder="Wähle deine Option"
                      data={[
                        { value: 0.1, label: "Fein - 0.10mm" },
                        { value: 0.2, label: "Mittel - 0.20mm" },
                        { value: 0.4, label: "Grob - 0.40mm" },
                      ]}
                      radius={8}
                      value={selectedResolution}
                      onChange={(curr) => {
                        setSelectedResolution(curr);
                        const newCart = shoppingCart.map((item) => {
                          if (item.objectID === id) {
                            return { ...item, resolution: curr };
                          } else return item;
                        });
                        updateShoppingCart(newCart);
                      }}
                      size={"xs"}
                    />
                    <Select
                      placeholder="Wähle deine Option"
                      data={[
                        { value: "10%", label: "Leicht - 10%" },
                        { value: "20%", label: "Normal - 20%" },
                        { value: "40%", label: "Stabil - 40%" },
                        { value: "60%", label: "Ausfüllen - 60%" },
                      ]}
                      radius={8}
                      value={selectedDensity}
                      onChange={(curr) => {
                        setSelectedDensity(curr);
                        const newCart = shoppingCart.map((item) => {
                          if (item.objectID === id) {
                            return { ...item, density: curr };
                          } else return item;
                        });
                        updateShoppingCart(newCart);
                      }}
                      size={"xs"}
                    />
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            </Group>
          </Stack>

          <Stack
            justify={"space-between"}
            sx={(theme) => ({
              [theme.fn.smallerThan("md")]: {
                display: "none",
              },
            })}
          >
            <Select
              placeholder="Wähle deine Option"
              data={[
                { value: 0.1, label: "Fein - 0.10mm" },
                { value: 0.2, label: "Mittel - 0.20mm" },
                { value: 0.4, label: "Grob - 0.40mm" },
              ]}
              radius={8}
              value={selectedResolution}
              onChange={(curr) => {
                setSelectedResolution(curr);
                const newCart = shoppingCart.map((item) => {
                  if (item.objectID === id) {
                    return { ...item, resolution: curr };
                  } else return item;
                });
                updateShoppingCart(newCart);
              }}
              size={"xs"}
              styles={{
                input: {
                  width: 140,
                },
              }}
            />
            <Select
              placeholder="Wähle deine Option"
              data={[
                { value: "10%", label: "Leicht - 10%" },
                { value: "20%", label: "Normal - 20%" },
                { value: "40%", label: "Stabil - 40%" },
                { value: "60%", label: "Ausfüllen - 60%" },
              ]}
              radius={8}
              value={selectedDensity}
              onChange={(curr) => {
                setSelectedDensity(curr);
                const newCart = shoppingCart.map((item) => {
                  if (item.objectID === id) {
                    return { ...item, density: curr };
                  } else return item;
                });
                updateShoppingCart(newCart);
              }}
              size={"xs"}
              styles={{
                input: {
                  width: 140,
                },
              }}
            />
            <Select
              placeholder="Wähle deine Option"
              data={materialColors}
              radius={8}
              value={selectedColor}
              onChange={(curr) => {
                setSelectedColor(curr);
                const newCart = shoppingCart.map((item) => {
                  if (item.objectID === id) {
                    const colorObject = availableColors.find(
                      (colorObject) => colorObject.value === curr
                    );
                    return {
                      ...item,
                      color: {
                        hex: colorObject.value,
                        name: colorObject.label,
                      },
                    };
                  } else return item;
                });
                updateShoppingCart(newCart);
              }}
              size={"xs"}
              styles={{
                input: {
                  width: 140,
                },
              }}
            />
          </Stack>
        </Group>
      </Group>
      <Stack justify={"space-between"} align="end" spacing={smScreen ? 60 : 34}>
        <Text className={classes.fullPrice}>
          {Intl.NumberFormat("de-De", {
            style: "currency",
            currency: "EUR",
          }).format(price * count)}
        </Text>
        <RemoveButton id={id} />
      </Stack>
    </Group>
  );
}
