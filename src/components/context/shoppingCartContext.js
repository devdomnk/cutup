import React, { createContext, useContext, useState } from "react";

const ShoppingCartContext = createContext();
const UpdateShoppingCartContext = createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function useUpdateShoppingCart() {
  return useContext(UpdateShoppingCartContext);
}

export default function ShoppingCartContextFunction({ children }) {
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      <UpdateShoppingCartContext.Provider value={setShoppingCart}>
        {children}
      </UpdateShoppingCartContext.Provider>
    </ShoppingCartContext.Provider>
  );
}
