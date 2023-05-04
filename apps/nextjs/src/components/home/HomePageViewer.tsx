import React, { useRef } from "react";
import { Box, GridItem } from "@chakra-ui/react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { HomePageOne } from "./HomePageOne";
import { HomePageThree } from "./HomePageThree";
import { HomePageTwo } from "./HomePageTwo";

export const HomePageViewer = ({
  setPageNumber,
}: {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const homePageOneRef = useRef<HTMLDivElement>(null);
  const homePageTwoRef = useRef<HTMLDivElement>(null);
  const homePageThreeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: pageOneProgress } = useScroll({
    target: homePageOneRef,
    offset: ["start end", "center start"],
  });
  const { scrollYProgress: pageTwoProgress } = useScroll({
    target: homePageTwoRef,
    offset: ["start end", "center start"],
  });
  const { scrollYProgress: pageThreeProgress } = useScroll({
    target: homePageThreeRef,
    offset: ["start end", "center start"],
  });

  useMotionValueEvent(pageOneProgress, "change", (latest) => {
    if (latest > 0.4 && latest < 0.5) {
      setPageNumber(1);
    }
  });

  useMotionValueEvent(pageTwoProgress, "change", (latest) => {
    if (latest > 0.4 && latest < 0.5) {
      setPageNumber(2);
    }
  });
  useMotionValueEvent(pageThreeProgress, "change", (latest) => {
    if (latest > 0.4 && latest < 0.5) {
      setPageNumber(3);
    }
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
      <Box h="200vh" ref={homePageThreeRef} />]
    </GridItem>
  );
};
