import React, { useState, useEffect, useRef } from "react";
import {
  Aside,
  createStyles,
  Stack,
  Text,
  useMantineTheme,
  Group,
  Transition,
  Button,
  Select,
  Card,
  Divider,
  Box,
  Image,
  Title,
  TextInput,
  ColorInput,
  Tabs,
  ColorSwatch,
  ActionIcon,
} from "@mantine/core";

import {
  IconArrowNarrowRight,
  IconArrowRight,
  IconMilk,
  IconSearch,
  IconSquare,
  IconTrash,
  IconWall,
  IconWaveSine,
} from "@tabler/icons";
import { useFirestore } from "../context/firebaseContext";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  root: {
    width: 450,
  },
  input: {
    backgroundColor: theme.white,
    borderRadius: 8,
    width: 450,
    fontSize: 15,

    "&:focus": {
      border: "none",
    },
  },
  item: {
    fontSize: 15,
    padding: "10px 10px",
  },
}));

function ColorCard({
  name,
  hex,
  availableColors,
  setAvailableColors,
  pla,
  resin,
}) {
  const theme = useMantineTheme();
  const firestore = useFirestore();

  async function removeColor() {
    await deleteDoc(doc(firestore, "Colors", name));
    if (pla)
      setAvailableColors((prev) => {
        return {
          pla: availableColors.pla.filter((color) => color.name !== name),
          resin: prev.resin,
        };
      });
    if (resin)
      setAvailableColors((prev) => {
        return {
          pla: prev.pla,
          resin: availableColors.resin.filter((color) => color.name !== name),
        };
      });
  }

  return (
    <Group
      position='apart'
      align={"center"}
      py={10}
      px={20}
      sx={{ border: `1px solid ${theme.colors.gray[3]}`, borderRadius: 8 }}
      noWrap
    >
      <Group align={"center"} spacing={16} noWrap>
        <ColorSwatch color={hex} size={22} />
        <Text size={15}>{name}</Text>
      </Group>
      <ActionIcon
        variant='subtle'
        color={theme.colors.primary[3]}
        size='md'
        onClick={removeColor}
      >
        <IconTrash size={21} />
      </ActionIcon>
    </Group>
  );
}

export default function ColorSection({ availableColors }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const firestore = useFirestore();
  const form = useForm({
    initialValues: {
      name: "",
      material: null,
      hex: "",
    },
    validate: {
      name: (value) => (value == null ? "Wir brauchen einen Namen" : null),
      material: (value) => (value == null ? "Welches Material?" : null),
      hex: (value) => (value == null ? "Nimm eine ähnliche Farbe" : null),
    },
  });

  const [availableColorsState, setAvailableColors] = useState(availableColors);

  async function addColor(name, material, hex) {
    const docRef = doc(firestore, "Colors", name);
    await setDoc(docRef, {
      PLA: material === "pla",
      Resin: material === "resin",
      hex: hex,
    });
    form.reset();
    setAvailableColors((prev) => {
      return {
        pla:
          material === "pla"
            ? [{ name: name, hex: hex }, ...prev.pla]
            : prev.pla,
        resin:
          material === "resin"
            ? [{ name: name, hex: hex }, ...prev.resin]
            : prev.resin,
      };
    });
  }

  const [panelHeight, setPanelHeight] = useState(0);
  const panelRef = useRef();
  useEffect(() => {
    setPanelHeight(panelRef.current.clientHeight);
  });

  return (
    <>
      <Stack>
        <Text size={18} weight={800} color={theme.colors.gray[8]}>
          Farbe Hinzufügen
        </Text>
      </Stack>
      <form
        onSubmit={form.onSubmit((values) =>
          addColor(values.name, values.material, values.hex)
        )}
        onReset={form.onReset}
      >
        <Stack spacing={18} mt={52}>
          <TextInput
            variant={"filled"}
            size='md'
            placeholder='Name'
            icon={<IconSearch size={20} color={theme.colors.primary[3]} />}
            iconWidth={46}
            classNames={classes}
            {...form.getInputProps("name")}
          />
          <Select
            variant={"filled"}
            size='md'
            placeholder='Material'
            icon={<IconWall size={20} color={theme.colors.primary[3]} />}
            iconWidth={46}
            classNames={classes}
            data={[
              { value: "pla", label: "PLA" },
              { value: "resin", label: "Resin" },
            ]}
            {...form.getInputProps("material")}
          />
          <ColorInput
            variant={"filled"}
            size='md'
            placeholder='#6723F5'
            iconWidth={46}
            classNames={classes}
            {...form.getInputProps("hex")}
          />
        </Stack>
        <Button size={"sm"} variant='primary' mt={52} type='submit'>
          Farbe Hinzufügen
        </Button>
      </form>
      <Aside width={{ base: "43vw" }} sx={{ zIndex: 0 }} ref={panelRef}>
        <Aside.Section pt={90} px={80} pb={52}>
          <Text size={17} weight={800} color={theme.colors.gray[8]}>
            Vorhandene Farben
          </Text>
        </Aside.Section>
        <Aside.Section grow pb={90}>
          <Tabs
            variant='outline'
            defaultValue={"pla"}
            radius={3}
            styles={{ tab: { padding: "6px 24px" } }}
          >
            <Tabs.List pl={80}>
              <Tabs.Tab
                value='pla'
                /* icon={
                  <IconWaveSine
                    size={22}
                    color={theme.colors.gray[5]}
                    stroke={2}
                  />
                } */
              >
                <Text weight={500} size={15}>
                  PLA
                </Text>
              </Tabs.Tab>
              <Tabs.Tab
                value='resin'
                /* icon={
                  <IconMilk size={22} color={theme.colors.gray[5]} stroke={2} />
                } */
              >
                <Text weight={500} size={15}>
                  Resin
                </Text>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value='pla' pt={45} px={80}>
              <Stack
                spacing={16}
                pr={4}
                sx={{
                  overflowY: "auto",
                  height: panelHeight - 340,
                  "&::-webkit-scrollbar": {
                    width: 4,
                  },
                  "&::-webkit-scrollbar-track": {
                    color: "#fff",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.colors.gray[2],
                    borderRadius: 3,
                  },
                }}
              >
                {availableColorsState.pla.map((color) => (
                  <ColorCard
                    name={color.name}
                    hex={color.hex}
                    availableColors={availableColorsState}
                    setAvailableColors={setAvailableColors}
                    pla
                    key={color.name}
                  />
                ))}
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value='resin' pt={45} px={80}>
              <Stack
                spacing={16}
                pr={4}
                sx={{
                  overflowY: "auto",
                  height: panelHeight - 340,
                  "&::-webkit-scrollbar": {
                    width: 4,
                  },
                  "&::-webkit-scrollbar-track": {
                    color: "#fff",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.colors.gray[2],
                    borderRadius: 3,
                  },
                }}
              >
                {availableColorsState.resin.map((color) => (
                  <ColorCard
                    name={color.name}
                    hex={color.hex}
                    availableColors={availableColorsState}
                    setAvailableColors={setAvailableColors}
                    resin
                    key={color.name}
                  />
                ))}
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Aside.Section>
      </Aside>
    </>
  );
}
