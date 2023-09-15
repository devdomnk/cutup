import {
  Group,
  Title,
  Stack,
  Image,
  Text,
  Center,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

export default function RecommendationCard({ name, description, price }) {
  const theme = useMantineTheme();
  const ItemMap = {
    "3DBenchy": "/Benchy.png",
    Zahnpastaquetscher: "/ToothPasteSqueezer.png",
  };

  return (
    <Stack spacing={10} sx={{ maxWidth: 128 }}>
      <Center sx={{ background: theme.white, height: 176, borderRadius: 8 }}>
        <Image src={ItemMap[name]} width={90} />
      </Center>
      <Title size={15} weight={"bold"}>
        {name}
      </Title>
      <Text size={11}>{description}</Text>
      <Group position={"apart"} pr={10}>
        <Text color={theme.colors.primary[3]} size={12} weight={"bold"}>
          {Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(price)}
        </Text>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="8"
          viewBox="0 0 21 8"
          fill="none"
        >
          <path
            d="M20.3536 4.35355C20.5488 4.15829 20.5488 3.84171 20.3536 3.64644L17.1716 0.464465C16.9763 0.269202 16.6597 0.269202 16.4645 0.464465C16.2692 0.659727 16.2692 0.976309 16.4645 1.17157L19.2929 4L16.4645 6.82843C16.2692 7.02369 16.2692 7.34027 16.4645 7.53553C16.6597 7.73079 16.9763 7.73079 17.1716 7.53553L20.3536 4.35355ZM4.37114e-08 4.5L20 4.5L20 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z"
            fill="#6723F5"
          />
        </svg>
      </Group>
    </Stack>
  );
}
