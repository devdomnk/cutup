import {
  Container,
  createStyles,
  Title,
  Group,
  Divider,
  Grid,
  TextInput,
  useMantineTheme,
  Checkbox,
  Button,
  Select,
} from "@mantine/core";
import React, { useState } from "react";
import ShippingCard from "./ShippingCard";

const countries = [
  {
    label: "Österreich",
    value: "aut",
  },
  {
    label: "Deutschland",
    value: "de",
  },
  {
    label: "Schweiz",
    value: "ch",
  },
];

const useStyles = createStyles((theme) => ({
  container: {
    padding: "30px",
    borderRadius: 4,
    backgroundColor: theme.white,
    maxWidth: 900,
  },
  sectionHeading: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: 700,
  },
  textInput: {
    marginTop: 8,
    position: "relative",
    label: {
      position: "absolute",
      backgroundColor: theme.white,
      color: theme.colors.dark[3],
      fontWeight: 600,
      padding: "0 4px",
      top: -9,
      left: 10,
      zIndex: 10,
      fontSize: 12,
    },
  },
  selectInput: {
    marginTop: 8,
    input: {
      "&::placeholder": {
        color: theme.colors.dark[4],
      },
    },
  },
}));

export default function ShippingForm() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [selectedShippingCard, setSelectedShippingCard] = useState();

  return (
    <Container className={classes.container}>
      <Group align={"center"} spacing={6}>
        <svg
          width='23'
          viewBox='0 0 22 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.9165 21.6868C10.0209 21.7912 10.1253 21.7912 10.1253 21.7912C10.0209 21.7912 9.9165 21.7912 9.9165 21.6868Z'
            fill={theme.colors.primary[3]}
          />
          <path
            d='M20.8778 12.5006V5.50652C20.8778 5.40214 20.8778 5.40213 20.8778 5.29775C20.8778 5.19336 20.8778 5.08897 20.7734 4.98458C20.7734 4.88019 20.669 4.88019 20.669 4.7758C20.669 4.7758 20.669 4.7758 20.5646 4.67141C20.5646 4.67141 20.4603 4.56702 20.3559 4.56702C20.3559 4.56702 20.3559 4.56702 20.2515 4.56702L10.8565 0.0782918C10.5433 -0.0260973 10.2301 -0.0260973 9.91696 0.0782918L0.521945 4.56702C0.521945 4.56702 0.521946 4.56702 0.417556 4.56702C0.313167 4.56702 0.313167 4.67141 0.208778 4.67141C0.208778 4.67141 0.208778 4.67141 0.104389 4.7758C0.104389 4.7758 0 4.88019 0 4.98458C0.104389 5.08897 0 5.19336 0 5.29775C0 5.40213 0 5.50652 0 5.50652V16.1542C0 16.5718 0.208778 16.8849 0.521945 17.0937L9.81257 21.7912C9.91696 21.7912 9.91696 21.8956 10.0214 21.8956C10.1257 21.8956 10.2301 22 10.3345 22C10.4389 22 10.5433 22 10.6477 21.8956C10.7521 21.8956 10.7521 21.8956 10.8565 21.7912L14.1969 20.121C14.4057 20.4342 14.7189 20.6429 15.032 20.9561L15.554 21.3737C16.0759 21.7912 16.5979 22 17.2242 22C17.8505 22 18.4769 21.7912 18.8944 21.3737L19.4164 20.9561C20.8778 19.7034 21.7129 17.9288 21.7129 15.9454V14.3796C21.8173 13.5445 21.3998 12.9181 20.8778 12.5006ZM10.4389 2.16607L12.6311 3.20996L5.7414 6.75919L8.03796 7.90747L15.032 4.35824L17.433 5.50652L10.4389 9.05575L8.03796 7.90747L5.7414 6.75919L3.44484 5.50652L10.4389 2.16607ZM2.08778 7.17675L9.39502 10.8304V19.0771L2.08778 15.4235V7.17675ZM12.8399 14.3796V15.9454C12.8399 16.1542 12.8399 16.363 12.8399 16.5718C12.8399 16.7805 12.8399 16.8849 12.9442 17.0937V17.1981C13.0486 17.6157 13.153 18.0332 13.2574 18.3464L11.4828 19.1815V10.9348L18.79 7.28114V11.8743L17.7461 11.5611C17.433 11.4567 17.1198 11.4567 16.911 11.5611L14.4057 12.2918C13.4662 12.5006 12.8399 13.3357 12.8399 14.3796ZM19.7295 15.841C19.7295 17.1981 19.1032 18.4508 18.1637 19.2859L17.6418 19.7034C17.433 19.9122 17.1198 19.9122 17.0154 19.7034L16.4935 19.2859C16.0759 18.9727 15.7628 18.5552 15.554 18.242C15.1364 17.5113 14.9276 16.7805 14.9276 15.9454V14.3796C14.9276 14.3796 14.9276 14.2752 15.032 14.2752L17.433 13.6489L19.6251 14.2752H19.7295C19.7295 14.2752 19.8339 14.2752 19.8339 14.3796V15.841H19.7295Z'
            fill={theme.colors.primary[3]}
          />
        </svg>
        <Title className={classes.sectionHeading}>Lieferinformation</Title>
      </Group>
      <Divider mt={10} mb={20} />

      <Grid>
        <Grid.Col span={6}>
          <TextInput
            className={classes.textInput}
            placeholder='___'
            label='Vorname'
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className={classes.textInput}
            placeholder='___'
            label='Nachname'
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className={classes.textInput}
            placeholder='___'
            label='Ort'
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className={classes.textInput}
            placeholder='___'
            label='Postleitzahl'
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className={classes.textInput}
            placeholder='___'
            label='Straße'
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className={classes.textInput}
            placeholder='___'
            label='Hausnummer'
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            className={classes.selectInput}
            placeholder='Dein Heimatland'
            data={countries}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            className={classes.textInput}
            placeholder='___'
            label='E-Mail'
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Checkbox
            label={
              <>
                Ich akzeptiere die{" "}
                <span
                  style={{
                    fontSize: theme.fontSizes.xs,
                    color: theme.colors.primary[3],
                    cursor: "pointer",
                  }}
                >
                  Allgemeinen Geschäftsbedingungen
                </span>
              </>
            }
            size={"xs"}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Checkbox
            label={"Ich möchte Angebote und News erhalten"}
            size={"xs"}
          />
        </Grid.Col>
      </Grid>

      <Group align={"center"} spacing={6} mt={30}>
        <svg
          width='28'
          viewBox='0 0 29 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20.4859 17.5331H10.498C10.2207 17.5331 9.95475 17.4229 9.75866 17.2268C9.56256 17.0307 9.4524 16.7648 9.4524 16.4875C9.4524 16.2101 9.56256 15.9442 9.75866 15.7481C9.95475 15.552 10.2207 15.4418 10.498 15.4418H20.4859C20.7632 15.4418 21.0291 15.552 21.2252 15.7481C21.4213 15.9442 21.5315 16.2101 21.5315 16.4875C21.5315 16.7648 21.4213 17.0307 21.2252 17.2268C21.0291 17.4229 20.7632 17.5331 20.4859 17.5331ZM26.241 17.5331H25.99C25.7127 17.5331 25.4468 17.4229 25.2507 17.2268C25.0546 17.0307 24.9444 16.7648 24.9444 16.4875C24.9444 16.2101 25.0546 15.9442 25.2507 15.7481C25.4468 15.552 25.7127 15.4418 25.99 15.4418H26.241C26.3098 15.4429 26.3781 15.4303 26.442 15.4048C26.5059 15.3792 26.5641 15.3412 26.6131 15.2929C26.6622 15.2446 26.7011 15.1871 26.7277 15.1236C26.7543 15.0601 26.768 14.992 26.768 14.9232V11.3346C26.7676 11.2169 26.7279 11.1028 26.6551 11.0103C26.5824 10.9178 26.4808 10.8524 26.3665 10.8243H20.2014C19.5085 10.8243 18.8438 10.5496 18.353 10.0604C17.8622 9.57122 17.5854 8.9074 17.5832 8.21445V2.60989C17.5843 2.54147 17.5717 2.47352 17.546 2.41008C17.5204 2.34665 17.4822 2.28903 17.4338 2.24064C17.3854 2.19225 17.3278 2.15409 17.2644 2.12843C17.2009 2.10277 17.133 2.09012 17.0646 2.09125H4.74289C4.46558 2.09125 4.19962 1.98109 4.00352 1.785C3.80743 1.5889 3.69727 1.32294 3.69727 1.04563C3.69727 0.76831 3.80743 0.50235 4.00352 0.306257C4.19962 0.110164 4.46558 0 4.74289 0H17.0646C17.4073 0 17.7467 0.0675067 18.0633 0.198666C18.38 0.329825 18.6677 0.522068 18.91 0.764418C19.1524 1.00677 19.3446 1.29448 19.4758 1.61113C19.6069 1.92777 19.6745 2.26715 19.6745 2.60989V8.19772C19.6744 8.26653 19.6881 8.33467 19.7147 8.39814C19.7413 8.46162 19.7803 8.51917 19.8293 8.56744C19.8784 8.61571 19.9365 8.65373 20.0004 8.6793C20.0643 8.70487 20.1326 8.71746 20.2014 8.71635H26.241C26.432 8.71883 26.6223 8.73843 26.8098 8.7749L26.9938 8.83346C27.5355 8.99181 28.0107 9.32253 28.3473 9.77543C28.684 10.2283 28.8637 10.7787 28.8592 11.343V14.9316C28.8548 15.6231 28.577 16.2847 28.0865 16.7721C27.5959 17.2595 26.9325 17.5331 26.241 17.5331Z'
            fill={theme.colors.primary[3]}
          />
          <path
            d='M26.6008 10.8578C26.3859 10.8578 26.1762 10.7909 26.0009 10.6665C25.8256 10.5422 25.6932 10.3664 25.6221 10.1635L23.9491 5.51255C23.9041 5.44979 23.8452 5.39827 23.777 5.362C23.7088 5.32573 23.6332 5.30568 23.556 5.30343H18.6123C18.3349 5.30343 18.069 5.19326 17.8729 4.99717C17.6768 4.80108 17.5666 4.53512 17.5666 4.2578C17.5666 3.98048 17.6768 3.71452 17.8729 3.51843C18.069 3.32234 18.3349 3.21217 18.6123 3.21217H23.556C24.0195 3.21398 24.474 3.34081 24.8715 3.57931C25.269 3.81781 25.5948 4.15914 25.8145 4.56731C25.8403 4.61589 25.8627 4.6662 25.8815 4.71788L27.5545 9.46084C27.6459 9.7227 27.6305 10.0101 27.5115 10.2606C27.3924 10.5112 27.1795 10.7047 26.9187 10.7992C26.8156 10.832 26.7088 10.8517 26.6008 10.8578ZM23.2381 22C22.4853 22 21.7495 21.7768 21.1236 21.3586C20.4977 20.9403 20.0098 20.3459 19.7217 19.6504C19.4337 18.955 19.3583 18.1897 19.5052 17.4514C19.652 16.7131 20.0145 16.0349 20.5468 15.5026C21.0791 14.9703 21.7573 14.6078 22.4956 14.461C23.2339 14.3141 23.9992 14.3895 24.6946 14.6776C25.3901 14.9656 25.9845 15.4535 26.4027 16.0794C26.821 16.7053 27.0442 17.4411 27.0442 18.1939C27.0442 19.2034 26.6432 20.1714 25.9294 20.8852C25.2156 21.599 24.2475 22 23.2381 22ZM23.2381 16.4791C22.8973 16.4708 22.5617 16.5642 22.2743 16.7475C21.9868 16.9308 21.7605 17.1957 21.6243 17.5082C21.4881 17.8207 21.4481 18.1667 21.5095 18.5021C21.5708 18.8374 21.7308 19.1469 21.9688 19.3909C22.2069 19.6349 22.5123 19.8025 22.8461 19.8721C23.1798 19.9417 23.5267 19.9103 23.8425 19.7818C24.1583 19.6534 24.4286 19.4337 24.6189 19.1508C24.8093 18.868 24.911 18.5348 24.9111 18.1939C24.9112 17.7463 24.7363 17.3163 24.4237 16.9959C24.1111 16.6755 23.6856 16.49 23.2381 16.4791ZM7.73773 22C6.98495 22 6.24909 21.7768 5.62318 21.3586C4.99727 20.9403 4.50944 20.3459 4.22136 19.6504C3.93329 18.955 3.85792 18.1897 4.00478 17.4514C4.15163 16.7131 4.51413 16.0349 5.04642 15.5026C5.57871 14.9703 6.25689 14.6078 6.9952 14.461C7.7335 14.3141 8.49878 14.3895 9.19425 14.6776C9.88972 14.9656 10.4842 15.4535 10.9024 16.0794C11.3206 16.7053 11.5438 17.4411 11.5438 18.1939C11.5438 19.2034 11.1428 20.1714 10.429 20.8852C9.71525 21.599 8.74716 22 7.73773 22ZM7.73773 16.4791C7.39856 16.4791 7.06702 16.5797 6.78502 16.7681C6.50302 16.9565 6.28322 17.2243 6.15343 17.5377C6.02364 17.851 5.98968 18.1958 6.05585 18.5285C6.12201 18.8611 6.28534 19.1667 6.52516 19.4065C6.76498 19.6463 7.07054 19.8096 7.40318 19.8758C7.73582 19.942 8.08062 19.908 8.39396 19.7782C8.70731 19.6484 8.97513 19.4286 9.16355 19.1466C9.35198 18.8646 9.45256 18.5331 9.45256 18.1939C9.45256 17.7391 9.27189 17.3029 8.95029 16.9814C8.6287 16.6598 8.19253 16.4791 7.73773 16.4791Z'
            fill={theme.colors.primary[3]}
          />
          <path
            d='M18.6122 17.5331C18.4745 17.5342 18.3381 17.5079 18.2107 17.4558C18.0833 17.4036 17.9676 17.3266 17.8703 17.2293C17.773 17.132 17.696 17.0163 17.6439 16.8889C17.5917 16.7616 17.5654 16.6251 17.5665 16.4875V7.34449C17.5665 7.06717 17.6767 6.80122 17.8728 6.60512C18.0689 6.40903 18.3349 6.29886 18.6122 6.29886C18.8895 6.29886 19.1554 6.40903 19.3515 6.60512C19.5476 6.80122 19.6578 7.06717 19.6578 7.34449V16.4875C19.6589 16.6251 19.6326 16.7616 19.5805 16.8889C19.5283 17.0163 19.4513 17.132 19.354 17.2293C19.2567 17.3266 19.141 17.4036 19.0136 17.4558C18.8863 17.5079 18.7498 17.5342 18.6122 17.5331ZM7.89658 7.37795H1.04563C0.76831 7.37795 0.50235 7.26779 0.306257 7.07169C0.110164 6.8756 0 6.60964 0 6.33232C0 6.05501 0.110164 5.78905 0.306257 5.59295C0.50235 5.39686 0.76831 5.2867 1.04563 5.2867H7.89658C8.1739 5.2867 8.43986 5.39686 8.63595 5.59295C8.83204 5.78905 8.94221 6.05501 8.94221 6.33232C8.94221 6.60964 8.83204 6.8756 8.63595 7.07169C8.43986 7.26779 8.1739 7.37795 7.89658 7.37795ZM9.18479 12.0456H5.60456C5.32725 12.0456 5.06129 11.9355 4.86519 11.7394C4.6691 11.5433 4.55894 11.2773 4.55894 11C4.55894 10.7227 4.6691 10.4567 4.86519 10.2606C5.06129 10.0645 5.32725 9.95438 5.60456 9.95438H9.18479C9.46211 9.95438 9.72807 10.0645 9.92416 10.2606C10.1203 10.4567 10.2304 10.7227 10.2304 11C10.2304 11.2773 10.1203 11.5433 9.92416 11.7394C9.72807 11.9355 9.46211 12.0456 9.18479 12.0456Z'
            fill={theme.colors.primary[3]}
          />
        </svg>
        <Title className={classes.sectionHeading}>Versandanbieter</Title>
      </Group>
      <Divider mt={10} mb={20} />
      <Group position='apart'>
        <ShippingCard
          imageSrc='Öpost.png'
          name='Österreichische Post'
          price={"6,00"}
          selectedShippingCard={selectedShippingCard}
          setSelectedShippingCard={setSelectedShippingCard}
        />
        <ShippingCard
          imageSrc='DPD.png'
          name='DPD'
          price={"6,00"}
          selectedShippingCard={selectedShippingCard}
          setSelectedShippingCard={setSelectedShippingCard}
        />
        <ShippingCard
          imageSrc='DHL.png'
          name='DHL'
          price={"6,00"}
          selectedShippingCard={selectedShippingCard}
          setSelectedShippingCard={setSelectedShippingCard}
        />
      </Group>
    </Container>
  );
}