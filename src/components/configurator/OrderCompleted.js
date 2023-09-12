import {
  Button,
  Container,
  createStyles,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  stack: {
    position: "relative",
  },
  arrow: {
    position: "absolute",
    top: 145,
    left: 30,
  },
  button: {
    marginTop: 75,
    padding: "14px 80px",
    height: "unset",
  },
}));

export default function OrderCompleted() {
  const theme = useMantineTheme();

  const { classes } = useStyles();

  return (
    <Container>
      <Stack align={"center"} spacing={0} className={classes.stack}>
        <svg
          width="423"
          height="284"
          viewBox="0 0 423 284"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M373.217 167.371C377.679 166.176 381.761 170.258 380.566 174.72L361.317 246.557C360.122 251.019 354.545 252.513 351.279 249.247L298.69 196.658C295.424 193.392 296.918 187.816 301.38 186.62L373.217 167.371Z"
            fill="url(#paint0_linear_214_731)"
          />
          <rect
            x="26.969"
            y="78.2542"
            width="92.9705"
            height="92.9705"
            rx="6"
            transform="rotate(-25.3745 26.969 78.2542)"
            fill="url(#paint1_linear_214_731)"
          />
          <g filter="url(#filter0_d_214_731)">
            <circle
              cx="224.89"
              cy="142.334"
              r="111.5"
              fill="url(#paint2_linear_214_731)"
            />
          </g>
          <path
            d="M223.821 78.3245C224.902 77.8918 226.109 77.8918 227.191 78.3245L286.149 101.912C287.872 102.6 289 104.268 289 106.122C289 106.284 288.992 106.444 288.975 106.602C288.976 106.66 288.978 106.717 288.978 106.775V176.591C288.978 178.437 287.858 180.1 286.146 180.793L227.252 204.667C226.66 204.906 226.046 205.012 225.445 204.999C224.864 205.001 224.28 204.891 223.726 204.667L164.831 180.793C163.12 180.1 162 178.437 162 176.591V106.775C162 106.633 162.007 106.493 162.019 106.355C162.015 106.277 162.013 106.2 162.013 106.122C162.013 104.268 163.142 102.6 164.864 101.912L223.821 78.3245ZM229.971 193.779L279.908 173.536V112.827L230.024 132.771L229.971 193.779ZM171.07 112.813V173.536L220.9 193.735L220.953 132.757L171.07 112.813ZM225.506 87.4187L178.76 106.12L225.506 124.81L272.253 106.12L225.506 87.4187Z"
            fill="white"
          />
          <defs>
            <filter
              id="filter0_d_214_731"
              x="83.3896"
              y="0.834229"
              width="283"
              height="283"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="10"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_214_731"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.142685 0 0 0 0 0.862472 0 0 0 0 0.960625 0 0 0 0.13 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_214_731"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_214_731"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_214_731"
              x1="257.783"
              y1="194.599"
              x2="367.054"
              y2="286.154"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={theme.colors.primary[3]} />
              <stop offset="1" stopColor={theme.colors.secondary[3]} />
            </linearGradient>
            <linearGradient
              id="paint1_linear_214_731"
              x1="16.2827"
              y1="171.225"
              x2="136.438"
              y2="160.626"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={theme.colors.primary[3]} />
              <stop offset="1" stopColor={theme.colors.secondary[3]} />
            </linearGradient>
            <linearGradient
              id="paint2_linear_214_731"
              x1="87.7575"
              y1="253.834"
              x2="375.963"
              y2="228.411"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={theme.colors.primary[3]} />
              <stop offset="1" stopColor={theme.colors.secondary[3]} />
            </linearGradient>
          </defs>
        </svg>
        <Title color={theme.colors.secondary[3]} weight={900} size={36} mt={50}>
          Dein Objekt ist im Warenkorb!
        </Title>
        <Text size={15} sx={{ width: 350, textAlign: "center" }}>
          Ab sofort kannst du im Warenkorb dein Objekt bestellen
        </Text>
        <Button
          variant="gradient"
          size={"md"}
          className={classes.button}
          /* onClick={() => {
            router.push("/warenkorb");
          }} */
        >
          Zum Warenkorb
        </Button>
        <svg
          width="327"
          height="327"
          viewBox="0 0 327 327"
          className={classes.arrow}
        >
          <g clipPath="url(#clip0_207_688)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M100.773 191.157C97.9802 223.794 101.482 257.206 119.032 282.183C125.479 291.355 134.254 298.228 143.147 305.343C143.929 305.969 145.074 305.842 145.696 305.059C146.321 304.28 146.196 303.134 145.416 302.512C136.792 295.613 128.249 288.987 122.004 280.099C104.718 255.5 101.569 222.491 104.482 190.358C104.759 190.3 105.038 190.246 105.316 190.192C111.447 189.003 118.256 183.58 124.426 176.177C133.386 165.432 141.107 150.587 143.812 139.685C145.062 134.657 145.212 130.4 144.149 127.608C143.265 125.281 141.629 123.791 139.166 123.333C137.134 122.959 135.015 123.298 132.867 124.278C130.001 125.586 127.04 128.073 124.16 131.373C113.503 143.58 103.732 167.008 102.301 177.478C101.852 180.758 101.459 184.057 101.127 187.377C99.3867 187.758 97.7219 188.116 96.106 188.31C93.7339 188.594 91.487 188.52 89.2922 187.471C85.2407 185.538 82.6486 181.911 80.9535 177.652C78.2354 170.833 77.8023 162.41 77.8818 155.968C78.3271 119.734 98.4426 90.3587 122.204 67.0864C146.232 43.5485 174.027 26.2365 189.506 14.441C190.301 13.8325 190.457 12.6916 189.849 11.8976C189.245 11.1011 188.104 10.9479 187.307 11.5532C171.744 23.4143 143.819 40.8359 119.665 64.4929C95.244 88.4155 74.712 118.681 74.2529 155.926C74.1724 162.779 74.6928 171.738 77.5818 178.996C79.6291 184.125 82.8481 188.415 87.7255 190.743C90.5693 192.101 93.4739 192.278 96.5353 191.912C97.9079 191.748 99.3206 191.47 100.773 191.157ZM104.851 186.585C110.295 185.425 116.177 180.41 121.64 173.854C130.249 163.53 137.692 149.286 140.294 138.811C141.164 135.301 141.5 132.248 141.059 129.978C140.742 128.336 139.994 127.174 138.507 126.901C136.796 126.585 135.018 127.12 133.2 128.192C131.103 129.423 128.982 131.361 126.89 133.761C116.67 145.468 107.266 167.929 105.895 177.967C105.506 180.823 105.157 183.7 104.851 186.585Z"
              fill={theme.colors.secondary[1]}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M149.474 305.117C148.694 305.426 147.573 305.595 146.375 305.735C143.665 306.057 140.581 306.068 139.119 306.126C138.12 306.169 137.339 307.013 137.38 308.015C137.421 309.016 138.268 309.792 139.269 309.753C141.054 309.679 145.142 309.661 148.232 309.133C149.819 308.861 151.174 308.426 152.012 307.873C152.832 307.327 153.205 306.65 153.327 305.922C153.456 305.155 153.245 304.205 152.592 303.151C151.873 301.993 150.528 300.526 149.323 298.756C148.312 297.272 147.383 295.548 147.265 293.561C147.208 292.56 146.351 291.795 145.35 291.855C144.354 291.914 143.586 292.771 143.648 293.77C143.863 297.499 146.073 300.599 147.944 302.975C148.502 303.683 149.13 304.598 149.474 305.117Z"
              fill={theme.colors.secondary[1]}
            />
          </g>
          <defs>
            <clipPath id="clip0_207_688">
              <rect
                width="239.357"
                height="239.357"
                fill="white"
                transform="translate(207.289) rotate(60)"
              />
            </clipPath>
          </defs>
        </svg>
      </Stack>
    </Container>
  );
}
