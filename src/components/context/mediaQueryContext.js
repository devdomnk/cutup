import { useMediaQuery } from "@mantine/hooks";
import React, { createContext, useContext } from "react";

const xlScreenContext = createContext();
const lgScreenContext = createContext();
const mdScreenContext = createContext();
const smScreenContext = createContext();
const xsScreenContext = createContext();

export function useXlScreen() {
  return useContext(xlScreenContext);
}

export function useLgScreen() {
  return useContext(lgScreenContext);
}

export function useMdScreen() {
  return useContext(mdScreenContext);
}

export function useSmScreen() {
  return useContext(smScreenContext);
}

export function useXsScreen() {
  return useContext(xsScreenContext);
}

export default function MediaQueryContext({ children }) {
  const xlScreen = useMediaQuery("(min-width: 1250px)");
  const lgScreen = useMediaQuery("(min-width: 1000px)");
  const mdScreen = useMediaQuery("(min-width: 800px)");
  const smScreen = useMediaQuery("(min-width: 600px)");
  const xsScreen = useMediaQuery("(min-width: 400px)");

  return (
    <xlScreenContext.Provider value={xlScreen}>
      <lgScreenContext.Provider value={lgScreen}>
        <mdScreenContext.Provider value={mdScreen}>
          <smScreenContext.Provider value={smScreen}>
            <xsScreenContext.Provider value={xsScreen}>
              {children}
            </xsScreenContext.Provider>
          </smScreenContext.Provider>
        </mdScreenContext.Provider>
      </lgScreenContext.Provider>
    </xlScreenContext.Provider>
  );
}
