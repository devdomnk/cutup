import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { ColorSchemeProvider, MantineProvider, Stack } from "@mantine/core";
import AppShell from "./components/layouts/AppShell";
import ContactForm from "./components/utils/ContactForm";
import TermsOfUseModal from "./components/utils/TermsOfUseModal";
import FirebaseContext from "./components/context/firebaseContext";
import ShoppingCartContext from "./components/context/shoppingCartContext";
import ModalContext from "./components/context/modalContext";
import ConfiguratorContext from "./components/context/configuratorContext";
import MediaQueryContext from "./components/context/mediaQueryContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AnimatedRoutes from "./AnimatedRoutes";

const SIDE_PADDING = 0;
const TOP_PADDING = 200;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(Index());

function Index() {
  return (
    <React.StrictMode>
      <ColorSchemeProvider colorScheme={"light"}>
        <MantineProvider
          theme={{
            colors: {
              primary: [
                "#EFE8FE",
                "#A177FF",
                "#8C5AF7",
                "#6723F5",
                "#4C0AD7",
                "#3C08AC",
                "#30068A",
                "#27056E",
                "#1F0458",
                "#190346",
              ],
              secondary: [
                "#F7E8FE",
                "#DC9AFA",
                "#C55AF7",
                "#B224F5",
                "#950AD7",
                "#7708AC",
                "#5F068A",
                "#4C056E",
                "#3D0458",
                "#310346",
              ],
              lightgray: ["#E9ECEF"],
              darkText: ["#26242A"],
            },
            primaryColor: "primary",
            primaryShade: 3,
            defaultGradient: {
              from: "primary",
              to: "secondary",
              deg: 25,
            },
            fontFamily: "'Segoe UI', sans-serif",
            fontSizes: { xs: 13, sm: 15, md: 16 },
            headings: {
              fontFamily: "'Jost', sans-serif",
              sizes: { h1: { fontSize: 48 } },
            },
            loader: "oval",
            breakpoints: {
              xs: 400,
              sm: 600,
              md: 800,
              lg: 1000,
              xl: 1200,
            },
            components: {
              Container: {
                defaultProps: {
                  sizes: {
                    xs: 540,
                    sm: 720,
                    md: 960,
                    lg: 1140,
                    xl: 1320,
                  },
                },
              },
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <FirebaseContext>
            <ShoppingCartContext>
              <ConfiguratorContext>
                <MediaQueryContext>
                  <ModalContext>
                    <Router>
                      <AppShell>
                        <Stack
                          sx={{
                            /* boxShadow: "0 4px 10px rgba(0,0,0,0.1)", */
                            overflow: "clip",
                          }}
                          px={SIDE_PADDING}
                          pt={TOP_PADDING}
                        >
                          <HelmetProvider>
                            <Helmet>
                              <link
                                rel="preconnect"
                                href="https://fonts.googleapis.com"
                              />
                              <link
                                rel="preconnect"
                                href="https://fonts.gstatic.com"
                                crossorigin
                              />
                              <link
                                href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap"
                                rel="stylesheet"
                              />
                              <link
                                rel="preconnect"
                                href="https://fonts.googleapis.com"
                              />
                              <link
                                rel="preconnect"
                                href="https://fonts.gstatic.com"
                                crossOrigin
                              />
                              <link
                                href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap"
                                rel="stylesheet"
                              />
                              <link
                                rel="preconnect"
                                href="https://fonts.googleapis.com"
                              />
                              <link
                                rel="preconnect"
                                href="https://fonts.gstatic.com"
                                crossOrigin
                              />
                              <link
                                href="https://fonts.googleapis.com/css2?family=Nova+Round&display=swap"
                                rel="stylesheet"
                              />
                            </Helmet>
                          </HelmetProvider>

                          <AnimatedRoutes />

                          <ContactForm />
                          <TermsOfUseModal />
                        </Stack>
                      </AppShell>
                    </Router>
                  </ModalContext>
                </MediaQueryContext>
              </ConfiguratorContext>
            </ShoppingCartContext>
          </FirebaseContext>
        </MantineProvider>
      </ColorSchemeProvider>
    </React.StrictMode>
  );
}
