import React, { useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import { createStyles, Button, Stack, Text } from "@mantine/core";
import { CloudUpload } from "tabler-icons-react";
import { uploadBytes } from "firebase/storage";
import { useMdScreen, useSmScreen } from "../context/mediaQueryContext";

const useStyles = createStyles((theme) => ({
  root: {
    width: "100%", //width of xl container
    height: 600,
    background: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff10",
    [theme.fn.smallerThan("sm")]: {
      height: 600,
    },
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    [theme.fn.smallerThan("md")]: {
      gap: 35,
    },
  },
  icon: {
    color: theme.colors.primary[3],
  },
  heading: {
    fontWeight: 700,
    fontSize: 24,
    [theme.fn.smallerThan("md")]: {
      fontSize: 20,
    },
    [theme.fn.smallerThan("md")]: {
      fontSize: 18,
    },
  },
}));

export default function DropzoneFunction({
  nextStep,
  storageref,
  setObjectData,
}) {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();

  async function uploadFile(file) {
    setObjectData((prev) => ({ ...prev, fileName: file.name.split(".")[0] }));
    await uploadBytes(storageref, file);
    setLoading(false);
    nextStep();
  }

  return (
    <Dropzone
      classNames={classes}
      accept={{ "model/stl": [".stl"] }}
      onDrop={(files) => {
        setLoading(true);
        uploadFile(files[0]);
      }}
      loading={loading}
      radius={8}
    >
      <Stack align={"center"} spacing={0}>
        <CloudUpload
          className={classes.icon}
          size={mdScreen ? 170 : smScreen ? 130 : 115}
        />
        <Text className={classes.heading}>Ziehe deine Datei hierher</Text>
      </Stack>
      <Text align="center" size={mdScreen ? "md" : smScreen ? "sm" : "xs"}>
        oder
      </Text>
      <Stack align={"center"}>
        <Button
          size={mdScreen ? "md" : "xs"}
          variant="gradient"
          radius={8}
          px={mdScreen ? undefined : 22}
          sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
              height: 38,
              fontSize: 14,
            },
            [theme.fn.smallerThan("sm")]: {
              fontSize: 13,
              height: 36,
            },
          })}
        >
          Datei auswählen
        </Button>
        <Text
          size={mdScreen ? "md" : "xs"}
          sx={(theme) => ({ [theme.fn.smallerThan("sm")]: { fontSize: 11 } })}
        >
          akzeptiertes Dateiformat: *.stl | maximale Größe: 25mb
        </Text>
      </Stack>
    </Dropzone>
  );
}
