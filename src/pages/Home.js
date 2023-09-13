import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import {
  Container,
  createStyles,
  Group,
  Stack,
  Title,
  Text,
  Button,
  useMantineTheme,
  ActionIcon,
} from "@mantine/core";
import {
  useMdScreen,
  useSmScreen,
} from "../components/context/mediaQueryContext";
import FloatingPriceTag from "../components/utils/FloatingPriceTag";
import ScrollButton from "../components/utils/ScrollButton";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import ArrowButton from "../components/utils/ArrowButton";
import { IconShoppingCart } from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSetConfiguratorItem } from "../components/context/configuratorContext";

const productSliderData = [
  {
    name: "3DBenchy",
    measurements: "60mm x 31mm x 48mm",
    weight: 16,
    price: 7.5,
    imagePrintedLook: "BenchyPrintedLook.png",
    image: "Benchy.png",
    backgroundImage: "BenchyBackground.png",
  },
  {
    name: "Zahnpastaquetscher",
    measurements: "75mm x 40mm x 5mm",
    weight: 7,
    price: 6.5,
    imagePrintedLook: "ToothPasteSqueezerPrintedLook.png",
    image: "ToothPasteSqueezer.png",
    backgroundImage: "ToothPasteSqueezerBackground.png",
  },
  {
    name: "3DBenchy",
    measurements: "60mm x 31mm x 48mm",
    weight: 16,
    price: 7.5,
    imagePrintedLook: "BenchyPrintedLook.png",
    image: "Benchy.png",
    backgroundImage: "BenchyBackground.png",
  },
  {
    name: "Zahnpastaquetscher",
    measurements: "75mm x 40mm x 5mm",
    weight: 7,
    price: 6.5,
    imagePrintedLook: "ToothPasteSqueezerPrintedLook.png",
    image: "ToothPasteSqueezer.png",
    backgroundImage: "ToothPasteSqueezerBackground.png",
  },
];

export default function Home({ initialPageDelay }) {
  const theme = useMantineTheme();

  const mdScreen = useMdScreen();
  const smScreen = useSmScreen();

  const HOME_SCREEN_SIZE = "100vh"; //920;
  const innerRef = useRef();
  const [rightOffset, setRightOffset] = useState();

  useLayoutEffect(() => {
    function adjustRightOffset() {
      const styles = window.getComputedStyle(innerRef.current);
      setRightOffset(styles.getPropertyValue("margin-right").split("p")[0]);
    }

    window.addEventListener("resize", adjustRightOffset);

    return () => {
      window.removeEventListener("resize", adjustRightOffset);
    };
  });

  useLayoutEffect(() => {
    const styles = window.getComputedStyle(innerRef.current);
    setRightOffset(styles.getPropertyValue("margin-right").split("p")[0]);
  }, []);

  const [activeSlide, setActiveSlide] = useState(0);

  const [delayFinished, setDelayFinished] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayFinished(true);
    }, 1000 * initialPageDelay + 1200);
    return () => {
      clearTimeout(timeout);
    };
  }, [initialPageDelay]);

  const useStyles = createStyles((theme) => ({
    inner: {
      marginTop: 0,
      display: "flex",
      justifyContent: "space-between",
      gap: 20,
      width: "100%",
      [theme.fn.smallerThan("md")]: {
        marginTop: -60,
      },
      [theme.fn.smallerThan("md")]: {
        marginTop: -90,
      },
      [theme.fn.smallerThan("sm")]: {
        minHeight: 700,
        marginTop: -70,
      },
      [theme.fn.smallerThan(500)]: {
        marginTop: -120,
      },
    },
    lightpurpleBackground: {
      width: "100vw",
      height: HOME_SCREEN_SIZE,
      minHeight: 850,
      maxHeight: 1010,
      backgroundColor: theme.colors.primary[1],
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      display: "flex",
      alignItems: "flex-end",
    },
    donutImage: {
      position: "absolute",
      bottom: 0,
      left: -220,
      UserSelect: "none",
    },
    backgroundImage: {
      position: "absolute",
      bottom: 0,
      left: -220,
      UserSelect: "none",
      width: 1196,
      height: 412,
      /* background: `url(${productSliderData[activeSlide]["backgroundImage"]}), #D0BBFF`,
      backgroundSize: "cover",
      backgroundBlendMode: "overlay", */
      transformOrigin: "bottom center",
      [theme.fn.smallerThan("sm")]: { display: "none" },
    },
    carouselCard: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      /* backgroundColor: theme.colors.gray[1], */
      /* border: `1px solid ${theme.colors.gray[2]}`, */
      color: theme.colors.primary[3],
      fontSize: 68,
      borderRadius: 4,
    },
    heading: {
      fontSize: mdScreen ? 52 : smScreen ? 43 : 36,
      fontWeight: 800,
      color: /* theme.colors.darkText[0] */ theme.black,
      letterSpacing: -0.5,
      lineHeight: smScreen ? null : 1.015,
      [theme.fn.smallerThan(500)]: {
        width: "12ch",
      },
    },
    featureContainer: {
      width: mdScreen ? null : 300,
      margin: mdScreen ? null : "200px auto 100px auto",
      gap: mdScreen ? null : 80,
      position: "relative",
    },
    feature: {
      width: mdScreen ? 230 : 600,
      gap: mdScreen ? 4 : 16,
      display: mdScreen ? null : "flex",
      flexDirection: mdScreen ? "column" : "row",
      alignItems: mdScreen ? null : "center",
      zIndex: 1,
    },
    icon: {
      height: mdScreen ? 44 : 50,
      width: mdScreen ? 44 : 50,
      backgroundColor: theme.white,
      borderRadius: 4,
      padding: 12,
      marginBottom: 10,
    },
    featureText: {
      width: mdScreen ? null : 230,
    },
    featuresBackground: {
      display: mdScreen ? "none" : "block",
      position: "absolute",
      width: "100vw",
      height: "1000px",
      top: -130,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 0,
    },
    gradient: {
      background:
        "linear-gradient(0.25turn, #6723F5 0%, #8724F5 32.81%, #B224F5 100%)",
      backgroundClip: "text",
      color: "rgba(0,0,0,0)",
    },
    leftAlignmentLine: {
      position: "absolute",
      top: 0,
      height: "100%",
      overflow: "hidden",
    },
    horizontalAlignmentLine: {
      position: "absolute",
      left: -20,
      bottom: 0,
      display: "flex",
      alignItems: "end",

      width: "150%",
      [theme.fn.smallerThan(1250)]: {
        width: "250%",
        left: -332,
      },
      [theme.fn.smallerThan("md")]: {
        width: "250%",
        left: -192,
      },
      [theme.fn.smallerThan("sm")]: {
        width: "250%",
        left: -40,
      },
      [theme.fn.smallerThan("xs")]: {
        width: "250%",
        left: 0,
      },
    },
    CarouselDiv: {
      position: "absolute",
      top: 0,
      right: `${+rightOffset + 110}px`,
      [theme.fn.smallerThan(1400)]: {
        right: `${+rightOffset + 100}px`,
      },
      [theme.fn.smallerThan(1250)]: {
        display: "none",
      },
      [theme.fn.smallerThan("sm")]: {
        display: "unset",
        width: "100vw",
        top: 584,
        right: 0,
        zIndex: 3,
        marginBottom: 180,
      },
    },
    scrollButtonWrapper: {
      margin: "230px 0 40px",
      [theme.fn.smallerThan("sm")]: { display: "none" },
    },
  }));
  const { classes } = useStyles();

  const ShoppingCartButtonControls = useAnimation();
  const navigate = useNavigate();
  const SetConfiguratorItem = useSetConfiguratorItem();

  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className={classes.lightpurpleBackground}>
        <Container
          size={1480}
          sx={(theme) => ({
            position: "relative",
            width: "100%",
            height: 412,
            [theme.fn.smallerThan(1200)]: {
              overflow: "hidden",
            },
            [theme.fn.smallerThan("sm")]: {
              display: "none",
            },
          })}
        >
          <AnimatePresence>
            {delayFinished && (
              <motion.img
                src={productSliderData[activeSlide]["backgroundImage"]}
                key={activeSlide}
                initial={{
                  x: -30,
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.2,
                    type: "tween",
                    ease: "easeOut",
                  },
                }}
                exit={{
                  x: 80,
                  opacity: 0,
                  scale: 0.9,
                  transition: {
                    type: "tween",
                    ease: "easeIn",
                    duration: 0.15,
                  },
                }}
                className={classes.backgroundImage}
              ></motion.img>
            )}
          </AnimatePresence>
        </Container>
      </div>
      <Container size={1480} className={classes.inner} ref={innerRef}>
        <motion.div
          initial={{
            height: "0%",
          }}
          animate={{
            height: "100%",
            transition: {
              delay: initialPageDelay,
              type: "tween",
              duration: 0.8,
              ease: "linear",
            },
          }}
          className={classes.leftAlignmentLine}
        >
          <img src="VerticalDashedLine.svg" alt="" />
        </motion.div>

        <Stack ml={smScreen ? 20 : 0} sx={{ zIndex: 0 }} spacing={20}>
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: initialPageDelay + 0.6,
                type: "tween",
                duration: 0.25,
                ease: "easeOut",
              },
            }}
          >
            <Title order={1} className={classes.heading}>
              3D-Druck <span style={{ color: "#fff" }}>einfach</span> gemacht
            </Title>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: initialPageDelay + 0.7,
                type: "tween",
                duration: 0.25,
                ease: "easeOut",
              },
            }}
          >
            <Text
              sx={(theme) => ({
                maxWidth: "68ch",
                lineHeight: 1.625,
                [theme.fn.smallerThan(500)]: { maxWidth: "55ch" },
              })}
              size={mdScreen ? "sm" : "xs"}
              weight={400}
              color={/* theme.colors.darkText[0] */ theme.black}
            >
              Uploade deine .stl-Datei oder such dir einfach eines unserer
              vorgefertigten Objekte aus und bekomme deinen 3D-Druck in wenigen
              Tagen zugeschickt.
            </Text>
          </motion.div>
          <div style={{ position: "relative" }}>
            <motion.div
              initial={{
                width: "0%",
              }}
              animate={{
                width: "150%",
                transition: {
                  delay: initialPageDelay + 0.3,
                  type: "tween",
                  duration: 0.75,
                  ease: "easeOut",
                },
              }}
              style={{ overflow: "hidden" }}
              className={classes.horizontalAlignmentLine}
            >
              <img src="HorizontalDashedLine.svg" alt="" />
            </motion.div>
            <Group spacing={smScreen ? "md" : "xs"} noWrap mt={24}>
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: initialPageDelay + 0.8,
                    type: "tween",
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
              >
                <ArrowButton
                  text={"Unsere Produkte"}
                  destination={"/produkte"}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: initialPageDelay + 0.9,
                    type: "tween",
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
              >
                <Link to={"/konfigurator"}>
                  <Button
                    size={mdScreen ? "md" : "sm"}
                    variant="subtle"
                    radius={30}
                    onClick={() => {}}
                    styles={(theme) => ({
                      root: {
                        fontWeight: 700,
                        fontSize: 15,
                        "&:hover": {
                          backgroundColor: "#ffffff35",
                        },
                        [theme.fn.smallerThan("md")]: {
                          fontSize: 13,
                        },
                      },
                      color: theme.fn.gradient(),
                      [theme.fn.smallerThan("sm")]: {
                        height: 38,
                        fontSize: 14,
                      },
                      [theme.fn.smallerThan("xs")]: {
                        fontSize: 13,
                      },
                    })}
                  >
                    zum Konfigurator
                  </Button>
                </Link>
              </motion.div>
            </Group>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{
              opacity: smScreen ? 1 : 0,
              y: 0,
              transition: {
                delay: initialPageDelay + 0.75,
                type: "tween",
                duration: 0.25,
                ease: "easeOut",
              },
            }}
            className={classes.scrollButtonWrapper}
          >
            <ScrollButton />
          </motion.div>
        </Stack>

        {!smScreen && (
          <>
            <motion.div
              initial={{ x: "100vw" }}
              animate={{
                x: 0,
                transition: {
                  delay: initialPageDelay + 0.6,
                  type: "tween",
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
              style={{
                backgroundColor: "#BEA2FF",
                width: "100vw",
                height: 160,
                content: '""',
                position: "absolute",
                top: 584,
                left: 0,
                zIndex: 0,
              }}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: initialPageDelay + 1.4,
                  type: "tween",
                  duration: 0.25,
                  ease: "easeOut",
                },
              }}
              style={{
                position: "absolute",
                left: "50vw",
                top: 670,
                translate: "-50%",
                zIndex: 10,
              }}
            >
              <ActionIcon
                variant="filled"
                radius={"50%"}
                color="primary.3"
                size={48}
                sx={(theme) => ({
                  border: `2px solid ${theme.colors.primary[4]}`,
                  transition: "all .1s ease-in-out",

                  "&:hover": {
                    backgroundColor: theme.colors.primary[3],
                  },
                  ":active": {
                    transform: "translateY(2px)",
                  },
                })}
                onMouseEnter={() => {
                  ShoppingCartButtonControls.start({
                    rotate: [0, -10, 10, 0],
                    transition: { type: "spring" },
                  });
                }}
                onClick={() => {
                  SetConfiguratorItem({
                    name: productSliderData[activeSlide]["name"],
                    priceID: "",
                  });
                  navigate("/konfigurator");
                }}
              >
                <motion.div animate={ShoppingCartButtonControls}>
                  <IconShoppingCart />
                </motion.div>
              </ActionIcon>
            </motion.div>
          </>
        )}
        <motion.div
          initial={{ y: smScreen ? "-100vh" : 0, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: initialPageDelay + 0.6,
              type: "tween",
              duration: 0.4,
              ease: "easeOut",
              opacity: {
                delay: initialPageDelay + 0.2,
              },
            },
          }}
          className={classes.CarouselDiv}
        >
          <Carousel
            controlSize={36}
            previousControlIcon={
              <motion.img
                src="SwipeArrowUp.svg"
                initial={{
                  opacity: 0,
                  y: smScreen ? -30 : 0,
                  x: smScreen ? 0 : -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  transition: {
                    delay: initialPageDelay + 1.4,
                    type: "tween",
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                style={{ rotate: smScreen ? "0deg" : "-90deg" }}
              />
            }
            nextControlIcon={
              <motion.img
                src="SwipeArrowDown.svg"
                initial={{
                  opacity: 0,
                  y: smScreen ? 30 : 0,
                  x: smScreen ? 0 : 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  transition: {
                    delay: initialPageDelay + 1.4,
                    type: "tween",
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                style={{ rotate: smScreen ? "0deg" : "-90deg" }}
              />
            }
            orientation={smScreen ? "vertical" : "horizontal"}
            loop
            speed={12}
            height={HOME_SCREEN_SIZE}
            align="center"
            slideSize={smScreen ? 510 : 210}
            onSlideChange={(index) => {
              setActiveSlide(index);
            }}
            styles={{
              root: {
                width: 395,
                backgroundColor: "#BEA2FF",

                cursor: "grab",
                minHeight: 850,
                maxHeight: 1010,
                [theme.fn.smallerThan(1250)]: {
                  display: "none",
                },

                [theme.fn.smallerThan("sm")]: {
                  display: "unset",
                  width: "100vw",

                  height: 160,
                  minHeight: "unset",
                  backgroundColor: "transparent",
                },
              },
              container: {
                [theme.fn.smallerThan("sm")]: {
                  height: 250,
                },
              },
              viewport: {
                minHeight: 850,
                maxHeight: 1010,
                [theme.fn.smallerThan("sm")]: {
                  minHeight: "unset",
                  marginTop: -150,
                  paddingTop: 20,
                  zIndex: 30,
                  height: 300,
                },
              },
              slide: {
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              },
              controls: {
                marginTop: "auto",
                marginBottom: "auto",
                position: "absolute",
                left: 453,
                height: 160,
                [theme.fn.smallerThan(1400)]: {
                  left: 443,
                },
                [theme.fn.smallerThan("sm")]: {
                  marginBottom: 20,
                  padding: 0,
                  height: 40,
                  width: 200,
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: 0,
                },
              },
              control: {
                border: "none",
                boxShadow: "none",
                background: "transparent",
              },
            }}
          >
            {productSliderData.map((product, index) => {
              return (
                <Carousel.Slide key={index}>
                  <div
                    style={{
                      translate: smScreen
                        ? delayFinished
                          ? "0 0vh"
                          : "0 -170vh"
                        : delayFinished
                        ? "0vw 0"
                        : "130vw 0",
                      transform: smScreen
                        ? index === activeSlide
                          ? "scale(1) rotate(0deg)"
                          : "scale(0.9) rotate(5deg)"
                        : index === activeSlide
                        ? "scale(1) rotate(0deg) translateY(-55px)"
                        : "scale(0.9) rotate(5deg) translateY(0px)",
                      opacity: index === activeSlide ? 1 : 0.9,
                      transition: smScreen ? "all .6s ease" : "all .6s ease",
                    }}
                  >
                    <img
                      key={product.name}
                      src={product.image}
                      style={{
                        width: smScreen ? 362 : 160,
                        transform: `translateX(5%)`,
                      }}
                      alt=""
                    />
                  </div>
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </motion.div>
        {delayFinished && (
          <FloatingPriceTag
            rightOffset={rightOffset}
            name={productSliderData[activeSlide]["name"]}
            measurements={productSliderData[activeSlide]["measurements"]}
            weight={productSliderData[activeSlide]["weight"]}
            price={productSliderData[activeSlide]["price"]}
            image={productSliderData[activeSlide]["imagePrintedLook"]}
          />
        )}
      </Container>
    </motion.div>
  );
}
