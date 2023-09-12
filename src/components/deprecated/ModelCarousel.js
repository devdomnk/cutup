import React from "react";

export default function ModelCarousel() {
  function STLModel(
    {
      url,
      initialRotationX,
      initialRotationY,
      initialRotationZ,
      position,
      rotateX,
      rotateZ,
      rotateY,
    },
    props
  ) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    const geom = useLoader(STLLoader, url);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
      if (initialRotationX) mesh.current.rotation.x = initialRotationX;
      if (initialRotationY) mesh.current.rotation.y = initialRotationY;
      if (initialRotationZ) mesh.current.rotation.z = initialRotationZ;

      if (rotateX) mesh.current.rotation.x += 0.005;
      if (rotateY) mesh.current.rotation.y += 0.005;
      if (rotateZ) mesh.current.rotation.z += 0.005;
    });
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh {...props} position={position} ref={mesh} geometry={geom}>
        {/* <boxGeometry args={[2, 2, 2]} /> */}
        <meshStandardMaterial color={theme.colors.primary[3]} />
      </mesh>
    );
  }

  return (
    <Carousel
      height={500}
      slideSize={"100%"}
      slideGap="xs"
      loop
      draggable
      slidesToScroll={1}
      withControls
      withIndicators
      controlSize={30}
      nextControlIcon={<IconChevronRight size={22} stroke={2.5} />}
      previousControlIcon={<IconChevronLeft size={22} stroke={2.5} />}
      sx={{ width: 540 }}
      styles={(theme) => ({
        control: {
          backgroundColor: theme.colors.primary[3],
          color: theme.white,
          border: "none",
        },
        indicator: {
          width: 40,
          height: 6,
          backgroundColor: theme.white,
          '&[data-active="true"]': {
            backgroundColor: theme.colors.primary[3],
          },
        },
      })}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide className={classes.carouselCard}>
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [100, 30, 100], fov: 40 }}>
            <ambientLight />
            <pointLight position={[100, 100, 100]} />
            <STLModel
              url={"./3DBenchy.stl"}
              initialRotationX={Math.PI * 1.5}
              rotateZ
              position={[0, -14, 0]}
            />
          </Canvas>
        </Suspense>
      </Carousel.Slide>
      <Carousel.Slide className={classes.carouselCard}>
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [100, 20, 100], fov: 32 }}>
            <ambientLight />
            <pointLight position={[100, 100, 100]} />
            <STLModel
              url={"/FIAT_500.stl"}
              initialRotationX={Math.PI * 1.5}
              rotateZ
              position={[0, -10, 0]}
            />
          </Canvas>
        </Suspense>
      </Carousel.Slide>
      <Carousel.Slide className={classes.carouselCard}>
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [100, 20, 100], fov: 100 }}>
            <ambientLight />
            <pointLight position={[100, 100, 100]} />
            <STLModel
              url={"/Vader.stl"}
              position={[0, -60, 0]}
              rotateZ
              initialRotationX={Math.PI * 1.5}
            />
          </Canvas>
        </Suspense>
      </Carousel.Slide>

      <Carousel.Slide className={classes.carouselCard}>
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ position: [100, 20, 100], fov: 57 }}>
            <ambientLight />
            <pointLight position={[100, 100, 100]} />
            <STLModel
              url={"/CuteOcto.stl"}
              initialRotationX={Math.PI * 1.5}
              position={[0, -15, 0]}
              rotateZ
            />
          </Canvas>
        </Suspense>
      </Carousel.Slide>
    </Carousel>
  );
}
