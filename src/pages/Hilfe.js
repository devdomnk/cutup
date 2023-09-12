import React from "react";
import {
  Container,
  Title,
  Group,
  Text,
  Stack,
  useMantineTheme,
  createStyles,
  Accordion,
} from "@mantine/core";
import {
  useLgScreen,
  useMdScreen,
  useSmScreen,
  useXsScreen,
} from "../components/context/mediaQueryContext";
import { motion } from "framer-motion";

const useStyles = createStyles((theme) => ({
  heading: {
    fontSize: 52,
    fontWeight: 800,
    color: theme.colors.dark[8],
    letterSpacing: -0.5,
    [theme.fn.smallerThan("md")]: {
      fontSize: 43,
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: 34,
    },
  },
  container: {
    minWidth: 750,

    [theme.fn.smallerThan("md")]: {
      minWidth: "unset",
      width: "100%",
    },
  },
}));

export default function Hilfe() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const lgScreen = useLgScreen();
  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();
  const xsScreen = useXsScreen();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container
        size="md"
        mt={smScreen ? -60 : -100}
        className={classes.container}
      >
        <Group spacing={90}>
          <Stack spacing={mdScreen ? "sm" : 0}>
            <Title className={classes.heading}>Häufige Fragen</Title>
            <Text
              weight={500}
              sx={{
                width: mdScreen
                  ? 450
                  : smScreen
                  ? 350
                  : xsScreen
                  ? 300
                  : "full",
              }}
              size={lgScreen ? "md" : mdScreen ? "sm" : "xs"}
            >
              Antworten auf verbreitete Fragen zum Thema 3D-Druck und der
              Bestellung bei CutUp.
            </Text>
          </Stack>
          <svg
            width="181"
            height="116"
            viewBox="0 0 181 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: lgScreen ? "flex" : "none" }}
          >
            <path
              d="M158.444 116C157.8 116 157.155 116 156.511 115.356L131.378 96.6667H87.5555C78.5332 96.6667 71.4443 89.5778 71.4443 80.5556V35.4445C71.4443 26.4222 78.5332 19.3333 87.5555 19.3333H164.889C173.911 19.3333 181 26.4222 181 35.4445V80.5556C181 89.5778 173.911 96.6667 164.889 96.6667H161.667V112.778C161.667 114.067 161.022 115.356 159.733 115.356C159.089 116 159.089 116 158.444 116ZM87.5555 25.7778C82.3999 25.7778 77.8888 30.2889 77.8888 35.4445V80.5556C77.8888 85.7111 82.3999 90.2222 87.5555 90.2222H132.667C133.311 90.2222 133.955 90.2222 134.6 90.8667L155.222 106.333V93.4445C155.222 91.5111 156.511 90.2222 158.444 90.2222H164.889C170.044 90.2222 174.555 85.7111 174.555 80.5556V35.4445C174.555 30.2889 170.044 25.7778 164.889 25.7778H87.5555Z"
              fill={theme.colors.primary[3]}
            />
            <path
              d="M23.1107 96.6667C22.4663 96.6667 21.8218 96.6667 21.8218 96.0222C20.533 96.0222 19.8885 94.7333 19.8885 93.4445V77.3333H16.6663C7.64407 77.3333 0.555176 70.2444 0.555176 61.2222V16.1111C0.555176 7.08889 7.64407 0 16.6663 0H93.9996C103.022 0 110.111 7.08889 110.111 16.1111V22.5556C110.111 24.4889 108.822 25.7778 106.889 25.7778H87.5552C82.3996 25.7778 77.8885 30.2889 77.8885 35.4444V74.1111C77.8885 76.0444 76.5996 77.3333 74.6663 77.3333H50.1774L25.0441 96.0222C24.3996 96.6667 23.7552 96.6667 23.1107 96.6667ZM16.6663 6.44444C11.5107 6.44444 6.99962 10.9556 6.99962 16.1111V61.2222C6.99962 66.3778 11.5107 70.8889 16.6663 70.8889H23.1107C25.0441 70.8889 26.333 72.1778 26.333 74.1111V87L46.9552 71.5333C47.5996 70.8889 48.2441 70.8889 48.8885 70.8889H71.4441V35.4444C71.4441 26.4222 78.533 19.3333 87.5552 19.3333H103.666V16.1111C103.666 10.9556 99.1552 6.44444 93.9996 6.44444H16.6663Z"
              fill={theme.colors.primary[3]}
            />
            <path
              d="M48.8889 58H42.4445C37.2889 58 32.7778 53.4889 32.7778 48.3333V29C32.7778 23.8445 37.2889 19.3333 42.4445 19.3333H48.8889C54.0445 19.3333 58.5556 23.8445 58.5556 29V48.3333C58.5556 53.4889 54.0445 58 48.8889 58ZM42.4445 25.7778C40.5112 25.7778 39.2223 27.0667 39.2223 29V48.3333C39.2223 50.2667 40.5112 51.5556 42.4445 51.5556H48.8889C50.8223 51.5556 52.1112 50.2667 52.1112 48.3333V29C52.1112 27.0667 50.8223 25.7778 48.8889 25.7778H42.4445ZM139.111 77.3333C137.178 77.3333 135.889 76.0445 135.889 74.1111V48.3333C135.889 46.4 134.6 45.1111 132.667 45.1111H119.778C117.845 45.1111 116.556 46.4 116.556 48.3333V74.1111C116.556 76.0445 115.267 77.3333 113.333 77.3333C111.4 77.3333 110.111 76.0445 110.111 74.1111V48.3333C110.111 43.1778 114.622 38.6667 119.778 38.6667H132.667C137.822 38.6667 142.333 43.1778 142.333 48.3333V74.1111C142.333 76.0445 141.045 77.3333 139.111 77.3333Z"
              fill={theme.colors.primary[3]}
            />
            <path
              d="M135.89 64.4444H116.556C114.623 64.4444 113.334 63.1555 113.334 61.2221C113.334 59.2888 114.623 57.9999 116.556 57.9999H135.89C137.823 57.9999 139.112 59.2888 139.112 61.2221C139.112 63.1555 137.823 64.4444 135.89 64.4444ZM61.7785 57.9999C61.1341 57.9999 59.8452 57.9999 59.2008 57.3555L46.3119 44.4666C45.023 43.1777 45.023 41.2444 46.3119 39.9555C47.6008 38.6666 49.5341 38.6666 50.823 39.9555L63.7119 52.8444C65.0008 54.1332 65.0008 56.0666 63.7119 57.3555C63.7119 57.3555 62.423 57.9999 61.7785 57.9999Z"
              fill={theme.colors.primary[3]}
            />
          </svg>
        </Group>
        <Accordion
          variant="separated"
          radius={4}
          mt={smScreen ? 80 : 60}
          mb={100}
          styles={{
            panel: {
              width: mdScreen ? 719 : "100%",
              fontSize: smScreen ? 15 : 13,
            },
            item: {
              border: "0px solid white",
              backgroundColor: theme.white,
              button: { div: { fontSize: smScreen ? 16 : 14 } },
              '&[data-active="true"]': {
                button: {
                  div: {
                    fontWeight: 800,
                    transition: "all ease-in-out .1s",
                  },
                },
              },
            },
          }}
        >
          <Accordion.Item value="files">
            <Accordion.Control>Wo bekomme ich 3D-Dateien?</Accordion.Control>
            <Accordion.Panel>
              {" "}
              Es gibt Plattformen im Internet wie „Thingiverse, MyMiniFactory,
              Cults etc.“ auf denen man sich meist gratis oder gegen eine kleine
              Gebühr 3D- Objekte einfach downloaden kann. Diese könnt Ihr dann
              per Drag und Drop Prinzip auf unserer Website hochladen und euch
              zurücklehnen. Jeden weiteren Bearbeitungsschritt übernehmen wir.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="order">
            <Accordion.Control>
              Was passiert, wenn ich eine Auftrag einreiche?
            </Accordion.Control>
            <Accordion.Panel>
              {" "}
              Nachdem der Auftrag eingereicht wurde, wird er von uns
              schnellstmöglich überprüft. Nach der Überprüfung erhalten Sie in
              jedem Fall eine Antwort, in dieser wird Ihnen mitgeteilt, ob der
              Auftrag akzeptiert/grundsätzlich abgelehnt oder abgeändert werden
              müsste. Auch die Kosten des Druckes werden Ihnen mitgeteilt. Wenn
              Sie mit unserem Angebot zufrieden sind, teilen Sie uns das mit,
              lassen uns die geforderte Summe zukommen und geben uns Ihre
              Adresse. Sobald der Druck abgeschlossen wurde, wird das Objekt
              Versand und Sie erhalten eine Versands Bestätigung.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="material">
            <Accordion.Control>
              Welches Material sollte ich verwenden?
            </Accordion.Control>
            <Accordion.Panel>
              {" "}
              Wir bieten zwei 3D-Druck Fertigungsverfahren an, die
              Unterschiedliche Vor- und Nachteile beinhalten bezüglich:
              Wartungsaufwand, Druckdauer, Druckqualität, Materialkosten, max.
              Druckgröße. Je nach Objekt, das gedruckt werden soll bewährt sich
              eines der Verfahren mehr. Wenn Sie sich unsicher sind, können wir
              Ihnen gerne diese Entscheidung abnehmen und die beste Option für
              Sie wählen.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="return">
            <Accordion.Control>
              Kann ich einen Artikel zurücksenden?
            </Accordion.Control>
            <Accordion.Panel>
              {" "}
              Wir fertigen auf unsere Kunden zugeschnittene und
              kundenspezifische Artikel an. Daher haben wir nicht die
              Möglichkeit diese ohne Weiteres einem anderen Kunden zu verkaufen
              und können leider kein Rückgaberecht anbieten.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </motion.div>
  );
}
