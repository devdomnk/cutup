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
} from "@mantine/core";

import {
  IconArrowNarrowRight,
  IconArrowRight,
  IconSquare,
} from "@tabler/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { useFirestore } from "../context/firebaseContext";

const useStyles = createStyles((theme) => ({
  shoppingCartBadge: {
    position: "absolute",
    right: -17,
    top: -2,
    height: 17,
    width: 17,
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

function MessagePreview({
  index,
  selectedIndex,
  setSelectedMessage,
  name,
  id,
}) {
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
        setSelectedMessage(index);
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
          {id}
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

export default function OrderSection({ messages }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const firestore = useFirestore();

  const [selectedMessage, setSelectedMessage] = useState();
  const [messageState, setMessageState] = useState(messages);

  const timeOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <Stack>
        <div style={{ position: "relative", width: "max-content" }}>
          <Text size={18} weight={800} color={theme.colors.gray[8]}>
            Nachrichten
          </Text>
          <div className={classes.shoppingCartBadge}>{messageState.length}</div>
        </div>
      </Stack>
      <Stack spacing={20} mt={32}>
        {messageState.map((message, index) => (
          <MessagePreview
            key={index}
            index={index}
            id={message.id}
            name={message.name}
            selectedIndex={selectedMessage}
            setSelectedMessage={setSelectedMessage}
          />
        ))}
      </Stack>
      <Aside width={{ base: "43vw" }} sx={{ zIndex: 0 }} py={90} px={80}>
        {selectedMessage !== undefined && (
          <>
            <Aside.Section>
              <Group align={"start"} position={"apart"}>
                <Stack spacing={0}>
                  <Text size={17} weight={800} color={theme.colors.gray[8]}>
                    {messageState[selectedMessage]["name"]}
                  </Text>
                  <Text mt={-5} size={14} color={theme.colors.gray[5]}>
                    {messageState[selectedMessage]["id"]}
                  </Text>
                </Stack>
                <Text size={13}>
                  {Intl.DateTimeFormat("de-DE", timeOptions).format(
                    messageState[selectedMessage]["time"]
                  )}
                </Text>
              </Group>
            </Aside.Section>
            <Divider mt={30} mb={40} />
            <Aside.Section grow>
              <Text size={13.5} sx={{ width: 420 }}>
                {messageState[selectedMessage]["message"]}
              </Text>
            </Aside.Section>

            <Aside.Section>
              <Group>
                <Button size={"sm"} variant='primary'>
                  Antworten
                </Button>
                <Button
                  size={"sm"}
                  variant='primary'
                  sx={{
                    backgroundColor: theme.colors.red[7],
                    "&:hover": { backgroundColor: theme.colors.red[9] },
                  }}
                  onClick={async () => {
                    await deleteDoc(
                      doc(
                        firestore,
                        `messages/${messageState[selectedMessage]["id"]}`
                      )
                    );
                    setSelectedMessage(undefined);
                    setMessageState((prev) =>
                      prev.filter(
                        (message) => message.id !== prev[selectedMessage]["id"]
                      )
                    );
                  }}
                >
                  Löschen
                </Button>
              </Group>
            </Aside.Section>
          </>
        )}
      </Aside>
    </>
  );
}
