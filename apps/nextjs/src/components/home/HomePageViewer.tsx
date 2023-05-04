import { useRef } from "react";
import { Box, GridItem, useBreakpoint } from "@chakra-ui/react";
import { useScroll } from "framer-motion";

import { HomePageOne } from "./HomePageOne";
import { HomePageThree } from "./HomePageThree";
import { HomePageTwo } from "./HomePageTwo";

export const HomePageViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const homePageOneRef = useRef<HTMLDivElement>(null);
  const homePageTwoRef = useRef<HTMLDivElement>(null);
  const homePageThreeRef = useRef<HTMLDivElement>(null);

  const bkPoint = useBreakpoint();
  console.log("bkPoint", bkPoint);

  const { scrollYProgress: pageOneProgress } = useScroll({
    target: homePageOneRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: pageTwoProgress } = useScroll({
    target: homePageTwoRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: pageThreeProgress } = useScroll({
    target: homePageThreeRef,
    offset: ["start end", "start start"],
  });

  return (
    <GridItem
      h="full"
      colSpan={{ base: "auto", lg: 5 }}
      bg="brandPrimary"
      ref={containerRef}
    >
      {/* Filler offset  */}
      <Box h="100vh" position={"fixed"} top={"0"}>
        <HomePageOne progress={pageOneProgress} />
      </Box>
      <Box h="100vh" position={"fixed"} top={"0"}>
        <HomePageTwo progress={pageTwoProgress} />
      </Box>
      <Box h="100vh" position={"fixed"} top={"0"}>
        <HomePageThree progress={pageThreeProgress} />
      </Box>
      <Box h="100vh" />
      <Box h="200vh" ref={homePageOneRef} />
      <Box h="200vh" ref={homePageTwoRef} />
      <Box h="200vh" ref={homePageThreeRef} />
      {/* <HomePageTwo parentRef={containerRef} />
  <HomePageThree parentRef={containerRef} /> */}
    </GridItem>
  );
};
