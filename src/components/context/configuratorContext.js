import React, { createContext, useContext, useState } from "react";

const ConfiguratorItemContext = createContext();
const SetConfiguratorItemContext = createContext();

export function useConfiguratorItem() {
  return useContext(ConfiguratorItemContext);
}

export function useSetConfiguratorItem() {
  return useContext(SetConfiguratorItemContext);
}

export default function ConfiguratorContext({ children }) {
  const [selectedItem, setSelectedItem] = useState();

  return (
    <ConfiguratorItemContext.Provider value={selectedItem}>
      <SetConfiguratorItemContext.Provider value={setSelectedItem}>
        {children}
      </SetConfiguratorItemContext.Provider>
    </ConfiguratorItemContext.Provider>
  );
}
