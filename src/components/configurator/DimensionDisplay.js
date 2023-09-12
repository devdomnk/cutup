import { useMantineTheme, Box } from "@mantine/core";
import React from "react";

export default function DimensionDisplay({ size, subtle }) {
  const theme = useMantineTheme();
  return (
    <Box
      sx={{
        width: 90,
        height: 45,
        backgroundColor: "#fff",
        borderRadius: 4,
        border: subtle ? "none" : `1px solid ${theme.colors.gray[4]}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.fn.smallerThan("md")]: {
          fontSize: 13,
          width: 80,
          height: 40,
        },
        [theme.fn.smallerThan("md")]: {
          fontSize: 13,
          width: subtle ? "unset" : 80,
          height: subtle ? "unset" : 40,
        },
        [theme.fn.smallerThan("md")]: {
          fontSize: 11,
          width: subtle ? "unset" : 80,
          height: subtle ? "unset" : 40,
        },
      }}
    >
      {size}mm
    </Box>
  );
}
