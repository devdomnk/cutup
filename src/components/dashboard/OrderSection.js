import React, { useState, useEffect } from "react";
import {
  Aside,
  createStyles,
  Stack,
  Text,
  useMantineTheme,
  Group,
  Transition,
  Button,
  Card,
  Divider,
  Box,
  Image,
  Title,
  Skeleton,
} from "@mantine/core";
import { uuidv4 } from "@firebase/util";
import {
  IconArrowNarrowRight,
  IconArrowRight,
  IconSquare,
} from "@tabler/icons";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useFirestore, useStorage } from "../context/firebaseContext";
import { getDownloadURL, ref } from "firebase/storage";

const stripeCountryMap = [
  { country: "Argentinien", code: "AR" },
  { country: "Australien", code: "AU" },
  { country: "Österreich", code: "AT" },
  { country: "Belgien", code: "BE" },
  { country: "Bolivivien", code: "BO" },
  { country: "Brasilien", code: "BR" },
  { country: "Bulgarien", code: "BG" },
  { country: "Kanada", code: "CA" },
  { country: "Chile", code: "CL" },
  { country: "Kolumbien", code: "CO" },
  { country: "Costa Rica", code: "CR" },
  { country: "Kroatien", code: "HR" },
  { country: "Cyprus", code: "CY" },
  { country: "Tschechische Republik", code: "CZ" },
  { country: "Dänemark", code: "DK" },
  { country: "Dominikanische Republik", code: "DO" },
  { country: "Ägypten", code: "EG" },
  { country: "Estland", code: "EE" },
  { country: "Finnland", code: "FI" },
  { country: "Frankreich", code: "FR" },
  { country: "Deutschland", code: "DE" },
  { country: "Griechenland", code: "GR" },
  { country: "Hong Kong", code: "HK" },
  { country: "Ungarn", code: "HU" },
  { country: "Island", code: "IS" },
  { country: "Indien", code: "IN" },
  { country: "Indonesien", code: "ID" },
  { country: "Irland", code: "IE" },
  { country: "Israel", code: "IL" },
  { country: "Italien", code: "IT" },
  { country: "Japan", code: "JP" },
  { country: "Lettland", code: "LV" },
  { country: "Liechtenstein", code: "LI" },
  { country: "Litauen", code: "LT" },
  { country: "Luxemburg", code: "LU" },
  { country: "Malta", code: "MT" },
  { country: "Mexiko ", code: "MX" },
  { country: "Niederland", code: "NL" },
  { country: "Neuseeland", code: "NZ" },
  { country: "Norwegen", code: "NO" },
  { country: "Paraguay", code: "PY" },
  { country: "Peru", code: "PE" },
  { country: "Polen", code: "PL" },
  { country: "Portugal", code: "PT" },
  { country: "Rumänien", code: "RO" },
  { country: "Singapur", code: "SG" },
  { country: "Slovakien", code: "SK" },
  { country: "Slowenien", code: "SI" },
  { country: "Spanien", code: "ES" },
  { country: "Schweden", code: "SE" },
  { country: "Schweiz", code: "CH" },
  { country: "Thailand", code: "TH" },
  { country: "Trinidad & Tobago", code: "TT" },
  { country: "United Arab Emirates", code: "AE" },
  { country: "Vereinigtes Königreich", code: "GB" },
  { country: "USA", code: "US" },
  { country: "Uruguay", code: "UY" },
];

const useStyles = createStyles((theme) => ({
  shoppingCartBadge: {
    position: "absolute",
    right: -25,
    top: -2,
    height: 17,
    padding: "1px 7px",
    borderRadius: 9,
    backgroundColor: theme.colors.primary[3],
    color: theme.white,
    fontSize: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function OrderPreview({ index, selectedIndex, setSelectedOrder, name, uid }) {
  const theme = useMantineTheme();
  const selected = index === selectedIndex;

  return (
    <Group
      position='apart'
      sx={{
        backgroundColor: selected ? theme.colors.primary[3] : theme.white,
        borderRadius: 8,
        padding: "10px 20px",
        cursor: "pointer",
        transition: ".1s ease-in-out all",
      }}
      onClick={() => {
        setSelectedOrder(index);
      }}
    >
      <Stack spacing={0}>
        <Text
          size={16}
          weight={600}
          color={selected ? theme.white : theme.colors.dark[9]}
          sx={{ transition: ".1s ease-in-out all" }}
        >
          {name}
        </Text>
        <Text
          mt={-5}
          size={14}
          color={selected ? theme.colors.primary[1] : theme.colors.gray[5]}
          sx={{ transition: ".1s ease-in-out all" }}
        >
          {uid}
        </Text>
      </Stack>

      <Group noWrap spacing={0}>
        <Transition
          mounted={selected}
          transition='slide-right'
          duration={200}
          timingFunction='ease'
        >
          {(styles) => (
            <IconArrowNarrowRight
              style={styles}
              size={30}
              color={theme.white}
            />
          )}
        </Transition>
        <Transition
          mounted={!selected}
          transition='slide-left'
          duration={200}
          exitDuration={0}
          timingFunction='ease'
        >
          {(styles) => (
            <IconSquare
              style={styles}
              size={20}
              color={selected ? theme.colors.primary[3] : theme.black}
            />
          )}
        </Transition>
      </Group>
    </Group>
  );
}

function ObjectCard({
  name,
  material,
  color,
  hex,
  resolution,
  density,
  scale,
  quantity,
  downloadPath,
}) {
  const theme = useMantineTheme();
  const storage = useStorage();

  return (
    <Stack
      pb={18}
      pt={54}
      sx={{
        position: "relative",
        width: 290,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 8,
        border: `1px solid ${theme.colors.gray[2]}`,
      }}
      spacing={20}
    >
      <div
        style={{
          top: 7,
          position: "absolute",
          transform: "translateY(-50%)",
          backgroundColor: hex
            ? theme.fn.lighten(hex, 0.6)
            : theme.colors.primary[0],
          borderRadius: 8,
          padding: 10,
          width: 80,
          height: 80,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -7,
            top: -7,
            height: 20,
            minWidth: 20,
            padding: "0 4px",
            backgroundColor: hex || theme.colors.primary[3],
            color: theme.white,
            fontSize: 12,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          {quantity}
        </div>
        {/*    <Image src='ghost.png' /> */}
      </div>
      <Title
        size={16}
        weight={700}
        color={theme.colors.dark[8]}
        sx={{ letterSpacing: -0.2 }}
      >
        {name}
      </Title>
      <Stack align={"center"} spacing={7}>
        <Text size={13}>
          {material} | {color}
        </Text>
        <Text size={13}>
          Layerhöhe {resolution}mm | Fülldichte {density}
        </Text>
        <Text size={13}>Skalierung: {scale}</Text>
      </Stack>
      <Button
        size='xs'
        variant='primary'
        radius={6}
        px={20}
        sx={{
          backgroundColor: hex,
          "&:hover": { backgroundColor: theme.fn.darken(hex, 0.2) },
        }}
        onClick={() => {
          console.log(downloadPath);
          getDownloadURL(ref(storage, downloadPath)).then((url) => {
            const link = document.createElement("a");
            link.href = url;
            link.download = `${name}.stl`;
            link.click();
          });
        }}
      >
        Download
      </Button>
    </Stack>
  );
}

export default function OrderSection({ pendingOrders }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [selectedOrder, setSelectedOrder] = useState(0);
  const timeOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [orders, setOrders] = useState(pendingOrders);

  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);
  const [isShippedButtonLoading, setIsShippedButtonLoading] = useState(false);

  const firestore = useFirestore();
  async function deleteOrder(orderIndex) {
    setIsDeleteButtonLoading(true);
    await deleteDoc(doc(firestore, orders[orderIndex]["orderPath"]));
    setSelectedOrder((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });
    setOrders((prev) => {
      return prev.filter((order, index) => index != orderIndex);
    });
    setIsDeleteButtonLoading(false);
  }

  async function shippedOrder(orderIndex) {
    setIsShippedButtonLoading(true);
    await updateDoc(doc(firestore, orders[orderIndex]["orderPath"]), {
      status: "shipped",
    });
    setSelectedOrder((prev) => {
      if (prev === 0) return 0;
      return prev - 1;
    });
    setOrders((prev) => {
      return prev.filter((order, index) => index != orderIndex);
    });
    setIsShippedButtonLoading(false);
  }

  return (
    <>
      <Stack>
        <div style={{ position: "relative", width: "max-content" }}>
          <Text size={18} weight={800} color={theme.colors.gray[8]}>
            Bestellungen
          </Text>
          <div className={classes.shoppingCartBadge}>{orders.length}</div>
        </div>
      </Stack>
      <Stack spacing={20} mt={32}>
        {orders.map((order, index) => (
          <OrderPreview
            key={index}
            index={index}
            selectedIndex={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            name={order.name}
            uid={order.uid}
          />
        ))}
      </Stack>
      <Aside width={{ base: "43vw" }} sx={{ zIndex: 0 }} py={90} px={80}>
        {orders[selectedOrder] ? (
          <>
            <Aside.Section>
              <Group align={"start"} position={"apart"}>
                <Stack spacing={0}>
                  <Text size={17} weight={800} color={theme.colors.gray[8]}>
                    {orders[selectedOrder]["name"]}
                  </Text>
                  <Text mt={-5} size={14} color={theme.colors.gray[5]}>
                    {orders[selectedOrder]["uid"]}
                  </Text>
                </Stack>
                <Stack spacing={0} align='end'>
                  <Text size={13}>
                    {Intl.DateTimeFormat("de-DE", timeOptions).format(
                      orders[selectedOrder]["created"]
                    )}
                  </Text>
                  <Text size={12} color={theme.colors.gray[5]}>
                    {orders[selectedOrder]["email"]}
                  </Text>
                </Stack>
              </Group>
              <Stack spacing={0} mt={30}>
                <Text size={13}>{`${
                  orders[selectedOrder]["address"]["line1"]
                } ${
                  orders[selectedOrder]["address"]["line2"]
                    ? orders[selectedOrder]["address"]["line2"]
                    : ""
                }`}</Text>
                <Text
                  size={13}
                >{`${orders[selectedOrder]["address"]["postal_code"]} ${orders[selectedOrder]["address"]["city"]}`}</Text>
                <Text size={13}>{`${
                  stripeCountryMap.find(
                    (country) =>
                      country.code ===
                      orders[selectedOrder]["address"]["country"]
                  ).country
                }`}</Text>
              </Stack>
            </Aside.Section>
            <Divider mt={30} mb={100} />
            <Aside.Section grow>
              <Group
                position={
                  orders[selectedOrder]["items"].length > 1 ? "apart" : "center"
                }
              >
                {orders[selectedOrder]["items"].map((item, index) => (
                  <ObjectCard
                    key={index}
                    name={item.name}
                    material={item.metadata.material}
                    color={item.metadata.color}
                    hex={item.metadata.hex}
                    resolution={item.metadata.resolution}
                    density={item.metadata.density}
                    scale={item.metadata.scale}
                    quantity={item.quantity}
                    downloadPath={item.metadata.ref}
                  />
                ))}
              </Group>
            </Aside.Section>
            <Divider mb={90} />
            <Aside.Section>
              <Group>
                <Button
                  size={"sm"}
                  radius={8}
                  variant='gradient'
                  loading={isShippedButtonLoading}
                  onClick={() => {
                    shippedOrder(selectedOrder);
                  }}
                >
                  Bestellung Versandt
                </Button>
                <Button
                  size={"sm"}
                  radius={8}
                  variant='outline'
                  loading={isDeleteButtonLoading}
                  onClick={() => {
                    deleteOrder(selectedOrder);
                  }}
                >
                  Bestellung Löschen
                </Button>
              </Group>
            </Aside.Section>
          </>
        ) : null}
      </Aside>
    </>
  );
}
