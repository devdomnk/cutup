import React from "react";
import { useMantineTheme } from "@mantine/core";
import { useSmScreen } from "../context/mediaQueryContext";

export default function LogoSmall() {
  const theme = useMantineTheme();
  const smScreen = useSmScreen();

  return (
    <svg
      width={smScreen ? "30" : "24"}
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='11' cy='11' r='11' fill='url(#paint0_linear_2_14)' />
      <path
        d='M8.25 15.8125V9.12243M8.25 9.12243L13.8604 5.5M8.25 9.12243L13.8604 13.626'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2_14'
          x1='-2.52874'
          y1='22'
          x2='25.9041'
          y2='19.4919'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={theme.colors.primary[3]} />

          <stop offset='1' stopColor={theme.colors.secondary[3]} />
        </linearGradient>
      </defs>
    </svg>
  );
}
