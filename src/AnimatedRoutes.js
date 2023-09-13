import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Konfigurator from "./pages/Konfigurator";
import Produkte from "./pages/Produkte";
import Hilfe from "./pages/Hilfe";
import Warenkorb from "./pages/Warenkorb";
import { AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";

export default function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  const [initialPageDelay, setInitialPageDelay] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialPageDelay(0);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          key={"home"}
          path="/"
          element={
            <>
              <Home initialPageDelay={initialPageDelay} />
              <Skeleton />
            </>
          }
        ></Route>
        <Route
          key={"konfigurator"}
          path="/konfigurator"
          element={<Konfigurator />}
        ></Route>
        <Route key={"produkte"} path="/produkte" element={<Produkte />}></Route>
        <Route key={"hilfe"} path="/hilfe" element={<Hilfe />}></Route>
        <Route
          key={"warenkorb"}
          path="/warenkorb"
          element={<Warenkorb />}
        ></Route>
      </Routes>
    </AnimatePresence>
  );
}
